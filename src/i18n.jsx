"use strict";

import React, { PropTypes } from "react";

function memoize(fn) {
  const cache = {};
  return (...args)=> {
    const key = args.join("|");
    if (!cache[key]) {
      cache[key] = fn(...args);
    }
    return cache[key];
  };
}

export const getReplace = memoize(
  (i)=> new RegExp(`%${i}`, "g"));

export default function (locales, defaultLang="", className="i18n-text") {
  const i18nProcessor = memoize((lang)=> {
    const dict = locales[lang];
    function func(text, ...args) {
      const pattern = (dict && dict[text]) ? dict[text] : text;
      return args.reduce(
        (m, value, i)=> m.replace(getReplace(i + 1), value), pattern);
    }
    func.html = (...args)=>
      <span
        className={className}
        dangerouslySetInnerHTML={{ __html: func(...args) }}
      />;
    return func;
  });

  return class extends React.Component {
    static childContextTypes = {
      language: PropTypes.string,
      __: PropTypes.func.isRequired
    }
    static propTypes = {
      children: PropTypes.element.isRequired,
      language: PropTypes.string.isRequired,
      i18nProcessor: PropTypes.func.isRequired
    };
    static defaultProps = {
      language: defaultLang,
      i18nProcessor
    };
    getChildContext() {
      const { language, i18nProcessor } = this.props;
      return { language, __: i18nProcessor(language) };
    }
    render() {
      return this.props.children;
    }
  };
}
