//
import { registerStore, dispatch } from "@wordpress/data";

const DEFAULT_STATE = [
    // {
    //   userId: 1,
    //   id: 1,
    //   title: "delectus aut autem",
    //   completed: false
    // },
    // {
    //   userId: 1,
    //   id: 2,
    //   title: "facilis, quntiel et officia",
    //   completed: false
    // }
];

const actions = {
    addToDo(item) {
        return {
            type: "ADD_TODO",
            payload: item
        };
    },
    populateToDos(todos) {
        return {
            type: "POPULATE_TODOS",
            payload: todos
        };
    },
    fetchTodos() {
        return {
            type: "FETCH_TODOS"
        };
    },
    *toggleTodo(todo, idx) {
        // disable btn while request is being made
        yield {
            type: "UPDATE_TODO",
            idx,
            todo: { ...todo, loading: true }
        };

        const response = yield {
            type: "TOGGLE_TODO",
            payload: todo
        };

        return {
            type: "UPDATE_TODO",
            idx,
            todo: response
        };
    }
};

const reducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        //
        case "ADD_TODO":
            return [...state, action.payload];
        case "POPULATE_TODOS":
            return [...state, ...action.payload];
        case "UPDATE_TODO": {
            const copy = [...state];
            copy[action.idx] = action.todo;
            return copy;
        }
        //
        //
        default:
            break;
    }
    return state;
};

const selectors = {
    getTodos(state) {
        return state;
    },
    getTotalTodos(state) {
        return state.length;
    },
    getCompletedTodos(state) {
        return state.filter(todo => todo.completed).length;
    },
    getUncompletedTodos(state) {
        return state.filter(todo => !todo.completed).length;
    }
};

registerStore("cgr-first-gb/todo", {
    // handle store state changes
    reducer,
    // get store state
    selectors,
    // dispatch state changes
    actions,
    controls: {
        FETCH_TODOS() {
            return fetch(
                "https://jsonplaceholder.typicode.com/todos?_limit=10"
            ).then(res => res.json());
        },
        // called via action
        TOGGLE_TODO({ payload }) {
            return fetch(
                `https://jsonplaceholder.typicode.com/todos/${payload.id}`,
                {
                    method: "PATCH",
                    body: JSON.stringify({
                        completed: !payload.completed
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }
            )
                .then(response => response.json())
                .catch(error => console.log("error", error));
        }
    },
    // action side-effects, API/AJAX requests
    resolvers: {
        *getTodos() {
            // generator, pause and allow other execution until promise is fulfilled
            const todos = yield actions.fetchTodos();
            // ... a little like SAGAS
            return actions.populateToDos(todos);
        }
    }
});
