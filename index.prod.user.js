// ==UserScript==
// @name        Spy-Lard
// @namespace   https://kejith.de/
// @version     0.10.0
// @author      kejith <antifren@reborn.com>
// @source      https://github.com/kejith/spylard-development
// @match       https://*.pr0game.com/*
// @require     https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js
// @require     https://cdn.jsdelivr.net/npm/toastify-js
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM.xmlHttpRequest
// @grant       GM_info
// @icon64      https://kejith.de/images/spylard.png
// @run-at      document-end
// ==/UserScript==


/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/***/ ((module) => {

"use strict";

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/

module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "./node_modules/toastify-js/src/toastify.js":
/***/ (function(module) {

/*!
 * Toastify js 1.11.2
 * https://github.com/apvarun/toastify-js
 * @license MIT licensed
 *
 * Copyright (C) 2018 Varun A P
 */
(function (root, factory) {
  if ( true && module.exports) {
    module.exports = factory();
  } else {
    root.Toastify = factory();
  }
})(this, function (global) {
  // Object initialization
  var Toastify = function (options) {
    // Returning a new init object
    return new Toastify.lib.init(options);
  },
      // Library version
  version = "1.11.2"; // Set the default global options


  Toastify.defaults = {
    oldestFirst: true,
    text: "Toastify is awesome!",
    node: undefined,
    duration: 3000,
    selector: undefined,
    callback: function () {},
    destination: undefined,
    newWindow: false,
    close: false,
    gravity: "toastify-top",
    positionLeft: false,
    position: '',
    backgroundColor: '',
    avatar: "",
    className: "",
    stopOnFocus: true,
    onClick: function () {},
    offset: {
      x: 0,
      y: 0
    },
    escapeMarkup: true,
    style: {
      background: ''
    }
  }; // Defining the prototype of the object

  Toastify.lib = Toastify.prototype = {
    toastify: version,
    constructor: Toastify,
    // Initializing the object with required parameters
    init: function (options) {
      // Verifying and validating the input object
      if (!options) {
        options = {};
      } // Creating the options object


      this.options = {};
      this.toastElement = null; // Validating the options

      this.options.text = options.text || Toastify.defaults.text; // Display message

      this.options.node = options.node || Toastify.defaults.node; // Display content as node

      this.options.duration = options.duration === 0 ? 0 : options.duration || Toastify.defaults.duration; // Display duration

      this.options.selector = options.selector || Toastify.defaults.selector; // Parent selector

      this.options.callback = options.callback || Toastify.defaults.callback; // Callback after display

      this.options.destination = options.destination || Toastify.defaults.destination; // On-click destination

      this.options.newWindow = options.newWindow || Toastify.defaults.newWindow; // Open destination in new window

      this.options.close = options.close || Toastify.defaults.close; // Show toast close icon

      this.options.gravity = options.gravity === "bottom" ? "toastify-bottom" : Toastify.defaults.gravity; // toast position - top or bottom

      this.options.positionLeft = options.positionLeft || Toastify.defaults.positionLeft; // toast position - left or right

      this.options.position = options.position || Toastify.defaults.position; // toast position - left or right

      this.options.backgroundColor = options.backgroundColor || Toastify.defaults.backgroundColor; // toast background color

      this.options.avatar = options.avatar || Toastify.defaults.avatar; // img element src - url or a path

      this.options.className = options.className || Toastify.defaults.className; // additional class names for the toast

      this.options.stopOnFocus = options.stopOnFocus === undefined ? Toastify.defaults.stopOnFocus : options.stopOnFocus; // stop timeout on focus

      this.options.onClick = options.onClick || Toastify.defaults.onClick; // Callback after click

      this.options.offset = options.offset || Toastify.defaults.offset; // toast offset

      this.options.escapeMarkup = options.escapeMarkup !== undefined ? options.escapeMarkup : Toastify.defaults.escapeMarkup;
      this.options.style = options.style || Toastify.defaults.style;

      if (options.backgroundColor) {
        this.options.style.background = options.backgroundColor;
      } // Returning the current object for chaining functions


      return this;
    },
    // Building the DOM element
    buildToast: function () {
      // Validating if the options are defined
      if (!this.options) {
        throw "Toastify is not initialized";
      } // Creating the DOM object


      var divElement = document.createElement("div");
      divElement.className = "toastify on " + this.options.className; // Positioning toast to left or right or center

      if (!!this.options.position) {
        divElement.className += " toastify-" + this.options.position;
      } else {
        // To be depreciated in further versions
        if (this.options.positionLeft === true) {
          divElement.className += " toastify-left";
          console.warn('Property `positionLeft` will be depreciated in further versions. Please use `position` instead.');
        } else {
          // Default position
          divElement.className += " toastify-right";
        }
      } // Assigning gravity of element


      divElement.className += " " + this.options.gravity;

      if (this.options.backgroundColor) {
        // This is being deprecated in favor of using the style HTML DOM property
        console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');
      } // Loop through our style object and apply styles to divElement


      for (var property in this.options.style) {
        divElement.style[property] = this.options.style[property];
      } // Adding the toast message/node


      if (this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) {
        // If we have a valid node, we insert it
        divElement.appendChild(this.options.node);
      } else {
        if (this.options.escapeMarkup) {
          divElement.innerText = this.options.text;
        } else {
          divElement.innerHTML = this.options.text;
        }

        if (this.options.avatar !== "") {
          var avatarElement = document.createElement("img");
          avatarElement.src = this.options.avatar;
          avatarElement.className = "toastify-avatar";

          if (this.options.position == "left" || this.options.positionLeft === true) {
            // Adding close icon on the left of content
            divElement.appendChild(avatarElement);
          } else {
            // Adding close icon on the right of content
            divElement.insertAdjacentElement("afterbegin", avatarElement);
          }
        }
      } // Adding a close icon to the toast


      if (this.options.close === true) {
        // Create a span for close element
        var closeElement = document.createElement("span");
        closeElement.innerHTML = "&#10006;";
        closeElement.className = "toast-close"; // Triggering the removal of toast from DOM on close click

        closeElement.addEventListener("click", function (event) {
          event.stopPropagation();
          this.removeElement(this.toastElement);
          window.clearTimeout(this.toastElement.timeOutValue);
        }.bind(this)); //Calculating screen width

        var width = window.innerWidth > 0 ? window.innerWidth : screen.width; // Adding the close icon to the toast element
        // Display on the right if screen width is less than or equal to 360px

        if ((this.options.position == "left" || this.options.positionLeft === true) && width > 360) {
          // Adding close icon on the left of content
          divElement.insertAdjacentElement("afterbegin", closeElement);
        } else {
          // Adding close icon on the right of content
          divElement.appendChild(closeElement);
        }
      } // Clear timeout while toast is focused


      if (this.options.stopOnFocus && this.options.duration > 0) {
        var self = this; // stop countdown

        divElement.addEventListener("mouseover", function (event) {
          window.clearTimeout(divElement.timeOutValue);
        }); // add back the timeout

        divElement.addEventListener("mouseleave", function () {
          divElement.timeOutValue = window.setTimeout(function () {
            // Remove the toast from DOM
            self.removeElement(divElement);
          }, self.options.duration);
        });
      } // Adding an on-click destination path


      if (typeof this.options.destination !== "undefined") {
        divElement.addEventListener("click", function (event) {
          event.stopPropagation();

          if (this.options.newWindow === true) {
            window.open(this.options.destination, "_blank");
          } else {
            window.location = this.options.destination;
          }
        }.bind(this));
      }

      if (typeof this.options.onClick === "function" && typeof this.options.destination === "undefined") {
        divElement.addEventListener("click", function (event) {
          event.stopPropagation();
          this.options.onClick();
        }.bind(this));
      } // Adding offset


      if (typeof this.options.offset === "object") {
        var x = getAxisOffsetAValue("x", this.options);
        var y = getAxisOffsetAValue("y", this.options);
        var xOffset = this.options.position == "left" ? x : "-" + x;
        var yOffset = this.options.gravity == "toastify-top" ? y : "-" + y;
        divElement.style.transform = "translate(" + xOffset + "," + yOffset + ")";
      } // Returning the generated element


      return divElement;
    },
    // Displaying the toast
    showToast: function () {
      // Creating the DOM object for the toast
      this.toastElement = this.buildToast(); // Getting the root element to with the toast needs to be added

      var rootElement;

      if (typeof this.options.selector === "string") {
        rootElement = document.getElementById(this.options.selector);
      } else if (this.options.selector instanceof HTMLElement || typeof ShadowRoot !== 'undefined' && this.options.selector instanceof ShadowRoot) {
        rootElement = this.options.selector;
      } else {
        rootElement = document.body;
      } // Validating if root element is present in DOM


      if (!rootElement) {
        throw "Root element is not defined";
      } // Adding the DOM element


      var elementToInsert = Toastify.defaults.oldestFirst ? rootElement.firstChild : rootElement.lastChild;
      rootElement.insertBefore(this.toastElement, elementToInsert); // Repositioning the toasts in case multiple toasts are present

      Toastify.reposition();

      if (this.options.duration > 0) {
        this.toastElement.timeOutValue = window.setTimeout(function () {
          // Remove the toast from DOM
          this.removeElement(this.toastElement);
        }.bind(this), this.options.duration); // Binding `this` for function invocation
      } // Supporting function chaining


      return this;
    },
    hideToast: function () {
      if (this.toastElement.timeOutValue) {
        clearTimeout(this.toastElement.timeOutValue);
      }

      this.removeElement(this.toastElement);
    },
    // Removing the element from the DOM
    removeElement: function (toastElement) {
      // Hiding the element
      // toastElement.classList.remove("on");
      toastElement.className = toastElement.className.replace(" on", ""); // Removing the element from DOM after transition end

      window.setTimeout(function () {
        // remove options node if any
        if (this.options.node && this.options.node.parentNode) {
          this.options.node.parentNode.removeChild(this.options.node);
        } // Remove the element from the DOM, only when the parent node was not removed before.


        if (toastElement.parentNode) {
          toastElement.parentNode.removeChild(toastElement);
        } // Calling the callback function


        this.options.callback.call(toastElement); // Repositioning the toasts again

        Toastify.reposition();
      }.bind(this), 400); // Binding `this` for function invocation
    }
  }; // Positioning the toasts on the DOM

  Toastify.reposition = function () {
    // Top margins with gravity
    var topLeftOffsetSize = {
      top: 15,
      bottom: 15
    };
    var topRightOffsetSize = {
      top: 15,
      bottom: 15
    };
    var offsetSize = {
      top: 15,
      bottom: 15
    }; // Get all toast messages on the DOM

    var allToasts = document.getElementsByClassName("toastify");
    var classUsed; // Modifying the position of each toast element

    for (var i = 0; i < allToasts.length; i++) {
      // Getting the applied gravity
      if (containsClass(allToasts[i], "toastify-top") === true) {
        classUsed = "toastify-top";
      } else {
        classUsed = "toastify-bottom";
      }

      var height = allToasts[i].offsetHeight;
      classUsed = classUsed.substr(9, classUsed.length - 1); // Spacing between toasts

      var offset = 15;
      var width = window.innerWidth > 0 ? window.innerWidth : screen.width; // Show toast in center if screen with less than or equal to 360px

      if (width <= 360) {
        // Setting the position
        allToasts[i].style[classUsed] = offsetSize[classUsed] + "px";
        offsetSize[classUsed] += height + offset;
      } else {
        if (containsClass(allToasts[i], "toastify-left") === true) {
          // Setting the position
          allToasts[i].style[classUsed] = topLeftOffsetSize[classUsed] + "px";
          topLeftOffsetSize[classUsed] += height + offset;
        } else {
          // Setting the position
          allToasts[i].style[classUsed] = topRightOffsetSize[classUsed] + "px";
          topRightOffsetSize[classUsed] += height + offset;
        }
      }
    } // Supporting function chaining


    return this;
  }; // Helper function to get offset.


  function getAxisOffsetAValue(axis, options) {
    if (options.offset[axis]) {
      if (isNaN(options.offset[axis])) {
        return options.offset[axis];
      } else {
        return options.offset[axis] + 'px';
      }
    }

    return '0px';
  }

  function containsClass(elem, yourClass) {
    if (!elem || typeof yourClass !== "string") {
      return false;
    } else if (elem.className && elem.className.trim().split(/\s+/gi).indexOf(yourClass) > -1) {
      return true;
    } else {
      return false;
    }
  } // Setting up the prototype for the init object


  Toastify.lib.init.prototype = Toastify.lib; // Returning the Toastify function to be assigned to the window object/module

  return Toastify;
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/style/main.less":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".flexparent {\n  display: flex;\n  flex-wrap: wrap;\n}\n.flexparent > div {\n  border: 1px solid #000;\n  background: rgba(13, 16, 20, 0.95);\n  text-align: center;\n  vertical-align: middle;\n  flex: 1;\n}\n.tablehead {\n  background-image: url(\"https://pr0game.com/styles/theme/nova/img/bkd_title.png\");\n  font-weight: 700;\n  border: 1px solid #000;\n  height: 22px;\n  margin: 2px;\n  padding: 4px 6px 4px 6px;\n}\n.colony-data {\n  font-size: 11px;\n  min-width: 90px;\n  padding: 2px 3px;\n  font-weight: 400;\n  margin: 0 2px 2px 0;\n  font-size: 12px;\n}\n.colony-data .element {\n  font-size: 11px;\n}\n*,\n::after,\n::before {\n  box-sizing: border-box;\n}\n.collapse {\n  display: block;\n  max-height: 0px;\n  overflow: hidden;\n  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);\n}\ntr.collapse {\n  display: table-row !important;\n}\n.collapse.show {\n  max-height: 99em;\n  transition: max-height 0.5s ease-in-out;\n}\ntable.fixed {\n  table-layout: fixed;\n}\ntable.fixed td {\n  overflow: hidden;\n}\n.colony-search-container {\n  grid-area: 2 / 1 / auto / auto;\n  width: 20vw;\n}\n#colony-search-collapse-wrapper {\n  overflow: AUTO !important;\n}\n[data-toggle=\"collapse\"] {\n  cursor: pointer;\n}\n[data-toggle=\"collapse\"]:hover {\n  text-decoration: underline;\n}\n.planet-summary .icon {\n  height: 20px;\n}\n.planet-category {\n  width: 30%;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/toastify-js/src/toastify.js
var toastify = __webpack_require__("./node_modules/toastify-js/src/toastify.js");
var toastify_default = /*#__PURE__*/__webpack_require__.n(toastify);
;// CONCATENATED MODULE: ./src/const.js
const Keys = {
  fleet: {
    de: {
      name: "Flotte"
    },
    smallCargo: {
      de: {
        abbr: "KT",
        name: "Kleiner Transporter"
      }
    },
    largeCargo: {
      de: {
        abbr: "GT",
        name: "Großer Transporter"
      }
    },
    lightFighter: {
      de: {
        abbr: "LJ",
        name: "Leichter Jäger"
      }
    },
    heavyFighter: {
      de: {
        abbr: "SJ",
        name: ""
      }
    },
    cruiser: {
      de: {
        abbr: "Xer",
        name: "Kreuzer"
      }
    },
    battleship: {
      de: {
        abbr: "SS",
        name: "Schlachtschiff"
      }
    },
    colonyShio: {
      de: {
        abbr: "Kolo.Schiff",
        name: "Kolonieschiff"
      }
    },
    recycler: {
      de: {
        abbr: "Rec",
        name: "Recycler"
      }
    },
    espionageProbe: {
      de: {
        abbr: "Spio",
        name: "Spionagesonde"
      }
    },
    bomber: {
      de: {
        abbr: "Bomber",
        name: "Bomber"
      }
    },
    satellites: {
      de: {
        abbr: "Sat",
        name: "Solarsatellit"
      }
    },
    destroyer: {
      de: {
        abbr: "Zerri",
        name: "Zerstörer"
      }
    },
    deathstar: {
      de: {
        abbr: "RIP",
        name: "Todesstern"
      }
    },
    battlecruiser: {
      de: {
        abbr: "SXer",
        name: "Schlachtkreuzer"
      }
    }
  },
  defense: {
    de: {
      name: "Verteidigung"
    },
    rocketLauncher: {
      de: {
        abbr: "RL",
        name: "Raketenwerfer"
      }
    },
    lightLaser: {
      de: {
        abbr: "LL",
        name: "Leichte Laser"
      }
    },
    heavyLaser: {
      de: {
        abbr: "SL",
        name: "Schwere Laser"
      }
    },
    gaussCanon: {
      de: {
        abbr: "Gauß",
        name: "Gaußkanone"
      }
    },
    ionCanon: {
      de: {
        abbr: "Ion",
        name: "Ionengeschütz"
      }
    },
    plasmaCanon: {
      de: {
        abbr: "Plasma",
        name: "Plasmawerfer"
      }
    },
    smallShield: {
      de: {
        abbr: "KS",
        name: "Kleine Schildkuppel"
      }
    },
    largeShield: {
      de: {
        abbr: "GS",
        name: "Große Schildkuppel"
      }
    },
    antiBalisticMissile: {
      de: {
        abbr: "ARak",
        name: "Abfangrakete"
      }
    },
    interplanetaryMissil: {
      de: {
        abbr: "IPRak",
        name: "Interplanetarrakete"
      }
    }
  },
  techs: {
    de: {
      name: "Forschung"
    },
    espionage: {
      de: {
        abbr: "Spio",
        name: "Spionagetechnik"
      }
    },
    computer: {
      de: {
        abbr: "Comp",
        name: "Computertechnik"
      }
    },
    weapons: {
      de: {
        abbr: "Waffen",
        name: "Waffentechnik"
      }
    },
    shield: {
      de: {
        abbr: "Schild",
        name: "Schildtechnik"
      }
    },
    armour: {
      de: {
        abbr: "Panzerung",
        name: "Raumschiffpanzerung"
      }
    },
    energy: {
      de: {
        abbr: "Energie",
        name: "Energietechnologie"
      }
    },
    hyperspace: {
      de: {
        abbr: "Hypertech",
        name: "Hyperraumtechnik"
      }
    },
    combustionDrive: {
      de: {
        abbr: "Verbrenner",
        name: "Verbrennungstriebwerk"
      }
    },
    impulseDrive: {
      de: {
        abbr: "Impuls",
        name: "Impulstriebwerk"
      }
    },
    hyperspaceDrive: {
      de: {
        abbr: "Hyper Antrieb",
        name: "Hyperraumantrieb"
      }
    },
    laserTech: {
      de: {
        abbr: "Laser",
        name: "Lasertechnik"
      }
    },
    ion: {
      de: {
        abbr: "Ion",
        name: "Ionentechnik"
      }
    },
    plasma: {
      de: {
        abbr: "Plasma",
        name: "Plasmatechnik"
      }
    },
    igfn: {
      de: {
        abbr: "IGFN",
        name: "Intergalaktisches Forschnungsnetzwerk"
      }
    },
    astropyhsics: {
      de: {
        abbr: "Astro",
        name: "Astrophysik"
      }
    },
    productionMaxMetall: {
      de: {
        abbr: "PM Met",
        name: "Produktionsmaximierer Metall"
      }
    },
    productionMaxCrystal: {
      de: {
        abbr: "PM Kris",
        name: "Produktionsmaximierer Metall"
      }
    },
    productionMaxDeuterium: {
      de: {
        abbr: "PM Deut",
        name: "Produktionsmaximierer Metall"
      }
    },
    graviton: {
      de: {
        abbr: "Graviton",
        name: "Gravitonforschung"
      }
    }
  },
  structures: {
    de: {
      name: "Gebäude"
    },
    metalMine: {
      de: {
        abbr: "Met",
        name: "Metallmine"
      }
    },
    crystalMine: {
      de: {
        abbr: "Kris",
        name: "Kristallmine"
      }
    },
    deuteriumSynthesizer: {
      de: {
        abbr: "Deut",
        name: "Deuterium Sythetisierer"
      }
    },
    solarPlant: {
      de: {
        abbr: "SKW",
        name: "Solarkraftwerk"
      }
    },
    fusionPlant: {
      de: {
        abbr: "Fusion",
        name: "Fusionskraftwerk"
      }
    },
    roboticsFactory: {
      de: {
        abbr: "Robo",
        name: "Roboterfabrik"
      }
    },
    naniteFactory: {
      de: {
        abbr: "Nani",
        name: "Nanitenfabrik"
      }
    },
    shipyard: {
      de: {
        abbr: "Wert",
        name: "Raumschiffswerft"
      }
    },
    metalStorge: {
      de: {
        abbr: "Met Lager",
        name: "Metall Lager"
      }
    },
    crystalStorage: {
      de: {
        abbr: "Kris Lager",
        name: "Kristall Lager"
      }
    },
    deteriumTank: {
      de: {
        abbr: "Deut Tank",
        name: "Deuteriumtank"
      }
    },
    researchLab: {
      de: {
        abbr: "Lab",
        name: "Forschungslabor"
      }
    },
    terraformer: {
      de: {
        abbr: "Terra",
        name: "Terraformer"
      }
    },
    allianceDepot: {
      de: {
        abbr: "Depot",
        name: "Allianzdepot"
      }
    },
    sensorPhalanx: {
      de: {
        abbr: "Phalanx",
        name: "Sensorphalanx"
      }
    },
    jumpGate: {
      de: {
        abbr: "Sprung",
        name: "Sprungtor"
      }
    },
    missileSilo: {
      de: {
        abbr: "Silo",
        name: "Raketensilo"
      }
    }
  },
  ressources: {
    de: {
      abbr: "Res",
      name: "Ressourcen"
    },
    metal: {
      de: {
        abbr: "Met",
        name: "Metall"
      }
    },
    crystal: {
      de: {
        abbr: "Kris",
        name: "Kristall"
      }
    },
    deut: {
      de: {
        abbr: "Deut",
        name: "Deuterium"
      }
    }
  }
};
const Data = {
  fleet: {
    smallCargo: {
      metal: 2000,
      crystal: 2000,
      deuterium: 0,
      factor: 1.0
    },
    largeCargo: {
      metal: 6000,
      crystal: 6000,
      deuterium: 0,
      factor: 1.0
    },
    lightFighter: {
      metal: 3000,
      crystal: 1000,
      deuterium: 0,
      factor: 1.0
    },
    heavyFighter: {
      metal: 6000,
      crystal: 4000,
      deuterium: 0,
      factor: 1.0
    },
    cruiser: {
      metal: 20000,
      crystal: 7000,
      deuterium: 2000,
      factor: 1.0
    },
    battleship: {
      metal: 45000,
      crystal: 15000,
      deuterium: 0,
      factor: 1.0
    },
    colonyShio: {
      metal: 10000,
      crystal: 20000,
      deuterium: 10000,
      factor: 1.0
    },
    recycler: {
      metal: 10000,
      crystal: 6000,
      deuterium: 2000,
      factor: 1.0
    },
    espionageProbe: {
      metal: 0,
      crystal: 1000,
      deuterium: 0,
      factor: 1.0
    },
    bomber: {
      metal: 50000,
      crystal: 25000,
      deuterium: 10000,
      factor: 1.0
    },
    satellites: {
      metal: 0,
      crystal: 2000,
      deuterium: 500,
      factor: 1.0
    },
    destroyer: {
      metal: 60000,
      crystal: 50000,
      deuterium: 15000,
      factor: 1.0
    },
    deathstar: {
      metal: 5000000,
      crystal: 4000000,
      deuterium: 1000000,
      factor: 1.0
    },
    battlecruiser: {
      metal: 30000,
      crystal: 40000,
      deuterium: 15000,
      factor: 1.0
    }
  },
  defense: {
    // defensive
    rocketLauncher: {
      metal: 2000,
      crystal: 0,
      deuterium: 0,
      factor: 1.0
    },
    lightLaser: {
      metal: 1500,
      crystal: 500,
      deuterium: 0,
      factor: 1.0
    },
    heavyLaser: {
      metal: 6000,
      crystal: 2000,
      deuterium: 0,
      factor: 1.0
    },
    gaussCanon: {
      metal: 20000,
      crystal: 15000,
      deuterium: 2000,
      factor: 1.0
    },
    ionCanon: {
      metal: 2000,
      crystal: 6000,
      deuterium: 0,
      factor: 1.0
    },
    plasmaCanon: {
      metal: 50000,
      crystal: 50000,
      deuterium: 30000,
      factor: 1.0
    },
    smallShield: {
      metal: 10000,
      crystal: 10000,
      deuterium: 0,
      factor: 1.0
    },
    largeShield: {
      metal: 50000,
      crystal: 50000,
      deuterium: 0,
      factor: 1.0
    },
    antiBalisticMissile: {
      metal: 8000,
      crystal: 0,
      deuterium: 2000,
      factor: 1.0
    },
    interplanetaryMissile: {
      metal: 12500,
      crystal: 2500,
      deuterium: 10000,
      factor: 1.0
    }
  },
  structures: {
    metalMine: {
      metal: 60,
      crystal: 15,
      deuterium: 0,
      factor: 1.5
    },
    crystalMine: {
      metal: 48,
      crystal: 24,
      deuterium: 0,
      factor: 1.6
    },
    deuteriumSynthesizer: {
      metal: 225,
      crystal: 75,
      deuterium: 0,
      factor: 1.5
    },
    solarPlant: {
      metal: 75,
      crystal: 30,
      deuterium: 0,
      factor: 1.5
    },
    fusionPlant: {
      metal: 900,
      crystal: 360,
      deuterium: 180,
      factor: 1.8
    },
    roboticsFactory: {
      metal: 400,
      crystal: 120,
      deuterium: 200,
      factor: 2.0
    },
    naniteFactory: {
      metal: 1000000,
      crystal: 500000,
      deuterium: 100000,
      factor: 2.0
    },
    shipyard: {
      metal: 400,
      crystal: 200,
      deuterium: 100,
      factor: 2.0
    },
    metalStorge: {
      metal: 2000,
      crystal: 0,
      deuterium: 0,
      factor: 2.0
    },
    crystalStorage: {
      metal: 2000,
      crystal: 1000,
      deuterium: 0,
      factor: 2.0
    },
    deteriumTank: {
      metal: 2000,
      crystal: 2000,
      deuterium: 0,
      factor: 2.0
    },
    researchLab: {
      metal: 200,
      crystal: 400,
      deuterium: 200,
      factor: 2.0
    },
    terraformer: {
      metal: 0,
      crystal: 50000,
      deuterium: 100000,
      factor: 2.0
    },
    allianceDepot: {
      metal: 20000,
      crystal: 40000,
      deuterium: 0,
      factor: 2.0
    },
    sensorPhalanx: {
      metal: 20000,
      crystal: 40000,
      deuterium: 20000,
      factor: 2.0
    },
    jumpGate: {
      metal: 2000000,
      crystal: 4000000,
      deuterium: 2000000,
      factor: 2.0
    },
    missileSilo: {
      metal: 20000,
      crystal: 20000,
      deuterium: 1000,
      factor: 2.0
    }
  }
};
;// CONCATENATED MODULE: ./src/models/Models.js
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class Component {
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    let categoriesNeeded = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    this.data = {};

    if (data === null) {
      return;
    }

    if (data.espionages) {
      this.espionages = [];
      data.espionages.forEach(espionageData => {
        this.espionages.push(new Espionage(espionageData));
      });
    }

    if (categoriesNeeded !== null) this.setPlanetCategories(categoriesNeeded, data);
  }

  setPlanetCategories(categories, data) {
    categories.forEach(category => {
      this.data[category] = {};
      const keys = Object.keys(Keys[category]);
      keys.forEach(key => {
        if (data[key]) {
          this.data[category][key] = data[key];
        }
      });
    });
  }

  getData() {
    return this.data;
  }

}

class Espionage extends Component {
  constructor(data) {
    const categoriesNeeded = ["ressources", "fleet", "defense", "structures"];
    super(data, categoriesNeeded);
    this.coords = {
      galaxy: data.galaxy,
      system: data.system,
      position: data.position
    };
  }

}
class Planet extends Component {
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    super(data, ["ressources", "fleet", "defense", "structures"]);

    _defineProperty(this, "espionages", void 0);

    if (data === null) return;
    this.espionages = [];
    this.coords = {
      galaxy: data.galaxy,
      system: data.system,
      position: data.position
    };
    this.name = data.name;
  }

  addEspionage(espionage) {
    this.espionages.push(espionage);
    return this;
  }

  getFleet() {
    var fleet = new Fleet();
    fleet.setData(this.data.fleet);
    return fleet;
  }

  getDefense() {
    var defense = new Defense();
    defense.setData(this.data.defense);
    return defense;
  }

  getStructures() {
    var structures = new Structures();
    structures.setData(this.data.structures);
    return structures;
  }

}
class UnitCollection {
  constructor() {
    this.data = {};
    this.category = "";
  }

  setData(data) {
    this.data = data;
  }

  value() {
    var amount = 0;
    Object.keys(this.data).forEach(element => {
      const {
        metal,
        crystal,
        deuterium
      } = Data[this.category][element];
      amount += (metal + crystal + deuterium) * this.getUnitAmount(element);
    });
    return amount;
  }

  getUnitAmount(unit) {
    if (!this.data[unit]) return 0;
    return this.data[unit];
  }

}
class Fleet extends UnitCollection {
  constructor() {
    super();
    this.category = "fleet";
  }

}
class Defense extends UnitCollection {
  constructor() {
    super();
    this.category = "defense";
  }

}
class Structures extends UnitCollection {
  constructor() {
    super();
    this.category = "structures";
  }

  value() {
    var amount = 0;
    Object.keys(this.data).forEach(structure => {
      var level = this.data[structure];
      var factor = Data[this.category][structure].factor;
      var structureAmount = 0;

      for (let i = 0; i < level; i++) {
        var metal = Math.floor(Data[this.category][structure].metal * factor ** i);
        var crystal = Math.floor(Data[this.category][structure].crystal * factor ** i);
        var deuterium = Math.floor(Data[this.category][structure].deuterium * factor ** i);
        structureAmount = metal + crystal + deuterium;
      }

      amount += structureAmount;
    });
    return Math.floor(amount);
  }

}
class User extends Component {
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    super(data, ["techs"]);

    _defineProperty(this, "planets", void 0);

    this.planets = [];

    if (data !== null) {
      this.name = data.name;
      this.id = data.id;
      this.alliance = data.alliance;
    } else {
      this.name = "";
      this.id = -1;
      this.alliance = {
        id: -1,
        name: "Dummy"
      };
    }
  }

  addPlanet(planet) {
    this.planets.push(planet);
  }

}
class Alliance extends Component {
  constructor() {
    let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    super(data, null);

    _defineProperty(this, "members", void 0);

    this.members = [];
    this.name = data.name;
    this.id = data.id;
    return this;
  }

  addMember(user) {
    this.members.push(user);
  }

}
class AllianceReader {
  static fromData(data) {
    let galaxy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var alliances = [];

    if (Array.isArray(data)) {
      // alliance loop
      data.forEach(allianceData => {
        var alliance = new Alliance(allianceData);
        var users = UserReader.fromData(allianceData.users, galaxy);
        users.forEach(user => {
          alliance.addMember(user);
        });
        alliances.push(alliance);
      });
    }

    return alliances;
  }

}
class UserReader {
  static fromData(data) {
    let galaxy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (Array.isArray(data)) {
      var users = [];
      data.forEach(userData => {
        var user = new User(userData);

        if (Array.isArray(userData.planets)) {
          userData.planets.forEach(planetData => {
            var planet = new Planet(planetData);
            console.log({
              galaxy,
              planetGalaxy: planet.coords.galaxy
            });

            if (galaxy == 0 || galaxy == planet.coords.galaxy) {
              if (planetData.espionages && Array.isArray(planetData.espionages)) {
                // espionage loop
                planetData.espionages.forEach(espionageData => {
                  var espionage = new Espionage(espionageData);
                  planet.addEspionage(espionage);
                });
              }

              user.addPlanet(planet);
            }
          });
        }

        users.push(user);
      });
    }

    return users;
  }

}
;// CONCATENATED MODULE: ./src/config.js
const config_baseurl = "https://kejith.de";
;// CONCATENATED MODULE: ./src/requests.js

function onFailedRequest(jqxhr, textStatus, errorThrown) {
  console.error({
    jqxhr,
    textStatus,
    errorThrown
  });
}
function onDoneRequest(data, textStatus, jqxhr) {
  console.debug({
    data,
    textStatus,
    jqxhr
  });
}
const Requests = {
  getMoons,
  checkVersion
};
const defaultFns = {
  done: onDoneRequest,
  fail: onFailedRequest,
  always: () => {}
};
async function checkVersion(fns) {
  fns = { ...defaultFns,
    ...fns
  };
  var key = GM_getValue("spylard-api-key", "");
  var user = GM_getValue("spylard-user", "");
  await $.get(`${config_baseurl}/check?&apiKey=${key}&user=${user}`, fns.done).fail(fns.fail).always(fns.always);
}
function getColoniesByAlliance(alliance, fns) {
  fns = { ...defaultFns,
    ...fns
  };
  var key = GM_getValue("spylard-api-key", "");
  $.get(`${config_baseurl}/alliance/?tag=${alliance}&apiKey=${key}`, fns.done).fail(fns.fail).always(fns.always);
}
function getColoniesByUser(user, fns) {
  fns = { ...defaultFns,
    ...fns
  };
  var key = GM_getValue("spylard-api-key", "");
  var users = $.get(`${config_baseurl}/galaxy/system/planets?user=${user}&apiKey=${key}`, fns.done).fail(fns.fail).always(fns.always);
}
function getMoons(galaxy, fns) {
  fns = { ...defaultFns,
    ...fns
  };
  var key = GM_getValue("spylard-api-key", "");
  var galaxyQuery = galaxy ? `&galaxy=${galaxy}` : ``;
  var users = $.get(`${config_baseurl}/galaxy/moons?apiKey=${key}${galaxyQuery}`, fns.done).fail(fns.fail).always(fns.always);
}
function requests_loadEspionageInformation(ids, fns) {
  fns = { ...defaultFns,
    ...fns
  };
  var key = GM_getValue("spylard-api-key", "");
  $.ajax({
    url: `${baseurl}/espionage/check?&apiKey=${key}`,
    data: JSON.stringify(ids),
    type: 'POST',
    contentType: 'application/json',
    success: fns.done,
    error: fns.fail
  });
}
;// CONCATENATED MODULE: ./src/utils.js
/**
 * Adds a css string to the global styles 
 * @param  {strings} css
 */
function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];

  if (!head) {
    return;
  }

  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css.replace(/;/g, ' !important;');
  head.appendChild(style);
}
/**
 * Generates an Array of Parameters found in the given URL
 * @date 2022-03-25
 * @param {string} url
 * @returns {any}
 */

function getQueryStringParameters(url) {
  var urlParams = {},
      match,
      additional = /\+/g,
      // Regex for replacing additional symbol with a space
  search = /([^&=]+)=?([^&]*)/g,
      decode = function (s) {
    return decodeURIComponent(s.replace(additional, " "));
  },
      query;

  if (url) {
    if (url.split("?").length > 0) {
      query = url.split("?")[1];
    }
  } else {
    url = window.location.href;
    query = window.location.search.substring(1);
  }

  while (match = search.exec(query)) {
    urlParams[decode(match[1])] = decode(match[2]);
  }

  return urlParams;
}
/**
 * Find a specific GET-Parameter in the current Location
 * @date 2022-03-25
 * @param {string} parameterName
 * @returns {string}
 */

function findGetParameter(parameterName) {
  var result = null,
      tmp = [];
  location.search.substr(1).split("&").forEach(function (item) {
    tmp = item.split("=");
    if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  });
  return result;
}
/**
 * Checks if the current location has a specific page query parameter
 * @date 2022-03-25
 * @param {string} pageQuery
 * @returns {boolean}
 */

function isPage(pageQuery) {
  return findGetParameter("page") == pageQuery;
}
/**
 * Map for Math.floor()
 * @date 2022-03-25
 * @param {number} value
 * @returns {number}
 */

function floor(value) {
  return Math.floor(value);
}
/**
 * Get Human readable time duration string
 * @date 2022-03-25
 * @param {number} diff - Timestamp
 * @returns {string}
 */

const unitmapping = {
  "days": 24 * 60 * 60 * 1000,
  "hours": 60 * 60 * 1000,
  "minutes": 60 * 1000,
  "seconds": 1000
};
function getHumanizedDiff(diff) {
  return (floor(diff / unitmapping.days) > 0 ? floor(diff / unitmapping.days) + " days " : "") + (floor(diff % unitmapping.days / unitmapping.hours) > 0 ? floor(diff % unitmapping.days / unitmapping.hours) + " hours " : "") + (floor(diff % unitmapping.hours / unitmapping.minutes) > 0 ? floor(diff % unitmapping.hours / unitmapping.minutes) + " minutes " : "") + (floor(diff % unitmapping.minutes / unitmapping.seconds) > 0 ? floor(diff % unitmapping.minutes / unitmapping.seconds) + " seconds " : "");
}
/**
 * Removes Newline and Tab characters from String
 * @date 2022-03-25
 * @param {any} input
 * @returns {any}
 */

function removeNewlinesAndTabs(input) {
  if (typeof input === 'string' || input instanceof String) return input.replace(/[\r\n\t]/g, "");
  return "";
}
function basename(path) {
  if (path == undefined) return "";
  return path.split('/').reverse()[0];
} // map our commands to the classList methods

const fnmap = {
  'toggle': 'toggle',
  'show': 'add',
  'hide': 'remove'
};
const collapse = (selector, cmd) => {
  const targets = Array.from(document.querySelectorAll(selector));
  targets.forEach(target => {
    target.classList[fnmap[cmd]]('show');
  });
};
function setupTriggers() {
  // Listen for click events, but only on our triggers
  window.addEventListener('click', addCollapseEventTrigger, false);
}

function addCollapseEventTrigger(ev) {
  // Grab all the trigger elements on the page
  const triggers = Array.from(document.querySelectorAll('[data-toggle="collapse"]'));
  const elm = ev.target;
  const doesIncludeElement = triggers.includes(elm);

  if (doesIncludeElement) {
    const selector = elm.getAttribute('data-target');
    collapse(selector, 'toggle');
  }
}

function loadExternalJavascript(url) {
  $.ajax({
    type: "GET",
    url: url,
    dataType: "script",
    async: false
  });
}

function versionCompare(v1, v2, options) {
  var lexicographical = options && options.lexicographical,
      zeroExtend = options && options.zeroExtend,
      v1parts = v1.split('.'),
      v2parts = v2.split('.');

  function isValidPart(x) {
    return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
  }

  if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
    return NaN;
  }

  if (zeroExtend) {
    while (v1parts.length < v2parts.length) v1parts.push("0");

    while (v2parts.length < v1parts.length) v2parts.push("0");
  }

  if (!lexicographical) {
    v1parts = v1parts.map(Number);
    v2parts = v2parts.map(Number);
  }

  for (var i = 0; i < v1parts.length; ++i) {
    if (v2parts.length == i) {
      return 1;
    }

    if (v1parts[i] == v2parts[i]) {
      continue;
    } else if (v1parts[i] > v2parts[i]) {
      return 1;
    } else {
      return -1;
    }
  }

  if (v1parts.length != v2parts.length) {
    return -1;
  }

  return 0;
}

function loadCssFiles(urls, successCallback, failureCallback) {
  $.when.apply($, $.map(urls, function (url) {
    return $.get(url, function (css) {
      $("<style>" + css + "</style>").appendTo("head");
    });
  })).then(function () {
    if (typeof successCallback === 'function') successCallback();
  }).fail(function () {
    if (typeof failureCallback === 'function') failureCallback();
  });
}
const utils = {
  loadExternalJavascript,
  loadCssFiles,
  versionCompare
};
;// CONCATENATED MODULE: ./src/components/ColonySearch.js
function ColonySearch_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class Actions {}

ColonySearch_defineProperty(Actions, "GetUsers", "getUsers");

ColonySearch_defineProperty(Actions, "GetAlliances", "getAlliances");

ColonySearch_defineProperty(Actions, "GetMoons", "getMoons");

ColonySearch_defineProperty(Actions, "GetInactives", "getInactives");

class ColonySearch {
  constructor(options) {
    this.appendTo = options.appendTo;
    this.wrapperClasses = options.wrapperClasses;
    this.wrapperId = options.wrapperId;
    this.colonyResultContainer = "#colony-search-results-wrapper";
    this.state = {
      isCollapsed: false,
      apiKey: ""
    };
  }

  setState(state) {
    this.state = { ...this.state,
      ...state
    };
    GM_setValue("colony-search-state", JSON.stringify(this.state));
    this.render();
  }

  render() {
    this.clearResults();

    if (this.state.action == Actions.GetUsers) {
      var users = UserReader.fromData(this.state.data);
      this.outputUsers(users);
    }

    if (this.state.action == Actions.GetAlliances) {
      var alliances = AllianceReader.fromData(this.state.data, this.state.galaxy);
      this.outputAlliance(alliances);
    }

    if (this.state.action == Actions.GetMoons) {
      this.outputMoons(this.state.data);
    }
  }

  loadState() {
    var savedState = GM_getValue("colony-search-state", "{}");

    if (savedState) {
      console.log(savedState);
      this.setState(JSON.parse(savedState));
    }
  }

  init() {
    this.loadState();

    if (isPage("galaxy")) {
      $(`.table569`).find(`tr`).each((index, value) => {
        var username = removeNewlinesAndTabs($(value).find("td").eq(5).text());

        if (username !== '') {
          // remove activity details from username string
          const regExp = /\(([^)]+)\)/;
          var matches = regExp.exec(username);

          if (matches) {
            username = username.replace(matches[0], "");
          }

          $(value).append(
          /*html*/
          `
                        <td>
                            <a href="#" id="search-from-galaxy-${index}" data-value="${username}"  >
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </a>
                        </td>
                    `);
          $(`#search-from-galaxy-${index}`).bind("click", {
            username
          }, event => {
            $("#search-colony-input-user").attr("value", event.data.username);
            $("#player-search").prop("checked", true);
            this.onSubmit();
          });
        }
      });
    }

    console.log(this.state);
    $(this.appendTo).append(
    /*html*/
    `
            
                <div  style="text-align: right">                        
                    <span id="search-colony-main-collapse" data-toggle="collapse" data-target="#colony-search-collapse-wrapper">
                        Spylard-Suche auf-/zuklappen
                    </span>
                </div>
                <div id="colony-search-collapse-wrapper" class="collapse ${!this.state.isCollapsed ? "show" : ""}">
                    <div id="colony-search-wrapper">
                        <form id="search-colonies">

                            <table>
                                <tr><th style="text-align: center">Api Key</th></tr>
                                <tr>
                                    <td><input id="spylard-api-key" type="text" value="${this.state.apiKey}"></td>
                                </tr>
                                <tr>
                                    <td><input id="save-api-key" type="submit" value="Speichern"></td>
                                </tr>
                            </table>
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
                                    <td>
                                        <label for="galaxy-selector">Galaxy</label>
                                        <select name="galaxy-selector" id="galaxy-selector">
                                            <option value="0">Alle</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                        </select>
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
        `);
    $('#search-colonies').on('submit', function (e) {
      e.preventDefault();
    });
    $('#search-colony-main-collapse').bind("click", {}, event => {
      this.onTriggerCollapse();
    });
    $('#save-api-key').bind("click", {}, this.onClickApiKey.bind(this));
    var searchColoniesForm = document.getElementById("search-colonies");
    searchColoniesForm.addEventListener("submit", this.onSubmit.bind(this), true);
    this.render();
  }

  onClickApiKey(event) {
    event.preventDefault();
    var key = $("#spylard-api-key").val();
    console.log(key);
    this.setState({
      apiKey: key
    });
    GM_setValue("spylard-api-key", key);
  }
  /**
   * Clearing the Results List of the ColonySearch
   * @date 2022-03-30
   * @returns {void}
   */


  clearResults() {
    $(this.colonyResultContainer).html("");
  }
  /**
   * Alliance-Request Callback
   * @date 2022-03-30
   * @param {object} data
   * @returns {void}
   */


  onAllianceUpdate(data) {
    var galaxy = $('#galaxy-selector').val();
    data.forEach(alliance => {
      alliance.users.forEach(user => {
        user.alliance = {
          id: alliance.id,
          name: alliance.name
        };
      });
    });
    this.setState({
      data,
      action: Actions.GetAlliances,
      galaxy
    });
  }
  /**
   * Moons Request Callback
   * @date 2022-04-06
   * @param {any} data
   * @returns {void}
   */


  onMoonUpdate(data) {
    this.setState({
      data,
      action: Actions.GetMoons
    });
  }
  /**
   * User-Request Callback
   * @param {object} data 
   */


  onUserUpdate(data) {
    this.setState({
      data,
      action: Actions.GetUsers
    });
  }

  onTriggerCollapse() {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    });
  }
  /**
   * Form submission Callback
   * @param {object} event 
   */


  onSubmit() {
    let event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    event === null || event === void 0 ? void 0 : event.preventDefault();
    var searchInput = $("#search-colony-input-user").val();
    var type = $('input[name="search-type"]:checked').val();
    var galaxy = $('#galaxy-selector').val();
    console.debug({
      searchInput,
      type,
      galaxy
    });

    switch (type) {
      case Actions.GetUsers:
        var users = getColoniesByUser(searchInput, {
          done: this.onUserUpdate.bind(this)
        });
        break;

      case Actions.GetAlliances:
        var alliances = getColoniesByAlliance(searchInput, {
          done: this.onAllianceUpdate.bind(this)
        });
        break;

      case Actions.GetMoons:
        var moons = Requests.getMoons(searchInput, {
          done: this.onMoonUpdate.bind(this)
        });
        break;

      case "inactive":
      default:
        break;
    } // var shouldSearchForAlliance = $("#search-alliance-checkbox").is(":checked")
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
      console.error({
        error: "alliances null should contain array",
        where: "outPutAllianceColonies()"
      });
      return;
    }

    alliances.forEach(alliance => {
      var allianceContainerID = `#search-colonies-alliance-${alliance.id}`;
      $(this.colonyResultContainer).append(`
                <div id="${allianceContainerID.replace('#', '')}"><h3>${alliance.name}</h3></div>
            `);
      this.outputUsers(alliance.members, $(allianceContainerID));
    });
  }
  /**
   * User data will be used to output Results
   * @date 2022-03-30
   * @param {Users[]} users
   * @param {string} bindTo=this.colonyResultContainer
   * @returns {void}
   */


  outputUsers(users) {
    let bindTo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.colonyResultContainer;

    if (users == null && !Array.isArray(users)) {
      console.error({
        error: "users null should contain array",
        function: "=== outputUserColoniesBatch() ==="
      });
      return;
    }

    users.forEach(user => {
      this.outputUser(user, bindTo);
    });
  }
  /**
   * User data will be used to create a table of colonies which is binded to the corresponding
   * user result container or a specified one
   * @date 2022-03-30
   * @param {User} user
   * @param {string} bindTo=this.colonyResultContainer
   * @returns {any}
   */


  outputUser(user) {
    let bindTo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.colonyResultContainer;
    var idTableUserColonies = `colonies-${user.id}`;
    var researchContainerId = `colony-research-${user.id}`;
    var researchTableHtml = CategoryTable.getHtml(researchContainerId, "techs", user.data.techs);
    $(bindTo).append(
    /*html*/
    `
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
                        [${user.alliance !== null ? user.alliance.name : "-"}]
    
                </th>
            </tr>
            <tr>
                <th>Koords</th>
                <th>Planet</th>
            </tr>
        </table>
        `);
    user.planets.forEach(planet => {
      this.outputPlanet(planet, idTableUserColonies);
    });
  }

  outputPlanet(planet, bindTo) {
    var dataContainerId = `colony-data-${planet.coords.galaxy}-${planet.coords.system}-${planet.coords.position}`;
    var fleetContainerId = `colony-fleet-${planet.coords.galaxy}-${planet.coords.system}-${planet.coords.position}`;
    var planetSummary = new PlanetSummary(planet);
    $(`#${bindTo}`).append(
    /*html*/
    `
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
            `);
  }

  outputMoons(data) {
    $(this.colonyResultContainer).append(
    /*html*/
    `<table id="colony-search-results"></table>`);
    data.forEach(moonData => {
      var _moonData$user$allian;

      var planet = new Planet(moonData);
      this.outputMoon(planet, "colony-search-results", (_moonData$user$allian = moonData.user.alliance) === null || _moonData$user$allian === void 0 ? void 0 : _moonData$user$allian.name);
    });
  }

  outputMoon(moon, bindTo, alliance) {
    var dataContainerId = `colony-data-${moon.coords.galaxy}-${moon.coords.system}-${moon.coords.position}`;
    var fleetContainerId = `colony-fleet-${moon.coords.galaxy}-${moon.coords.system}-${moon.coords.position}`;
    var planetSummary = new PlanetSummary(moon);
    $(`#${bindTo}`).append(
    /*html*/
    `
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
            `);
  }
  /**
   * Planet data is used to create a multiple Tables for every category of data a Planet has
   * @date 2022-03-30
   * @param {Planet} planet
   * @returns {string} - HTML String
   */


  getPlanetDataHtml(planet) {
    var data = planet.getData();
    const {
      galaxy,
      system,
      position
    } = planet.coords;
    var dataCategoryHtml = ``;
    Object.keys(data).forEach(category => {
      var containerId = `colony-${category}-${galaxy}-${system}-${position}`;
      dataCategoryHtml += CategoryTable.getHtml(containerId, category, data[category]);
    });
    return (
      /*html*/
      `
            <div>
                ${dataCategoryHtml}
            </div>`
    );
  }

}

