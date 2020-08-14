//
import { registerStore } from "@wordpress/data";

const DEFAULT_STATE = [
    {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false
    },
    {
        userId: 1,
        id: 2,
        title: "facilis, quntiel et officia",
        completed: false
    }
];

const actions = {
    addToDo(item) {
        return {
            type: "ADD_TODO",
            payload: item
        };
    }
};

const reducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        //
        case "ADD_TODO":
            return [...state, action.payload];
        //
        //
        default:
            break;
    }
    return state;
};

const selectors = {
    getTodos: state => state
};

registerStore("crg-first-gb/todo", {
    //
    reducer,
    // getSomething
    selectors,
    // dispatch
    actions
});
