import { clearUserInfo,addList } from './user';

export const addListInfo = () => (dispatch) => {
    dispatch(addList());
}