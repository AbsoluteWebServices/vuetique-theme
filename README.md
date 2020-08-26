# vuetique-theme

A [Vue Storefront](https://www.vuestorefront.io) Theme for Passionate Developers with larger catalogs in mind, based on the
wonderful [Tailwind](https://tailwindcss.com) CSS framework.

Latest tested Vue Storefront version - [1.12.2](https://github.com/DivanteLtd/vue-storefront/tree/v1.12.2)

## Installing

Clone this theme into your Vue Storefront Theme root directory:
```bash
$ cd ./path/to/vue-storefront
$ cd src/themes
$ git clone git@github.com:AbsoluteWebServices/vuetique-theme.git vuetique
```

Open up your `config/local.json` file from your Vue Storefront project root and update the `theme` key to your cloned theme directory: `vuetique`

The result should look something like this:

```js
  // ...
  "mailchimp": {
    "endpoint": "http://localhost:8080/api/ext/mailchimp-subscribe/subscribe"
  },
  "theme": "vuetique",
  "analytics": {
  // ...
```

## Image hover support

To make image hover function, you need to make a few changes to your Vue Storefront local.json file.

The following arrays need the "media_gallery" field added:

- productList.includeFields
- productListWithChildren.includeFields
