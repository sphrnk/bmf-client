import store from '../../store/index'
// import {notesApiSlice} from '../notes/notesApiSlice'
import {clientsApiSlice} from '../client/clientsApiSlice';
import {filesApiSlice} from '../file/fileActions';
import {useEffect} from 'react';
import {Outlet} from 'react-router-dom';

const Prefetch = () => {

    useEffect(() => {
        // store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', {force: true}))
        store.dispatch(filesApiSlice.util.prefetch('getFiles', 'filesList', {force: true}))
        store.dispatch(clientsApiSlice.util.prefetch('getClients', 'clientsList', {force: true}))
    }, [])

    return <Outlet/>
}
export default Prefetch