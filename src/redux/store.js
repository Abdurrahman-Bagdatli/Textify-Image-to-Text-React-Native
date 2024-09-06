import { createStore, combineReducers } from 'redux';
import dataReducer from './Reducers/DataReducer';


const store = createStore(combineReducers({
    items: dataReducer,
}));



export default store