import { Keys } from '../const';
import { AllianceReader, User, UserReader } from '../models/Models';
import { getColoniesByAlliance, getColoniesByUser, Request } from '../requests';
import { setupTriggers } from '../utils';

class Actions {
    static GetUsers = "getUsers"
    static GetAlliances = "getAlliances"
}

export class ColonySearch {
    constructor(options) {
        this.appendTo = options.appendTo
        this.wrapperClasses = options.wrapperClasses
        this.wrapperId = options.wrapperId
        this.colonyResultContainer = "#colony-search-results-wrapper"

    }

    setState(state) {
        this.state = { ...this.state, ...state }
        GM_setValue("colony-search-state", JSON.stringify(this.state))
        this.render()
    }

    render() {
        //console.log(this.state)
        this.clearResults()


        if (this.state.action == Actions.GetUsers) {
            var users = UserReader.fromData(this.state.data)       
            this.outputUsers(users)
        }
        if (this.state.action == Actions.GetAlliances) {
            var alliances = AllianceReader.fromData(this.state.data)
            this.outputAlliance(alliances)
        }
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

        var savedState = GM_getValue("colony-search-state", "{}")

        console.log(savedState)

        if (savedState)
            this.setState(JSON.parse(savedState))
    }

    /**
     * Clearing the Results List of the ColonySearch
     * @date 2022-03-30
     * @returns {void}
     */
    clearResults() {
        $(this.colonyResultContainer).html("")
    }

    /**
     * Alliance-Request Callback
     * @date 2022-03-30
     * @param {object} data
     * @returns {any}
     */
    onAllianceUpdate(data) {
        data.forEach((alliance) => {
            alliance.users.forEach((user) => {
                user.alliance = { id: alliance.id, name: alliance.name }
            })
        })
        this.setState({ data, action: Actions.GetAlliances })
    }

    /**
     * User-Request Callback
     * @param {object} data 
     */
    onUserUpdate(data) {
        this.setState({ data, action: Actions.GetUsers })
    }

    /**
     * Form submission Callback
     * @param {object} event 
     */
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


    /**
     * Alliance-data will be used to output Results
     * @date 2022-03-30
     * @param {Alliance[]} alliances
     * @returns {void}
     */
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

    /**
     * User data will be used to output Results
     * @date 2022-03-30
     * @param {Users[]} users
     * @param {string} bindTo=this.colonyResultContainer
     * @returns {void}
     */
    outputUsers(users, bindTo = this.colonyResultContainer) {
        if (users == null && !Array.isArray(users)) {
            console.error({
                error: "users null should contain array",
                function: "=== outputUserColoniesBatch() ===",
            })
            return
        }

        users.forEach((user) => {
            this.outputUser(user, bindTo)
        })

        setupTriggers()
    }

    /**
     * User data will be used to create a table of colonies which is binded to the corresponding
     * user result container or a specified one
     * @date 2022-03-30
     * @param {User} user
     * @param {string} bindTo=this.colonyResultContainer
     * @returns {any}
     */
    outputUser(user, bindTo = this.colonyResultContainer) {
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

            //console.log(planet)
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
                        <span  data-toggle="collapse" data-target="#${dataContainerId}">
                            ${planet.name}</td>
                        </span>
                </tr>
                <tr>
                    <td colspan="2">
                        <div class="collapse" id="${dataContainerId}">
                            ${this.getPlanetDataHtml(planet)}
                        </div>
                    </td>
                </tr>
                `)
        })
    }



    /**
     * Planet data is used to create a multiple Tables for every category of data a Planet has
     * @date 2022-03-30
     * @param {Planet} planet
     * @returns {string} - HTML String
     */
    getPlanetDataHtml(planet) {
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