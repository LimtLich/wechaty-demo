require('source-map-support/register')
module.exports =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express_session__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express_session___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_express_session__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_cors__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_cors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api__ = __webpack_require__(7);





var FileStore = __webpack_require__(6)(__WEBPACK_IMPORTED_MODULE_2_express_session___default.a);



const app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

// Body parser，用来封装 req.body
app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.json());
app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.urlencoded({
  extended: false
}));
// cors
app.use(__WEBPACK_IMPORTED_MODULE_4_cors___default()());

app.use(__WEBPACK_IMPORTED_MODULE_2_express_session___default()({
  secret: '7ipr-bidmarket',
  resave: false,
  saveUninitialized: true,
  resave: false,
  store: new FileStore(),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('Oh no')); //handle error
  }
  next(); //otherwise continue
});

app.set('port', port);

// Import API Routes
app.use('/api', __WEBPACK_IMPORTED_MODULE_5__api__["a" /* default */]);

// Import and Set Nuxt.js options
let config = __webpack_require__(11);
config.dev = !("development" === 'production');

// Init Nuxt.js
const nuxt = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Nuxt"](config);

// Build only in dev mode
if (config.dev) {
  const builder = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Builder"](nuxt);
  builder.build();
}

// Give nuxt middleware to express
app.use(nuxt.render);

// Listen the server
app.listen(port, host);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("session-file-store");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__users__ = __webpack_require__(8);




const router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

// Add USERS Routes
router.use(__WEBPACK_IMPORTED_MODULE_1__users__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_superagent__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_superagent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_superagent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_config__ = __webpack_require__(10);




const router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

// login
router.post('/login', async (req, res, next) => {
  let userRes = await __WEBPACK_IMPORTED_MODULE_1_superagent___default.a.post(`${__WEBPACK_IMPORTED_MODULE_2__api_config__["a" /* HOST_ROOT */]}/bidCompanyInfo/login;jsessionid=${req.body.JSESSIONID}`).type('form').set('Accept', 'application/json').send(req.body);
  if (userRes) {
    let data = JSON.parse(userRes.text);
    // console.log(data)
    req.session.authUser = data.data;
    return res.json(data);
  }
  res.status(401).json({
    message: 'Bad credentials'
  });
});

//注册
router.post('/register', async (req, res, next) => {
  let userRes = await __WEBPACK_IMPORTED_MODULE_1_superagent___default.a.post(`${__WEBPACK_IMPORTED_MODULE_2__api_config__["a" /* HOST_ROOT */]}/bidCompanyInfo/register;jsessionid=${req.body.JSESSIONID}`).type('form').set('Accept', 'application/json').send(req.body);
  if (userRes) {
    let data = JSON.parse(userRes.text);
    // console.log(data)
    req.session.authUser = data.data;
    return res.json(data);
  }
  res.status(401).json({
    message: 'Bad credentials'
  });
});

// logout
router.post('/logout', (req, res) => {
  delete req.session.authUser;
  res.json({
    ok: true
  });
});

//geetest
router.get('/geetest', async (req, res, next) => {
  let geetest = await __WEBPACK_IMPORTED_MODULE_1_superagent___default.a.get(`${__WEBPACK_IMPORTED_MODULE_2__api_config__["a" /* HOST_ROOT */]}/bidCompanyInfo/getGt3`);
  // let geetest = await request.get(`${HOST_ROOT}/bidCompanyInfo/getGt3`)
  if (geetest) {
    let data = JSON.parse(geetest.text);
    return res.json(data);
  }
  res.status(401).json({
    message: 'Bad credentials'
  });
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("superagent");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// export const HOST_ROOT = process.env.NODE_ENV !== 'production' ? 'https://weixin247.7ipr.com/bid' : 'https://exend.7ipr.com/bid'
// export const STATICS_ROOT = process.env.NODE_ENV !== 'production' ? 'https://weixin247.7ipr.com/bid/' : 'https://exend.7ipr.com/bid/'
const API_ROOT =  true ? '/api' : '/api';
/* unused harmony export API_ROOT */

const HOST_ROOT =  true ? 'https://exend.7ipr.com/bid' : 'https://exend.7ipr.com/bid';
/* harmony export (immutable) */ __webpack_exports__["a"] = HOST_ROOT;

const STATICS_ROOT =  true ? 'https://exend.7ipr.com/bid/' : 'https://exend.7ipr.com/bid/';
/* unused harmony export STATICS_ROOT */

const FILE_ROOT =  true ? "https://meadend.7ipr.com" : "https://meadend.7ipr.com";
/* unused harmony export FILE_ROOT */

const DI_BACKEND =  true ? 'https://diweixin.7ipr.com' : 'https://diweixin.7ipr.com';
/* unused harmony export DI_BACKEND */


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'wechaty-demo',
    meta: [{
      charset: 'utf-8'
    }, {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }, {
      hid: 'description',
      name: 'description',
      content: 'Nuxt.js project'
    }],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }, {
      rel: 'stylesheet',
      href: "https://unpkg.com/element-ui/lib/theme-chalk/index.css"
    }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLINT on save
     */
    vendor: ['element-ui'],
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
      config.devtool = false;
    }
  },
  // 组件缓存
  cache: true,
  // 插件
  plugins: [{
    src: '~/plugins/element',
    ssr: true
  }]
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.map