class CategoryTable {
  static getHtml(containerId, category, data) {
    var innerHTML = this.getElements(category, data);
    return (
      /*html*/
      `
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
    );
  }

  static getElements(category, data) {
    var elementsHtml = ``;
    Object.keys(data).forEach(element => {
      if (Keys[category][element] !== undefined) {
        elementsHtml +=
        /*html*/
        `
                <div class="cell colony-data colony-${category}">
                    <span class="element element-name">${Keys[category][element].de.abbr}</span><br>
                    <span class="element element-level">${data[element].toLocaleString()}</span>
                </div>           
                `;
      }
    });
    return elementsHtml;
  }

}

class EspionageTable {
  constructor(props) {
    this.props = props;
  }

  getHtml() {
    const {
      espionages
    } = this.props;

    if (Array.isArray(espionages)) {
      var elements = this.getElements();
    }
  }

  getElements() {
    const {
      galaxy,
      system,
      position
    } = espionage.coords;
    var espioangeId = `espionage-full-${galaxy}-${system}-${position}`;
    var html = ``;
    espionages.forEach(epsionage => {
      html +=
      /*html*/
      `
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
            `;
    });
  }

}

class PlanetSummary {
  constructor(planet) {
    if (!planet || !(planet instanceof Planet)) throw new Error(`Given parameter planet is not an instance of class Planet`);
    this.planet = planet;
  }

  getHtml() {
    var values = {
      fleet: this.planet.getFleet().value(),
      defense: this.planet.getDefense().value(),
      structures: this.planet.getStructures().value()
    };
    var total = values.fleet + values.defense + values.structures;
    if (total == 0) return ``;
    return (
      /*html*/
      `
            <table class="planet-summary">
                <tr>
                    <td class="planet-category">
                        <div class="icon"><i class="fa-solid fa-jet-fighter-up"></i></div>
                        <div><b>${values.fleet / 1000}</b></div>
                    </td>
                    <td class="planet-category">
                        <div class="icon"><i class="fa-solid fa-shield"></i></div>
                        <div><b>${values.defense / 1000}</b></div>
                    </td>
                    <td class="planet-category">
                        <div class="icon"><i class="fa-solid fa-industry"></i></div>
                        <div><b>${Math.floor(values.structures / 1000)}</b></div>
                    </td>
                </tr>
            </table>        
        `
    );
  }

}

class PlanetController {
  constructor(planet) {
    if (true) return;
  }

}
;// CONCATENATED MODULE: ./src/components/EspionageUpdater.js



function sendEspionage(data, id) {
  console.debug("=== sendEspionage()");
  console.debug(data);
  var updateBtn = $(`.message_${id} .espionage-update-button`);
  $(updateBtn).prop('value', "UPDATING...");
  $(updateBtn).prop('disabled', true);
  const parameters = {
    url: `${baseurl}/espionage/create`,
    data: JSON.stringify(data),
    contentType: 'application/json',
    type: 'POST',
    success: (data, status, xhr) => {
      console.debug("Successfully send espionage report.");
      $(updateBtn).prop('value', "UPDATED SUCCESSFULLY");
    },
    error: (jqxhr, status, error) => {
      console.error(error);
      $(updateBtn).prop('value', "UPDATED FAILED");
    }
  };
  var jqxhr = $.ajax(parameters);
  setTimeout(function () {
    $(updateBtn).prop('value', "Update");
    $(updateBtn).prop('disabled', false);
  }, 5000);
}

function parseEspionageBody(id) {
  var data = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "6": 0,
    "12": 0,
    "14": 0,
    "15": 0,
    "21": 0,
    "22": 0,
    "23": 0,
    "24": 0,
    "31": 0,
    "33": 0,
    "34": 0,
    "41": 0,
    "42": 0,
    "43": 0,
    "44": 0,
    "106": 0,
    "108": 0,
    "109": 0,
    "110": 0,
    "111": 0,
    "113": 0,
    "114": 0,
    "115": 0,
    "117": 0,
    "118": 0,
    "120": 0,
    "121": 0,
    "122": 0,
    "123": 0,
    "124": 0,
    "131": 0,
    "132": 0,
    "133": 0,
    "199": 0,
    "202": 0,
    "203": 0,
    "204": 0,
    "205": 0,
    "206": 0,
    "207": 0,
    "208": 0,
    "209": 0,
    "210": 0,
    "211": 0,
    "212": 0,
    "213": 0,
    "214": 0,
    "215": 0,
    "401": 0,
    "402": 0,
    "403": 0,
    "404": 0,
    "405": 0,
    "406": 0,
    "407": 0,
    "408": 0,
    "502": 0,
    "503": 0,
    "901": 0,
    "902": 0,
    "903": 0,
    "911": 0
  };
  var labels = { ...data
  };
  $(`.message_${id}`).find(".spyRaportContainerCell > a").each((id, value) => {
    var typeId = /\(([^)]+)\)/.exec($(value).attr("onClick"))[1];
    data[typeId] = parseInt($(value).parent().next().text().replace(".", ""));
    labels[typeId] = $(value).text();
  });
  return data;
}

function makeReport(data) {
  var report = {
    ressources: {
      metal: data[901],
      crystal: data[902],
      deuterium: data[903]
    }
  };
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
  };
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
  };
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
  };
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
    graviton: data[199]
  };
  return report;
}

function parseEspionageHead(espionageReportQuery) {
  // Meta Information
  var metaInfoString = $($(espionageReportQuery).find(`.spyRaportHead > a`).eq(0)).text(); // Coords

  var readCoordinates = metaInfo => {
    var findStringBetweenSquareBrackets = /\[(.*?)\]/;
    var coordMatches = findStringBetweenSquareBrackets.exec(metaInfo);
    var coords = {};

    if (coordMatches) {
      [coords.galaxy, coords.system, coords.position] = coordMatches[1].split(":");
    } else {
      console.error("Couldn't find coordiantes in Espionage Header. ");
    }

    var coords = {
      galaxy: parseInt(coords.galaxy),
      system: parseInt(coords.system),
      position: parseInt(coords.position)
    };
    return coords;
  }; // Date


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
        console.debug({
          metaInfoString,
          matches,
          date
        });
        date = new Date();
      }
    }

    return date.toISOString();
  };

  var coords = readCoordinates(metaInfoString);
  var date = readDate(metaInfoString);
  return {
    coords: coords,
    date: date
  };
}

function parseEspionageReport(id) {
  var message = $(`.message_${id}`);
  var espionageReportQuery = message.find(".spyRaport");
  var data = parseEspionageBody(id);
  var report = { ...makeReport(data),
    ...parseEspionageHead(espionageReportQuery)
  }; // how detailed the espionage report is
  // https://ogame.fandom.com/wiki/Espionage

  report.detailLevel = $(message).find("div[class*=' spyRaportContainerHeadClass']").length;
  report.id = id;
  return report;
}

function findEspionageID(message) {
  var classes = $(message).attr("class").split(/\s+/);
  var classWithID = classes[0];
  var idString = classWithID.split("_")[1];
  return parseInt(idString);
}

function findEspionageMessages() {
  var messageQueries = [];
  $(`div.spyRaport .spyRaportHead`).each((id, element) => {
    messageQueries.push($(element).parents().eq(2));
  });
  return messageQueries;
}

function findEspionageMessagesIds() {
  var ids = [];
  $(`div.spyRaport .spyRaportHead`).each((id, element) => {
    ids.push(findEspionageID($(element).parents().eq(2)));
  });
  return ids;
}

function updateEspionage(event) {
  var report = parseEspionageReport(event.data.id);
  sendEspionage(report, event.data.id);
}

const setupEspionageUpdate = async function setupEspionageUpdate() {
  var espionages = [];
  const espionageIds = findEspionageMessagesIds();
  loadEspionageInformation(espionageIds, {
    done: existentEspionages => {
      if (existentEspionages != null && Array.isArray(existentEspionages)) {
        espionageIds.forEach(espionageId => {
          var doesExists = existentEspionages.filter(espionage => espionage.pid == espionageId).length > 0;

          if (doesExists) {
            createCheckmark(espionageId);
          } else {
            createUpdateButton(espionageId);
          }
        });
      }
    },
    fail: () => {}
  });
};

var createCheckmark = id => {
  $(`#message_${id}.message_head`).find("td").eq(2).text("✅");
};

var createUpdateButton = id => {
  var message = $(`.message_${id}`); //espionages.push(parseEspionageReport(message))

  message.find(".spyRaport").prepend(
  /*html*/
  `
        <div id="espionage-update" style="text-align: center;">
            <input class="espionage-update-button" type="button" value="Update">
        </div>
    `);
  message.find(".espionage-update-button").click({
    id
  }, updateEspionage);
};
;// CONCATENATED MODULE: ./src/components/FleetParser.js
function parseLabelValuePairFromToolip(tds) {
  let possibleLabels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var tmpLabel = "";
  var fleet = {};
  tds.each((id, element) => {
    var text = $(element).text();
    var isLabel = text.indexOf(":") !== -1 || possibleLabels.includes(text);

    if (isLabel) {
      tmpLabel = text.replace(":", "");
    } else {
      fleet[tmpLabel] = parseInt(text.replace(".", ""));
      tmpLabel = "";
    }
  });
  return fleet;
}

function parseFleetsFromOverview() {
  var fleetTooltips = $(`#hidden-div2 span.return a[data-tooltip-content]`).filter((id, element) => {
    return $(element).text() == "Flotten";
  });
  var ressourceTooltips = $(`#hidden-div2 span.return a[data-tooltip-content]`).filter((id, element) => {
    return $(element).text() != "Flotten";
  });
  ressourceTooltips.each((id, tooltip) => {
    var tooltipHTML = $(tooltip).attr("data-tooltip-content");
    var tooltipElement = $(tooltipHTML);
    var tds = tooltipElement.find("td");
    var ressources = parseLabelValuePairFromToolip(tds, ["Metall", "Kristall", "Deuterium"]);
  });
  fleetTooltips.each((id, tooltip) => {
    var tooltipHTML = $(tooltip).attr("data-tooltip-content");
    var tooltipElement = $(tooltipHTML);
    var tds = tooltipElement.find("td");
    var fleet = parseLabelValuePairFromToolip(tds);
  });
}
;// CONCATENATED MODULE: ./src/components/GalaxyUpdater.js
function GalaxyUpdater_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class GalaxyUpdater {
  constructor() {
    GalaxyUpdater_defineProperty(this, "sendSystem", data => {
      var key = GM_getValue("spylard-api-key", "");
      const parameters = {
        url: `${config_baseurl}/galaxy/system/update?&apiKey=${key}`,
        data: JSON.stringify(data),
        contentType: 'application/json',
        type: 'POST',
        success: (data, status, xhr) => {
          console.debug("Send System successfull");
          $('input#update-system').prop('value', "UPDATED SUCCESSFULLY");
          $('input#update-system').prop('disabled', true);
        },
        error: (jqxhr, status, error) => {
          console.error(error);
          $('input#update-system').prop('value', "UPDATE FAILED");
          $('input#update-system').prop('disabled', false);
        }
      };
      $('input#update-system').prop('value', "UPDATING...");
      var jqxhr = $.ajax(parameters);
      setTimeout(function () {
        $('input#update-system').prop('value', "Update");
        $('input#update-system').prop('disabled', false);
      }, 5000);
    });

    this.system = new SystemParser();
    this.system.parse();
  }

  init() {
    // Add Button to top of System
    $('#galaxy_form > table > tbody > tr').eq(1).append(
    /*html*/
    `
          <td style="background-color:transparent;border:0px;" colspan="2">
            <input type="button" value="Update" id="update-system" />
            <span id="system-last-modified"></span>
          </td>`);
    $('#galaxy_form > table > tbody > tr').eq(1).find('td').eq(0).prop("colspan", "1");
    $('#update-system').click(this.parseSystem.bind(this));
    this.loadSystemInformation(this.system.coords.galaxy, this.system.coords.system);
  }

  loadSystemInformation(galaxy, system) {
    var key = GM_getValue("spylard-api-key", "");
    const parameters = {
      url: `${config_baseurl}/galaxy/system/?galaxy=${galaxy}&system=${system}&apiKey=${key}`,
      type: 'GET',
      contentType: 'application/json',
      success: (data, status, xhr) => {
        if (data) {
          var lastModifiedString = "";
          var planetsToDelete = [];
          data.forEach(planet => {
            lastModifiedString = getHumanizedDiff(new Date() - new Date(planet.updatedAt));
            var planetName = $(`table.table569 > tbody > tr`).eq(planet.position + 1).find(`td`).eq(2).text();

            if (planetName == "") {
              planetsToDelete.push(planet);
            }

            $(`table.table569 > tbody > tr`).eq(planet.position + 1).find(`td`).eq(2).append(`✅`);
          });
          this.removeDeleted(planetsToDelete);
          $(`table.table569 > tbody > tr > th`).eq(0).append(` - <b style="color: #ff8000">last updated ` + lastModifiedString + ` ago </b>`);
        }
      },
      error: (jqxhr, status, error) => {
        console.error(error);
      }
    };
    console.debug(parameters);
    var jqxhr = $.ajax(parameters);
  }

  removeDeleted(planets) {
    var key = GM_getValue("spylard-api-key", "");
    console.debug(`=== removeDeleted()`);
    const parameters = {
      url: `${config_baseurl}/galaxy/system/delete?&apiKey=${key}`,
      type: 'POST',
      data: JSON.stringify(planets),
      contentType: 'application/json',
      success: (data, statusText) => {
        console.debug(statusText);
      },
      error: (jqxhr, status, error) => {
        console.error(error);
      }
    };
    console.debug(planets);
    var jqxhr = $.ajax(parameters);
  }

  parseSystem() {
    var parser = new SystemParser();
    parser.parse();
    var system = parser.getSystem();
    this.sendSystem(system);
    console.debug(`${system.planets.length} Planets found.`);
    console.debug(system);
  }

}

class SystemParser {
  constructor() {
    this.coords = {
      galaxy: 0,
      system: 0
    };
    this.planets = [];
  }

  parse() {
    this.coords.galaxy = parseInt($('#galaxy_form input[name="galaxy"]').val());
    this.coords.system = parseInt($('#galaxy_form input[name="system"]').val());
    $('.table569 > tbody > tr').each((index, element) => {
      var isPlanetRow = index > 1 && index < 17;
      if (!isPlanetRow) return;
      let row = new SystemRowParser(element);
      row.parse();
      if (row.isValid()) this.planets.push(row.getData());
    });
  }

  getSystem() {
    return {
      galaxy: this.coords.galaxy,
      system: this.coords.system,
      planets: this.planets
    };
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
    };
    this.columns = $(rowElement).find("td");
  }

  getData() {
    return this.data;
  }

  parse() {
    this.data.position = this.readPosition();
    this.data.avatar = this.readAvatar();
    this.data.name = this.readPlanetName();
    this.data.hasMoon = this.readMoon();
    this.data.debris = this.readDebrisField();
    var user = this.readUser();
    this.data.user = user.name;
    this.data.userID = user.id;
    this.data.inactive = user.inactive;
    this.data.umode = user.umode;
    var alliance = this.readAlliance();

    if (alliance != null) {
      this.data.alliance = alliance;
    }
  }

  readPosition() {
    return parseInt(removeNewlinesAndTabs(this.columns.eq(0).text()));
  }

  readAvatar() {
    return basename(this.columns.eq(1).find("img").attr('src'));
  }

  readPlanetName() {
    var name = removeNewlinesAndTabs(this.columns.eq(2).text()); // temporary fix to remove checkmarks from usernames
    // so they won't be uploaded
    // TODO: place checkmark at a place where it can't interfere

    name = name.replace("✅", ""); // find everything between ()

    const regExp = /\(([^)]+)\)/;
    var matches = regExp.exec(name);

    if (matches) {
      // remove everything within () including paranthese
      name = name.replace(matches[0], "");
    }

    return name;
  }

