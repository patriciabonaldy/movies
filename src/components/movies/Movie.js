import React, {useEffect}  from "react";
import { useDispatch } from "react-redux";
import {Button, Divider, Form, Image, Item, List} from 'semantic-ui-react'
import * as actions from '../../store/actions';
import axios from '../../axios-catalogo';
import Aux from '../global/aux/Aux';

export default function FormMovieControl() {
    const dispatch = useDispatch()
    const [state, setState] = React.useState({
        actors: [],
        data: {},
        actorsList: [],
        listActors: [],
        actorsSelectedWithKeys: []
    });
    const tabStyle = {};
    tabStyle.paddingLeft = `-24px;`;


    const fetchActors = () => {
        axios.get( '/actors')
            .then( response => {
                let newState = state;
                newState.actors = response.data;


                let listActors = [];
                newState.actors.map((el, i) => (
                    listActors.push({ key: newState.actors[i].id,
                        text: newState.actors[i].name,
                        value: newState.actors[i].id })
                ));
                newState.listActors = listActors
                setState({
                    ...newState
                });
            } )
            .catch( error => {
                console.log(error);
            } );
    }
    useEffect(fetchActors, []);

    const saveHandler = () => {
        let body = {
            "title": state.data.title,
            "category": state.data.category,
            "cast": state.data.cast,
            "actorsSelected": state.data.actorsSelected
        };
        axios.post( '/movies', body)
            .catch( error => {
                console.log(error);
            } );
        setState(state => {
            return { ...state, data: [], actorsSelected: [], actorsSelectedWithKeys: [] };
        });
    };

    const setTitle= (event, {value}) => {
        let newState = state;
        newState.data.title = value;
        setState({
            ...newState
        });
    }

    const categories = [
        { key: 'fantasy', text: 'Fantasy', value: 'fantasy' },
        { key: 'horror', text: 'Horror', value: 'horror' },
        { key: 'kids', text: 'Kids', value: 'kids' },
        { key: 'blood', text: 'Blood', value: 'blood' },
        { key: 'action', text: 'Action', value: 'action' },
        { key: 'comedy', text: 'Comedy', value: 'comedy' },
    ]
    const setCategory = (event, {value}) => {
        let newState = state;
        newState.data.category = event.target.textContent;

        setState({
            ...newState
        });
    }
    let actor =  [];
    let actorWithKeys = {};
    const setActor = (event, {value}) => {
        actor =  [];
        let data = event.target.textContent;
        actorWithKeys = {"key": value, "data": data}
        actor.push(data);
    }

    const addActor = () => {
        if (actor.length ===0){
            return
        }

        let actors = state.actorsList;
        let act2 = state.actorsSelectedWithKeys;
        actors.push(actor);
        act2.push(actorWithKeys);

        let newState = state;
        newState.data.actorsSelected = actors;
        newState.data.cast = act2;
        setState({
            ...newState,
            actorsSelected: actors,
            actorsSelectedWithKeys: act2
        });
    }

    const displayListActors = () =>
        state.actorsList.map((el, i) => (
            <List.Item key={`${i}-${state.actorsList[i]}`}>
                <Item.Content>
                    {state.actorsList[i]}
                </Item.Content>
                <Item.Extra>
                    <Button floated='right'>Action</Button>
                </Item.Extra>
            </List.Item>
    ));
    useEffect(fetchActors, state.actorsList);

    return (
        <Aux>
            <Form >
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Title' placeholder='title' onChange={setTitle}/>
                    <Form.Select
                        fluid
                        label='Category'
                        options={categories}
                        placeholder='category'
                        onChange={setCategory}
                    />
                    <Form.Field>
                        <Form.Select
                            fluid
                            label='Actors'
                            options={state.listActors}
                            placeholder='Actors'
                            onChange={setActor}
                        />
                        <Form.Button
                            color='teal'
                            content='Add Actor'
                            icon='add'
                            labelPosition='left'
                            onClick={addActor}
                        />
                    </Form.Field>
                </Form.Group>
                <List divided style={{ widths:200 }} size="small">
                    {displayListActors()}
                </List>
                <Divider hidden />
                <Button type='submit' color='teal' onClick={saveHandler}>Submit</Button>
            </Form>
        </Aux>
    );
}
