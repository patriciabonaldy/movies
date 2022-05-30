import React, {useEffect}  from "react";
import { useSelector, useDispatch } from "react-redux";
import {Form, Image, Item, Message} from 'semantic-ui-react'
import * as actions from '../../store/actions';
import axios from '../../axios-catalogo';
import Aux from '../global/aux/Aux';
import {addActor} from "../../store/actions";
import Modal from "../global/modal/Modal";

export default function FormMovieControl() {
    const storeCatalogo = useSelector(store => store);
    const dispatch = useDispatch()
    const errorLabel = "Campo requerido";
    const [state, setState] = React.useState({
        columns: [
            { title: "Title", field: "title", editable: "never" },
            { title: "Category", field: "category" },
            { title: "Cast", field: "cast" }
        ],
        columnsSelected: [],
        actors: [],
        data: [],
        actorsSelected: [],
        isNew: false,
    });
    const tabStyle = {};
    tabStyle.paddingLeft = `-24px;`;
    const paragraph = <Image src='/images/wireframe/short-paragraph.png' />

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
    let actor =  {"key": 1, "data": "data"};
    const setActor = (event, {value}) => {
        let data = event.target.textContent;
        actor = {"key": value, "data": data};
    }

    const addActor = () => {
        let stateNew = state
        stateNew.actorsSelected.push(actor)
        setState(stateNew);
        actor = {};
        renderActor();
    }

    let actors = [];
    const renderActor = () => {
        state.actorsSelected.forEach(function(data, idx, array){
            actors.push(data.data);
        });

        return <Message compact header='Actors'  list={actors}/>;
    }
    useEffect(renderActor, actors);

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

                </Form.Group>
                <Form.Button onClick={addActor}>Submit</Form.Button>
            </Form>
            <Modal show={true} >
                {renderActor()}
            </Modal>
        </Aux>
    );
}
