// back
import "./styles.editor.scss";
import "./parent";
// global wp JS in admin backend
import { registerBlockType, createBlock } from "@wordpress/blocks";
// js version of php internationalization fn for text
import { __ } from "@wordpress/i18n";
import Edit from "./edit";
import { RichText } from "@wordpress/editor";
import { Dashicon } from "@wordpress/components";
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
    },
    id: {
        type: "number"
    },
    alt: {
        type: "string",
        source: "attribute",
        selector: "img",
        attribute: "alt",
        default: ""
    },
    url: {
        type: "string",
        source: "attribute",
        selector: "img",
        attribute: "src"
    },
    social: {
        type: "array",
        default: [
            { link: "https://facebook.com", icon: "wordpress" },
            { link: "https://facebook.com", icon: "wordpress" }
        ],
        // store and retrieve the data from the markup as opposed to storing in JSON within GB
        source: "query",
        selector: "wp-block-cgr-first-gb-team-member__social ul li",
        // data to pull from markup
        query: {
            icon: {
                source: "attribute",
                attribute: "data-icon"
            },
            link: {
                source: "attribute",
                selector: "a",
                attribute: "href"
            }
        }
    }
};

registerBlockType("cgr-first-gb/team-member", {
    title: __("Team Member", "cgr-first-gb"),
    description: __("My Third block", "cgr-first-gb"),
    category: "cgr-category",
    // icon: 'admin-network',
    icon: {
        background: "#f03",
        foreground: "#fff",
        // can also use SVG
        src: "admin-tools"
    },
    //
    parent: ["cgr-first-gb/team-members"],
    supports: {
        reusable: false,
        html: false
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
    save: ({ attributes }) => {
        const { title, info, url, alt, id, social } = attributes;

        return (
            // div.classname auto-set by GB
            <div>
                {url && (
                    <img
                        src={url}
                        alt={alt}
                        id={id ? "wp-image-${id}" : null}
                    />
                )}
                {title && (
                    <RichText.Content
                        className={
                            "wp-block-cgr-first-gb-blocks-team-member__title"
                        }
                        tagName={"h4"}
                        value={title}
                    />
                )}

                {info && (
                    <RichText.Content
                        className={
                            "wp-block-cgr-first-gb-blocks-team-member__info"
                        }
                        tagName={"p"}
                        value={info}
                    />
                )}
                {social.length > 0 && (
                    <div
                        className={"wp-block-cgr-first-gb-team-member__social"}
                    >
                        <ul className="">
                            {social.map((item, idx) => (
                                //
                                <li key={"social_" + idx} data-icon={item.icon}>
                                    <a
                                        href={item.link}
                                        rel={"noreferrer noopener"}
                                        target={"_blank"}
                                    >
                                        <Dashicon icon={item.icon} size={16} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
});
