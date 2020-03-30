const themeRoot = require('@vue-storefront/core/build/theme-path');

/**
* @param {object} loader
*/
function addPlugins (loader) {
  if(!loader) return

  let options ={
    ident: 'postcss',
    plugins: (loader) => [
      require('tailwindcss')(`${themeRoot}/tailwind.config.js`),
      require('postcss-flexbugs-fixes'),
      require('autoprefixer')({
        flexbox: 'no-2009'
      })
    ]
  };

  loader.options = options;
}

/**
 * @param {object} rules
 */
function addPostCSSPlugins (rules) {
  const processedLoaders = [];

  rules.forEach(rule => {
    const loader = rule.use ? rule.use.find(item => item.loader === 'postcss-loader') : null;

    if (!loader && processedLoaders.includes(loader)) return

    addPlugins(loader);
    processedLoaders.push(loader);
  });
}

module.exports = function (config, { isClient, isDev }) {
  addPostCSSPlugins(config.module.rules);

  return config;
}
