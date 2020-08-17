//
import { Component } from "@wordpress/element";
import { withSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { decodeEntities } from "@wordpress/html-entities";
import { PanelBody, RangeControl, SelectControl } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";
//
class LatestPostsEdit extends Component {
    //

    onChangeNumberOfPosts = numberOfPosts =>
        this.props.setAttributes({ numberOfPosts });
    onChangePostListCategories = selectedCategories =>
        this.props.setAttributes(
            // stringify - this set in php as is dynamic block
            { postCategories: selectedCategories.join(",") }
        );

    render() {
        // wp generated stuff
        const { posts, className, attributes, categories } = this.props;
        // set in php
        const { numberOfPosts, postCategories } = attributes;
        //
        console.log("this.props", this.props);
        return (
            <>
                {
                    <InspectorControls>
                        <PanelBody title={__("Posts Settings", "cgr-first-gb")}>
                            <RangeControl
                                label={__("Number of posts", "cgr-first-gb")}
                                value={numberOfPosts}
                                onChange={this.onChangeNumberOfPosts}
                                min={1}
                                max={10}
                                step={1}
                            />

                            <SelectControl
                                // make array
                                multiple
                                label={__("Categories", "cgr-first-gb")}
                                onChange={this.onChangePostListCategories}
                                options={
                                    categories &&
                                    categories.map(category => ({
                                        value: category.id,
                                        label: category.name
                                    }))
                                }
                                // comma seperated string to array
                                value={
                                    postCategories && postCategories.split(",")
                                }
                            />
                        </PanelBody>
                    </InspectorControls>
                }
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
    const { numberOfPosts, postCategories } = attributes;

    let numberOfPagesQuery = { per_page: numberOfPosts };
    if (postCategories) {
        // only get selected categories
        numberOfPagesQuery["categories"] = postCategories;
    }
    // -1 === get  all the categories
    let allCategoriesQuery = { per_page: -1 };

    return {
        // using the rest API
        posts: select("core").getEntityRecords(
            "postType",
            "post",
            numberOfPagesQuery
        ),
        categories: select("core").getEntityRecords(
            "taxonomy",
            "category",
            allCategoriesQuery
        )
    };
})(LatestPostsEdit);
