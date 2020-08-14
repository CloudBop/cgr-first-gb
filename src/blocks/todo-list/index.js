import edit from "./edit";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

registerBlockType("cgr-first-gb/todo-list", {
    title: __("Redux Todo List", "cgr-first-gb"),
    description: __("A todo list.", "cgr-first-gb"),
    icon: "editor-ul",
    category: "cgr-category",
    edit: edit,
    save() {
        return null;
    }
});
