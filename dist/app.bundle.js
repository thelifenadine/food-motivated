(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app"],{

/***/ "./src/client/index.js":
/*!*****************************!*\
  !*** ./src/client/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _common_configureStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/configureStore */ "./src/common/configureStore.js");
/* harmony import */ var _common_components_App__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/components/App */ "./src/common/components/App.js");
/* harmony import */ var _common_theme__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/theme */ "./src/common/theme.js");
// import 'typeface-roboto';








var store = Object(_common_configureStore__WEBPACK_IMPORTED_MODULE_5__["default"])(window.__INITIAL_DATA__);

var Main = function Main() {
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__["ThemeProvider"], {
    theme: _common_theme__WEBPACK_IMPORTED_MODULE_7__["default"]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_common_components_App__WEBPACK_IMPORTED_MODULE_6__["default"], null));
};

var renderApp = function renderApp() {
  return Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["hydrate"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_2__["Provider"], {
    store: store
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["BrowserRouter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Main, null))), document.getElementById("app"));
}; // if (process.env.NODE_ENV !== 'production' && module.hot) {
//   module.hot.accept('./components/App', renderApp);
// }


renderApp();

/***/ }),

/***/ "./src/common/actions/app.js":
/*!***********************************!*\
  !*** ./src/common/actions/app.js ***!
  \***********************************/
/*! exports provided: APP_INIT, appInit, appInitOnce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_INIT", function() { return APP_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appInit", function() { return appInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appInitOnce", function() { return appInitOnce; });
var APP_INIT = 'APP_INIT';
function appInit() {
  return {
    type: APP_INIT
  };
}
function appInitOnce() {
  return function (dispatch, getState) {
    var _getState = getState(),
        app = _getState.app;

    if (!app.isInitialized) {
      dispatch({
        type: APP_INIT
      });
    }
  };
}

/***/ }),

/***/ "./src/common/components/App.js":
/*!**************************************!*\
  !*** ./src/common/components/App.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _header_Header__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./header/Header */ "./src/common/components/header/Header.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../theme */ "./src/common/theme.js");






function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }








var App = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(App, _Component);

  var _super = _createSuper(App);

  function App() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, App);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(App, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_8__["ThemeProvider"], {
        theme: _theme__WEBPACK_IMPORTED_MODULE_10__["default"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["CssBaseline"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_header_Header__WEBPACK_IMPORTED_MODULE_9__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__["Container"], {
        fixed: true,
        disableGutters: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Switch"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Route"], {
        exact: true,
        path: "/"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Home, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Route"], {
        path: "/dashboard"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(Dashboard, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(NotFound, {
        "default": true
      }))));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

var Home = function Home() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h2", null, "Welcome HOME"));
};

var Dashboard = function Dashboard() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h2", null, "Dashboard"));
};

var NotFound = function NotFound() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, "Sorry, nothing here");
};

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/common/components/header/Header.js":
/*!************************************************!*\
  !*** ./src/common/components/header/Header.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _actions_app__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/app */ "./src/common/actions/app.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");








var tabLocationMap = {
  '/home': 0,
  '/dashboard': 1,
  '/recipes': 2
};

var Header = function Header() {
  var location = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["useLocation"])();
  var initialTabValue = tabLocationMap[location.pathname] || 0;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(initialTabValue),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useDispatch"])();

  var handleChange = function handleChange(event, newValue) {
    setValue(newValue);
  };

  var onClickHandler = function onClickHandler() {
    dispatch(Object(_actions_app__WEBPACK_IMPORTED_MODULE_5__["appInitOnce"])());
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["AppBar"], {
    position: "static"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Tabs"], {
    value: value,
    onChange: handleChange
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Tab"], {
    label: "Home",
    to: "/",
    component: react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Link"],
    onClick: onClickHandler
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Tab"], {
    label: "Dashboard",
    to: "/dashboard",
    component: react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Link"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__["Tab"], {
    label: "Recipes",
    to: "/recipes",
    component: react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Link"]
  })));
};

