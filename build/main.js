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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_cors__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_cors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_multer__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_multer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_multer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api__ = __webpack_require__(6);







const app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

// Body parser，用来封装 req.body
app.use(__WEBPACK_IMPORTED_MODULE_2_body_parser___default.a.json());
app.use(__WEBPACK_IMPORTED_MODULE_2_body_parser___default.a.urlencoded({
  extended: false
}));
// cors
app.use(__WEBPACK_IMPORTED_MODULE_3_cors___default()());
app.use(__WEBPACK_IMPORTED_MODULE_4_multer___default()({
  dest: '/tmp/'
}).array('image'));

app.use(function (req, res, next) {
  next(); //otherwise continue
});

app.set('port', port);

// Import API Routes
app.use('/api', __WEBPACK_IMPORTED_MODULE_5__api__["a" /* default */]);

// Import and Set Nuxt.js options
let config = __webpack_require__(14);
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
app.post('/file_upload', function (req, res) {

  console.log(req.files[0]); // 上传的文件信息

});
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

module.exports = require("body-parser");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bot__ = __webpack_require__(7);




const router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

// Add USERS Routes
router.use(__WEBPACK_IMPORTED_MODULE_1__bot__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_superagent__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_superagent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_superagent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_config__ = __webpack_require__(9);
var _this = this;




const router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();
let qrCode = null;
const {
  Wechaty,
  Room,
  MediaMessage
} = __webpack_require__(10);
const fs = __webpack_require__(11);
const mkdirp = __webpack_require__(12);
const path = __webpack_require__(13);

//本地存储目录
const dir = path.join(__dirname, '../../static/images');

//创建目录
mkdirp(dir, function (err) {
  if (err) {
    console.log(err);
  }
});

const bot = Wechaty.instance({
  profile: 'WECHATY_PROFILE'
});
bot.on('logout', user => log.info('Bot', `${user.name()} logouted`)).on('login', user => {
  console.log('Bot', `${user.name()} login`);
  bot.say('Wechaty login').catch(console.error);
}).on('scan', (url, code) => {
  if (!/201|200/.test(String(code))) {
    const loginUrl = url.replace(/\/qrcode\//, '/l/');
    // QrcodeTerminal.generate(loginUrl)
  }
  qrCode = url;

  // res.json(url)
  console.log(`${url}\n[${code}] Scan QR Code above url to log in: `);
});
bot.start();

// init
router.get('/init', async (req, res, next) => {
  let self = _this;
  if (!bot.logonoff()) {
    if (self.checkCode) {
      clearInterval(self.checkCode);
    }
    self.checkCode = setInterval(function () {
      if (qrCode) {
        clearInterval(self.checkCode);
        res.json(qrCode);
      }
    }, 1000);
  } else {
    res.json();
  }
});

//get rooms
router.get('/getUserInfo', async (req, res, next) => {
  let self = _this;
  if (self.checkLogin) {
    clearInterval(self.checkLogin);
  }
  self.checkLogin = setInterval(function () {
    if (bot.logonoff()) {
      clearInterval(self.checkLogin);
      const user = bot.self();
      res.json(user);
      // setTimeout(async function () {
      //   const user = bot.self()
      //   const roomList = await Room.findAll()
      //   res.json({
      //     user: user.name(),
      //     roomList
      //   })
      // }, 10 * 1000)
    }
    console.log(bot.logonoff());
  }, 1000);
});

// say
router.post('/sendText', async (req, res, next) => {
  const message = req.body.message;
  bot.say(message);
  // bot.logout()
  res.json("success");
});

// say
router.post('/sendMedia', async (req, res, next) => {
  console.log(req.files[0]); // 上传的文件信息
  let response;
  var des_file = dir + "/" + req.files[0].originalname;
  fs.readFile(req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if (err) {
        console.log(err);
      } else {
        bot.say(new MediaMessage(des_file));
        res.json({
          message: 'File uploaded successfully',
          filename: req.files[0].originalname
        });
      }
    });
  });
  console.log(req);
});

// say
router.get('/logout', async (req, res, next) => {
  bot.logout();
  res.json("success");
});

/* harmony default export */ __webpack_exports__["a"] = (router);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "server/api"))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("superagent");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const API_ROOT =  true ? '/api' : '/api';
/* unused harmony export API_ROOT */

const FILE_ROOT =  true ? "https://meadend.7ipr.com" : "https://meadend.7ipr.com";
/* unused harmony export FILE_ROOT */


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("wechaty");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("mkdirp");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 14 */
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
    }, {
      rel: 'stylesheet',
      href: '//at.alicdn.com/t/font_525903_2k0hqi0oteobhuxr.css'
    }],
    script: [{
      src: '//cdn.bootcss.com/jquery/3.2.1/jquery.min.js'
    }, {
      src: '//cdn.bootcss.com/jquery.form/4.2.2/jquery.form.js'
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