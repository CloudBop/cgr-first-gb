import { Component } from "@wordpress/element";
import { withSelect, withDispatch } from "@wordpress/data";
import { compose } from "@wordpress/compose";

class ReduxTodoEdit extends Component {
    state = {
        newTodo: ""
    };
    render() {
        const { todos, addTodo, toggleTodo } = this.props;
        console.log(this.props);
        return (
            <div>
                {todos.map((todo, idx) => {
                    return (
                        <div
                            key={idx}
                            style={
                                todo.completed
                                    ? {
                                          textDecoration: "line-through",
                                          opacity: "0.5"
                                      }
                                    : null
                            }
                        >
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo)}
                            />
                            {todo.title}
                        </div>
                    );
                })}

                <input
                    type="text"
                    value={this.state.newTodo}
                    onChange={e => this.setState({ newTodo: e.target.value })}
                />
                <button
                    onClick={() =>
                        addTodo({ title: this.state.newTodo, completed: false })
                    }
                >
                    Add Todo
                </button>
            </div>
        );
    }
}

export default compose([
    //
    withSelect(select => {
        return {
            todos: select("cgr-first-gb/todo").getTodos()
        };
    }),
    withDispatch(dispatch => {
        return {
            // action creatore in store
            addTodo: item => {
                dispatch("cgr-first-gb/todo").addToDo(item);
            },
            toggleTodo: todo => {
                dispatch("cgr-first-gb/todo").toggleTodo(todo);
            }
        };
    })
])(ReduxTodoEdit);
