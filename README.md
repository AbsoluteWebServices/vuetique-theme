# vue-soul-theme

Vue Storefront Theme for Passionate Develeopers

## Tailwind

Add following lines to `core/build/webpack.base.config.js` in `postcssConfig` var

```js
var tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    // ...
    tailwindcss('./path/to/your/tailwind.js'),
    require('autoprefixer'),
    // ...
  ]
}
```
