import { connect } from "react-redux";
import I18N from "./i18n";

const constant = {
  update: "I18N_UPDATE"
};

export function changeConstantName(constantName) {
  constant.update = constantName;
}

export function actionUpdate(language) {
  return { type: constant.update, language };
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
export default function(opts = {}) {
  if (!opts.reducerName) {
    throw new Error("Missing 'reducerName' in opts");
  }
  const locales = opts.locales || {};
  const languages = Object.keys(locales || {});
  const defaultLocale = opts.defaultLocale || languages[0] || "";
  const initialState = {
    language: defaultLocale,
    languages: languages.indexOf(defaultLocale) === -1 ?
      languages.concat(defaultLocale) : languages
  };

  function reducer(state=initialState, action) {
    if (action.type) {
      opts.cb instanceof Function && opts.cb(action.language);
      return { ...state, language: action.language };
    } else {
      return state;
    }
  }

  return {
    reducer,
    I18N: connect(
      (state)=> ({ language: state[opts.reducerName].language})
    )(I18N(locales, defaultLocale, opts.className))
  }
}
