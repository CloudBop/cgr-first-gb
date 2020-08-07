/**
 * ES6 + JSX module.
 * importing libraries allows for auto-completion and intellisense
 */
import "./styles.editor.scss";
// global wp JS in admin backend
import { registerBlockType } from "@wordpress/blocks";
// js version of php internationalization fn for text
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/editor";
import Edit from "./edit";
// wordpress react - don't need in es6-jsx module
// var el = wp.element.createElement;
//
registerBlockType("cgr-first-gb/thirdblock", {
    title: __("Third Block", "cgr-first-gb"),
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
    keywords: [__("photo", "cgr-first-gb"), __("image", "cgr-first-gb")],
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
    attributes: {
        content: {
            type: "string",
            // the store block user data, without this it is stored as json within block
            source: "html",
            selector: "p"
        },
        alignment: {
            type: "string"
        },
        backgroundColor: {
            type: "string"
        },
        textColor: {
            type: "string"
        },
        //
        // these need to be set for withColorsHOC to allow custom colors
        //
        customBackgroundColor: {
            type: "string"
        },
        customTextColor: {
            type: "string"
        }
    },
    edit: Edit,
    save: ({ attributes }) => {
        const { content, alignment, backgroundColor, textColor } = attributes;
        // need to use RichText to display inline formatting
        return (
            <RichText.Content
                value={content}
                tagName="p"
                style={{
                    textAlign: alignment,
                    backgroundColor: backgroundColor,
                    color: textColor
                }}
            />
        );
        // return el('p', props = null, 'Saved Content')
    }
});
