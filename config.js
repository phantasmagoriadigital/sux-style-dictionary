const StyleDictionary = require("style-dictionary");
const tokens = require("./tokens");

// Transform custom transform for spacing & border-width
StyleDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `space/px`,
  matcher: (token) => {
    return token.attributes.category === `space` || token.attributes.category === `border-width`;
  },
  transformer: (token) => {
    return `${token.original.value}px`;
  }
}
);
StyleDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `font-weight/fallback`,
  matcher: (token) => {
    return token.attributes.category === `font-weight`;
  },
  transformer: (token) => {
    return `${token.default}`;
  }
}
);


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
      transforms: ["attribute/cti", "name/cti/kebab", "time/seconds", "content/icon", "size/px", "space/px", "color/css", "font-weight/fallback"],
      // buildPath: `build/scss/`,
      buildPath: `../components/src/assets/tokens/`,
      files: [
        {
          destination: `/base/tokens.scss`,
          format: "scss/variables",
          options: {
            outputReferences: true, // new setting, if true will use variable references
          },
        },
      ],
    },
    css: {
      transforms: ["attribute/cti", "name/cti/kebab", "time/seconds", "content/icon", "size/px", "space/px", "color/css", "font-weight/fallback"],
      // buildPath: `build/css/`,
      buildPath: `../components/src/assets/tokens/css/`,
      files: [
        {
          destination: `all/tokens.css`,
          format: "css/variables",
          options: {
            outputReferences: true, // new setting, if true will use variable references
          },
        },
      ],
    },
    // Web output in scss partialformat
    "scss/category": {
      transforms: ["attribute/cti", "name/cti/kebab", "time/seconds", "content/icon", "size/px", "space/px", "color/css"],
      // buildPath: `build/components/`,
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
    // "css/category": {
    //   transforms: ["attribute/cti", "name/cti/kebab", "time/seconds", "content/icon", "size/px", "space/px", "color/css"],
    //   // buildPath: `build/components/`,
    //   buildPath: `../components/src/assets/tokens/css/components/`,
    //   files: tokens.map((tokenCategory) => ({
    //     destination: `_${tokenCategory}.css`,
    //     format: "css/variables",
    //     options: {
    //       outputReferences: true, // new setting, if true will use variable references
    //     },
    //     filter: {
    //       attributes: {
    //         category: tokenCategory,
    //       },
    //     },
    //   })),
    // },
    // "cjs/category": {
    //   buildPath: "build/js3/",
    //   transforms: ["size/px", "color/hex"],
    //   files: [
    //         {
    //           destination: `allTokens.json`,
    //           format: "json",
    //           options: {
    //             outputReferences: true, // new setting, if true will use variable references
    //           },
    //         },
    //       ],
    // },
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
