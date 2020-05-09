/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/common/actions/app.js":
/*!***********************************!*\
  !*** ./src/common/actions/app.js ***!
  \***********************************/
/*! exports provided: APP_INIT, appInit, appInitOnce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"APP_INIT\", function() { return APP_INIT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"appInit\", function() { return appInit; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"appInitOnce\", function() { return appInitOnce; });\nvar APP_INIT = 'APP_INIT';\nfunction appInit() {\n  return {\n    type: APP_INIT\n  };\n}\nfunction appInitOnce() {\n  return function (dispatch, getState) {\n    var _getState = getState(),\n        app = _getState.app;\n\n    if (!app.isInitialized) {\n      dispatch({\n        type: APP_INIT\n      });\n    }\n  };\n}\n\n//# sourceURL=webpack:///./src/common/actions/app.js?");

/***/ }),

/***/ "./src/common/components/App.js":
/*!**************************************!*\
  !*** ./src/common/components/App.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"@babel/runtime/helpers/createClass\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"@babel/runtime/helpers/inherits\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"@babel/runtime/helpers/possibleConstructorReturn\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"@babel/runtime/helpers/getPrototypeOf\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core */ \"@material-ui/core\");\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/styles */ \"@material-ui/core/styles\");\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _header_Header__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./header/Header */ \"./src/common/components/header/Header.js\");\n/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../theme */ \"./src/common/theme.js\");\n\n\n\n\n\n\nfunction _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\n\n\n\n\n\n\n\nvar App = /*#__PURE__*/function (_Component) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(App, _Component);\n\n  var _super = _createSuper(App);\n\n  function App() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, App);\n\n    return _super.apply(this, arguments);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(App, [{\n    key: \"render\",\n    value: function render() {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__[\"ThemeProvider\"], {\n        theme: _theme__WEBPACK_IMPORTED_MODULE_10__[\"default\"]\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__[\"CssBaseline\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_header_Header__WEBPACK_IMPORTED_MODULE_9__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__[\"Container\"], {\n        fixed: true,\n        disableGutters: true\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__[\"Switch\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__[\"Route\"], {\n        exact: true,\n        path: \"/\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Home, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__[\"Route\"], {\n        path: \"/dashboard\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Dashboard, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(NotFound, {\n        \"default\": true\n      }))));\n    }\n  }]);\n\n  return App;\n}(react__WEBPACK_IMPORTED_MODULE_5__[\"Component\"]);\n\nvar Home = function Home() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"h2\", null, \"Welcome HOME\"));\n};\n\nvar Dashboard = function Dashboard() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"h2\", null, \"Dashboard\"));\n};\n\nvar NotFound = function NotFound() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", null, \"Sorry, nothing here\");\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./src/common/components/App.js?");

/***/ }),

/***/ "./src/common/components/header/Header.js":
/*!************************************************!*\
  !*** ./src/common/components/header/Header.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"@babel/runtime/helpers/slicedToArray\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ \"prop-types\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _actions_app__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/app */ \"./src/common/actions/app.js\");\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core */ \"@material-ui/core\");\n/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n\nvar tabLocationMap = {\n  '/home': 0,\n  '/dashboard': 1,\n  '/recipes': 2\n};\n\nvar Header = function Header() {\n  var location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"useLocation\"])();\n  var initialTabValue = tabLocationMap[location.pathname] || 0;\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])(initialTabValue),\n      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),\n      value = _useState2[0],\n      setValue = _useState2[1];\n\n  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"useDispatch\"])();\n\n  var handleChange = function handleChange(event, newValue) {\n    setValue(newValue);\n  };\n\n  var onClickHandler = function onClickHandler() {\n    dispatch(Object(_actions_app__WEBPACK_IMPORTED_MODULE_5__[\"appInitOnce\"])());\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"AppBar\"], {\n    position: \"static\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Tabs\"], {\n    value: value,\n    onChange: handleChange\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Tab\"], {\n    label: \"Home\",\n    to: \"/\",\n    component: react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"Link\"],\n    onClick: onClickHandler\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Tab\"], {\n    label: \"Dashboard\",\n    to: \"/dashboard\",\n    component: react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"Link\"]\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Tab\"], {\n    label: \"Recipes\",\n    to: \"/recipes\",\n    component: react_router_dom__WEBPACK_IMPORTED_MODULE_4__[\"Link\"]\n  })));\n};\n\nHeader.propTypes = {\n  value: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Header);\n\n//# sourceURL=webpack:///./src/common/components/header/Header.js?");

/***/ }),

