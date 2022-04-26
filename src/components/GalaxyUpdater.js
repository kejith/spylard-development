import { basename, getHumanizedDiff, getQueryStringParameters, removeNewlinesAndTabs } from '../utils';
import { baseurl } from '../config';

export class GalaxyUpdater {
    constructor() {
        this.system = new SystemParser()
        this.system.parse()
    }

    init() {
        // Add Button to top of System
        $('#galaxy_form > table > tbody > tr').eq(1).append(/*html*/`
          <td style="background-color:transparent;border:0px;" colspan="2">
            <input type="button" value="Update" id="update-system" />
            <span id="system-last-modified"></span>
          </td>`);

        $('#galaxy_form > table > tbody > tr').eq(1).find('td').eq(0).prop("colspan", "1")
        $('#update-system').click(this.parseSystem.bind(this));
        this.loadSystemInformation(this.system.coords.galaxy, this.system.coords.system)
    }

    loadSystemInformation(galaxy, system) {
        var key = GM_getValue("spylard-api-key", "")
        const parameters = {
            url: `${baseurl}/galaxy/system/?galaxy=${galaxy}&system=${system}&apiKey=${key}`,
            type: 'GET',
            contentType: 'application/json',
            success: (data, status, xhr) => {
                if (data) {
                    var lastModifiedString = ""
                    var planetsToDelete = []
                    data.forEach((planet) => {
                        lastModifiedString = getHumanizedDiff(new Date() - new Date(planet.updatedAt))
                        var planetName = $(`table.table569 > tbody > tr`).eq(planet.position + 1).find(`td`).eq(2).text()
                        if (planetName == "") {
                            planetsToDelete.push(planet)
                        }
                        $(`table.table569 > tbody > tr`).eq(planet.position + 1).find(`td`).eq(2).append(`✅`)
                    })

                    this.removeDeleted(planetsToDelete)

                    $(`table.table569 > tbody > tr > th`)
                        .eq(0)
                        .append(` - <b style="color: #ff8000">last updated ` + lastModifiedString + ` ago </b>`)
                }
            },
            error: (jqxhr, status, error) => {
                console.error(error)
            }
        }

        console.debug(parameters)

        var jqxhr = $.ajax(parameters)
    }

    removeDeleted(planets) {
        var key = GM_getValue("spylard-api-key", "")
        console.debug(`=== removeDeleted()`)

        const parameters = {
            url: `${baseurl}/galaxy/system/delete?&apiKey=${key}`,
            type: 'POST',
            data: JSON.stringify(planets),
            contentType: 'application/json',
            success: (data, statusText) => {
                console.debug(statusText)
            },
            error: (jqxhr, status, error) => { console.error(error) }
        }

        console.debug(planets)

        var jqxhr = $.ajax(parameters)
    }

    sendSystem = (data) => {
        var key = GM_getValue("spylard-api-key", "")
        const parameters = {
            url: `${baseurl}/galaxy/system/update?&apiKey=${key}`,
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

    parseSystem() {
        var parser = new SystemParser()
        parser.parse()
        var system = parser.getSystem()
        this.sendSystem(system);

        console.debug(`${system.planets.length} Planets found.`);
        console.debug(system)
    }

}

class SystemParser {
    constructor() {
        this.coords = { galaxy: 0, system: 0 }
        this.planets = []
    }

    parse() {
        this.coords.galaxy = parseInt($('#galaxy_form input[name="galaxy"]').val());
        this.coords.system = parseInt($('#galaxy_form input[name="system"]').val());
        $('.table569 > tbody > tr').each((index, element) => {
            var isPlanetRow = index > 1 && index < 17
            if(!isPlanetRow)
                return

            let row = new SystemRowParser(element)
            row.parse()

            if(row.isValid())
                this.planets.push(row.getData())  
        })
    }

    getSystem() {
        return {
            galaxy: this.coords.galaxy,
            system: this.coords.system,
            planets: this.planets
        }
    }
}

class SystemRowParser {
    constructor(rowElement) {
        this.data = {
            position: 0,
            avatar: "",
            name: "",
            hasMoon: false,
            debris: {
                metal: 0,
                crystal: 0
            },
            userName: "",
            alliance: ""
        }

        this.columns = $(rowElement).find("td")
    }

    getData() {
        return this.data
    }

    parse() {
        this.data.position = this.readPosition()
        this.data.avatar = this.readAvatar()
        this.data.name = this.readPlanetName()
        this.data.hasMoon = this.readMoon()
        this.data.debris = this.readDebrisField()

        var user = this.readUser()

        this.data.user = user.name
        this.data.userID = user.id
        this.data.inactive = user.inactive
        this.data.umode = user.umode

        var alliance = this.readAlliance()
        if(alliance != null) {
            this.data.alliance = alliance
        }
    }

    readPosition() {
        return parseInt(removeNewlinesAndTabs(this.columns.eq(0).text()))
    }

    readAvatar() {
        return basename(this.columns.eq(1).find("img").attr('src'))
    }

    readPlanetName() {
        var name = removeNewlinesAndTabs(this.columns.eq(2).text())
        
        // temporary fix to remove checkmarks from usernames
        // so they won't be uploaded
        // TODO: place checkmark at a place where it can't interfere
        name = name.replace("✅", "")
        
        // find everything between ()
        const regExp = /\(([^)]+)\)/;
        var matches = regExp.exec(name);

        if (matches) {
            // remove everything within () including paranthese
            name = name.replace(matches[0], "")
        }

        return name
    }

    readMoon() {
        return this.columns.eq(3).find(".tooltip_sticky").attr("data-tooltip-content") != undefined;
    }

    readDebrisField() {
        var debris = {
            metal: 0,
            crystal: 0
        }
        return debris
    }

    readUser() {
        var thisCol = this.columns.eq(5)
        var user = {
            name: "",
            id: 0,
            inactive: 0,
            umode: false,
        }

        user.name = removeNewlinesAndTabs(thisCol.text());

        const regExpUserID = /\(([^)]+)\)/;
        // find everything between ()
        const regExp = /\(([^)]+)\)/;
        var matches = regExp.exec(user.name);

        var tooltipHTML = thisCol.find(".tooltip_sticky").attr("data-tooltip-content")
        var userIDMatches = regExpUserID.exec(tooltipHTML)

        if (userIDMatches) {
            user.id = parseInt(userIDMatches[1])
        }

        if (matches) {
            // remove user details from username string
            user.name = user.name.replace(matches[0], "")


            var info = matches[1]
            if (info.indexOf("i") != -1)
                user.inactive += 1

            if (info.indexOf("I") != -1)
                user.inactive += 1

            user.umode = info.indexOf("u") != -1

        }

        return user
    }

    readAlliance() {
        var thisCol = this.columns.eq(6)
        var allianceTooltip = thisCol.find(".tooltip_sticky").attr("data-tooltip-content")
        var idRegExp = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/
        var matches = idRegExp.exec(allianceTooltip)


        if (matches) {
            var params = getQueryStringParameters(matches[2])
            return {
                id: parseInt(params.id),
                name: removeNewlinesAndTabs(thisCol.text())
            }
        }

        return null
    }

    isValid() {
        return (
            this.data.avatar !== '' &&
            this.data.user !== '' &&
            this.data.name !== '' &&
            this.data.userID !== 0            
        )
    }
}

