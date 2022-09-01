import * as types from '../actionTypes';

const initUserInfo = {
    data: [{
        title:'任务名称1',
        content:'任务内容1',
        gmt_expire:'2022-09-01',
        status:0,
        id:1
    },{
        title:'任务名称2',
        content:'任务内容2',
        gmt_expire:'2022-09-01',
        status:0,
        id:2
    },
    {
        title:'任务名称3',
        content:'任务内容3',
        gmt_expire:'2022-09-01',
        status:1,
        id:3
    },
    {
        title:'任务名称4',
        content:'任务内容5',
        gmt_expire:'2022-09-01',
        status:0,
        id:4
    },
    {
        title:'任务名称5',
        content:'任务内容5',
        gmt_expire:'2022-09-01',
        status:1,
        id:5
    },
    {
        title:'任务名称6',
        content:'任务内容6',
        gmt_expire:'2022-09-01',
        status:0,
        id:6
    }],
    total:6,
    isLogined: false
}

export default function user(state = initUserInfo, action) {

    switch (action.type) {
        case types.ADD_LIST_DATA:
            return {
                ...state,
                data: Object.assign(state.data, action.data)
            };
        default:
            return state;
    }
}