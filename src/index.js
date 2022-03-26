import './style/main.less';
import { addGlobalStyle, basename, getHumanizedDiff, getQueryStringParameters, isPage, removeNewlinesAndTabs, setupTriggers } from './utils';
import { createPlanetSearchContainer } from './components/ColonySearch';
import { setupEspionageUpdate } from './components/EspionageUpdater';
import { baseurl } from './config';

function loadSystemInformation(galaxy, system) {
    const parameters = {
        url: `${baseurl}/galaxy/system/?galaxy=${galaxy}&system=${system}`,
        type: 'GET',
        contentType: 'application/json',
        success: (data, status, xhr) => {
            if (data) {
                var lastModifiedString = ""
                data.forEach((planet) => {
                    lastModifiedString = getHumanizedDiff(new Date() - new Date(planet.updatedAt))
                    $(`table.table569 > tbody > tr`).eq(planet.position + 1).find(`td`).eq(2).append(`✅`)
                })
                $(`table.table569 > tbody > tr > th`).eq(0).append(` - <b style="color: #ff8000">last updated ` + lastModifiedString + ` ago </b>`)
            }
        },
        error: (jqxhr, status, error) => {
            console.log(error)
        }
    }

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
function createUpdateButtonToGalaxyView() {
    // Add Button to top of System
    $('#galaxy_form > table > tbody > tr').eq(1).append(/*html*/`
      <td style="background-color:transparent;border:0px;" colspan="2">
	    <input type="button" value="Update" id="update-system" />
        <span id="system-last-modified"></span>
	  </td>`);

    $('#galaxy_form > table > tbody > tr').eq(1).find('td').eq(0).prop("colspan", "1")
    $('#update-system').click(updateSystemInformation);
}


function getSystemInformation() {

    var galaxy = parseInt($('input[name="galaxy"]').val())
    var system = parseInt($('input[name="system"]').val())

    loadSystemInformation(galaxy, system)
}

function parseLabelValuePairFromToolip(tds, possibleLabels = []) {
    var tmpLabel = ""
    var fleet = {}
    tds.each((id, element) => {
        var text = $(element).text()
        var isLabel = (text.indexOf(":") !== -1) || possibleLabels.includes(text)


        if (isLabel) {
            tmpLabel = text.replace(":", "")
        } else {
            fleet[tmpLabel] = parseInt(text.replace(".", ""))
            tmpLabel = ""
        }
    })

    return fleet
}

function parseFleetsFromOverview() {
    var fleetTooltips = $(`#hidden-div2 span.return a[data-tooltip-content]`).filter((id, element) => {
        return $(element).text() == "Flotten"
    })

    var ressourceTooltips = $(`#hidden-div2 span.return a[data-tooltip-content]`).filter((id, element) => {
        return $(element).text() != "Flotten"
    })

    ressourceTooltips.each((id, tooltip) => {
        var tooltipHTML = $(tooltip).attr("data-tooltip-content")
        var tooltipElement = $(tooltipHTML)
        var tds = tooltipElement.find("td")
        var ressources = parseLabelValuePairFromToolip(tds, ["Metall", "Kristall", "Deuterium"])
        console.log(ressources)
    })

    fleetTooltips.each((id, tooltip) => {
        var tooltipHTML = $(tooltip).attr("data-tooltip-content")
        var tooltipElement = $(tooltipHTML)
        var tds = tooltipElement.find("td")
        var fleet = parseLabelValuePairFromToolip(tds)
        console.log(fleet)
    })
}

function setupPlayerCardUpdate() {
    $(`body#playerCard > #content`).prepend(/*html*/`
        <div class="update-playercard-container">
            <div style="display:flex; justify-content: center; align-items: center">
                <input id="update-playercard" type="button" value="Update">
            </div>
        </div>
    `)

    $('#update-playercard').click(updatePlayercardInformation)


}

function updatePlayercardInformation() {
    var playerCard = parsePlayerCard()
    console.log(playerCard)
}

function parsePlayerCard() {
    var playercardQuery = $(`body#playerCard table`)

    var getCell = (row, col) => {
        return $($(playercardQuery).find("tr").eq(row).find("td").eq(col))
    }

    var getValueOfCell = (row, col) => {
        return parseInt(
            getCell(row, col)
                .text()
                // remove decimal seperator
                .replaceAll(".", "")
        )

    }

    playercard = {
        points: {
            structures: getValueOfCell(5, 1),
            reasearch: getValueOfCell(6, 1),
            fleet: getValueOfCell(7, 1),
            defensive: getValueOfCell(8, 1),
            total: getValueOfCell(9, 1)
        },
        ranks: {
            structures: getValueOfCell(5, 2),
            reasearch: getValueOfCell(6, 2),
            fleet: getValueOfCell(7, 2),
            defensive: getValueOfCell(8, 2),
            total: getValueOfCell(9, 2)
        },
        combat: {
            wins: getValueOfCell(12, 1),
            draws: getValueOfCell(13, 1),
            loses: getValueOfCell(14, 1),
            total: getValueOfCell(15, 1),
        },
        units: {
            destroyed: getValueOfCell(17, 1),
            lost: getValueOfCell(18, 1),
        },
        debris: {
            metal: getValueOfCell(19, 1),
            crystal: getValueOfCell(20, 1),
        }
    }

    return playercard
}






(function () {
    'use strict';

    addGlobalStyle(`*, ::after, ::before {
        box-sizing: border-box;
    }
    .collapse {
      display: block;
      max-height: 0px;
      overflow: hidden;
      transition: max-height .5s cubic-bezier(0, 1, 0, 1);
    }
    .collapse.show {
        max-height: 99em;
        transition: max-height .5s ease-in-out;
      }

     table.fixed { table-layout:fixed; }
     table.fixed td { overflow: hidden; }
    `)

    setupTriggers()

    // general functions
    if (!isPage("playerCard"))
        createPlanetSearchContainer()

    // ======== OVERVIEW
    if (isPage("overview")) {
        parseFleetsFromOverview()
    }

    // ======== GALAXY
    if (isPage("galaxy")) {
        createUpdateButtonToGalaxyView()
        getSystemInformation()
    }

    // ======== STATISTICS
    if (isPage("statistics") || isPage("playerCard")) {
        setupPlayerCardUpdate()
    }

    // ======== MESSAGES
    if (isPage("messages")) {
        setupEspionageUpdate()
    }

    if (window.top === window.self) {
        //--- Script is on domain_B.com when/if it is the MAIN PAGE.
    }
    else {
        console.log("iframe")
    }

})();



$(document).ready(function () {

});
