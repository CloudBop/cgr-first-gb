import { __ } from "@wordpress/i18n";
import {
    RichText,
    BlockControls,
    AlignmentToolbar,
    InspectorControls,
    PanelColorSettings,
    withColors,
    ContrastChecker
} from "@wordpress/editor";
import {
    Toolbar,
    DropdownMenu,
    PanelBody,
    ToggleControl
    // ColorPicker,
    // ColorPalette
} from "@wordpress/components";
import classnames from "classnames";
import { Component } from "@wordpress/element";
class Edit extends Component {
    constructor(props) {
        super(props);
        // this.onChangeEditor = this.onChangeEditor.bind(this);
        // this.onChangeAlignment = this.onChangeAlignment.bind(this);
        // this.onChangeBackgroundColor = this.onChangeBackgroundColor.bind(this);
        // this.onChangeTextColor = this.onChangeTextColor.bind(this);
    }
    // using babel properties plugin.
    onChangeEditor = content => {
        this.props.setAttributes({ content });
    };
    // save alignment
    onChangeAlignment = alignment => {
        this.props.setAttributes({ alignment });
    };

    onToggleShadow = () => {
        console.log("this.props.attributes", this.props.attributes);
        this.props.setAttributes({ shadow: !this.props.attributes.shadow });
    };
    render() {
        const {
            className,
            attributes,
            setBackgroundColor,
            setTextColor,
            backgroundColor,
            textColor
        } = this.props;
        const { content, alignment, shadow } = attributes;
        const classes = classnames(className, {
            ["has-shadow"]: shadow
        });

        console.log("classes", classes);
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
                    <PanelColorSettings
                        title={__("panel-color-test", "cgr-first-gb")}
                        colorSettings={[
                            {
                                // uses theme defined colors in - theme-support
                                value: backgroundColor.color,
                                // shows colors in sidebar dropdown
                                onChange: setBackgroundColor,
                                label: __("bg-color", "cgr-first-gb")
                            },
                            {
                                // uses theme defined colors in - theme-support
                                value: textColor.color,
                                onChange: setTextColor,
                                label: __("text-color", "cgr-first-gb")
                            }
                        ]}
                    >
                        <ContrastChecker
                            textColor={textColor.color}
                            backgroundColor={backgroundColor.color}
                        />
                    </PanelColorSettings>
                </InspectorControls>
                <BlockControls
                    controls={[
                        // either array of objects || array of array of objects. Enabling spacers on block control
                        [
                            {
                                icon: "wordpress",
                                title: __("Shadow", "cgr-first-gb"),
                                onClick: this.onToggleShadow,
                                isActive: shadow
                            }
                        ]
                    ]}
                >
                    <AlignmentToolbar
                        isCollapsed={0}
                        onChange={this.onChangeAlignment}
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
                    className={classes}
                    onChange={this.onChangeEditor}
                    value={content}
                    // RichText formatting
                    formattingControls={["bold"]}
                    style={{
                        textAlign: alignment,
                        backgroundColor: backgroundColor.color,
                        color: textColor.color
                    }}
                />
            </>
        );
    }
}
// passed from atts in /index.js
// wp will do it's best to set class but can hardcode using object
export default withColors("backgroundColor", { textColor: "color" })(Edit);