/***/ "./src/common/configureStore.js":
/*!**************************************!*\
  !*** ./src/common/configureStore.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return configureStore; });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-thunk */ \"redux-thunk\");\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reducers */ \"./src/common/reducers/index.js\");\n\n\n\nfunction configureStore(preloadedState) {\n  var middleware = [redux_thunk__WEBPACK_IMPORTED_MODULE_1___default.a];\n\n  if (true) {\n    var createLogger = __webpack_require__(/*! redux-logger */ \"redux-logger\").createLogger;\n\n    middleware.push(createLogger({\n      collapsed: true\n    }));\n  }\n\n  var store = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(_reducers__WEBPACK_IMPORTED_MODULE_2__[\"default\"], preloadedState, redux__WEBPACK_IMPORTED_MODULE_0__[\"applyMiddleware\"].apply(void 0, middleware));\n\n  if (false) {}\n\n  return store;\n}\n\n//# sourceURL=webpack:///./src/common/configureStore.js?");

/***/ }),

/***/ "./src/common/reducers/app.js":
/*!************************************!*\
  !*** ./src/common/reducers/app.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"@babel/runtime/helpers/defineProperty\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_createMappedReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/createMappedReducer */ \"./src/common/reducers/utils/createMappedReducer.js\");\n/* harmony import */ var _actions_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/app */ \"./src/common/actions/app.js\");\n\n\n\nvar initialState = {\n  isInitialized: false\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_utils_createMappedReducer__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(initialState, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, _actions_app__WEBPACK_IMPORTED_MODULE_2__[\"APP_INIT\"], function () {\n  return {\n    isInitialized: true\n  };\n})));\n\n//# sourceURL=webpack:///./src/common/reducers/app.js?");

/***/ }),

/***/ "./src/common/reducers/index.js":
/*!**************************************!*\
  !*** ./src/common/reducers/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _recipes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recipes */ \"./src/common/reducers/recipes.js\");\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ \"./src/common/reducers/app.js\");\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"combineReducers\"])({\n  app: _app__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  recipes: _recipes__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n}));\n\n//# sourceURL=webpack:///./src/common/reducers/index.js?");

/***/ }),

/***/ "./src/common/reducers/recipes.js":
/*!****************************************!*\
  !*** ./src/common/reducers/recipes.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"@babel/runtime/helpers/defineProperty\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_createMappedReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/createMappedReducer */ \"./src/common/reducers/utils/createMappedReducer.js\");\n\n\nvar initialState = {\n  list: []\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(_utils_createMappedReducer__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(initialState, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, 'CREATE_RECIPE', function CREATE_RECIPE(state) {\n  return state;\n})));\n\n//# sourceURL=webpack:///./src/common/reducers/recipes.js?");

/***/ }),

/***/ "./src/common/reducers/utils/createMappedReducer.js":
/*!**********************************************************!*\
  !*** ./src/common/reducers/utils/createMappedReducer.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createMappedReducer; });\nfunction createMappedReducer(initialState, handlers) {\n  return function () {\n    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n    var action = arguments.length > 1 ? arguments[1] : undefined;\n    var handler = handlers[action.type];\n\n    if (!handler) {\n      return state;\n    }\n\n    return handler(state, action);\n  };\n}\n\n//# sourceURL=webpack:///./src/common/reducers/utils/createMappedReducer.js?");

/***/ }),

/***/ "./src/common/theme.js":
/*!*****************************!*\
  !*** ./src/common/theme.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ \"@material-ui/core/styles\");\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__);\n\nvar theme = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__[\"createMuiTheme\"])({\n  palette: {\n    primary: {\n      light: '#ffffff',\n      main: '#fafafa',\n      dark: '#c7c7c7',\n      contrastText: '#000000'\n    },\n    secondary: {\n      light: '#62727b',\n      main: '#37474f',\n      dark: '#102027',\n      contrastText: '#ffffff'\n    }\n  }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (theme);\n\n//# sourceURL=webpack:///./src/common/theme.js?");

/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router */ \"react-router\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_router__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/styles */ \"@material-ui/core/styles\");\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _common_configureStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/configureStore */ \"./src/common/configureStore.js\");\n/* harmony import */ var _renderFullPage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./renderFullPage */ \"./src/server/renderFullPage.js\");\n/* harmony import */ var _common_components_App__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common/components/App */ \"./src/common/components/App.js\");\n/* harmony import */ var _common_theme__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../common/theme */ \"./src/common/theme.js\");\n\n\n\n\n\n\n\n\n\n\n\nvar app = express__WEBPACK_IMPORTED_MODULE_0___default()();\napp.use(cors__WEBPACK_IMPORTED_MODULE_1___default()()); // serve up the dist folder since that's where our client app.bundle.js file will end up.\n\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default.a[\"static\"](\"dist\"));\napp.get(\"/*\", function (req, res) {\n  var sheets = new _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__[\"ServerStyleSheets\"]();\n  var store = Object(_common_configureStore__WEBPACK_IMPORTED_MODULE_7__[\"default\"])();\n  var markup = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_4__[\"renderToString\"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"Provider\"], {\n    store: store\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_5__[\"StaticRouter\"], {\n    location: req.url,\n    context: {}\n  }, sheets.collect( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__[\"ThemeProvider\"], {\n    theme: _common_theme__WEBPACK_IMPORTED_MODULE_10__[\"default\"]\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_common_components_App__WEBPACK_IMPORTED_MODULE_9__[\"default\"], null))))));\n  var css = sheets.toString();\n  var initialState = store.getState();\n  res.send(Object(_renderFullPage__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(markup, initialState, css));\n});\napp.listen(3000, function () {\n  console.log(\"Server is listening on port: 3000\");\n});\n\n//# sourceURL=webpack:///./src/server/index.js?");

