import { Component } from "@wordpress/element";
import { RichText, MediaPlaceholder } from "@wordpress/editor";
import { __ } from "@wordpress/i18n";
import { isBlobUrl } from "@wordpress/blob";
import { Spinner, withNotices } from "@wordpress/components";
class TeamMemberEdit extends Component {
    constructor(props) {
        super(props);
    }
    onChangeTitle = title => this.props.setAttributes({ title });
    onChangeInfo = info => this.props.setAttributes({ info });
    onSelectImage = ({ id, url, img }, ...image) =>
        this.props.setAttributes({ id, url, img });
    //
    onSelectUrl = ({ url }) =>
        this.props.setAttributes({ url, id: null, alt: "" });
    //
    onUploadError = msg => console.log(msg);
    render() {
        // wp generated classname
        const { className, attributes, noticeUI } = this.props;
        const { title, info, url, alt } = attributes;
        return (
            <div className={className}>
                {url ? (
                    <>
                        <img src={url} alt={alt} />
                        {isBlobUrl(url) && <Spinner />}
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
                    className={"wp-block-cgr-first-gb-blocks-team-member__info"}
                    tagName={"p"}
                    onChange={this.onChangeInfo}
                    value={info}
                    placeholder={__("Member Info", "cgr-first-gb")}
                    formattingControls={[]}
                />
            </div>
        );
    }
}

export default withNotices(TeamMemberEdit);
