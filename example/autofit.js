/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Autofit"] = factory();
	else
		root["Autofit"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./autofit.js":
/*!********************!*\
  !*** ./autofit.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   elRectification: () => (/* binding */ elRectification)\n/* harmony export */ });\nlet currRenderDom = null;\r\nlet currelRectification = \"\";\r\nlet currelRectificationLevel = \"\";\r\nlet currelRectificationIsKeepRatio = \"\";\r\nlet resizeListener = null;\r\nlet timer = null;\r\nlet currScale = 1;\r\nlet isElRectification = false;\r\nconst autofit = {\r\n  isAutofitRunnig: false,\r\n  init(options = {}, isShowInitTip = true) {\r\n    if (isShowInitTip) {\r\n      console.log(`autofit.js is running`);\r\n    }\r\n    const {\r\n      dw = 1920,\r\n      dh = 1080,\r\n      el = typeof options === \"string\" ? options : \"body\",\r\n      resize = true,\r\n      ignore = [],\r\n      transition = \"none\",\r\n      delay = 0,\r\n      limit = 0.1,\r\n    } = options;\r\n    currRenderDom = el;\r\n    let dom = document.querySelector(el);\r\n    if (!dom) {\r\n      console.error(`autofit: '${el}' is not exist`);\r\n      return;\r\n    }\r\n    const style = document.createElement(\"style\");\r\n    const ignoreStyle = document.createElement(\"style\");\r\n    style.lang = \"text/css\";\r\n    ignoreStyle.lang = \"text/css\";\r\n    style.id = \"autofit-style\";\r\n    ignoreStyle.id = \"ignoreStyle\";\r\n    style.innerHTML = `body {overflow: hidden;}`;\r\n    const bodyEl = document.querySelector(\"body\");\r\n    bodyEl.appendChild(style);\r\n    bodyEl.appendChild(ignoreStyle);\r\n    dom.style.height = `${dh}px`;\r\n    dom.style.width = `${dw}px`;\r\n    dom.style.transformOrigin = `0 0`;\r\n    dom.style.overflow = \"hidden\";\r\n    keepFit(dw, dh, dom, ignore, limit);\r\n    resizeListener = () => {\r\n      clearTimeout(timer);\r\n      if (delay != 0)\r\n        timer = setTimeout(() => {\r\n          keepFit(dw, dh, dom, ignore, limit);\r\n          isElRectification &&\r\n            elRectification(currelRectification, currelRectificationIsKeepRatio,currelRectificationLevel);\r\n        }, delay);\r\n      else {\r\n        keepFit(dw, dh, dom, ignore, limit);\r\n        isElRectification &&\r\n          elRectification(currelRectification,currelRectificationIsKeepRatio, currelRectificationLevel);\r\n      }\r\n    };\r\n    resize && window.addEventListener(\"resize\", resizeListener);\r\n    this.isAutofitRunnig = true;\r\n    setTimeout(() => {\r\n      dom.style.transition = `${transition}s`;\r\n    });\r\n  },\r\n  off(el = \"body\") {\r\n    try {\r\n      isElRectification = false;\r\n      window.removeEventListener(\"resize\", resizeListener);\r\n      document.querySelector(\"#autofit-style\").remove();\r\n      const ignoreStyleDOM = document.querySelector(\"#ignoreStyle\");\r\n      ignoreStyleDOM && ignoreStyleDOM.remove();\r\n      document.querySelector(currRenderDom ? currRenderDom : el).style = \"\";\r\n      isElRectification && offelRectification();\r\n    } catch (error) {\r\n      console.error(`autofit: Failed to remove normally`, error);\r\n      this.isAutofitRunnig = false;\r\n    }\r\n    this.isAutofitRunnig && console.log(`autofit.js is off`);\r\n  },\r\n};\r\nfunction elRectification(el,isKeepRatio = true, level = 1) {\r\n  if (!autofit.isAutofitRunnig) {\r\n    console.error(\"autofit.js：autofit has not been initialized yet\");\r\n  }\r\n  !el && console.error(`autofit.js：bad selector: ${el}`);\r\n  currelRectification = el;\r\n  currelRectificationLevel = level;\r\n  currelRectificationIsKeepRatio = isKeepRatio;\r\n  const currEl = document.querySelectorAll(el);\r\n  if (currEl.length == 0) {\r\n    console.error(\"autofit.js：elRectification found no element\");\r\n    return;\r\n  }\r\n  for (let item of currEl) {\r\n    let rectification = currScale == 1 ? 1 : currScale * level;\r\n    if (!isElRectification) {\r\n      item.originalWidth = item.clientWidth;\r\n      item.originalHeight = item.clientHeight;\r\n    }\r\n    if (isKeepRatio) {\r\n      item.style.width = `${item.originalWidth * rectification}px`;\r\n\t\t\titem.style.height = `${item.originalHeight * rectification}px`;\r\n\t\t} else {\r\n\t\t\titem.style.width = `${100 * rectification}%`;\r\n\t\t\titem.style.height = `${100 * rectification}%`;\r\n\t\t}\r\n    item.style.transform = `scale(${1 / currScale})`;\r\n    item.style.transformOrigin = `0 0`;\r\n  }\r\n  isElRectification = true;\r\n}\r\nfunction offelRectification() {\r\n  if (!currelRectification) return;\r\n  for (let item of document.querySelectorAll(currelRectification)) {\r\n    item.style.width = ``;\r\n    item.style.height = ``;\r\n    item.style.transform = ``;\r\n  }\r\n}\r\nfunction keepFit(dw, dh, dom, ignore, limit) {\r\n  let clientHeight = document.documentElement.clientHeight;\r\n  let clientWidth = document.documentElement.clientWidth;\r\n  currScale =\r\n    clientWidth / clientHeight < dw / dh ? clientWidth / dw : clientHeight / dh;\r\n  currScale = Math.abs(1 - currScale) > limit ? currScale.toFixed(2) : 1;\r\n  let height = Math.round(clientHeight / currScale);\r\n  let width = Math.round(clientWidth / currScale);\r\n  dom.style.height = `${height}px`;\r\n  dom.style.width = `${width}px`;\r\n  dom.style.transform = `scale(${currScale})`;\r\n  const ignoreStyleDOM = document.querySelector(\"#ignoreStyle\");\r\n  ignoreStyleDOM.innerHTML = \"\";\r\n  for (let item of ignore) {\r\n    let itemEl = item.el || item.dom;\r\n    typeof item == \"string\" && (itemEl = item);\r\n    if (!itemEl) {\r\n      console.error(`autofit: bad selector: ${itemEl}`);\r\n      continue;\r\n    }\r\n    let realScale = item.scale ? item.scale : 1 / currScale;\r\n    let realFontSize = realScale != currScale ? item.fontSize : \"autofit\";\r\n    let realWidth = realScale != currScale ? item.width : \"autofit\";\r\n    let realHeight = realScale != currScale ? item.height : \"autofit\";\r\n    let regex = new RegExp(`${itemEl}(\\x20|{)`, \"gm\");\r\n    let isIgnored = regex.test(ignoreStyleDOM.innerHTML);\r\n    if (isIgnored) {\r\n      continue;\r\n    }\r\n    ignoreStyleDOM.innerHTML += `\\n${itemEl} { \r\n      transform: scale(${realScale})!important;\r\n      transform-origin: 0 0;\r\n      width: ${realWidth}!important;\r\n      height: ${realHeight}!important;\r\n    }`;\r\n    if (realFontSize) {\r\n      ignoreStyleDOM.innerHTML += `\\n${itemEl} div ,${itemEl} span,${itemEl} a,${itemEl} * {\r\n        font-size: ${realFontSize}px;\r\n      }`;\r\n    }\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (autofit);\r\n\n\n//# sourceURL=webpack://Autofit/./autofit.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./autofit.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});