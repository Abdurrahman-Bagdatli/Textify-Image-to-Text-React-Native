import { ADD_DATA, FETCH_DATA, REMOVE_DATA } from "../Actions/ActionsType";

const initialState = {
    data: [],
    isLogin: true,
}

const dataReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case FETCH_DATA:
            return {
                ...state,
                data: actions.payload,
                isLogin: false,
            };
        case ADD_DATA:
            return {
                ...state,
                data: [...state.data, actions.payload],
                isLogin: false,
            };
        case REMOVE_DATA:
            return {
                ...state,
                data: state.data.filter(item => item.id !== actions.payload),
                isLogin: false,
            };
        default:
            return state;
    }
}

export default dataReducer;
