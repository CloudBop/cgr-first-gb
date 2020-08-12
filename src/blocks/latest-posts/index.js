import Edit from "./edit";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

registerBlockType("cgr-first-gb/latest-posts", {
    title: __("Latest Posts", "cgr-first-gb"),
    description: __("Block showing latest posts", "cgr-first-gb"),
    icon: "admin-post",
    category: "cgr-category",
    edit: Edit,

    // dynamic blocks aren't generated here...
    save() {
        return null;
    }
});
