//
import { Component } from "@wordpress/element";
import { withSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { decodeEntities } from "@wordpress/html-entities";
//
class LatestPostsEdit extends Component {
    //
    render() {
        // wp generated stuff
        const { posts, className } = this.props;
        //
        return (
            <>
                {posts && posts.length > 0 ? (
                    <ul className={className}>
                        {posts.map((post, idx) => (
                            <li key={post.id}>
                                <a
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    href={post.link}
                                >
                                    {decodeEntities(post.title.rendered)}
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>
                        {" "}
                        {posts
                            ? __("No Posts Found", "cgr-first-gb")
                            : __("Loading...", " cgr-first-gb")}{" "}
                    </div>
                )}
            </>
        );
    }
}

export default withSelect((select, props) => {
    const { attributes } = props;
    const { numberOfPosts } = attributes;
    let query = { per_page: numberOfPosts };

    return {
        posts: select("core").getEntityRecords("postType", "post", query)
    };
})(LatestPostsEdit);
