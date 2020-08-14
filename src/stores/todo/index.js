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
    }
};

const reducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        //
        case "ADD_TODO":
            return [...state, action.payload];
        case "POPULATE_TODOS":
            return [...state, ...action.payload];
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
