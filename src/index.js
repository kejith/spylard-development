import { get } from './utils'
import './style/main.less'
import { add } from './example'



// ------------------
// CONSTANTS
const baseurl = "https://kejith.de"

const unitmapping = {
    "days": 24 * 60 * 60 * 1000,
    "hours": 60 * 60 * 1000,
    "minutes": 60 * 1000,
    "seconds": 1000
};

// ------------------
// UTILS


// map our commands to the classList methods
const fnmap = {
    'toggle': 'toggle',
    'show': 'add',
    'hide': 'remove'
};
const collapse = (selector, cmd) => {
    const targets = Array.from(document.querySelectorAll(selector));
    targets.forEach(target => {
        target.classList[fnmap[cmd]]('show');
    });
}

function setupTriggers() {
    // Grab all the trigger elements on the page
    const triggers = Array.from(document.querySelectorAll('[data-toggle="collapse"]'));

    // Listen for click events, but only on our triggers
    window.addEventListener('click', (ev) => {
        const elm = ev.target;
        if (triggers.includes(elm)) {
            const selector = elm.getAttribute('data-target');
            collapse(selector, 'toggle');
        }
    }, false);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css.replace(/;/g, ' !important;');
    head.appendChild(style);
}

function isPage(pageQuery) {
    return findGetParameter("page") == pageQuery
}

function getQueryStringParameters(url) {

    var urlParams = {},
        match,
        additional = /\+/g, // Regex for replacing additional symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(additional, " ")); },
        query;
    if (url) {
        if (url.split("?").length > 0) {
            query = url.split("?")[1];
        }
    } else {
        url = window.location.href;
        query = window.location.search.substring(1);
    }
    while (match = search.exec(query)) {
        urlParams[decode(match[1])] = decode(match[2]);
    }
    return urlParams;
}

function floor(value) {
    return Math.floor(value)
}

