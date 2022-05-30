import React, {useEffect}  from "react";
import { useSelector, useDispatch } from "react-redux";
import MaterialTable from 'material-table';
import { Form, Message } from 'semantic-ui-react'
import * as actions from '../../store/actions';
import axios from '../../axios-catalogo';
import Aux from '../global/aux/Aux';
import Modal from '../global/modal/Modal';

export default function FormMoviesControl() {
    const dispatch = useDispatch();
    const [state, setState] = React.useState({
        columns: [
            { title: "Id", field: "id", editable: "never" },
            { title: "Title", field: "title" },
            { title: "Category", field: "category" },
            { title: "Cast", field: "cast", editable: "never" }
        ],
        columnsSelected: [],
        data: [],
        isNew: false,
    });
    const tabStyle = {};
    tabStyle.paddingLeft = `-24px;`;

    const fetchMovies = () => {
        axios.get( '/movies')
            .then( response => {
                var stateNew = state
                stateNew.data = response.data
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
    useEffect(fetchMovies, []);

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
        fetchMovies();
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
        fetchMovies();
    };

    const message = <Message compact header='' content=''
    />
    return (
        <Aux>
            <Modal show={false} >
                {message}
            </Modal>
            <Form className='attached fluid segment'>
                <MaterialTable
                    title="Movies"
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
                                            dispatch(actions.addMovie(columnsSelected));
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
