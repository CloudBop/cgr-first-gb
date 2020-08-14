import { Component } from "@wordpress/element";
import { withSelect, withDispatch } from "@wordpress/data";
import { compose } from "@wordpress/compose";

class ReduxTodoEdit extends Component {
    render() {
        return <div>stuff</div>;
    }
}

export default compose([
    //
    withSelect(select => {
        return {};
    }),
    withDispatch(dispatch => {
        return {};
    })
])(ReduxTodoEdit);
