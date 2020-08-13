import { Component } from "@wordpress/element";
import { withSelect, withDispatch } from "@wordpress/data";
import { compose } from "@wordpress/compose";
// import { withSelect } from "@wordpress/data";

class ReduxEdit extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>

                <input
                    type="text"
                    value={this.props.title}
                    onChange={e => this.props.onTitleChange(e.target.value)}
                />
            </div>
        );
    }
}

export default compose([
    //
    withSelect(select => {
        // redux store selector -> props in edit
        return {
            title: select("core/editor").getEditedPostAttribute("title")
        };
    }),
    //
    withDispatch(dispatch => {
        return {
            // update value
            onTitleChange: title => {
                dispatch("core/editor").editPost({ title: title });
            }
        };
    })
])(ReduxEdit);
