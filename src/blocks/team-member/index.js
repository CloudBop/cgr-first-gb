// back
import "./style.editor.scss";
// global wp JS in admin backend
import { registerBlockType, createBlock } from "@wordpress/blocks";
// js version of php internationalization fn for text
import { __ } from "@wordpress/i18n";
import Edit from "./edit";
//
const attributes = {
    title: {
        type: "string",
        source: "html",
        selector: "h4"
    },
    info: {
        type: "string",
        source: "html",
        selector: "p"
    }
};

registerBlockType("cgr-first-gb/team-member", {
    title: __("Team Members", "cgr-first-gb"),
    description: __("My Third block", "cgr-first-gb"),
    category: "cgr-category",
    // icon: 'admin-network',
    icon: {
        background: "#f03",
        foreground: "#fff",
        // can also use SVG
        src: "admin-tools"
    },
    // keyword filter/search - remember to internationalize output text
    keywords: [
        __("photo", "cgr-first-gb"),
        __("image", "cgr-first-gb"),
        __("team", "cgr-first-gb"),
        __("member", "cgr-first-gb"),
        __("person", "cgr-first-gb")
    ],
    styles: [
        {
            name: "rounded",
            label: __("Rounded", "cgr-first-gb"),
            isDefault: true
        },
        {
            name: "squared",
            label: __("Squared", "cgr-first-gb"),
            isDefault: false
        },
        {
            name: "outline",
            label: __("Outlined", "cgr-first-gb"),
            isDefault: false
        }
    ],
    attributes: attributes,
    edit: Edit,
    save: () => null
});
