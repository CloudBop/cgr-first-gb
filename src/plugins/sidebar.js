import { registerPlugin } from "@wordpress/plugins";
import {
    PluginSidebar,
    PluginSidebarMoreMenuItem,
    PluginPostStatusInfo,
    PluginPrePublishPanel,
    PluginPostPublishPanel,
    PluginBlockSettingsMenuItem,
    PluginMoreMenuItem
} from "@wordpress/edit-post";
import { __ } from "@wordpress/i18n";
import { PanelBody, TextControl } from "@wordpress/components";
import { withSelect, withDispatch } from "@wordpress/data";
import { compose } from "@wordpress/compose";

let PluginMetaFields = props => {
    return (
        <>
            <PanelBody
                title={__("Meta Fields Panel", "cgr-first-gb")}
                icon="admin-post"
                intialOpen={true}
            >
                <TextControl
                    value={props.subtitle}
                    label={__("Post Subtitle", "cgr-first-gb")}
                    onChange={value => props.onSubtitleChange(value)}
                />
            </PanelBody>
        </>
    );
};

PluginMetaFields = compose([
    withSelect(select => {
        return {
            subtitle: select("core/editor").getEditedPostAttribute("meta")[
                "_cgr_first_gb_post_subtitle"
            ]
        };
    }),
    withDispatch(dispatch => {
        return {
            onSubtitleChange: subtitle => {
                dispatch("core/editor").editPost({
                    meta: { _cgr_first_gb_post_subtitle: subtitle }
                });
            }
        };
    })
])(PluginMetaFields);

registerPlugin("cgr-first-gb-sidebar", {
    icon: "smiley",
    render: () => {
        return (
            <>
                {/* Add menu to default sidebar - if unpinned */}
                <PluginSidebarMoreMenuItem target="cgr-first-gb-sidebar">
                    {__("Meta Options", "cgr-first-gb")}
                </PluginSidebarMoreMenuItem>

                <PluginSidebar
                    name="cgr-first-gb-sidebar"
                    icon="admin-post"
                    title={__("Meta Options", "cgr-first-gb")}
                >
                    iuboiub
                    <PluginMetaFields />
                </PluginSidebar>

                <PluginPostStatusInfo>poipoino</PluginPostStatusInfo>

                <PluginPrePublishPanel title={"Pre Publish"} initialOpen={true}>
                    prePublishpanel
                </PluginPrePublishPanel>

                <PluginPostPublishPanel
                    title={"Post Publish"}
                    initialOpen={true}
                >
                    PostPublishpanel
                </PluginPostPublishPanel>

                <PluginBlockSettingsMenuItem
                    icon={"twitter"}
                    label={"klj"}
                    onClick={() => alert("test1111")}
                />

                <PluginMoreMenuItem
                    icon={"twitter"}
                    onClick={() => alert("test22")}
                >
                    eghjskhdjkhuiy
                </PluginMoreMenuItem>
            </>
        );
    }
});
