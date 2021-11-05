const StyleDictionary = require("style-dictionary");
const tokens = require("./tokens");

// Transform custom transform for spacing
StyleDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `space/px`,
  matcher: (token) => {
    return token.attributes.category === `spacing`;
  },
  transformer: (token) => {
    return `${token}px`;
  }
});


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
  
    scss: {
      transforms: ["name/cti/kebab", "size/px", "space/px", "color/rgb"],
      buildPath: `build/scss/`,
      files: [
        {
          destination: `build/scss/all/tokens.scss`,
          format: "scss/variables",
          options: {
            outputReferences: true, // new setting, if true will use variable references
          },
        },
      ],
    },
    css: {
      transforms: ["attribute/cti", "name/cti/kebab", "time/seconds", "content/icon", "size/px", "color/css", "spacingTransform"],
      buildPath: `build/css/`,
      files: [
        {
          destination: `build/scss/all/tokens.css`,
          format: "css/variables",
          options: {
            outputReferences: true, // new setting, if true will use variable references
          },
        },
      ],
    },
    // Web output in scss partialformat
    "scss/category": {
      transformGroup: "scss",
      buildPath: `build/components/`,
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
    "figma-tokens": {
      buildPath: "build/js3/",
      // transforms: ["size/px", "color/hex"],
      transforms: ["attribute/cti", "name/cti/kebab", "time/seconds", "content/icon", "size/px", "color/css"],
      files: [
            {
              destination: `allTokens.json`,
              format: "json",
              options: {
                outputReferences: true, // new setting, if true will use variable references
              },
            },
          ],
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
