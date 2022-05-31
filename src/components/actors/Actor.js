import React, {useEffect}  from "react";
import { useSelector, useDispatch } from "react-redux";
import MaterialTable from 'material-table';
import { Form, Message } from 'semantic-ui-react'
import * as actions from '../../store/actions';
import axios from '../../axios-catalogo';
import Aux from '../global/aux/Aux';


export default function FormActorControl() {
    useSelector(store => store);
    const dispatch = useDispatch()
    const errorLabel = "Campo requerido";
    const [state, setState] = React.useState({
        columns: [
            { title: "Id", field: "id", editable: "never" },
            { title: "Age", field: "age" },
            { title: 'Gender', field: 'gender', lookup: { 'M': 'Male', 'F': 'Female' },},
            { title: "Name", field: "name", validate: rowData => rowData.description === '' ? errorLabel : '' }
        ],
        columnsSelected: [],
        data: [],
        isNew: false,
    });
    const tabStyle = {};
    tabStyle.paddingLeft = `-24px;`;

    const fetchActors = () => {
        axios.get( '/actors')
            .then( response => {
                var stateNew = state
                stateNew.data = response.data
                setState(stateNew);
                dispatch({
                    type: actions.STORE_ACTORS,
                    actors: stateNew
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
                "name": data.name,
                "age": data.age,
                "gender": data.gender
            };
            axios.post( '/actors', body)
            .catch( error => {
                console.log(error);
            } );
        });
        setState(state => {
            const columnsSelected = [];
            return { ...state, columnsSelected };
        });
        fetchActors();
    };

    const updateHandler = () => {
        state.columnsSelected.forEach(function(data, idx, array){
            let body = {
                "name": data.name,
                "age": data.age,
                "gender": data.gender
            };
            axios.patch( '/actors/'+data.id, body)
            .catch( error => {
                console.log(error);
            } );
        });
        setState(state => {
            const columnsSelected = [];
            return { ...state, columnsSelected };
        });
        fetchActors();
    };

    return (
        <Aux>

            <Form className='attached fluid segment'>
                <MaterialTable
                    title="Actors"
                    columns={state.columns}
                    data={state.data}
                    actions={[
                        {
                            icon: 'save',
                            tooltip: 'Save changes',
                            isFreeAction: true,
                            onClick: (event) => storageHandle()
                        }
                    ]}
                    editable={{
                        onRowAdd: newData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    setState(prevState => {
                                        const data = [...prevState.data];
                                        data.push(newData);
                                        const columnsSelected = [...prevState.columnsSelected];
                                        columnsSelected.push(newData);
                                        let isNew = true
                                        return { ...prevState, columnsSelected, data, isNew };
                                    });
                                }, 600);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        setState(prevState => {
                                            const data = [...prevState.data];
                                            const columnsSelected = [...prevState.columnsSelected];
                                            data[data.indexOf(oldData)] = newData;
                                            if(columnsSelected.length===0||columnsSelected.indexOf(oldData)<0){
                                                columnsSelected.push(newData);
                                            } else {
                                                columnsSelected[columnsSelected.indexOf(oldData)] = newData;
                                            }
                                            let isNew = false
                                            dispatch(actions.addActor(columnsSelected));
                                            return { ...prevState, data, columnsSelected, isNew };
                                        });
                                    }
                                }, 600);
                            }),
                    }}
                />
            </Form>
        </Aux>

    );
}
