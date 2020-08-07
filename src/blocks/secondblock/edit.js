import { __ } from "@wordpress/i18n";
import {
    RichText,
    BlockControls,
    AlignmentToolbar,
    InspectorControls,
    PanelColorSettings
} from "@wordpress/editor";
import {
    Toolbar,
    DropdownMenu,
    PanelBody,
    ToggleControl,
    ColorPicker,
    ColorPalette
} from "@wordpress/components";
import { Component } from "@wordpress/element";
export default class edit extends Component {
    constructor(props) {
        super(props);
        this.onChangeEditor = this.onChangeEditor.bind(this);
        this.onChangeAlignment = this.onChangeAlignment.bind(this);
        this.onChangeBackgroundColor = this.onChangeBackgroundColor.bind(this);
        this.onChangeTextColor = this.onChangeTextColor.bind(this);
    }
    // using babel properties plugin.
    onChangeEditor = content => {
        this.setAttributes({ content });
    };
    // save alignment
    onChangeAlignment(alignment) {
        this.setAttributes({ alignment });
    }
    onChangeBackgroundColor(backgroundColor) {
        this.setAttributes({ backgroundColor });
    }
    onChangeTextColor(textColor) {
        if (typeof textColor !== "string") {
            const { hex } = textColor;
            this.setAttributes({ textColor: hex });
        }
        this.setAttributes({ textColor });
    }
    render() {
        const { className, attributes } = this.props;
        const { content, alignment, backgroundColor, textColor } = attributes;

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__("panel-test", "cgr-first-gb")}>
                        <ToggleControl
                            label={__("toggle-test", "cgr-first-gb")}
                            onChange={v => console.log(v)}
                            value={false}
                        />
                    </PanelBody>
                    <PanelBody title={__("color-picker-test", "cgr-first-gb")}>
                        <ColorPicker
                            color={"#765"}
                            onChangeComplete={this.onChangeTextColor}
                        />
                    </PanelBody>
                    <PanelBody title={__("color-picker-test", "cgr-first-gb")}>
                        <ColorPalette
                            title={__("color-palette-test", "cgr-first-gb")}
                            colors={[{ color: "#324" }, { color: "#456" }]}
                            onChange={this.onChangeBackgroundColor}
                        />
                    </PanelBody>
                    <PanelColorSettings
                        title={__("panel-color-test", "cgr-first-gb")}
                        colorSettings={[
                            {
                                // uses theme defined colors in - theme-support
                                value: backgroundColor,
                                // shows colors in sidebar dropdown
                                onChange: this.onChangeBackgroundColor,
                                label: __("bg-color", "cgr-first-gb")
                            },
                            {
                                // uses theme defined colors in - theme-support
                                value: textColor,
                                onChange: this.onChangeTextColor,
                                label: __("text-color", "cgr-first-gb")
                            }
                        ]}
                    />
                </InspectorControls>
                <BlockControls
                    controls={[
                        // either array of objects || array of array of objects. Enabling spacers on block control
                        [
                            {
                                icon: "wordpress",
                                title: __("test", "cgr-first-gb"),
                                onClick: () => alert(true),
                                isActive: false
                            }
                        ],
                        [
                            {
                                icon: "wordpress",
                                title: __("test", "cgr-first-gb"),
                                onClick: () => alert(true),
                                isActive: false
                            }
                        ]
                    ]}
                >
                    <AlignmentToolbar
                        isCollapsed={0}
                        onChange={this.onChangeAlignment}
                    />
                    <Toolbar
                        // place toolbar controls in dropdown
                        isCollapsed
                        controls={[
                            [
                                {
                                    icon: "wordpress",
                                    title: __("test", "cgr-first-gb"),
                                    onClick: () => alert(true),
                                    isActive: false
                                }
                            ],
                            [
                                {
                                    icon: "wordpress",
                                    title: __("test", "cgr-first-gb"),
                                    onClick: () => alert(true),
                                    isActive: false
                                }
                            ]
                        ]}
                    />
                    {/* Conditionally render depending on content */}
                    {content && content.length > 0 && (
                        <Toolbar>
                            <DropdownMenu
                                icon="editor-table"
                                label={__("test", "cgr-first-gb")}
                                controls={[
                                    [
                                        {
                                            icon: "wordpress",
                                            title: __("test", "cgr-first-gb"),
                                            onClick: () => alert(true),
                                            isActive: false
                                        }
                                    ],
                                    [
                                        {
                                            icon: "wordpress",
                                            title: __("test", "cgr-first-gb"),
                                            onClick: () => alert(true),
                                            isActive: false
                                        }
                                    ]
                                ]}
                            />
                        </Toolbar>
                    )}
                </BlockControls>

                <RichText
                    tagName="p"
                    className={className}
                    onChange={this.onChangeEditor}
                    value={content}
                    // RichText formatting
                    formattingControls={["bold"]}
                    style={{
                        textAlign: alignment,
                        backgroundColor: backgroundColor,
                        color: textColor
                    }}
                />
            </>
        );
    }
}
