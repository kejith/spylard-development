import { createPlanetSearchContainer } from './components/ColonySearch';
import { setupEspionageUpdate } from './components/EspionageUpdater';
import { createUpdateButtonToGalaxyView, getSystemInformation } from './components/GalaxyUpdater';
import './style/main.less';
import { addGlobalStyle, isPage, setupTriggers } from './utils';
import { setupPlayerCardUpdate } from './components/PlayercardUpdater';
import { parseFleetsFromOverview } from './components/FleetParser';
import { ColonySearch } from './components/ColonySearch';
import { utils } from './utils';



(function () {
    'use strict';

    utils.loadExternalJavascript("https://kit.fontawesome.com/dbf8ffc691.js")

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
        createUpdateButtonToGalaxyView()
        getSystemInformation()
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
