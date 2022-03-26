import { createPlanetSearchContainer } from './components/ColonySearch';
import { setupEspionageUpdate } from './components/EspionageUpdater';
import { createUpdateButtonToGalaxyView, getSystemInformation } from './components/GalaxyUpdater';
import './style/main.less';
import { addGlobalStyle, isPage, setupTriggers } from './utils';
import { setupPlayerCardUpdate } from './components/PlayercardUpdater';
import { parseFleetsFromOverview } from './components/FleetParser';

(function () {
    'use strict';

    setupTriggers()

    // general functions
    if (!isPage("playerCard"))
        createPlanetSearchContainer()

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