  readMoon() {
    return this.columns.eq(3).find(".tooltip_sticky").attr("data-tooltip-content") != undefined;
  }

  readDebrisField() {
    var debris = {
      metal: 0,
      crystal: 0
    };
    return debris;
  }

  readUser() {
    var thisCol = this.columns.eq(5);
    var user = {
      name: "",
      id: 0,
      inactive: 0,
      umode: false
    };
    user.name = removeNewlinesAndTabs(thisCol.text());
    const regExpUserID = /\(([^)]+)\)/; // find everything between ()

    const regExp = /\(([^)]+)\)/;
    var matches = regExp.exec(user.name);
    var tooltipHTML = thisCol.find(".tooltip_sticky").attr("data-tooltip-content");
    var userIDMatches = regExpUserID.exec(tooltipHTML);

    if (userIDMatches) {
      user.id = parseInt(userIDMatches[1]);
    }

    if (matches) {
      // remove user details from username string
      user.name = user.name.replace(matches[0], "");
      var info = matches[1];
      if (info.indexOf("i") != -1) user.inactive += 1;
      if (info.indexOf("I") != -1) user.inactive += 1;
      user.umode = info.indexOf("u") != -1;
    }

    return user;
  }

  readAlliance() {
    var thisCol = this.columns.eq(6);
    var allianceTooltip = thisCol.find(".tooltip_sticky").attr("data-tooltip-content");
    var idRegExp = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/;
    var matches = idRegExp.exec(allianceTooltip);

    if (matches) {
      var params = getQueryStringParameters(matches[2]);
      return {
        id: parseInt(params.id),
        name: removeNewlinesAndTabs(thisCol.text())
      };
    }

    return null;
  }

  isValid() {
    return this.data.avatar !== '' && this.data.user !== '' && this.data.name !== '' && this.data.userID !== 0;
  }

}
;// CONCATENATED MODULE: ./src/components/PlayercardUpdater.js
function updatePlayercardInformation() {
  var playerCard = parsePlayerCard();
  console.log(playerCard);
}

