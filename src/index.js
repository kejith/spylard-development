import { createPlanetSearchContainer } from './components/ColonySearch';
import { setupEspionageUpdate } from './components/EspionageUpdater';
import { createUpdateButtonToGalaxyView, getSystemInformation } from './components/GalaxyUpdater';
import './style/main.less';
import { addGlobalStyle, isPage, setupTriggers } from './utils';
import { setupPlayerCardUpdate } from './components/PlayercardUpdater';
import { parseFleetsFromOverview } from './components/FleetParser';
import { ColonySearch } from './components/ColonySearch';
import { utils } from './utils';
import { GalaxyUpdater } from './components/GalaxyUpdater';
import { Requests } from './requests';
import Toastify from 'toastify-js'



(function () {
    'use strict';

    utils.loadExternalJavascript("https://kit.fontawesome.com/dbf8ffc691.js")
    utils.loadExternalJavascript("https://cdn.jsdelivr.net/npm/toastify-js")

    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
    }).appendTo("head");

    Requests.checkVersion({
        done: (data) => {

            const versions = {
                new: data.version,
                current: GM_info.script.version
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
            }
        }
    })



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
        setupEspionageUpdate()
    }

    // if (window.top === window.self) {
    //     //--- Script is on domain_B.com when/if it is the MAIN PAGE.
    // }
    // else {
    //     console.log("iframe")
    // }

})();
