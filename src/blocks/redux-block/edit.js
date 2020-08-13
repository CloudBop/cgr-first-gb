import { Component } from "@wordpress/element";
import { withSelect } from "@wordpress/data";
// import { withSelect } from "@wordpress/data";

class ReduxEdit extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>

                <input
                    type="text"
                    value={this.props.title}
                    onChange={v => console.log("v", v)}
                />
            </div>
        );
    }
}

export default withSelect(select => {
    // redux store selector
    return {
        title: select("core/editor").getEditedPostAttribute("title")
    };
})(ReduxEdit);
