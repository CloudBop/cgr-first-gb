import "./style.scss";
// don't bundle with webpack
import $ from "jquery";

// global jquery from WP
// const $ = jQuery;

$(document).on("click", ".wp-block-cgr-first-gb-thirdblock", () => {
    console.log("clicked");
});
