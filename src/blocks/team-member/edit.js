import { Component } from "@wordpress/element";
import {
    RichText,
    MediaPlaceholder,
    BlockControls,
    MediaUploadCheck,
    MediaUpload,
    InspectorControls
} from "@wordpress/editor";
import { __ } from "@wordpress/i18n";
import { isBlobURL } from "@wordpress/blob";
import {
    Spinner,
    withNotices,
    Toolbar,
    IconButton,
    PanelBody,
    TextareaControl,
    SelectControl,
    Dashicon,
    Tooltip
} from "@wordpress/components";
import { withSelect } from "@wordpress/data";
class TeamMemberEdit extends Component {
    constructor(props) {
        super(props);
    }
    //
    componentDidMount() {
        const { attributes, setAttributes } = this.props;
        const { url, id } = attributes;
        // did upload fail to finished before page update
        if (url && isBlobURL(url) && !id) {
            setAttributes({
                url: "",
                alt: ""
            });
        }
    }
    //

    onChangeTitle = title => this.props.setAttributes({ title });
    onChangeInfo = info => this.props.setAttributes({ info });
    onSelectImage = ({ id, url, img }, ...image) =>
        this.props.setAttributes({ id, url, img });
    //
    onSelectUrl = ({ url }) =>
        this.props.setAttributes({ url, id: null, alt: "" });
    //
    onUploadError = msg => {
        const noticeOperations = this.props;
        noticeOperations.createErrorNotice(msg);
    };

    onRemoveImage = () =>
        this.props.setAttributes({ url: "", id: null, alt: "" });

    onUpdateAlt = alt => this.props.setAttributes({ alt });
    onSelectImageSize = url => this.props.setAttributes({ url });
    onAddNewSocial = () => {
        const { setAttributes, attributes } = this.props;
        const { social } = attributes;
        setAttributes({
            social: [...social, { icon: "wordpress", link: "" }]
        });
    };
    // get the image sizes set within the theme.
    getImageSizes() {
        // current image, theme image sizes
        const { image, imageSizes } = this.props;
        // if ajax hasn't completed
        if (!image) return [];
        let options = [];
        // image sizes of current image
        const sizes = image.media_details.sizes;
        //
        for (const key in sizes) {
            const size = sizes[key];
            // is this size set in current theme?
            const imageSize = imageSizes.find(size => size.slug === key);
            //
            if (imageSize) {
                options.push({
                    label: imageSize.name,
                    value: size.source_url
                });
            }
        }
        return options;
    }
    //
    render() {
        // wp generated classname
        const { className, attributes, noticeUI, isSelected } = this.props;
        const { title, info, url, alt, id, social } = attributes;
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__("Image Settings", "cgr-first-gb")}>
                        {
                            // N/A for linked images or blob url
                            url && !isBlobURL(url) && (
                                <TextareaControl
                                    label={__("Alt Text", "cgr-first-gb")}
                                    value={alt}
                                    onChange={this.onUpdateAlt}
                                    help={__(
                                        `Alternative text describes your image to people who can't see it. Add a short description with its key details`
                                    )}
                                />
                            )
                        }
                        {id && <p>test</p>}
                        {
                            // if img has been uploaded wp will have compiled a few sizes
                            // img sizes are defined from theme, if an img was uploaded in an old theme then it's sizes will be from the old theme settings
                            id && (
                                <SelectControl
                                    label={__("Image Size", "cgr-first-gb")}
                                    options={this.getImageSizes()}
                                    onChange={this.onSelectImageSize}
                                    value={url}
                                />
                            )
                        }
                    </PanelBody>
                </InspectorControls>
                <BlockControls>
                    {url && (
                        <Toolbar>
                            <IconButton
                                // to generate default WP hover effect
                                className="components-icon-button
                            components-toolbar__control"
                                //
                                label={__("Remove Image", "cgr-first-gb")}
                                onClick={this.onRemoveImage}
                                icon="trash"
                            />
                            {/* check user is authorized to edit/upload image */}

                            {
                                // only display edit if image has been uploaded to media library, not if set as external url
                                id && (
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            // current id
                                            value={id}
                                            allowedTypes={["image"]}
                                            onSelect={this.onSelectImage}
                                            // destructure open media lib provided by render fn
                                            render={({ open }) => {
                                                return (
                                                    <IconButton
                                                        className="components-icon-button
                                            components-toolbar__control"
                                                        //
                                                        label={__(
                                                            "Edit Image",
                                                            "cgr-first-gb"
                                                        )}
                                                        onClick={open}
                                                        icon="edit"
                                                    />
                                                );
                                            }}
                                        />
                                    </MediaUploadCheck>
                                )
                            }
                        </Toolbar>
                    )}
                </BlockControls>
                <div className={className}>
                    {url ? (
                        <>
                            <img src={url} alt={alt} />
                            {isBlobURL(url) && <Spinner />}
                        </>
                    ) : (
                        //
                        <MediaPlaceholder
                            icon={"format-image"}
                            onSelect={this.onSelectImage}
                            onSelectURL={this.onSelectUrl}
                            onError={this.onUploadError}
                            accept={"image/*"}
                            allowedTypes={["image"]}
                            // - errors
                            notices={noticeUI}
                        />
                    )}
                    <RichText
                        className={
                            "wp-block-cgr-first-gb-blocks-team-member__title"
                        }
                        tagName={"h4"}
                        onChange={this.onChangeTitle}
                        value={title}
                        placeholder={__("Member Name", "cgr-first-gb")}
                        formattingControls={[]}
                    />
                    <RichText
                        className={
                            "wp-block-cgr-first-gb-blocks-team-member__info"
                        }
                        tagName={"p"}
                        onChange={this.onChangeInfo}
                        value={info}
                        placeholder={__("Member Info", "cgr-first-gb")}
                        formattingControls={[]}
                    />

                    <div
                        className={
                            "wp-block-cgr-first-gb-blocks-team-member__info"
                        }
                    >
                        <ul className="">
                            {social.map((item, idx) => (
                                //
                                <li key={idx}>
                                    <Dashicon icon={item.icon} size={16} />
                                </li>
                            ))}
                            {isSelected && (
                                <li
                                    className={
                                        "wp-block-cgr-first-gb-blocks-team-member__addIconLI"
                                    }
                                >
                                    <Tooltip
                                        text={__("Add Item", "cgr-first-gb")}
                                    >
                                        <button
                                            className={
                                                "wp-block-cgr-first-gb-blocks-team-member__addIcon"
                                            }
                                            onClick={this.onAddNewSocial}
                                        >
                                            <Dashicon icon={"plus"} size={14} />
                                        </button>
                                    </Tooltip>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}
// like connect but for WP-redux
export default withSelect((select, props) => {
    const id = props.attributes.id;
    // passed as props
    return {
        // wp.data.select('core').getMedia('90')
        image: id ? select("core").getMedia(id) : null,
        imageSizes: select("core/editor").getEditorSettings().imageSizes
    };
})(withNotices(TeamMemberEdit));
