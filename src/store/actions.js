export const STORE_ACTORS = 'STORE_ACTORS';
export const STORE_MOVIES = 'STORE_MOVIES';
export const SET_ACTOR = 'SET_ACTOR';

export const addActor = (columns) => ({
    type: STORE_ACTORS,
    columnsSelected: columns
})

export const addMovie = (columns) => ({
    type: STORE_MOVIES,
    columnsSelected: columns
})

export const setActor = (actor) => ({
    type: SET_ACTOR,
    actorSelected: actor
})