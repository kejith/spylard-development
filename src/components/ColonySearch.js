import { Keys } from '../const';
import { AllianceReader, User, UserReader } from '../models/Models';
import { getColoniesByAlliance, getColoniesByUser, Requests } from '../requests';
import { setupTriggers } from '../utils';
import { Planet } from '../models/Models';
import { isPage } from '../utils';
import { removeNewlinesAndTabs } from '../utils';

class Actions {
    static GetUsers = "getUsers"
    static GetAlliances = "getAlliances"
    static GetMoons = "getMoons"
    static GetInactives = "getInactives"
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
        this.clearResults()


        if (this.state.action == Actions.GetUsers) {
            var users = UserReader.fromData(this.state.data)
            this.outputUsers(users)
        }
        if (this.state.action == Actions.GetAlliances) {
            var alliances = AllianceReader.fromData(this.state.data)
            this.outputAlliance(alliances)
        }
        if (this.state.action == Actions.GetMoons) {
            this.outputMoons(this.state.data)
        }
    }

    init() {
        if(isPage("galaxy")) {
            $(`.table569`).find(`tr`).each((index, value) => {
                var username = removeNewlinesAndTabs($(value).find("td").eq(5).text())
                if(username !== ''){
                    // remove activity details from username string
                    const regExp = /\(([^)]+)\)/;                    
                    var matches = regExp.exec(username);
                    if (matches) {
                        username = username.replace(matches[0], "")
                    }

                    $(value).append(/*html*/`
                        <td>
                            <a href="#" id="search-from-galaxy-${index}" data-value="${username}"  >
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </a>
                        </td>
                    `)
                    

                    $(`#search-from-galaxy-${index}`).bind("click", { username }, (event) => {
                        $("#search-colony-input-user").attr("value", event.data.username)
                        $("#player-search").prop("checked", true)
                        this.onSubmit()
                    })
                    

                }
            })
        }

        $(this.appendTo).append(/*html*/`
            <div id="${this.wrapperId}" class="${this.wrapperClasses}">
                <div  style="text-align: right">                        
                    <span  data-toggle="collapse" data-target="#colony-search-collapse-wrapper">
                        Suche auf-/zuklappen
                    </span>
                </div>
                <div id="colony-search-collapse-wrapper" class="collapse show">
                    <div id="colony-search-wrapper">
                        <form id="search-colonies">
                            <table >
                                <tr><th style="text-align: center">Suche</th></tr>
                                <tr><td style="text-align: center"><input id="search-colony-input-user" type="text"></td></tr>
                                <tr><td><span class="search-type-label">Nach was soll gesucht werden?</span></td></tr>
                                <tr>
<!--
                                    <td style="text-align: center">
                                        <span>Allianz suchen</span>
                                        <input style="vertical-align: middle;"  id="search-alliance-checkbox" type="checkbox">
                                    </td>
-->
                                    <td style="text-align: center">
                                        <input type="radio" id="player-search" name="search-type" value="${Actions.GetUsers}" checked="checked">
                                        <label for="alliance-search">Spieler</label>
                                        <input type="radio" id="alliance-search" name="search-type" value="${Actions.GetAlliances}">
                                        <label for="alliance-search">Allianz</label>
                                        <input type="radio" id="moon-search" name="search-type" value="${Actions.GetMoons}">
                                        <label for="alliance-search">Mond</label>                                        
                                        <input type="radio" id="moon-search" name="search-type" value="${Actions.GetInactives}">
                                        <label for="alliance-search">Inaktiv</label>
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
                        <table id="colony-search-results">
                        </table>
                    </div>
                </div>
            </div>
        `)

        $('#search-colonies').on('submit', function (e) {
            e.preventDefault();
        });

        var searchColoniesForm = document.getElementById("search-colonies")
        searchColoniesForm.addEventListener("submit", this.onSubmit.bind(this), true);

        var savedState = GM_getValue("colony-search-state", "{}")
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
     * @returns {void}
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
     * Moons Request Callback
     * @date 2022-04-06
     * @param {any} data
     * @returns {void}
     */
    onMoonUpdate(data) {
        this.setState({ data, action: Actions.GetMoons })
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
    onSubmit(event = null) {
        event?.preventDefault();

        var searchInput = $("#search-colony-input-user").val()
        var type = $('input[name="search-type"]:checked').val()

        console.debug({searchInput, type})

        switch (type) {
            case Actions.GetUsers:
                var users = getColoniesByUser(searchInput, { done: this.onUserUpdate.bind(this) })
                break;
            case Actions.GetAlliances:
                var alliances = getColoniesByAlliance(searchInput, { done: this.onAllianceUpdate.bind(this) })
                break;
            case Actions.GetMoons:
                var moons = Requests.getMoons(searchInput, { done: this.onMoonUpdate.bind(this) })
                break;
            case "inactive":

            default:
                break;
        }

        // var shouldSearchForAlliance = $("#search-alliance-checkbox").is(":checked")

        // if (shouldSearchForAlliance) {
        //     
        // } else {
        //     
        // }
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
            this.outputPlanet(planet, idTableUserColonies)
        })
    }

    outputPlanet(planet, bindTo) {
        var dataContainerId = `colony-data-${planet.coords.galaxy}-${planet.coords.system}-${planet.coords.position}`
        var fleetContainerId = `colony-fleet-${planet.coords.galaxy}-${planet.coords.system}-${planet.coords.position}`

        var planetSummary = new PlanetSummary(planet)

        $(`#${bindTo}`).append(/*html*/`
            <tr>
                <td>
                    <a href="game.php?page=galaxy&galaxy=${planet.coords.galaxy}&system=${planet.coords.system}">
                        [${planet.coords.galaxy}:${planet.coords.system}:${planet.coords.position}]
                    </a>
                </td>
                <td>
                    <span  data-toggle="collapse" data-target="#${dataContainerId}">
                        ${planet.name}
                    </span>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    ${planetSummary.getHtml()}
                    <div class="collapse" id="${dataContainerId}">
                        ${this.getPlanetDataHtml(planet)}
                    </div>
                </td>
            </tr>
            `)
    }


    outputMoons(data) {
        $(this.colonyResultContainer).append(/*html*/`<table id="colony-search-results"></table>`)
        data.forEach(moonData => {
            var planet = new Planet(moonData)
            this.outputMoon(planet, "colony-search-results", moonData.user.alliance?.name)
        })
    }

    outputMoon(moon, bindTo, alliance) {
        var dataContainerId = `colony-data-${moon.coords.galaxy}-${moon.coords.system}-${moon.coords.position}`
        var fleetContainerId = `colony-fleet-${moon.coords.galaxy}-${moon.coords.system}-${moon.coords.position}`

        var planetSummary = new PlanetSummary(moon)

        $(`#${bindTo}`).append(/*html*/`
            <tr>
                <td>
                    <a href="game.php?page=galaxy&galaxy=${moon.coords.galaxy}&system=${moon.coords.system}">
                        [${moon.coords.galaxy}:${moon.coords.system}:${moon.coords.position}]
                    </a>
                </td>
                <td>
                    <span  data-toggle="collapse" data-target="#${dataContainerId}">
                        ${alliance !== undefined ? alliance : "-"}
                    </span>
                </td>
            </tr>
            `)
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

class EspionageTable {
    constructor(props) {
        this.props = props
    }

    getHtml() {
        const { espionages } = this.props
        if (Array.isArray(espionages)) {

            var elements = this.getElements()
        }
    }

    getElements() {
        const { galaxy, system, position } = espionage.coords
        var espioangeId = `espionage-full-${galaxy}-${system}-${position}`
        var html = ``

        espionages.forEach(epsionage => {
            html += /*html*/`
                <div class="espionage-summary">
                    <table>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <div id="${espioangeId}" class="espionage-full">
                </div>
            `
        })
    }
}

class PlanetSummary {
    constructor(planet) {
        if (!planet || !(planet instanceof Planet))
            throw new Error(`Given parameter planet is not an instance of class Planet`)

        this.planet = planet
    }

    getHtml() {
        var values = {
            fleet: this.planet.getFleet().value(),
            defense: this.planet.getDefense().value(),
            structures: this.planet.getStructures().value()
        }

        var total = values.fleet + values.defense + values.structures

        if (total == 0)
            return ``

        return /*html*/`
            <table class="planet-summary">
                <tr>
                    <td>
                        <div class="icon"><i class="fa-solid fa-jet-fighter-up"></i></div>
                        <div><b>${values.fleet / 1000}</b></div>
                    </td>
                    <td>
                        <div class="icon"><i class="fa-solid fa-shield"></i></div>
                        <div><b>${values.defense / 1000}</b></div>
                    </td>
                    <td>
                        <div class="icon"><i class="fa-solid fa-industry"></i></div>
                        <div><b>${Math.floor(values.structures / 1000)}</b></div>
                    </td>
                </tr>
            </table>        
        `
    }
}

class PlanetController {
    constructor(planet) {
        if (true)
            return
    }
}
