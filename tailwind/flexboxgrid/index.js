const _ = require('lodash')

module.exports = function ({ columns = _.range(1, 12), gutters = {md: '0.5rem'}, variants = ['responsive']}) {
  return function ({ e, addUtilities }) {
    addUtilities([
      {
        '.row': {
          display: 'flex',
          flex: '0 1 auto',
          flexDirection: 'row',
          flexWrap: 'wrap',
          '> [class*="col-"]': {
            flexBasis: '100%',
            maxWidth: '100%'
          },
          '.col-auto': {
            flex: '0 0 auto',
            flexBasis: 'auto'
          },
          '.col-grow': {
            flex: '1 1 auto'
          }
        }
      },
      ..._.map(gutters, (size, name) => ({
        [`.row.${e(`gutter-${name}`)}`]: {
          marginLeft: `-${size}`,
          marginRight: `-${size}`,
          '> [class*="col-"]': {
            paddingLeft: size,
            paddingRight: size
          },
        },
      })),
      ...columns.map(column => ({
        [`.row > .col-${column}`]: {
          flexBasis: `${100 / (_.max(columns) + 1) * column}%`,
          maxWidth: `${100 / (_.max(columns) + 1) * column}%`
        }
      }))
    ], variants)
  }
}
