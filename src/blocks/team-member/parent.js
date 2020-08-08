import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { InnerBlocks } from "@wordpress/editor";

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
    keywords: [
        __("photo", "cgr-first-gb"),
        __("image", "cgr-first-gb"),
        __("team", "cgr-first-gb"),
        __("member", "cgr-first-gb"),
        __("person", "cgr-first-gb")
    ],
    edit({ className }) {
        return (
            <div className={className}>
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
    save() {
        return (
            <div>
                <InnerBlocks.Content />
            </div>
        );
    }
});
