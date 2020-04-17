// You can extend default webpack build here.
// Read more in docs: https://github.com/DivanteLtd/vue-storefront/blob/master/docs/guide/core-themes/webpack.md
const merge = require('webpack-merge');
const themeRoot = require('@vue-storefront/core/build/theme-path');

function addPostCSSPlugin (loader, plugin) {
  const plugins = loader.options.plugins instanceof Function
    ? loader.options.plugins()
    : loader.options.plugins;

  plugins.push(plugin);

  loader.options.plugins = loader.options.plugins instanceof Function
    ? () => plugins
    : plugins;
}

/**
 * Traverses webpack's module rules to find all PostCSS loaders. For each PostCSS loader
 * the 'postcss-flexbugs-fixes' plugin has to be found and it has to be configured to skip
 * @storefront-ui library from being processed.
 *
 * @param {object} rules
 */
function fixPostCSSPlugins (rules) {
  const processedLoaders = [];

  rules.forEach(rule => {
    const loader = rule.use ? rule.use.find(item => item.loader === 'postcss-loader') : null;

    if (loader && !processedLoaders.includes(loader)) {
      addPostCSSPlugin(loader, require('tailwindcss')(`${themeRoot}/tailwind.config.js`));
      processedLoaders.push(loader);
    }
  });
}

module.exports = function (config, { isClient }) {
  const mergedConfig = merge(
    { resolve: { alias: { 'src/modules/client': `${themeRoot}/config/modules` } } },
    config
  );

  fixPostCSSPlugins(mergedConfig.module.rules);

  return mergedConfig;
};
