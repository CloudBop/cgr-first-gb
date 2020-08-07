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
registerBlockType("cgr-first-gb/secondblock", {
    title: __("Second Block", "cgr-first-gb"),
    description: __("My Second block", "cgr-first-gb"),
    category: "cgr-category",
    // icon: 'admin-network',
    icon: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="24"
            viewBox="0 0 24 24"
            width="24"
        >
            <g>
                <rect fill="none" height="24" width="24" />
            </g>
            <g>
                <g>
                    <g>
                        <path d="M23,5.5V20c0,2.2-1.8,4-4,4h-7.3c-1.08,0-2.1-0.43-2.85-1.19L1,14.83c0,0,1.26-1.23,1.3-1.25 c0.22-0.19,0.49-0.29,0.79-0.29c0.22,0,0.42,0.06,0.6,0.16C3.73,13.46,8,15.91,8,15.91V4c0-0.83,0.67-1.5,1.5-1.5S11,3.17,11,4v7 h1V1.5C12,0.67,12.67,0,13.5,0S15,0.67,15,1.5V11h1V2.5C16,1.67,16.67,1,17.5,1S19,1.67,19,2.5V11h1V5.5C20,4.67,20.67,4,21.5,4 S23,4.67,23,5.5z" />
                    </g>
                </g>
            </g>
        </svg>
    ),
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