function setupPlayerCardUpdate() {
  $(`body#playerCard > #content`).prepend(
  /*html*/
  `
        <div class="update-playercard-container">
            <div style="display:flex; justify-content: center; align-items: center">
                <input id="update-playercard" type="button" value="Update">
            </div>
        </div>
    `);
  $('#update-playercard').click(updatePlayercardInformation);
}

function parsePlayerCard() {
  var playercardQuery = $(`body#playerCard table`);

  var getCell = (row, col) => {
    return $($(playercardQuery).find("tr").eq(row).find("td").eq(col));
  };

  var getValueOfCell = (row, col) => {
    return parseInt(getCell(row, col).text() // remove decimal seperator
    .replaceAll(".", ""));
  };

  var playercard = {
    points: {
      structures: getValueOfCell(5, 1),
      reasearch: getValueOfCell(6, 1),
      fleet: getValueOfCell(7, 1),
      defensive: getValueOfCell(8, 1),
      total: getValueOfCell(9, 1)
    },
    ranks: {
      structures: getValueOfCell(5, 2),
      reasearch: getValueOfCell(6, 2),
      fleet: getValueOfCell(7, 2),
      defensive: getValueOfCell(8, 2),
      total: getValueOfCell(9, 2)
    },
    combat: {
      wins: getValueOfCell(12, 1),
      draws: getValueOfCell(13, 1),
      loses: getValueOfCell(14, 1),
      total: getValueOfCell(15, 1)
    },
    units: {
      destroyed: getValueOfCell(17, 1),
      lost: getValueOfCell(18, 1)
    },
    debris: {
      metal: getValueOfCell(19, 1),
      crystal: getValueOfCell(20, 1)
    }
  };
  return playercard;
}
;// CONCATENATED MODULE: ./src/components/FleetDiscordMessage.js
function copyFleetDiscordMessage() {
  $("#fleet-button-container").append(
  /*html*/
  `&nbsp;<button id="spylard-discord-copy" type="button" class="btn btn-primary">Discord</button>`);
  $("#spylard-discord-copy").on("click", e => {
    e.preventDefault();
    var data = {
      ships: [],
      techs: {
        weapon: 0,
        shield: 0,
        armour: 0,
        combustion: 0,
        impuls: 0,
        hyper: 0
      }
    };
    $(".table519 > tbody").find("tr").slice(2, -3).each(function (i, element) {
      data.ships.push({
        name: $(this).find("a").eq(0).text(),
        amount: $(this).find("td").eq(1).text()
      });
    });
    var techStrings = [];
    techStrings.push($('table[style="min-width:519px;width:519px;"').find("tr").eq(2).find("td").eq(0).text());
    techStrings.push($('table[style="min-width:519px;width:519px;"').find("tr").eq(2).find("td").eq(2).text());
    techStrings.push($('table[style="min-width:519px;width:519px;"').find("tr").eq(2).find("td").eq(1).text());
    techStrings.push($('table[style="min-width:519px;width:519px;"').find("tr").eq(4).find("td").eq(0).text());
    techStrings.push($('table[style="min-width:519px;width:519px;"').find("tr").eq(4).find("td").eq(1).text());
    techStrings.push($('table[style="min-width:519px;width:519px;"').find("tr").eq(4).find("td").eq(2).text());
    Object.keys(techStrings).forEach(id => {
      var techLevelStr = techStrings[id].replace("+", "").replace(" %", "");
      techStrings[id] = parseInt(techLevelStr) / 10;
    });
    data.weapon = techStrings[0];
    data.shield = techStrings[1];
    data.armour = techStrings[2];
    data.combustion = techStrings[3];
    data.impuls = techStrings[4] / 2;
    data.hyper = techStrings[5] / 3;
    var message = createDiscordMessage(data);
    navigator.clipboard.writeText(message).then(function () {
      console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });
  });
}

