import { registerBlockType, createBlock } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { InnerBlocks, InspectorControls } from "@wordpress/editor";
import { PanelBody, RangeControl } from "@wordpress/components";

const attributes = {
    columns: {
        type: "number",
        default: 2
    }
};

registerBlockType("cgr-first-gb/team-members", {
    title: __("Team Members", "cgr-first-gb"),
    description: __("Block showing team members", "cgr-first-gb"),
    category: "cgr-category",
    // icon: 'admin-network',
    icon: {
        background: "#f03",
        foreground: "#fff",
        // can also use SVG
        src: "grid-view"
    },
    attributes,
    supports: {
        html: false,
        align: ["wide", "full"]
    },
    transforms: {
        from: [
            {
                type: "block",
                blocks: ["core/gallery"],
                transform: attributes => {
                    const { columns, images } = attributes;
                    // create inner blocks
                    let inner = images.map(({ alt, id, url }) => {
                        return createBlock("cgr-first-gb/team-member", inner);
                    });
                    // return parent
                    return createBlock(
                        "cgr-first-gb/team-members",
                        {
                            columns: columns
                        },
                        inner
                    );
                }
            }
        ]
    },

    keywords: [
        __("photo", "cgr-first-gb"),
        __("image", "cgr-first-gb"),
        __("team", "cgr-first-gb"),
        __("member", "cgr-first-gb"),
        __("person", "cgr-first-gb")
    ],
    edit({ className, attributes, setAttributes }) {
        //
        const { columns } = attributes;
        //
        return (
            <div className={`${className} has-${columns}-columns`}>
                <InspectorControls>
                    <PanelBody>
                        <RangeControl
                            label={__("Columns", "cgr-first-gb")}
                            value={columns}
                            onChange={columns => setAttributes({ columns })}
                            max={6}
                            min={1}
                            step={1}
                        />
                    </PanelBody>
                </InspectorControls>
                <InnerBlocks
                    allowedBlocks={["cgr-first-gb/team-member"]}
                    template={[
                        [
                            "cgr-first-gb/team-member",
                            { title: "Person", info: "They like having fun." }
                        ],
                        [
                            "cgr-first-gb/team-member",
                            { title: "Person", info: "They like having fun." }
                        ]
                    ]}
                    // - limit behaviour of nested blocks
                    // templateLock='all' // - locks everything
                    // templateLock='insert' // - stop outside blocks being inserted
                />
            </div>
        );
    },
    save({ attributes }) {
        const { columns } = attributes;
        return (
            <div className={`has-${columns}-columns`}>
                <InnerBlocks.Content />
            </div>
        );
    }
});