/***/ }),

/***/ "./src/server/renderFullPage.js":
/*!**************************************!*\
  !*** ./src/server/renderFullPage.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! serialize-javascript */ \"serialize-javascript\");\n/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(serialize_javascript__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar renderFullPage = function renderFullPage(markup, initialState, css) {\n  return \"\\n    <!DOCTYPE html>\\n    <html lang=\\\"en-us\\\">\\n      <head>\\n      <meta charset=\\\"UTF-8\\\">\\n      <meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1.0\\\">\\n      <title>Cream Cheese: All the words you eat</title>\\n      <script>window.__INITIAL_DATA__=\".concat(serialize_javascript__WEBPACK_IMPORTED_MODULE_0___default()(initialState), \"</script>\\n      <style id=\\\"jss-server-side\\\">\").concat(css, \"</style>\\n      </head>\\n\\n      <body>\\n        <div id=\\\"app\\\">\").concat(markup, \"</div>\\n        <script src=\\\"/runtime.bundle.js\\\"></script>\\n        <script src=\\\"/vendors.bundle.js\\\"></script>\\n        <script src=\\\"/app.bundle.js\\\"></script>\\n      </body>\\n    </html>\\n    \");\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (renderFullPage);\n\n//# sourceURL=webpack:///./src/server/renderFullPage.js?");

/***/ }),

/***/ "@babel/runtime/helpers/classCallCheck":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/classCallCheck" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/classCallCheck\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/classCallCheck%22?");

/***/ }),

/***/ "@babel/runtime/helpers/createClass":
/*!*****************************************************!*\
  !*** external "@babel/runtime/helpers/createClass" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/createClass\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/createClass%22?");

/***/ }),

/***/ "@babel/runtime/helpers/defineProperty":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/defineProperty" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/defineProperty\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/defineProperty%22?");

/***/ }),

/***/ "@babel/runtime/helpers/getPrototypeOf":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/getPrototypeOf" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/getPrototypeOf\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/getPrototypeOf%22?");

/***/ }),

/***/ "@babel/runtime/helpers/inherits":
/*!**************************************************!*\
  !*** external "@babel/runtime/helpers/inherits" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/inherits\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/inherits%22?");

/***/ }),

/***/ "@babel/runtime/helpers/possibleConstructorReturn":
/*!*******************************************************************!*\
  !*** external "@babel/runtime/helpers/possibleConstructorReturn" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/possibleConstructorReturn\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/possibleConstructorReturn%22?");

/***/ }),

/***/ "@babel/runtime/helpers/slicedToArray":
/*!*******************************************************!*\
  !*** external "@babel/runtime/helpers/slicedToArray" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/slicedToArray\");\n\n//# sourceURL=webpack:///external_%22@babel/runtime/helpers/slicedToArray%22?");

/***/ }),

/***/ "@material-ui/core":
/*!************************************!*\
  !*** external "@material-ui/core" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@material-ui/core\");\n\n//# sourceURL=webpack:///external_%22@material-ui/core%22?");

/***/ }),

/***/ "@material-ui/core/styles":
/*!*******************************************!*\
  !*** external "@material-ui/core/styles" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@material-ui/core/styles\");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/styles%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"prop-types\");\n\n//# sourceURL=webpack:///external_%22prop-types%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-redux\");\n\n//# sourceURL=webpack:///external_%22react-redux%22?");

/***/ }),

/***/ "react-router":
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router\");\n\n//# sourceURL=webpack:///external_%22react-router%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux\");\n\n//# sourceURL=webpack:///external_%22redux%22?");

/***/ }),

/***/ "redux-logger":
/*!*******************************!*\
  !*** external "redux-logger" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-logger\");\n\n//# sourceURL=webpack:///external_%22redux-logger%22?");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-thunk\");\n\n//# sourceURL=webpack:///external_%22redux-thunk%22?");

/***/ }),

/***/ "serialize-javascript":
/*!***************************************!*\
  !*** external "serialize-javascript" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"serialize-javascript\");\n\n//# sourceURL=webpack:///external_%22serialize-javascript%22?");

/***/ })

/******/ });