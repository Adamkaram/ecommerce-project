const NextI18Next = require("next-i18next").default;
const localeSubpaths = require("next/config").localeSubpaths;
console.log("sub path", localeSubpaths);
const localeSubpathVariations = {
  none: {},
  foreign: {
    de: "en"
  },
  all: {
    en: "ar",
    de: "en"
  }
};

module.exports = new NextI18Next({
  otherLanguages: ["en"],
  localeSubpaths: localeSubpathVariations[localeSubpaths]
});
