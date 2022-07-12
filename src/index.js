import Toastify from 'toastify-js';
import { ColonySearch } from './components/ColonySearch';
import { setupEspionageUpdate } from './components/EspionageUpdater';
import { parseFleetsFromOverview } from './components/FleetParser';
import { GalaxyUpdater } from './components/GalaxyUpdater';
import { setupPlayerCardUpdate } from './components/PlayercardUpdater';
import { Requests } from './requests';
import './style/main.less';
import { isPage, setupTriggers, utils } from './utils';

function getShips() {
    var ids = [202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215]
    var ships = {}
    ids.forEach(id => {
        ships[id] = parseInt($(`[name="battleinput[0][0][${id}]"]`).val())
    })

    return ships
}

function versionCheck() {
    
    var lastVersionCheck = GM_getValue("spylard-version-check-timestamp")
    var lastCheckDate = new Date(lastVersionCheck)
    var currentDate = new Date()

    var deltaVersionCheck = currentDate - lastCheckDate

    if(deltaVersionCheck > 10 * 60 * 1000) {
        Requests.checkVersion({
            done: (data) => {

                const versions = {
                    new: data.version,
                    current: GM_info.script.version,
                }

                var comparedVersions = utils.versionCompare(versions.current, versions.new)
                console.debug({...versions, compared: comparedVersions })

                


                if (comparedVersions < 0) {
                    Toastify({
                        text: "Es gibt eine neuere Version für Spylard, bitte updaten!",
                        duration: 10000,
                        destination: "https://github.com/kejith/spylard-development/raw/gh-pages/index.prod.user.js",
                        newWindow: true,
                    }).showToast()
                } else {
                    GM_setValue("spylard-version-check-timestamp", new Date().toString())
                }

            }
        })
    }
}



(function () {
    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
    }).appendTo("head");

    utils.loadExternalJavascript("https://kit.fontawesome.com/dbf8ffc691.js")

    var user = $(".planetImage.no-mobile").find("a").eq(0).text()
    GM_setValue("spylard-user", user)

    versionCheck()
    setupTriggers()

    var colonySearch = new ColonySearch({
        appendTo: 'body > div.wrapper',
        wrapperClasses: 'no-mobile colony-search-container',
        wrapperId: ''
    })

    // general functions
    if (!isPage("playerCard"))
        colonySearch.init()

    // ======== OVERVIEW
    if (isPage("overview")) {
        parseFleetsFromOverview()
    }

    // ======== GALAXY
    if (isPage("galaxy")) {
        var galaxyUpdater = new GalaxyUpdater()
        galaxyUpdater.init()
    }

    // ======== STATISTICS
    if (isPage("statistics") || isPage("playerCard")) {
        setupPlayerCardUpdate()
    }

    // ======== MESSAGES
    if (isPage("messages")) {
        //setupEspionageUpdate()
    }

    // ======== MESSAGES
    if (isPage("battleSimulator")) {
        $("#submit td").append(/*html*/`
            &nbsp;<button id="spylard-simulator-submit" type="button" class="btn btn-primary">Speichern</button>
        `)

        console.log("dsplsd")

        var ids = [202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215]
        var ships = {}
        ids.forEach(id => {
            var amount = parseInt($(`[name="battleinput[0][0][${id}]"]`).val())
            console.log(amount)
            var label = $(`[name="battleinput[0][0][${id}]"]`).parent().append(`<br/>${amount}`)
        })

        $("#spylard-simulator-submit").on("click", (e) => {
            e.preventDefault()
            var ships = getShips()
            GM_setValue("calculatedShips", JSON.stringify(ships))

            console.log(ships)

            Toastify({
                text: "Schiffe gespeichert",
                duration: 3000,
            }).showToast()

        })

    }

    // is page fleetTable
    if (isPage("fleetTable")) {
        $(".table519 > tbody > tr").last().find("td").append(/*html*/
            `&nbsp;<button id="spylard-simulator-paste" type="button" class="btn btn-primary">Einfügen</button>`
        )

        $("#spylard-simulator-paste").on("click", (e) => {
            e.preventDefault()

            var ships = JSON.parse(GM_getValue("calculatedShips", "{}"))
            
            Object.keys(ships).forEach(id => {
                $(`#ship${id}_input`).val(ships[id])
            })
        })
    }

    // if (window.top === window.self) {
    //     //--- Script is on domain_B.com when/if it is the MAIN PAGE.
    // }
    // else {
    //     console.log("iframe")
    // }

})();
