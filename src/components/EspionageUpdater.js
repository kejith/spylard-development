import { loadEspionageInformation } from "../requests"
import { baseurl } from "../config"

function sendEspionage(data, id) {
    console.debug("=== sendEspionage()")
    console.debug(data)

    var updateBtn = $(`.message_${id} .espionage-update-button`)
    $(updateBtn).prop('value', "UPDATING...")
    $(updateBtn).prop('disabled', true)

    const parameters = {
        url: `${baseurl}/espionage/create`,
        data: JSON.stringify(data),
        contentType: 'application/json',
        type: 'POST',
        success: (data, status, xhr) => {
            console.debug("Successfully send espionage report.")
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

function parseEspionageBody(id) {
    var data = { "1": 0, "2": 0, "3": 0, "4": 0, "6": 0, "12": 0, "14": 0, "15": 0, "21": 0, "22": 0, "23": 0, "24": 0, "31": 0, "33": 0, "34": 0, "41": 0, "42": 0, "43": 0, "44": 0, "106": 0, "108": 0, "109": 0, "110": 0, "111": 0, "113": 0, "114": 0, "115": 0, "117": 0, "118": 0, "120": 0, "121": 0, "122": 0, "123": 0, "124": 0, "131": 0, "132": 0, "133": 0, "199": 0, "202": 0, "203": 0, "204": 0, "205": 0, "206": 0, "207": 0, "208": 0, "209": 0, "210": 0, "211": 0, "212": 0, "213": 0, "214": 0, "215": 0, "401": 0, "402": 0, "403": 0, "404": 0, "405": 0, "406": 0, "407": 0, "408": 0, "502": 0, "503": 0, "901": 0, "902": 0, "903": 0, "911": 0 }
    var labels = { ...data }
    $(`.message_${id}`).find(".spyRaportContainerCell > a").each((id, value) => {
        var typeId = /\(([^)]+)\)/.exec($(value).attr("onClick"))[1]
        data[typeId] = parseInt($(value).parent().next().text().replace(".", ""))
        labels[typeId] = $(value).text()
    })
    return data
}



function makeReport(data) {
    var report = {
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
        satellites: data[212],
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

        var coords = {
            galaxy: parseInt(coords.galaxy),
            system: parseInt(coords.system),
            position: parseInt(coords.position),
        }

        return coords
    }

    // Date
    var readDate = metaInfoString => {
        var findDateRegExp = /(?<=] am ).*$/;
        var matches = findDateRegExp.exec(metaInfoString);
        var date = new Date();

        function isValidDate(d) {
            return d instanceof Date && !isNaN(d);
        }

        if (matches) {
            date = new Date(matches[0]);

            if (!isValidDate(date)) {
                console.log({
                    metaInfoString,
                    matches,
                    date
                });
                date = new Date()
            } 
        }

        return date.toISOString();
    };

    var coords = readCoordinates(metaInfoString)
    var date = readDate(metaInfoString)

    return {
        coords: coords,
        date: date,
    }
}

function parseEspionageReport(id) {
    var message = $(`.message_${id}`)
    var espionageReportQuery = message.find(".spyRaport")

    var data = parseEspionageBody(id)
    var report = { ...makeReport(data), ...parseEspionageHead(espionageReportQuery) }

    // how detailed the espionage report is
    // https://ogame.fandom.com/wiki/Espionage
    report.detailLevel = $(message).find("div[class*=' spyRaportContainerHeadClass']").length
    report.id = id

    return report
}

function findEspionageID(message) {
    var classes = $(message).attr("class").split(/\s+/)
    var classWithID = classes[0]
    var idString = classWithID.split("_")[1]
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
    var report = parseEspionageReport(event.data.id)
    sendEspionage(report, event.data.id)
}

export const setupEspionageUpdate = async function setupEspionageUpdate() {
    var espionages = []
    const espionageIds = findEspionageMessagesIds()


    loadEspionageInformation(espionageIds, {
        done: (existentEspionages) => {
            if (existentEspionages != null && Array.isArray(existentEspionages)) {
                espionageIds.forEach((espionageId) => {
                    var doesExists = existentEspionages.filter((espionage) => espionage.pid == espionageId).length > 0
                    if (doesExists) {
                        createCheckmark(espionageId)
                    } else {
                        createUpdateButton(espionageId)
                    }
                })
            }
        },
        fail: () => { }
    })
}

var createCheckmark = (id) => {
    $(`#message_${id}.message_head`).find("td").eq(2).text("✅")
}

var createUpdateButton = (id) => {
    var message = $(`.message_${id}`)
    //espionages.push(parseEspionageReport(message))
    message.find(".spyRaport").prepend(/*html*/`
        <div id="espionage-update" style="text-align: center;">
            <input class="espionage-update-button" type="button" value="Update">
        </div>
    `)

    message
        .find(".espionage-update-button")
        .click({ id }, updateEspionage)
}

