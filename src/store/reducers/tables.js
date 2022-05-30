import * as actionTypes from '../actions';
import {SET_ACTOR} from "../actions";

export const initialState = {
    actors: [],
    movies: [],
    actorSelected: {},
    movieSelected: {}
};

const tableReducer = (state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.STORE_ACTORS:
            return {
                ...state,
                actors: action.actors
            }
        case actionTypes.SET_ACTOR:
            return {
                ...state,
                actorSelected: action.actorSelected
            }    
        case actionTypes.STORE_MOVIES:
            return {
                ...state,
                movies: state.movies
            }
        default:
            return state;    
    }
    
};

export default tableReducer;