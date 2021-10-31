const StyleDictionary = require("style-dictionary");
const tokens = require("./tokens");

/**
 * Tokens output files are generated in a file per category / component.
 */

module.exports = {
  format: {
    // Adding a custom format to show how to get an alias's name.
    customFormat: function ({ dictionary, options }) {
      return dictionary.allTokens.map(token => {
        let value = JSON.stringify(token.value);
        // new option added to decide whether or not to output references
        if (options.outputReferences) {
          // the `dictionary` object now has `usesReference()` and
          // `getReferences()` methods. `usesReference()` will return true if
          // the value has a reference in it. `getReferences()` will return
          // an array of references to the whole tokens so that you can access
          // their names or any other attributes.
          if (dictionary.usesReference(token.original.value)) {
            const refs = dictionary.getReferences(token.original.value);
            refs.forEach(ref => {
              value = value.replace(ref.value, function () {
                return `${ref.name}`;
              });
            });
          }
        }

        return `export const ${token.name} = ${value};`
      }).join(`\n`)
    }
  },
  source: ["tokens/**/*.@(json|js)"],
  platforms: {
    // "esm/category": {
    //   buildPath: "build/js/esm/",
    //   transforms: ["attribute/cti", "name/cti/camel", "size/px", "color/hex"],
    //   files: tokens.map((tokenCategory) => ({
    //     destination: `${tokenCategory}.js`,
    //     format: "javascript/es6",
    //     filter: {
    //       attributes: {
    //         category: tokenCategory,
    //       },
    //     },
    //   })),
    // },
    // "esm/index": {
    //   buildPath: "build/js/esm/",
    //   transforms: ["attribute/cti", "name/cti/camel", "size/px", "color/hex"],
    //   files: [
    //     {
    //       destination: `index.js`,
    //       format: "javascript/es6",
    //     },
    //   ],
    // },
    // "cjs/category": {
    //   buildPath: "build/js/cjs/",
    //   transforms: ["attribute/cti", "name/cti/camel", "size/px", "color/hex"],
    //   files: tokens.map((tokenCategory) => ({
    //     destination: `${tokenCategory}.js`,
    //     format: "custom/cjsmodule",
    //     filter: {
    //       attributes: {
    //         category: tokenCategory,
    //       },
    //     },
    //   })),
    // },
    // "cjs/index": {
    //   buildPath: "build/js/cjs/",
    //   transforms: ["attribute/cti", "name/cti/camel", "size/px", "color/hex"],
    //   files: [
    //     {
    //       destination: `index.js`,
    //       format: "custom/cjsmodule",
    //     },
    //   ],
    // },

    // Web output in scss format
    scss: {
      transformGroup: "scss",
      buildPath: `../components/src/assets/tokens/base/`,
      files: [
        {
          destination: `tokens.scss`,
          format: "scss/variables",
          options: {
            outputReferences: true, // new setting, if true will use variable references
          },
        },
      ],
    },
    // Web output in scss partialformat
    "scss/category": {
      transformGroup: "scss",
      buildPath: `../components/src/assets/tokens/components/`,
      files: tokens.map((tokenCategory) => ({
        destination: `_${tokenCategory}.scss`,
        format: "scss/variables",
        options: {
          outputReferences: true, // new setting, if true will use variable references
        },
        filter: {
          attributes: {
            category: tokenCategory,
          },
        },
      })),
    },
  },
};

StyleDictionary.registerFormat({
  name: "custom/cjsmodule",
  formatter: function ({ dictionary }) {
    return `module.exports = {${dictionary.allTokens.map(
      (token) => `\n\t${token.name}: "${token.value}"`
    )}\n};`;
  },
});
