// global wp JS in admin backend
var registerBlockType = wp.blocks.registerBlockType;
// js version of php internationalization fn for text
var __ = wp.i18n.__;
// wordpress react
var el = wp.element.createElement;
//
registerBlockType('cgr-first-gb/firstblock', {
  title: __('First test Block', 'cgr-first-gb'),
  description: __('My first block', 'cgr-first-gb'),
  category: 'layout',
  // icon: 'admin-network',
  icon: {
    background: '#f03',
    foreground: '#fff',
    // can also use SVG
    src: 'admin-network'
  },
  // keyword filter/search - remember to internationalize output text
  keywords: [__('photo', 'cgr-first-gb'), __('image', 'cgr-first-gb')],
  //
  edit: function () {
    return el('p', null, 'Editor')
  },
  save: function () {
    return el('p', null, 'Saved Content')
  }
})
