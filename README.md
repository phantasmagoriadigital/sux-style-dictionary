# Substrate Design System — Style Dictionary

Style Dictionary is a build tool to generate design tokens across platforms and for use in Figma.

## How it works

All of the design tokens and assets are in this package. Make any changes to suit your needs. This package has iOS, Android, and web code.

To get started, run
```
$ npm install
$ npm run build
```

The npm build task is what performs the style dictionary build steps to generate the files for each platform. Every time you change something in the style dictionary, like changing colors or adding design tokens, you will have to run this command again to generate the files.

## Structure of token definitions
📦tokens
 ┣ 📂button
 ┃ ┗ 📜base.json
 ┣ 📂color
 ┃ ┗ 📜base.json
 ┣ 📂size
 ┃ ┗ 📜base.json
 ┗ 📜index.js