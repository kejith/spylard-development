import { Keys } from '../const';
import { AllianceReader, UserReader } from '../models/Models';
import { getColoniesByAlliance, getColoniesByUser } from '../requests';
import { setupTriggers } from '../utils';

const colonyResultContainer = "#colony-search-results-wrapper"

function clearColonyResults() {
    $(colonyResultContainer).html("")
}

function outPutAllianceColonies(alliances) {
    if (alliances === null && !Array.isArray(alliances)) {
        console.error({ error: "alliances null should contain array", where: "outPutAllianceColonies()" })
        return
    }

    alliances.forEach((alliance) => {
        var allianceContainerID = `#search-colonies-alliance-${alliance.id}`
        $(colonyResultContainer).append(`<div id="${allianceContainerID.replace('#', '')}"><h3>${alliance.name}</h3></div>`)
        outputUserColoniesBatch(alliance.members, $(allianceContainerID))
    })

    setupTriggers()
}

function outputUserColoniesBatch(users, bindTo = colonyResultContainer) {
    if (users == null && !Array.isArray(users)) {
        console.error({
            error: "users null should contain array",
            function: "=== outputUserColoniesBatch() ===",
        })
        return
    }

    users.forEach((user) => {
        outputUserColonies(user, bindTo)
    })

    setupTriggers()
}

function outputUserColonies(user, bindTo = colonyResultContainer) {
    var idTableUserColonies = `colonies-${user.id}`
    var researchContainerId = `colony-research-${user.id}`
    var researchTableHtml = createCategoryTableHtml(researchContainerId, "techs", user.data.techs)

    $(bindTo).append(/*html*/`
    <div style="text-align: center;">
        ${researchTableHtml}        
    </div>
    <table class="fixed" id="${idTableUserColonies}">
        <col width="100">
        <col width="100%">
        <tr>
            <th colspan="2">
                <a 
                    href="#" 
                    style="color: #ff8000" 
                    onclick="return Dialog.Playercard(${user.id}, '${user.name}');">[${user.name}]</a> 
                    [${(user.alliance !== null) ? user.alliance.name : "-"}]

            </th>
        </tr>
        <tr>
            <th>Koords</th>
            <th>Planet</th>
        </tr>
    </table>
    `)

    user.planets.forEach((planet) => {

        var dataContainerId = `colony-data-${planet.coords.galaxy}-${planet.coords.system}-${planet.coords.position}`
        var fleetContainerId = `colony-fleet-${planet.coords.galaxy}-${planet.coords.system}-${planet.coords.position}`

        $(`#${idTableUserColonies}`).append(/*html*/`
            <tr>
                <td>
                    <a href="game.php?page=galaxy&galaxy=${planet.coords.galaxy}&system=${planet.coords.system}">
                        [${planet.coords.galaxy}:${planet.coords.system}:${planet.coords.position}]
                    </a>
                </td>
                <td>
                    <span href="#" data-toggle="collapse" data-target="#${dataContainerId}">
                        ${planet.name}</td>
                    </span>
            </tr>
            <tr>
                <td colspan="2">
                    <div class="collapse" id="${dataContainerId}">
                        ${outputPlanetData(planet)}
                    </div>
                </td>
            </tr>
            `)
    })
}


function createCategoryTableHtml(containerId, category, data) {
    var innerHTML = createCategoryTableElementsHTML(category, data)

    return /*html*/`
        <div class="tablehead">
            <span data-toggle="collapse" data-target="#${containerId}">
                ${Keys[category].de.name}
            </span>      
        </div>   
        <div id="${containerId}" class="collapse">
            <div class="flexparent">
                ${innerHTML}
            </div>
        </div>`
}

function createCategoryTableElementsHTML(category, data) {
    var elementsHtml = ``
    Object.keys(data).forEach((element) => {
        if (Keys[category][element] !== undefined) {
            elementsHtml += /*html*/`
            <div class="cell colony-data colony-${category}">
                <span class="element element-name">${Keys[category][element].de.abbr}</span><br>
                <span class="element element-level">${data[element].toLocaleString()}</span>
            </div>           
            `
        }
    })

    return elementsHtml
}

function outputPlanetData(planet) {
    var data = planet.getData()
    const { galaxy, system, position } = planet.coords

    var dataCategoryHtml = ``
    Object.keys(data).forEach(category => {
        var containerId = `colony-${category}-${galaxy}-${system}-${position}`
        dataCategoryHtml += createCategoryTableHtml(containerId, category, data[category])
    })

    return /*html*/`
        <div>
            ${dataCategoryHtml}
        </div>`
}

export function createPlanetSearchContainer() {
    $('body > div.wrapper').append(/*html*/`
        <div class="no-mobile colony-search-container">
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
                        <tr>
                            <td style="text-align: center">
                                <input id="search-colony-btn" type="submit" value="Suchen">
                            </td>
                        </tr>
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
    searchColoniesForm.addEventListener("submit", onSubmit, true);
}

function onSubmit(event) {
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

                var alliances = AllianceReader.FromData(data)
                clearColonyResults()
                outPutAllianceColonies(alliances)
            },
            fail: (jqxhr, textStatus, errorThrown) => { console.error({ jqxhr, textStatus, errorThrown }) }
        })


    } else {
        var users = getColoniesByUser(searchInput, {
            done: (data) => {
                var users = UserReader.FromData(data)
                clearColonyResults()
                outputUserColoniesBatch(users)
            },
            fail: (jqxhr, textStatus, errorThrown) => { console.error({ jqxhr, textStatus, errorThrown }) }
        })
    }

    return false;
}