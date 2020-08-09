import { Component } from "@wordpress/element";
import { RichText, MediaPlaceholder } from "@wordpress/editor";
import { __ } from "@wordpress/i18n";
import { isBlobUrl } from "@wordpress/blob";
import { Spinner } from "@wordpress/components";
class TeamMemberEdit extends Component {
    constructor(props) {
        super(props);
    }
    onChangeTitle = title => this.props.setAttributes({ title });
    onChangeInfo = info => this.props.setAttributes({ info });
    onSelectImage = ({ id, url, img }, ...image) =>
        this.props.setAttributes({ id, url, img });
    //
    render() {
        // wp generated classname
        const { className, attributes } = this.props;
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
                        onSelectURL={url => console.log("url", url)}
                        onError={error => console.log("error", error)}
                        accept={"image/*"}
                        allowedTypes={["image"]}
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

export default TeamMemberEdit;
