"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReplace = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (locales) {
  var _class, _temp;

  var defaultLang = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
  var className = arguments.length <= 2 || arguments[2] === undefined ? "i18n-text" : arguments[2];

  var i18nProcessor = memoize(function (lang) {
    var dict = locales[lang];
    function func(text) {
      var pattern = dict && dict[text] ? dict[text] : text;

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return args.reduce(function (m, value, i) {
        return m.replace(getReplace(i + 1), value);
      }, pattern);
    }
    func.html = function () {
      return _react2.default.createElement("span", {
        className: className,
        dangerouslySetInnerHTML: { __html: func.apply(undefined, arguments) }
      });
    };
    return func;
  });

  return _temp = _class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
    }

    _createClass(_class, [{
      key: "getChildContext",
      value: function getChildContext() {
        var _props = this.props;
        var language = _props.language;
        var i18nProcessor = _props.i18nProcessor;

        return { language: language, __: i18nProcessor(language) };
      }
    }, {
      key: "render",
      value: function render() {
        return this.props.children;
      }
    }]);

    return _class;
  }(_react2.default.Component), _class.childContextTypes = {
    language: _react.PropTypes.string,
    __: _react.PropTypes.func.isRequired
  }, _class.propTypes = {
    children: _react.PropTypes.element.isRequired,
    language: _react.PropTypes.string.isRequired,
    i18nProcessor: _react.PropTypes.func.isRequired
  }, _class.defaultProps = {
    language: defaultLang,
    i18nProcessor: i18nProcessor
  }, _temp;
};

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function memoize(fn) {
  var cache = {};
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var key = args.join("|");
    if (!cache[key]) {
      cache[key] = fn.apply(undefined, args);
    }
    return cache[key];
  };
}

var getReplace = exports.getReplace = memoize(function (i) {
  return new RegExp("%" + i, "g");
});
//# sourceMappingURL=i18n.js.map