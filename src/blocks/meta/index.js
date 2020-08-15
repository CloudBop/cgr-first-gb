import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
// import { withSelect } from "@wordpress/data";
import { TextControl } from "@wordpress/components";

registerBlockType("cgr-first-gb/meta", {
    title: __("Meta data control", "cgr-first-gb"),
    description: __("meta data control.", "cgr-first-gb"),
    icon: "editor-ul",
    category: "cgr-category",
    //
    attributes: {
        post_subtitle: {
            type: "string",
            // maps wp.data to block/attributes. This includes for updating store no need to wrap wp.data withSelect/dispatch
            source: "meta",
            meta: "_cgr_first_gb_post_subtitle"
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const onChange = value => {
            setAttributes({ post_subtitle: value });
        };
        return (
            <div>
                <TextControl
                    label={__("Post Subtitle", "cgr-first-gb")}
                    value={attributes.post_subtitle}
                    onChange={onChange}
                />
            </div>
        );
    },
    save() {
        return null;
    }
});
