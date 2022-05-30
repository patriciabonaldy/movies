import React, {useEffect}  from "react";
import { useSelector, useDispatch } from "react-redux";
import {Form, Image, Item} from 'semantic-ui-react'
import * as actions from '../../store/actions';
import axios from '../../axios-catalogo';
import Aux from '../global/aux/Aux';
import {addActor} from "../../store/actions";
import Modal from "../global/modal/Modal";

export default function FormMovieControl() {
    const dispatch = useDispatch()
    const [state, setState] = React.useState({
        columns: [
            { title: "Title", field: "title", editable: "never" },
            { title: "Category", field: "category" },
            { title: "Cast", field: "cast" }
        ],
        columnsSelected: [],
        actors: [],
        data: [],
        actorsList: [],
        actorsSelectedWithKeys: [],
        isNew: false,
    });
    const tabStyle = {};
    tabStyle.paddingLeft = `-24px;`;

    const fetchActors = () => {
        axios.get( '/actors')
            .then( response => {
                var stateNew = state
                stateNew.actors = response.data
                setState(stateNew);
                dispatch({
                    type: actions.STORE_MOVIES,
                    movie: stateNew
                });
            } )
            .catch( error => {
                console.log(error);
            } );
    }
    useEffect(fetchActors, []);

    const storageHandle = () => {
        if(state.isNew){
            saveHandler()
            return
        }

        updateHandler()
    };

    const saveHandler = () => {
        state.columnsSelected.forEach(function(data, idx, array) {
            let body = {
                "title": data.title,
                "category": data.category,
                "cast": data.cast
            };
            axios.post( '/movies', body)
            .catch( error => {
                console.log(error);
            } );
        });
        setState(state => {
            const columnsSelected = [];
            return { ...state, columnsSelected };
        });
    };

    const updateHandler = () => {
        state.columnsSelected.forEach(function(data, idx, array){
            let body = {
                "title": data.title,
                "category": data.category,
                "cast": data.cast
            };
            axios.patch( '/movies/'+data.id, body)
            .catch( error => {
                console.log(error);
            } );
        });
        setState(state => {
            const columnsSelected = [];
            return { ...state, columnsSelected };
        });
    };

    const options = [
        { key: 'm', text: 'Male', value: 'm' },
        { key: 'f', text: 'Female', value: 'f' },
    ]
    let actor =  [];
    let actorWithKeys = {};
    const setActor = (event, {value}) => {
        actor =  [];
        let data = event.target.textContent;
        actorWithKeys = {"key": value, "data": data}
        actor.push(data);
    }

    const addActor = () => {
        let actors = state.actorsList;
        let act2 = state.actorsSelectedWithKeys;
        actors.push(actor);
        act2.push(actorWithKeys);
        setState({
            ...state,
            actorsSelected: actors,
            actorsSelectedWithKeys: act2
        });
        actor = [];
    }

    const displayListActors = () =>
        state.actorsList.map((el, i) => (
            <Item key={`${el}-${state.actorsList[i]}`}>
                <Item.Content verticalAlign>
                    {state.actorsList[i]}
                </Item.Content>
            </Item>
    ));
    useEffect(fetchActors, state.actorsList);

    return (
        <Aux>
            <Form >
                <Form.Group widths='equal'>
                    <Form.Input fluid label='First name' placeholder='First name' />
                    <Form.Input fluid label='Last name' placeholder='Last name' />
                    <Form.Select
                        fluid
                        label='Actors'
                        options={options}
                        placeholder='Actors'
                        onChange={setActor}
                    />
                    <Form.Button onClick={addActor}>Add Actor</Form.Button>
                </Form.Group>

            </Form>
            <Item.Group divided>
                {displayListActors()}
            </Item.Group>
        </Aux>
    );
}
