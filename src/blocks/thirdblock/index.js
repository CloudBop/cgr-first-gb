/**
 * ES6 + JSX module.
 * importing libraries allows for auto-completion and intellisense
 */
import "./styles.editor.scss";
// global wp JS in admin backend
import { registerBlockType } from "@wordpress/blocks";
// js version of php internationalization fn for text
import { __ } from "@wordpress/i18n";
import { RichText, getColorClassName } from "@wordpress/editor";
import classnames from "classnames";
import Edit from "./edit";
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
        customBackgroundColor: {
            type: "string"
        },
        customTextColor: {
            type: "string"
        },
        shadow: {
            type: "boolean",
            default: false
        }
        //
        // these need to be set for withColorsHOC to allow custom colors
        //
    },
    edit: Edit,
    save: ({ attributes }) => {
        const {
            content,
            alignment,
            backgroundColor,
            textColor,
            customBackgroundColor,
            customTextColor
        } = attributes;
        //
        const backgroundClass = getColorClassName(
            "background-color",
            backgroundColor
        );
        const textColorClass = getColorClassName("color", textColor);
        //
        const classes = classnames({
            // classnames: true - appemd classname if it truthy
            [backgroundClass]: backgroundClass,
            [textColorClass]: textColorClass
        });
        // let classes = '';
        // if (textColor) {
        //     classes = +' ' + textColor;
        // }
        // if (backgroundColor) {
        //     classes = +' ' + backgroundColor;
        // }

        return (
            // need to use RichText to display inline formatting
            <RichText.Content
                value={content}
                tagName="p"
                className={classes}
                style={{
                    textAlign: alignment,
                    backgroundColor: backgroundClass
                        ? undefined
                        : customBackgroundColor,
                    color: textColorClass ? undefined : customTextColor
                }}
            />
        );
        // return el('p', props = null, 'Saved Content')
    }
});
