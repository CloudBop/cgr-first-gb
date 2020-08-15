import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";

const TodoCount = props => {
    const { totalTodos, completedTodos, uncompletedTodos } = props;
    return (
        <div>
            <h2>Todo Info</h2>
            <p>total: {totalTodos}</p>
            <p>completed: {completedTodos}</p>
            <p>uncompleted: {uncompletedTodos}</p>
        </div>
    );
};

const ReduxWrappedTodoCount = withSelect(select => ({
    totalTodos: select("cgr-first-gb/todo").getTotalTodos(),
    completedTodos: select("cgr-first-gb/todo").getCompletedTodos(),
    uncompletedTodos: select("cgr-first-gb/todo").getUncompletedTodos()
}))(TodoCount);

registerBlockType("cgr-first-gb/todo-list-info", {
    title: __("Redux Todo List Info", "cgr-first-gb"),
    description: __("A todo list info.", "cgr-first-gb"),
    icon: "editor-ul",
    category: "cgr-category",
    edit: ReduxWrappedTodoCount,
    save() {
        return null;
    }
});
