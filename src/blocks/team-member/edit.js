import { Component } from "@wordpress/element";
import {
    RichText,
    MediaPlaceholder,
    BlockControls,
    MediaUploadCheck,
    MediaUpload
} from "@wordpress/editor";
import { __ } from "@wordpress/i18n";
import { isBlobURL } from "@wordpress/blob";
import {
    Spinner,
    withNotices,
    Toolbar,
    IconButton
} from "@wordpress/components";
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
    //
    render() {
        // wp generated classname
        const { className, attributes, noticeUI } = this.props;
        const { title, info, url, alt, id } = attributes;
        return (
            <>
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
                </div>
            </>
        );
    }
}

export default withNotices(TeamMemberEdit);
