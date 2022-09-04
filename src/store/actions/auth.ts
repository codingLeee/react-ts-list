import {addList } from './user';

export const addListInfo = () => (dispatch:any) => {
    dispatch(addList());
}