function createDiscordMessage(data) {
  let message = `\`\`\`
${Object.keys(data.ships).map(key => {
    var ship = data.ships[key];

    if (ship.name !== "") {
      return `${ship.name.padStart(19)}: ${ship.amount.padStart(6)}\n`;
    }
  }).join("")}
Waffen: ${data.weapon} - Schild: ${data.shield} - Panzer: ${data.armour}
Verbrennung: ${data.combustion} - Impuls: ${data.impuls} - Hyper: ${data.hyper} 
\`\`\``;
  return message;
}
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js");
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js");
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js");
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js");
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/style/main.less
var main = __webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/style/main.less");
;// CONCATENATED MODULE: ./src/style/main.less

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(main/* default */.Z, options);




       /* harmony default export */ const style_main = (main/* default */.Z && main/* default.locals */.Z.locals ? main/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/index.js











function getShips() {
  var ids = [202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215];
  var ships = {};
  ids.forEach(id => {
    ships[id] = parseInt($(`[name="battleinput[0][0][${id}]"]`).val());
  });
  return ships;
}

function versionCheck() {
  var lastVersionCheck = GM_getValue("spylard-version-check-timestamp");
  var lastCheckDate = new Date(lastVersionCheck);
  var currentDate = new Date();
  var deltaVersionCheck = currentDate - lastCheckDate;

  if (deltaVersionCheck > 10 * 60 * 1000) {
    Requests.checkVersion({
      done: data => {
        const versions = {
          new: data.version,
          current: GM_info.script.version
        };
        var comparedVersions = utils.versionCompare(versions.current, versions.new);
        console.debug({ ...versions,
          compared: comparedVersions
        });

        if (comparedVersions < 0) {
          toastify_default()({
            text: "Es gibt eine neuere Version für Spylard, bitte updaten!",
            duration: 10000,
            destination: "https://github.com/kejith/spylard-development/raw/gh-pages/index.prod.user.js",
            newWindow: true
          }).showToast();
        } else {
          GM_setValue("spylard-version-check-timestamp", new Date().toString());
        }
      }
    });
  }
}

(function () {
  $('body > div.wrapper').append(
  /*html*/
  `
            <div id="spylard" class="no-mobile colony-search-container"></div>
        `);
  $('content').css('overflow-x', 'auto');
  $("<link/>", {
    rel: "stylesheet",
    type: "text/css",
    href: "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
  }).appendTo("head");
  utils.loadExternalJavascript("https://kit.fontawesome.com/dbf8ffc691.js");
  var user = $(".planetImage.no-mobile").find("a").eq(0).text();
  GM_setValue("spylard-user", user);
  versionCheck();
  setupTriggers();
  var colonySearch = new ColonySearch({
    appendTo: 'body > div.wrapper > .colony-search-container',
    wrapperClasses: 'no-mobile colony-search-container',
    wrapperId: ''
  }); // general functions

  if (!isPage("playerCard")) colonySearch.init(); // ======== OVERVIEW

  if (isPage("overview")) {
    parseFleetsFromOverview();
  } // ======== GALAXY


  if (isPage("galaxy")) {
    var galaxyUpdater = new GalaxyUpdater();
    galaxyUpdater.init();
  } // ======== STATISTICS


  if (isPage("statistics") || isPage("playerCard")) {
    setupPlayerCardUpdate();
  } // ======== MESSAGES


  if (isPage("messages")) {//setupEspionageUpdate()
  } // ======== MESSAGES


  if (isPage("battleSimulator")) {
    $("#submit td").append(
    /*html*/
    `
            &nbsp;<button id="spylard-simulator-submit" type="button" class="btn btn-primary">Speichern</button>
        `);
    console.log("dsplsd");
    var ids = [202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215];
    var ships = {};
    ids.forEach(id => {
      var amount = parseInt($(`[name="battleinput[0][0][${id}]"]`).val());
      console.log(amount);
      var label = $(`[name="battleinput[0][0][${id}]"]`).parent().append(`<br/>${amount}`);
    });
    $("#spylard-simulator-submit").on("click", e => {
      e.preventDefault();
      var ships = getShips();
      GM_setValue("calculatedShips", JSON.stringify(ships));
      console.log(ships);
      toastify_default()({
        text: "Schiffe gespeichert",
        duration: 3000
      }).showToast();
    });
  } // is page fleetTable


  if (isPage("fleetTable")) {
    $($(".table519 > tbody > tr").eq(1)).before(
    /*html*/
    `
            <tr>
                <td id="fleet-button-container" colspan="4">
                </td>
            </tr>
        `);
    $("#fleet-button-container").append(
    /*html*/
    `<button id="spylard-simulator-paste" type="button" class="btn btn-primary">Einfügen</button>`);
    $("#spylard-simulator-paste").on("click", e => {
      e.preventDefault();
      var ships = JSON.parse(GM_getValue("calculatedShips", "{}"));
      Object.keys(ships).forEach(id => {
        $(`#ship${id}_input`).val(ships[id]);
      });
    });
    copyFleetDiscordMessage();
  } // if (window.top === window.self) {
  //     //--- Script is on domain_B.com when/if it is the MAIN PAGE.
  // }
  // else {
  //     console.log("iframe")
  // }


  function doesAtainsScriptExist() {
    return $("#atain").length > 0;
  }

  function copyAttainsScript() {
    var parent = $("#atain").parent();

    if (parent.attr("id") !== "spylard") {
      var script = $("#atain").detach();
      $("#spylard").append(script);
      parent.remove();
    }
  }

  if (doesAtainsScriptExist()) {
    copyAttainsScript();
  } else {
    var wrapperContainer = document.getElementsByClassName("wrapper");

    if (wrapperContainer.length > 0) {
      var wrapper = wrapperContainer[0];
      var observer = new MutationObserver((mutations, observer) => {
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            copyAttainsScript();
          }
        }
      });
      observer.observe(wrapper, {
        childList: true
      });
    }
  }
})();
})();

/******/ })()
;