Header.propTypes = {
  value: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ }),

/***/ "./src/common/configureStore.js":
/*!**************************************!*\
  !*** ./src/common/configureStore.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return configureStore; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reducers */ "./src/common/reducers/index.js");



function configureStore(preloadedState) {
  var middleware = [redux_thunk__WEBPACK_IMPORTED_MODULE_1__["default"]];

  if (true) {
    var createLogger = __webpack_require__(/*! redux-logger */ "./node_modules/redux-logger/dist/redux-logger.js").createLogger;

    middleware.push(createLogger({
      collapsed: true
    }));
  }

  var store = Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(_reducers__WEBPACK_IMPORTED_MODULE_2__["default"], preloadedState, redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"].apply(void 0, middleware));

  if (false) {}

  return store;
}

/***/ }),

/***/ "./src/common/reducers/app.js":
/*!************************************!*\
  !*** ./src/common/reducers/app.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_createMappedReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/createMappedReducer */ "./src/common/reducers/utils/createMappedReducer.js");
/* harmony import */ var _actions_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/app */ "./src/common/actions/app.js");



var initialState = {
  isInitialized: false
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_utils_createMappedReducer__WEBPACK_IMPORTED_MODULE_1__["default"])(initialState, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, _actions_app__WEBPACK_IMPORTED_MODULE_2__["APP_INIT"], function () {
  return {
    isInitialized: true
  };
})));

/***/ }),

/***/ "./src/common/reducers/index.js":
/*!**************************************!*\
  !*** ./src/common/reducers/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _recipes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recipes */ "./src/common/reducers/recipes.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ "./src/common/reducers/app.js");



/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  app: _app__WEBPACK_IMPORTED_MODULE_2__["default"],
  recipes: _recipes__WEBPACK_IMPORTED_MODULE_1__["default"]
}));

/***/ }),

/***/ "./src/common/reducers/recipes.js":
/*!****************************************!*\
  !*** ./src/common/reducers/recipes.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_createMappedReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/createMappedReducer */ "./src/common/reducers/utils/createMappedReducer.js");


var initialState = {
  list: []
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_utils_createMappedReducer__WEBPACK_IMPORTED_MODULE_1__["default"])(initialState, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, 'CREATE_RECIPE', function CREATE_RECIPE(state) {
  return state;
})));

/***/ }),

/***/ "./src/common/reducers/utils/createMappedReducer.js":
/*!**********************************************************!*\
  !*** ./src/common/reducers/utils/createMappedReducer.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createMappedReducer; });
function createMappedReducer(initialState, handlers) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    var handler = handlers[action.type];

    if (!handler) {
      return state;
    }

    return handler(state, action);
  };
}

/***/ }),

/***/ "./src/common/theme.js":
/*!*****************************!*\
  !*** ./src/common/theme.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");

var theme = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_0__["createMuiTheme"])({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#fafafa',
      dark: '#c7c7c7',
      contrastText: '#000000'
    },
    secondary: {
      light: '#62727b',
      main: '#37474f',
      dark: '#102027',
      contrastText: '#ffffff'
    }
  }
});
/* harmony default export */ __webpack_exports__["default"] = (theme);

