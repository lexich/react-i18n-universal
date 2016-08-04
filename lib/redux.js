"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.changeConstantName = changeConstantName;
exports.actionUpdate = actionUpdate;

exports.default = function () {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  if (!opts.reducerName) {
    throw new Error("Missing 'reducerName' in opts");
  }
  var locales = opts.locales || {};
  var languages = Object.keys(locales || {});
  var defaultLocale = opts.defaultLocale || languages[0] || "";
  var initialState = {
    language: defaultLocale,
    languages: languages.indexOf(defaultLocale) === -1 ? languages.concat(defaultLocale) : languages
  };

  function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    if (action.type) {
      opts.cb instanceof Function && opts.cb(action.language);
      return _extends({}, state, { language: action.language });
    } else {
      return state;
    }
  }

  return {
    reducer: reducer,
    I18N: (0, _reactRedux.connect)(function (state) {
      return { language: state[opts.reducerName].language };
    })((0, _i18n2.default)(locales, defaultLocale, opts.className))
  };
};

var _reactRedux = require("react-redux");

var _i18n = require("./i18n");

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var constant = {
  update: "I18N_UPDATE"
};

function changeConstantName(constantName) {
  constant.update = constantName;
}

function actionUpdate(language) {
  return { type: constant.update, language: language };
}
/**
 * [description]
 * @param opts
 * @param opts.reducerName    - required opt, name of reducer which will be
 *                              register in redux
 * @param opts.locales        - object of locales [key] - name of locale
 *                              [value] - object of locales
 * @param opts.defaultLocale  - locale by default
 * @param opts.cb             - callback which call after change locale
 * @param opts.className      - className for i18n html inject
 *                              'i18n-text' by default
 * @return {reducer, I18N}    - reducer - reducer which you should register in
 *                              in redux systen with reducerName
 *                              I18N localization React component layer
 */
//# sourceMappingURL=redux.js.map