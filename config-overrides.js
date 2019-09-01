const { useBabelRc, override, useEslintRc , addBabelPlugins} = require('customize-cra')

module.exports = override(

  ...addBabelPlugins([
    "@babel/plugin-proposal-decorators",
    {
      "legacy": true
    }
  ],
  '@babel/plugin-proposal-optional-chaining'),
  useBabelRc(),
  useEslintRc()
);