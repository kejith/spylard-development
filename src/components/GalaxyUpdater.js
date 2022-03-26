import { basename, getHumanizedDiff, getQueryStringParameters, removeNewlinesAndTabs } from '../utils';
import { baseurl } from '../config';

function loadSystemInformation(galaxy, system) {
    const parameters = {
        url: `${baseurl}/galaxy/system/?galaxy=${galaxy}&system=${system}`,
        type: 'GET',
        contentType: 'application/json',
        success: (data, status, xhr) => {
            if (data) {
                var lastModifiedString = ""
                var planetsToDelete = []
                data.forEach((planet) => {
                    lastModifiedString = getHumanizedDiff(new Date() - new Date(planet.updatedAt))
                    var planetName = $(`table.table569 > tbody > tr`).eq(planet.position + 1).find(`td`).eq(2).text()
                    if(planetName == "") {
                        planetsToDelete.push(planet)
                    }
                    $(`table.table569 > tbody > tr`).eq(planet.position + 1).find(`td`).eq(2).append(`✅`)
                })

                removeDeleted(planetsToDelete)

                $(`table.table569 > tbody > tr > th`).eq(0).append(` - <b style="color: #ff8000">last updated ` + lastModifiedString + ` ago </b>`)
            }
        },
        error: (jqxhr, status, error) => {
            console.log(error)
        }
    }

    var jqxhr = $.ajax(parameters)
}

function removeDeleted(planets) {
    console.log(`=== removeDeleted()`)
    
    const parameters = {
        url: `${baseurl}/galaxy/system/delete`,
        type: 'POST',
        data: JSON.stringify(planets),
        contentType: 'application/json',
        success: (data, statusText) => {
            console.log(statusText)
        },
        error: (jqxhr, status, error) => { console.log(error) }
    }

    console.log(planets)

    var jqxhr = $.ajax(parameters)
}

function sendSystem(data) {
    const parameters = {
        url: `${baseurl}/galaxy/system/update`,
        data: JSON.stringify(data),
        contentType: 'application/json',
        type: 'POST',
        success: (data, status, xhr) => {
            console.debug("Send System successfull")
            $('input#update-system').prop('value', "UPDATED SUCCESSFULLY")
            $('input#update-system').prop('disabled', true)
        },
        error: (jqxhr, status, error) => {
            console.error(error)
            $('input#update-system').prop('value', "UPDATE FAILED")
            $('input#update-system').prop('disabled', false)
        }
    }

    $('input#update-system').prop('value', "UPDATING...")

    var jqxhr = $.ajax(parameters)

    setTimeout(function () {
        $('input#update-system').prop('value', "Update")
        $('input#update-system').prop('disabled', false)
    }, 5000);
}


function updateSystemInformation() {
    const systemColumnIds = {
        Position: 0,
        Avatar: 1,
        Name: 2,
        Moon: 3,
        Debris: 4,
        User: 5,
        Alliance: 6
    }

    var system = {
        galaxy: 0,
        system: 0,
        planets: new Array()
    }

    system.galaxy = parseInt($('#galaxy_form input[name="galaxy"]').val());
    system.system = parseInt($('#galaxy_form input[name="system"]').val());

    $('.table569 > tbody > tr').each(function (rowIndex, value) {

        let planet = {
            position: 0,
            avatar: 0,
            name: "",
            moon: false,
            debris: {
                metal: 0,
                crystal: 0,
            },
            user: "",
            alliance: "",
            inactive: 0,
            umode: false,
        };

        // find everything between ()
        const regExp = /\(([^)]+)\)/;

        $(this).children("td").each(function (columnID, valueCol) {
            switch (columnID) {
                case systemColumnIds.Position:
                    planet.position = parseInt(removeNewlinesAndTabs($(this).text()));
                    break;

                case systemColumnIds.Avatar:
                    planet.avatar = basename($(this).find("img").attr('src'));
                    break;

                case systemColumnIds.Name:
                    var name = removeNewlinesAndTabs($(this).text());
                    var matches = regExp.exec(name);

                    planet.name = name.replace("✅", "")

                    if (matches) {
                        planet.name = name.replace(matches[0], "")
                    }
                    planet.name = planet.name.replace("✅", "")
                    break;


                case systemColumnIds.Moon:
                    // true if .tooltip_sticky class can be found on this cell
                    // false otherwise
                    planet.moon = $(this).find(".tooltip_sticky").attr("data-tooltip-content") != undefined;
                    break;

                case systemColumnIds.Debris:
                    planet.debris.metal = 0;
                    planet.debris.crystal = 0;
                    //console.log($(this).html())
                    break;

                case systemColumnIds.User:
                    var user = removeNewlinesAndTabs($(this).text());

                    const regExpUserID = /\(([^)]+)\)/;
                    var matches = regExp.exec(user);

                    var tooltipHTML = $(this).find(".tooltip_sticky").attr("data-tooltip-content")
                    var userIDMatches = regExpUserID.exec(tooltipHTML)

                    if (userIDMatches) {
                        planet.userID = parseInt(userIDMatches[1])
                    }

                    if (matches) {
                        // remove user details from username string
                        user = user.replace(matches[0], "")


                        var info = matches[1]
                        if (info.indexOf("i") != -1)
                            planet.inactive += 1

                        if (info.indexOf("I") != -1)
                            planet.inactive += 1

                        planet.umode = info.indexOf("u") != -1

                    }

                    planet.user = user
                    break;

                case systemColumnIds.Alliance:
                    var allianceTooltip = $(this).find(".tooltip_sticky").attr("data-tooltip-content")
                    var idRegExp = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/
                    matches = idRegExp.exec(allianceTooltip)


                    if (matches) {
                        var params = getQueryStringParameters(matches[2])
                        planet.alliance = {
                            id: parseInt(params.id),
                            name: removeNewlinesAndTabs($(this).text())
                        }
                    }

                    break;


                default:
                    break;
            }
        });

        if (planet.avatar != '') {
            system.planets.push(planet)
        }
    })

    sendSystem(system);

    console.log(`${system.planets.length} Planets found.`);
    console.log(system)
}

// HTML
export function createUpdateButtonToGalaxyView() {
    // Add Button to top of System
    $('#galaxy_form > table > tbody > tr').eq(1).append(/*html*/`
      <td style="background-color:transparent;border:0px;" colspan="2">
	    <input type="button" value="Update" id="update-system" />
        <span id="system-last-modified"></span>
	  </td>`);

    $('#galaxy_form > table > tbody > tr').eq(1).find('td').eq(0).prop("colspan", "1")
    $('#update-system').click(updateSystemInformation);
}


export function getSystemInformation() {

    var galaxy = parseInt($('input[name="galaxy"]').val())
    var system = parseInt($('input[name="system"]').val())

    loadSystemInformation(galaxy, system)
}