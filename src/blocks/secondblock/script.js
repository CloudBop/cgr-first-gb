import './style.scss';

const $ = jQuery;

console.log($);

$(document).on("click", ".wp-block-cgr-first-gb-secondblock", () => {
  alert('hello world!')
})