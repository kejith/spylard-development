import { Keys } from '../const';
import { AllianceReader, UserReader } from '../models/Models';
import { getColoniesByAlliance, getColoniesByUser, Request } from '../requests';
import { setupTriggers } from '../utils';

export class ColonySearch {
    constructor(options) {
        this.appendTo = options.appendTo
        this.wrapperClasses = options.wrapperClasses
        this.wrapperId = options.wrapperId
        this.colonyResultContainer = "#colony-search-results-wrapper"
    }

    clearResults() {
        return $(this.colonyResultContainer).html("")
    }

    onAllianceUpdate(data) {
        data.forEach((alliance) => {
            alliance.users.forEach((user) => {
                user.alliance = { id: alliance.id, name: alliance.name }
            })
        })

        var alliances = AllianceReader.FromData(data)

        this.clearResults()
        this.outputAlliance(alliances)
    }

    onUserUpdate(data) {
        var users = UserReader.FromData(data)
        this.clearResults()
        this.outputUsers(users)
    }

    onSubmit(event) {
        event.preventDefault();

        var searchInput = $("#search-colony-input-user").val()
        var shouldSearchForAlliance = $("#search-alliance-checkbox").is(":checked")

        if (shouldSearchForAlliance) {
            var alliances = getColoniesByAlliance(searchInput, { done: this.onAllianceUpdate.bind(this) })
        } else {
            var users = getColoniesByUser(searchInput, { done: this.onUserUpdate.bind(this) })
        }
    }


    outputAlliance(alliances) {
        if (alliances === null && !Array.isArray(alliances)) {
            console.error({ error: "alliances null should contain array", where: "outPutAllianceColonies()" })
            return
        }

        alliances.forEach((alliance) => {
            var allianceContainerID = `#search-colonies-alliance-${alliance.id}`
            $(this.colonyResultContainer).append(`
                <div id="${allianceContainerID.replace('#', '')}"><h3>${alliance.name}</h3></div>
            `)
            this.outputUsers(alliance.members, $(allianceContainerID))
        })

        setupTriggers()
    }

    outputUsers(users, bindTo = this.colonyResultContainer) {
        if (users == null && !Array.isArray(users)) {
            console.error({
                error: "users null should contain array",
                function: "=== outputUserColoniesBatch() ===",
            })
            return
        }

        users.forEach((user) => {
            this.outputPlanets(user, bindTo)
        })

        setupTriggers()
    }

    outputPlanets(user, bindTo = this.colonyResultContainer) {
        var idTableUserColonies = `colonies-${user.id}`
        var researchContainerId = `colony-research-${user.id}`
        var researchTableHtml = CategoryTable.getHtml(researchContainerId, "techs", user.data.techs)

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
                            ${this.outputPlanetData(planet)}
                        </div>
                    </td>
                </tr>
                `)
        })
    }



    outputPlanetData(planet) {
        var data = planet.getData()
        const { galaxy, system, position } = planet.coords

        var dataCategoryHtml = ``
        Object.keys(data).forEach(category => {
            var containerId = `colony-${category}-${galaxy}-${system}-${position}`
            dataCategoryHtml += CategoryTable.getHtml(containerId, category, data[category])
        })

        return /*html*/`
            <div>
                ${dataCategoryHtml}
            </div>`
    }

    init() {
        $(`${this.appendTo}`).append(/*html*/`
            <div id="${this.wrapperId}" class="${this.wrapperClasses}">
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
        searchColoniesForm.addEventListener("submit", this.onSubmit.bind(this), true);
    }
}

class CategoryTable {
    static getHtml(containerId, category, data) {
        var innerHTML = this.getElements(category, data)

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

    static getElements(category, data) {
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
}