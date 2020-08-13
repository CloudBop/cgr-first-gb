import { Component } from "@wordpress/element";
// import { withSelect } from "@wordpress/data";

class ReduxEdit extends Component {
    render() {
        return (
            <div>
                <h2>
                    {
                        // wp.data
                        // .select("core/editor")
                        // .getEditedPostAttribute("title")
                        "null"
                    }
                </h2>
                <input
                    type="text"
                    value={
                        ""
                        // wp.data
                        // .select("core/editor")
                        // .getEditedPostAttribute("title")}
                        // onChange={v => console.log("v", v)}
                    }
                />
            </div>
        );
    }
}

export default ReduxEdit;