/***/ })

},[["./src/client/index.js","runtime","vendors"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vYWN0aW9ucy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9jb21wb25lbnRzL0FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2NvbXBvbmVudHMvaGVhZGVyL0hlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2NvbmZpZ3VyZVN0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vcmVkdWNlcnMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vcmVkdWNlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9yZWR1Y2Vycy9yZWNpcGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vcmVkdWNlcnMvdXRpbHMvY3JlYXRlTWFwcGVkUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL3RoZW1lLmpzIl0sIm5hbWVzIjpbInN0b3JlIiwiY29uZmlndXJlU3RvcmUiLCJ3aW5kb3ciLCJfX0lOSVRJQUxfREFUQV9fIiwiTWFpbiIsInVzZUVmZmVjdCIsImpzc1N0eWxlcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmVDaGlsZCIsInRoZW1lIiwicmVuZGVyQXBwIiwiaHlkcmF0ZSIsImdldEVsZW1lbnRCeUlkIiwiQVBQX0lOSVQiLCJhcHBJbml0IiwidHlwZSIsImFwcEluaXRPbmNlIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsImFwcCIsImlzSW5pdGlhbGl6ZWQiLCJBcHAiLCJDb21wb25lbnQiLCJIb21lIiwiRGFzaGJvYXJkIiwiTm90Rm91bmQiLCJ0YWJMb2NhdGlvbk1hcCIsIkhlYWRlciIsImxvY2F0aW9uIiwidXNlTG9jYXRpb24iLCJpbml0aWFsVGFiVmFsdWUiLCJwYXRobmFtZSIsInVzZVN0YXRlIiwidmFsdWUiLCJzZXRWYWx1ZSIsInVzZURpc3BhdGNoIiwiaGFuZGxlQ2hhbmdlIiwiZXZlbnQiLCJuZXdWYWx1ZSIsIm9uQ2xpY2tIYW5kbGVyIiwiTGluayIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsInByZWxvYWRlZFN0YXRlIiwibWlkZGxld2FyZSIsInRodW5rTWlkZGxld2FyZSIsInByb2Nlc3MiLCJjcmVhdGVMb2dnZXIiLCJyZXF1aXJlIiwicHVzaCIsImNvbGxhcHNlZCIsImNyZWF0ZVN0b3JlIiwicm9vdFJlZHVjZXIiLCJhcHBseU1pZGRsZXdhcmUiLCJpbml0aWFsU3RhdGUiLCJjcmVhdGVNYXBwZWRSZWR1Y2VyIiwiY29tYmluZVJlZHVjZXJzIiwicmVjaXBlcyIsImxpc3QiLCJzdGF0ZSIsImhhbmRsZXJzIiwiYWN0aW9uIiwiaGFuZGxlciIsImNyZWF0ZU11aVRoZW1lIiwicGFsZXR0ZSIsInByaW1hcnkiLCJsaWdodCIsIm1haW4iLCJkYXJrIiwiY29udHJhc3RUZXh0Iiwic2Vjb25kYXJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLEtBQUssR0FBR0Msc0VBQWMsQ0FBQ0MsTUFBTSxDQUFDQyxnQkFBUixDQUE1Qjs7QUFFQSxJQUFNQyxJQUFJLEdBQUcsU0FBUEEsSUFBTyxHQUFNO0FBQ2pCQyx5REFBUyxDQUFDLFlBQU07QUFDZCxRQUFNQyxTQUFTLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixrQkFBdkIsQ0FBbEI7O0FBQ0EsUUFBSUYsU0FBSixFQUFlO0FBQ2JBLGVBQVMsQ0FBQ0csYUFBVixDQUF3QkMsV0FBeEIsQ0FBb0NKLFNBQXBDO0FBQ0Q7QUFDRixHQUxRLEVBS04sRUFMTSxDQUFUO0FBT0Esc0JBQ0UsMkRBQUMsc0VBQUQ7QUFBZSxTQUFLLEVBQUVL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LEVBQVFFLE1BQVIsQ0FBZDtBQUNELEdBUkQ7QUFTRCxDOzs7Ozs7Ozs7Ozs7QUNWRDtBQUFBO0FBQUE7QUFFQSxJQUFNckQsS0FBSyxHQUFHdUQsK0VBQWMsQ0FBQztBQUMzQkMsU0FBTyxFQUFFO0FBQ1BDLFdBQU8sRUFBRTtBQUNQQyxXQUFLLEVBQUUsU0FEQTtBQUVQQyxVQUFJLEVBQUUsU0FGQztBQUdQQyxVQUFJLEVBQUUsU0FIQztBQUlQQyxrQkFBWSxFQUFFO0FBSlAsS0FERjtBQU9QQyxhQUFTLEVBQUU7QUFDVEosV0FBSyxFQUFFLFNBREU7QUFFVEMsVUFBSSxFQUFFLFNBRkc7QUFHVEMsVUFBSSxFQUFFLFNBSEc7QUFJVEMsa0JBQVksRUFBRTtBQUpMO0FBUEo7QUFEa0IsQ0FBRCxDQUE1QjtBQWlCZTdELG9FQUFmLEUiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCAndHlwZWZhY2Utcm9ib3RvJztcblxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaHlkcmF0ZSB9IGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgQnJvd3NlclJvdXRlciB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzJztcblxuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJy4uL2NvbW1vbi9jb25maWd1cmVTdG9yZSc7XG5pbXBvcnQgQXBwIGZyb20gXCIuLi9jb21tb24vY29tcG9uZW50cy9BcHBcIjtcbmltcG9ydCB0aGVtZSBmcm9tICcuLi9jb21tb24vdGhlbWUnO1xuXG5jb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKHdpbmRvdy5fX0lOSVRJQUxfREFUQV9fKTtcblxuY29uc3QgTWFpbiA9ICgpID0+IHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBqc3NTdHlsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjanNzLXNlcnZlci1zaWRlJyk7XG4gICAgaWYgKGpzc1N0eWxlcykge1xuICAgICAganNzU3R5bGVzLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoanNzU3R5bGVzKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxUaGVtZVByb3ZpZGVyIHRoZW1lPXt0aGVtZX0+XG4gICAgICA8QXBwIC8+XG4gICAgPC9UaGVtZVByb3ZpZGVyPlxuICApO1xufTtcblxuY29uc3QgcmVuZGVyQXBwID0gKCkgPT4gaHlkcmF0ZShcbiAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgPEJyb3dzZXJSb3V0ZXI+XG4gICAgICA8TWFpbiAvPlxuICAgIDwvQnJvd3NlclJvdXRlcj5cbiAgPC9Qcm92aWRlcj4sIFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKVxuKTtcblxuLy8gaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgbW9kdWxlLmhvdCkge1xuLy8gICBtb2R1bGUuaG90LmFjY2VwdCgnLi9jb21wb25lbnRzL0FwcCcsIHJlbmRlckFwcCk7XG4vLyB9XG5cbnJlbmRlckFwcCgpOyIsImV4cG9ydCBjb25zdCBBUFBfSU5JVCA9ICdBUFBfSU5JVCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBJbml0KCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFQUF9JTklULFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwSW5pdE9uY2UoKSB7XG4gIHJldHVybiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgY29uc3QgeyBhcHAgfSA9IGdldFN0YXRlKCk7XG4gICAgXG4gICAgaWYgKCFhcHAuaXNJbml0aWFsaXplZCkge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBBUFBfSU5JVCxcbiAgICAgIH0pO1xuICAgIH0gXG4gIH07XG59IiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgU3dpdGNoLCBSb3V0ZSB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5pbXBvcnQgeyBDc3NCYXNlbGluZSwgQ29udGFpbmVyIH0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUnO1xuaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL3N0eWxlcyc7XG5cbmltcG9ydCBIZWFkZXIgZnJvbSAnLi9oZWFkZXIvSGVhZGVyJztcbmltcG9ydCB0aGVtZSBmcm9tICcuLi90aGVtZSc7XG5cbmNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFRoZW1lUHJvdmlkZXIgdGhlbWU9e3RoZW1lfT5cbiAgICAgICAgPENzc0Jhc2VsaW5lIC8+XG4gICAgICAgIDxIZWFkZXIgLz5cbiAgICAgICAgPENvbnRhaW5lciBmaXhlZCBkaXNhYmxlR3V0dGVycz5cbiAgICAgICAgICA8U3dpdGNoPlxuICAgICAgICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9XCIvXCI+XG4gICAgICAgICAgICAgIDxIb21lIC8+XG4gICAgICAgICAgICA8L1JvdXRlPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvZGFzaGJvYXJkXCI+XG4gICAgICAgICAgICAgIDxEYXNoYm9hcmQvPlxuICAgICAgICAgICAgPC9Sb3V0ZT5cbiAgICAgICAgICAgIDxOb3RGb3VuZCBkZWZhdWx0IC8+XG4gICAgICAgICAgPC9Td2l0Y2g+XG4gICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgPC9UaGVtZVByb3ZpZGVyPlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgSG9tZSA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGgyPldlbGNvbWUgSE9NRTwvaDI+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5jb25zdCBEYXNoYm9hcmQgPSAoKSA9PiAoXG4gIDxkaXY+XG4gICAgPGgyPkRhc2hib2FyZDwvaDI+XG4gIDwvZGl2PlxuKTtcblxuY29uc3QgTm90Rm91bmQgPSAoKSA9PiA8ZGl2PlNvcnJ5LCBub3RoaW5nIGhlcmU8L2Rpdj47XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZX0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IHVzZURpc3BhdGNoIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5pbXBvcnQgeyBhcHBJbml0T25jZSB9IGZyb20gJy4uLy4uL2FjdGlvbnMvYXBwJztcbmltcG9ydCB7IEFwcEJhciwgVGFicywgVGFiIH0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUnO1xuaW1wb3J0IHsgdXNlTG9jYXRpb24gfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuY29uc3QgdGFiTG9jYXRpb25NYXAgPSB7XG4gICcvaG9tZSc6IDAsXG4gICcvZGFzaGJvYXJkJzogMSxcbiAgJy9yZWNpcGVzJzogMixcbn07XG5cbmNvbnN0IEhlYWRlciA9ICgpID0+IHtcbiAgY29uc3QgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpO1xuICBjb25zdCBpbml0aWFsVGFiVmFsdWUgPSB0YWJMb2NhdGlvbk1hcFtsb2NhdGlvbi5wYXRobmFtZV0gfHwgMDtcbiAgY29uc3QgW3ZhbHVlLCBzZXRWYWx1ZV0gPSB1c2VTdGF0ZShpbml0aWFsVGFiVmFsdWUpO1xuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XG5cbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKGV2ZW50LCBuZXdWYWx1ZSkgPT4ge1xuICAgIHNldFZhbHVlKG5ld1ZhbHVlKTtcbiAgfTtcblxuICBjb25zdCBvbkNsaWNrSGFuZGxlciA9ICgpID0+IHtcbiAgICBkaXNwYXRjaChhcHBJbml0T25jZSgpKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxBcHBCYXIgcG9zaXRpb249XCJzdGF0aWNcIj5cbiAgICAgIDxUYWJzIHZhbHVlPXt2YWx1ZX0gb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX0+XG4gICAgICAgIDxUYWIgbGFiZWw9XCJIb21lXCIgdG89XCIvXCIgY29tcG9uZW50PXtMaW5rfSBvbkNsaWNrPXtvbkNsaWNrSGFuZGxlcn0vPlxuICAgICAgICA8VGFiIGxhYmVsPVwiRGFzaGJvYXJkXCIgdG89XCIvZGFzaGJvYXJkXCIgY29tcG9uZW50PXtMaW5rfSAvPlxuICAgICAgICA8VGFiIGxhYmVsPVwiUmVjaXBlc1wiICB0bz1cIi9yZWNpcGVzXCIgY29tcG9uZW50PXtMaW5rfSAvPlxuICAgICAgPC9UYWJzPlxuICAgIDwvQXBwQmFyPlxuICApO1xufTtcblxuSGVhZGVyLnByb3BUeXBlcyA9IHtcbiAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXI7IiwiaW1wb3J0IHsgYXBwbHlNaWRkbGV3YXJlLCBjcmVhdGVTdG9yZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB0aHVua01pZGRsZXdhcmUgZnJvbSAncmVkdXgtdGh1bmsnO1xuaW1wb3J0IHJvb3RSZWR1Y2VyIGZyb20gJy4vcmVkdWNlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25maWd1cmVTdG9yZShwcmVsb2FkZWRTdGF0ZSkge1xuICBjb25zdCBtaWRkbGV3YXJlID0gW3RodW5rTWlkZGxld2FyZV07XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBjb25zdCBjcmVhdGVMb2dnZXIgPSByZXF1aXJlKCdyZWR1eC1sb2dnZXInKS5jcmVhdGVMb2dnZXI7XG4gICAgbWlkZGxld2FyZS5wdXNoKGNyZWF0ZUxvZ2dlcih7IGNvbGxhcHNlZDogdHJ1ZSB9KSk7XG4gIH1cblxuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJvb3RSZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgYXBwbHlNaWRkbGV3YXJlKC4uLm1pZGRsZXdhcmUpKTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBtb2R1bGUuaG90KSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoJy4vcmVkdWNlcnMnLCAoKSA9PiBzdG9yZS5yZXBsYWNlUmVkdWNlcihyb290UmVkdWNlcikpO1xuICB9XG5cbiAgcmV0dXJuIHN0b3JlO1xufSIsImltcG9ydCBjcmVhdGVNYXBwZWRSZWR1Y2VyIGZyb20gJy4vdXRpbHMvY3JlYXRlTWFwcGVkUmVkdWNlcic7XG5pbXBvcnQgeyBBUFBfSU5JVCB9IGZyb20gJy4uL2FjdGlvbnMvYXBwJztcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBpc0luaXRpYWxpemVkOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZU1hcHBlZFJlZHVjZXIoaW5pdGlhbFN0YXRlLCB7XG4gIFtBUFBfSU5JVF0oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzSW5pdGlhbGl6ZWQ6IHRydWUsXG4gICAgfTtcbiAgfSxcbn0pOyIsImltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCByZWNpcGVzIGZyb20gJy4vcmVjaXBlcyc7XG5pbXBvcnQgYXBwIGZyb20gJy4vYXBwJztcblxuZXhwb3J0IGRlZmF1bHQgY29tYmluZVJlZHVjZXJzKHtcbiAgYXBwLFxuICByZWNpcGVzLFxufSk7IiwiaW1wb3J0IGNyZWF0ZU1hcHBlZFJlZHVjZXIgZnJvbSAnLi91dGlscy9jcmVhdGVNYXBwZWRSZWR1Y2VyJztcblxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICBsaXN0OiBbXSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZU1hcHBlZFJlZHVjZXIoaW5pdGlhbFN0YXRlLCB7XG4gIFsnQ1JFQVRFX1JFQ0lQRSddKHN0YXRlKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9LFxufSk7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlTWFwcGVkUmVkdWNlcihpbml0aWFsU3RhdGUsIGhhbmRsZXJzKSB7XG4gIHJldHVybiAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICAgIGNvbnN0IGhhbmRsZXIgPSBoYW5kbGVyc1thY3Rpb24udHlwZV07XG5cbiAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGFuZGxlcihzdGF0ZSwgYWN0aW9uKTtcbiAgfTtcbn1cbiIsImltcG9ydCB7IGNyZWF0ZU11aVRoZW1lIH0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzJztcblxuY29uc3QgdGhlbWUgPSBjcmVhdGVNdWlUaGVtZSh7XG4gIHBhbGV0dGU6IHtcbiAgICBwcmltYXJ5OiB7XG4gICAgICBsaWdodDogJyNmZmZmZmYnLFxuICAgICAgbWFpbjogJyNmYWZhZmEnLFxuICAgICAgZGFyazogJyNjN2M3YzcnLFxuICAgICAgY29udHJhc3RUZXh0OiAnIzAwMDAwMCcsXG4gICAgfSxcbiAgICBzZWNvbmRhcnk6IHtcbiAgICAgIGxpZ2h0OiAnIzYyNzI3YicsXG4gICAgICBtYWluOiAnIzM3NDc0ZicsXG4gICAgICBkYXJrOiAnIzEwMjAyNycsXG4gICAgICBjb250cmFzdFRleHQ6ICcjZmZmZmZmJyxcbiAgICB9LFxuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHRoZW1lOyJdLCJzb3VyY2VSb290IjoiIn0=