function getHumanizedDiff(diff) {
    return (floor(diff / unitmapping.days) > 0 ? floor(diff / unitmapping.days) + " days " : "") +
        (floor((diff % unitmapping.days) / unitmapping.hours) > 0 ? floor((diff % unitmapping.days) / unitmapping.hours) + " hours " : "") +
        (floor((diff % unitmapping.hours) / unitmapping.minutes) > 0 ? floor((diff % unitmapping.hours) / unitmapping.minutes) + " minutes " : "") +
        (floor((diff % unitmapping.minutes) / unitmapping.seconds) > 0 ? floor((diff % unitmapping.minutes) / unitmapping.seconds) + " seconds " : "");
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function removeNewlinesAndTabs(input) {
    if (typeof input === 'string' || input instanceof String)
        return input.replace(/[\r\n\t]/g, "");

    return "";
}

function basename(path) {
    if (path == undefined)
        return ""

    return path.split('/').reverse()[0];
}


// -------------------
// REQUESTs

const colonyResultContainer = "#colony-search-results-wrapper"

function getColoniesByAlliance(alliance) {
    clearColonyResults()
    $.get(`${baseurl}/alliance/?tag=${alliance}`, (data) => {

        data.forEach((alliance) => {
            var allianceContainerID = `#search-colonies-alliance-${alliance.id}`
            $(colonyResultContainer).append(`<div id="search-colonies-alliance-${alliance.id}"><h3>${alliance.name}</h3></div>`)
            alliance.users.forEach((user) => {
                user.alliance = { id: alliance.id, name: alliance.name }
                outputUserColonies(user, allianceContainerID)
            })
        })

    })
}

function getColoniesByUser(user) {
    clearColonyResults()
    $.get(`${baseurl}/galaxy/system/planets?user=${user}`, (data) => {

        // create table for each User
        data.forEach((user) => {
            outputUserColonies(user)
        })
    })
}

function clearColonyResults() {
    $(colonyResultContainer).html("")
}

function getResearch(user) {
    var techs = [
        "espionage",
        "computer",
        "weapons",
        "shield",
        "armour",
        "energy",
        "hyperspace",
        "combustionDrive",
        "impulseDrive",
        "hyperspaceDrive",
        "laserTech",
        "ion",
        "plasma",
        "igfn",
        "astropyhsics",
        "productionMaxMetall",
        "productionMaxCrystal",
        "productionMaxDeuterium",
        "graviton",
    ]

    research = {}
    techs.forEach((tech) => {
        research[tech] = user[tech]
    })

    return research
}

function outputUserColonies(user, bindTo = colonyResultContainer) {
    var idTableUserColonies = `colonies-${user.id}`

    var row = ""
    var tooltipRows = ""
    var research = getResearch(user)
    var techs = Object.keys(research)
    i = 0
    techs.forEach((tech) => {
        if (i % 2 === 0) {
            row = /*html*/`
                <tr>
                    <td>${tech}</td>
                    <td> ${research[tech]}</td>`
        } else {
            row += /*html*/`
                    <td>${tech}</td>
                    <td> ${research[tech]}</td>
                <tr>`

            tooltipRows += row
        }
        i++;
    })

    //class="tooltip"
    //data-tooltip-content="<table>${tooltipRows}</table>"
    $(bindTo).append(/*html*/`
    <div>
        <button href="#" data-toggle="collapse" data-target="#user-research-${user.id}">Forschung</button>
        <table class="collapse" id="user-research-${user.id}">
            <tr><th colspan="4">Forschung</th></tr>
            ${tooltipRows}
        </table>
    </div>
    <table class="fixed" id="${idTableUserColonies}">
        <col width="100">
        <col width="100%">
        <tr>
            <th colspan="2">
                <a 
                    href="#" 
                    style="color: #ff8000" 
                    onclick="return Dialog.Playercard(${user.id}, '${user.name}');">[${user.name}]</a> [${(user.alliance !== null) ? user.alliance.name : "-"}]

            </th>
        </tr>
        <tr>
            <th>Koords</th>
            <th>Planet</th>
        </tr>
    </table>
    `)

    setupTriggers()

    // append colonie to corresponding user table
    user.planets.forEach((planet) => {
        $(`#${idTableUserColonies}`).append(`
            <tr>
                <td>
                    <a href="game.php?page=galaxy&galaxy=${planet.galaxy}&system=${planet.system}">
                        [${planet.galaxy}:${planet.system}:${planet.position}]
                    </a>
                </td>
                <td>${planet.name}</td>
            </tr>                
        `)
    })
}

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

function loadEspionageInformation(ids) {
    const parameters = {
        url: `${baseurl}/espionage/check`,
        data: JSON.stringify(ids),
        type: 'POST',
        contentType: 'application/json',
        success: (data, status, xhr) => {
            if (data) {
                console.log(data)
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

function sendEspionage(data, id) {
    console.log("=== sendEspionage()")
    console.debug(data)

    updateBtn = $(`.message_${id} .espionage-update-button`)
    $(updateBtn).prop('value', "UPDATING...")
    $(updateBtn).prop('disabled', true)

    const parameters = {
        url: `${baseurl}/espionage/create`,
        data: JSON.stringify(data),
        contentType: 'application/json',
        type: 'POST',
        success: (data, status, xhr) => {
            console.log("Successfully send espionage report.")
            $(updateBtn).prop('value', "UPDATED SUCCESSFULLY")

        },
        error: (jqxhr, status, error) => {
            console.error(error)
            $(updateBtn).prop('value', "UPDATED FAILED")
        }
    }

    var jqxhr = $.ajax(parameters)

    setTimeout(function () {
        $(updateBtn).prop('value', "Update")
        $(updateBtn).prop('disabled', false)
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


                        info = matches[1]
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
                        params = getQueryStringParameters(matches[2])
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

function createPlanetSearchContainer() {
    $('body > div.wrapper').append(/*html*/`
        <div class="no-mobile" style="padding: 10px; margin-right: 10px; grid-area: 2 / 5 / auto / auto; overflow-x: hidden; width: 20vw;">
            <div id="colony-search-wrapper">
                <form id="search-colonies">
                    <table >
                        <tr><th style="text-align: center">Spieler suche</th></tr>
                        <tr><td style="text-align: center"><input id="search-colony-input-user" type="text"></td></tr>
                        <tr>
                            <td style="text-align: center">
                                <span>Allianz suchen</span>
                                <input style="vertical-align: middle;"  id="search-alliance-checkbox" type="checkbox">
                            </td>
                        </tr>
                        <tr><td style="text-align: center"><input id="search-colony-btn" type="submit" value="Suchen"></td></tr>
                    </table>
                </form>
            </div>
            <div id="colony-search-results-wrapper">
                <table>
                </table>
            </div>
        </div>
    `)

    $('#search-colonies').on('submit', function (e) {
        e.preventDefault();
    });

    var searchColoniesForm = document.getElementById("search-colonies")
    searchColoniesForm.addEventListener("submit", function (event) {
        event.preventDefault();

        var searchInput = $("#search-colony-input-user").val()
        var shouldSearchForAlliance = $("#search-alliance-checkbox").is(":checked")

        if (shouldSearchForAlliance)
            var colonies = getColoniesByAlliance(searchInput)
        else
            var colonies = getColoniesByUser(searchInput);

        return false;
    }, true);
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

function parseEspionageBody(id) {
    data = { "1": 0, "2": 0, "3": 0, "4": 0, "6": 0, "12": 0, "14": 0, "15": 0, "21": 0, "22": 0, "23": 0, "24": 0, "31": 0, "33": 0, "34": 0, "41": 0, "42": 0, "43": 0, "44": 0, "106": 0, "108": 0, "109": 0, "110": 0, "111": 0, "113": 0, "114": 0, "115": 0, "117": 0, "118": 0, "120": 0, "121": 0, "122": 0, "123": 0, "124": 0, "131": 0, "132": 0, "133": 0, "199": 0, "202": 0, "203": 0, "204": 0, "205": 0, "206": 0, "207": 0, "208": 0, "209": 0, "210": 0, "211": 0, "212": 0, "213": 0, "214": 0, "215": 0, "401": 0, "402": 0, "403": 0, "404": 0, "405": 0, "406": 0, "407": 0, "408": 0, "502": 0, "503": 0, "901": 0, "902": 0, "903": 0, "911": 0 }
    labels = { ...data }
    $(`.message_${id}`).find(".spyRaportContainerCell > a").each((id, value) => {
        typeId = /\(([^)]+)\)/.exec($(value).attr("onClick"))[1]
        data[typeId] = parseInt($(value).parent().next().text().replace(".", ""))
        labels[typeId] = $(value).text()
    })

    console.log(labels)

    return data
}

function makeReport(data) {
    report = {
        ressources: {
            metal: data[901],
            crystal: data[902],
            deuterium: data[903],
        }
    }

    report.ships = {
        smallCargo: data[202],
        largeCargo: data[203],
        lightFighter: data[204],
        heavyFighter: data[205],
        cruiser: data[206],
        battleship: data[207],
        colonyShio: data[208],
        recycler: data[209],
        espionageProbe: data[210],
        bomber: data[211],
        satalites: data[212],
        destroyer: data[213],
        deathstar: data[214],
        battlecruiser: data[215]
    }

    report.defensive = {
        rocketLauncher: data[401],
        lightLaser: data[402],
        heavyLaser: data[403],
        gaussCanon: data[404],
        ionCanon: data[405],
        plasmaCanon: data[406],
        smallShield: data[407],
        largeShield: data[408],
        antiBalisticMissile: data[502],
        interplanetaryMissile: data[503]
    }

    report.structures = {
        metalMine: data[1],
        crystalMine: data[2],
        deuteriumSynthesizer: data[3],
        solarPlant: data[4],
        fusionPlant: data[12],
        roboticsFactory: data[14],
        naniteFactory: data[15],
        shipyard: data[21],
        metalStorge: data[22],
        crystalStorage: data[23],
        deteriumTank: data[24],
        researchLab: data[31],
        terraformer: data[33],
        allianceDepot: data[34],
        sensorPhalanx: data[42],
        jumpGate: data[43],
        missileSilo: data[44]
    }

    report.research = {
        espionage: data[106],
        computer: data[108],
        weapons: data[109],
        shield: data[110],
        armour: data[111],
        energy: data[113],
        hyperspace: data[114],
        combustionDrive: data[115],
        impulseDrive: data[117],
        hyperspaceDrive: data[118],
        laserTech: data[120],
        ion: data[121],
        plasma: data[122],
        igfn: data[123],
        astropyhsics: data[124],
        productionMaxMetall: data[131],
        productionMaxCrystal: data[132],
        productionMaxDeuterium: data[133],
        graviton: data[199],
    }

    return report
}

function parseEspionageHead(espionageReportQuery) {
    // Meta Information
    var metaInfoString = $($(espionageReportQuery).find(`.spyRaportHead > a`).eq(0)).text()

    // Coords
    var readCoordinates = (metaInfo) => {
        var findStringBetweenSquareBrackets = /\[(.*?)\]/
        var coordMatches = findStringBetweenSquareBrackets.exec(metaInfo)
        var coords = {}
        if (coordMatches) {
            [coords.galaxy, coords.system,
            coords.position] = coordMatches[1].split(":")
        } else {
            console.error("Couldn't find coordiantes in Espionage Header. ")
        }

        coords = {
            galaxy: parseInt(coords.galaxy),
            system: parseInt(coords.system),
            position: parseInt(coords.position),
        }

        return coords
    }

    // Date
    var readDate = (metaInfoString) => {
        var findDateRegExp = /(?<=] am ).*$/
        var matches = findDateRegExp.exec(metaInfoString)
        var date = null

        if (matches) {
            date = new Date(matches[0])
        }

        return date.toISOString()
    }

    coords = readCoordinates(metaInfoString)
    date = readDate(metaInfoString)

    return {
        coords: coords,
        date: date,
    }
}

function parseEspionageReport(id) {
    message = $(`.message_${id}`)
    var espionageReportQuery = message.find(".spyRaport")

    data = parseEspionageBody(id)
    report = { ...makeReport(data), ...parseEspionageHead(espionageReportQuery) }

    // how detailed the espionage report is
    // https://ogame.fandom.com/wiki/Espionage
    report.detailLevel = $(message).find("div[class*=' spyRaportContainerHeadClass']").length
    report.id = id

    return report
}

function findEspionageID(message) {
    classes = $(message).attr("class").split(/\s+/)
    classWithID = classes[0]
    idString = classWithID.split("_")[1]
    return parseInt(idString)
}

function findEspionageMessages() {
    var messageQueries = []
    $(`div.spyRaport .spyRaportHead`).each((id, element) => {
        messageQueries.push($(element).parents().eq(2))
    })

    return messageQueries
}

function findEspionageMessagesIds() {
    var ids = []
    $(`div.spyRaport .spyRaportHead`).each((id, element) => {
        ids.push(findEspionageID($(element).parents().eq(2)))
    })

    return ids
}

function updateEspionage(event) {
    report = parseEspionageReport(event.data.id)
    console.log(report)
    sendEspionage(report, event.data.id)
}

async function setupEspionageUpdate() {
    var espionages = []
    const espionageIds = findEspionageMessagesIds()

    loadEspionageInformation(espionageIds)
    espionageIds.forEach((id) => {
        message = $(`.message_${id}`)
        //espionages.push(parseEspionageReport(message))
        message.find(".spyRaport").prepend(/*html*/`
            <div id="espionage-update" style="text-align: center;">
                <input class="espionage-update-button" type="button" value="Update">
            </div>
        `)

        message
            .find(".espionage-update-button")
            .click({ id }, updateEspionage)
    })
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
    if (isPage("messages")){
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
