import { getColoniesByAlliance, getColoniesByUser } from '../requests';
import { setupTriggers } from '../utils';

const colonyResultContainer = "#colony-search-results-wrapper"

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

    var research = {}
    techs.forEach((tech) => {
        research[tech] = user[tech]
    })

    return research
}

function outPutAllianceColonies(alliances) {
    if(alliances == null && !Array.isArray(alliances)) {
        console.log("=== outPutAllianceColonies() ===")
        console.log("alliances null should contain array")
        return
    }

    alliances.forEach((alliance) => {
        var allianceContainerID = `#search-colonies-alliance-${alliance.id}`
        $(colonyResultContainer).append(`<div id="${allianceContainerID.replace('#', '')}"><h3>${alliance.name}</h3></div>`)
        outputUserColoniesBatch(alliance.users, $(allianceContainerID))
    })
}

function outputUserColoniesBatch(users, bindTo = colonyResultContainer) {
    if(users == null && !Array.isArray(users)) {
        console.log("=== outputUserColoniesBatch() ===")
        console.log("users null should contain array")
        return
    }

    users.forEach((user) => {
        outputUserColonies(user, bindTo)
    })
}

const technologyNames = {
    espionage: "Spionage",
    computer: "Computer",
    weapons: "Waffen",
    shield: "Schild",
    armour: "Hülle",
    energy: "Energie",
    hyperspace: "Hyperraum",
    combustionDrive: "Verbrennung",
    impulseDrive: "Impuls",
    hyperspaceDrive: "Hyperr. Antrieb",
    laserTech: "Laser",
    ion: "Ion",
    plasma: "Plasma",
    igfn: "IGFN",
    astropyhsics: "Astro",
    productionMaxMetall: "PM Metall",
    productionMaxCrystal: "PM Kristall",
    productionMaxDeuterium: "PM Deut",
    graviton: "Graviton",
}

function outputUserColonies(user, bindTo = colonyResultContainer) {
    
    var idTableUserColonies = `colonies-${user.id}`

    var tooltipRows = ""
    var researchLevels = getResearch(user)
    var techNames = Object.keys(researchLevels)
    techNames.forEach((techName) => {
        tooltipRows += /*html*/`
            <div class="cell colonies-research">
                <span class="tech-name">${technologyNames[techName]}</span><br>
                <span class="tech-level">${researchLevels[techName]}</span>
            </div>
        `
    })

    //class="tooltip"
    //data-tooltip-content="<table>${tooltipRows}</table>"
    $(bindTo).append(/*html*/`
    <div style="text-align: center;">
        <button href="#" data-toggle="collapse" data-target="#user-research-${user.id}">Forschung</button>
        <div class="collapse" id="user-research-${user.id}">
            <div class="tablehead">Forschung</div>    
            <div class="flexparent">
                ${tooltipRows}
            </div>
        </div>
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


export function createPlanetSearchContainer() {
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

        if (shouldSearchForAlliance) {
            var alliances = getColoniesByAlliance(searchInput, {
                done: (data) => { 
                    data.forEach((alliance) => {
                        alliance.users.forEach((user) => {
                            user.alliance = { id: alliance.id, name: alliance.name }
                        })
                    })
                    clearColonyResults()
                    outPutAllianceColonies(data) 
                },
                fail: (jqxhr, textStatus, errorThrown) => { console.log({jqxhr, textStatus, errorThrown}) }
            })
        

        } else {
            var users = getColoniesByUser(searchInput, {
                done: (data) => { clearColonyResults(); outputUserColoniesBatch(data) },
                fail: (jqxhr, textStatus, errorThrown) => { console.log({jqxhr, textStatus, errorThrown}) }
            })
        }

        return false;
    }, true);
}