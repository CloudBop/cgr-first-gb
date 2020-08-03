// global wp JS in admin backend
var registerBlockType = wp.blocks.registerBlockType;
// js version of php internationalization fn for text
var __ = wp.i18n.__;
// wordpress react
var el = wp.element.createElement;
//
registerBlockType('cgr-first-gb/firstblock', {
  title: __('First Block', 'cgr-first-gb'),
  description: __('My first block', 'cgr-first-gb'),
  category: 'layout',
  edit: function () {
    return el('p', props = null, 'Editor')
  },
  save: function () {
    return el('p', props = null, 'Saved Content')
  }
})
