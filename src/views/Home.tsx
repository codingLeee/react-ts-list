 /* 
 *  作者: Jack Lee
 *  日期: 2022-08-31
 */

import * as React from 'react';
import DocumentTitle from 'react-document-title';
import { Drawer, Button, Table, Space, message, Select, Form, Input, DatePicker,Card  } from 'antd';
import { PlusOutlined  } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import '@/styles/home.less';
import store from '@/store';

interface Task {
    id: number,
    title: string,
    content: string,
    gmt_expire: number,
    status: number,
    is_major: any
}

interface Values {
    id?: number,
    title: string,
    date: any,
    content: string
}

interface IState {
    loading: boolean,
    textBtn: string,
    title: string,
    visible: boolean,
    currentRowData: Values,
    status: any,
    columns: ColumnsType<Task>,
    dataSource: Task[],
    listData: any,
    addList:any,
    modifyData:any,
    deleteId:any
}

interface IProps {
    title: string,
    textBtn: string,
    visible: boolean,
    currentRowData: Values,
    onSubmitDrawer: (values: Values, type: number) => void,
    onCloseDrawer: () => void,
    
}

const AddEditTaskForm: React.FC<IProps> = ({
    title,
    textBtn,
    visible,
    currentRowData,
    onSubmitDrawer,
    onCloseDrawer
}) => {
    const [form] = Form.useForm();
    console.log('currentRowData===', currentRowData)
    setTimeout(() => {
        form.setFieldsValue(currentRowData);
    }, 100)

    const onSubmit = () => {
        form.validateFields()
        .then((values: any) => {
            if (title === '添加任务') {
                onSubmitDrawer(values, 1);
            } else {
                onSubmitDrawer(values, 2);
            }
        })
        .catch(info => {
            console.log('Validate Failed:', info);
        })
    }

    const onReset = () => {
        form.resetFields();
    }

    const onClose = () => {
        form.resetFields();
        onCloseDrawer();
    }
    
    return (
        <Drawer
            forceRender
            title={ title }
            onClose={ onClose }
            visible={ visible }
            bodyStyle={{ paddingBottom: 80 }}
            maskClosable={ false }
            footer={
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <Button onClick={ onSubmit } type="primary">{ textBtn }</Button>
                    <Button onClick={ onClose } danger>取消</Button>
                </div>
            }
        >
            <Form
                form={ form }
                layout="vertical"
                name="form_in_modal"
            >
                <Form.Item
                    label="任务名称"
                    name="title"
                    rules={[{ required: true, message: '请输入任务名称' }]}
                >
                    <Input placeholder="请输入任务名称" />
                </Form.Item>
                <Form.Item 
                    label="截止日期"
                    name="date"
                    rules={[{ required: true, message: '请选择截止日期' }]}
                >
                    <DatePicker inputReadOnly={ true } placeholder="请选择截止日期" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item 
                    label="任务内容"
                    name="content"
                    rules={[{ required: true, message: '请输入任务内容' }]}
                >
                    <Input.TextArea rows={ 7 } placeholder="请输入任务内容" className="textarea" />
                </Form.Item>
            </Form>
        </Drawer>

    )
}

class Home extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            textBtn: '提交',
            title: '添加任务',
            currentRowData: {
                id: -1,
                title: '',
                date: '',
                content: ''
            },
            visible: false,
            dataSource: [],
            status: null,  // 0：待办 1：完成 2：删除
            columns: [
                {
                    title: '序号',
                    key: 'id',
                    align: 'center',
                    render: (text: any, record: any, index: number) => {
                        return index + 1;
                    }
                },
                {
                    title: '任务名称',
                    dataIndex: 'title',
                    key: 'title',
                    render: (text: any, record: any, index: number) => {
                        return <div>{ record.title }</div>;
                    }
                },
                {
                    title: '任务内容',
                    dataIndex: 'content',
                    key: 'content'
                },
                {
                    title: '截止日期',
                    dataIndex: 'gmt_expire',
                    key: 'gmt_expire',
                    render: (text: any, record: any) => {
                        return moment(record.gmt_expire).format('YYYY-MM-DD');
                    }
                },
                {
                    title: '任务状态',
                    dataIndex: 'status',
                    key: 'status',
                    width: 120,
                    render: (text: any, record: any) => {
                        const txt = record.status === 0 ? '待办' : record.status === 1 ? '完成' : '删除';
                        return txt;
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (text: any, record: any, index: number) => (
                        <Space size="middle">
                            <Button style={{marginRight: '10px' }} onClick={ () => this.editTask(record, index) }>编辑</Button>
                            <Button danger onClick={ () => this.removeTask(record.id) }>删除</Button>
                        </Space>
                    )
                }
            ],
            addList:[],
            modifyData:{},
            deleteId:[],
            listData: store.getState()
        };
        store.subscribe(this.handleUpdate.bind(this))
    }
    handleUpdate = () => {
        this.setState({listData: store.getState()})
    }

    componentDidMount () {
        this.getTaskList();
    }

    componentWillUnmount () {
    }

    // 获取任务列表数据
    getTaskList = () => {
    }

    // 添加任务对话框
    addTask = () => {
        this.setState({
            title: '添加任务',
            textBtn: '提交',
            visible: true,
            currentRowData: {
                id: -1,
                title: '',
                date: '',
                content: ''
            }
        })
    }

    // 编辑任务对话框
    editTask = (record: any, index: number) => {
        this.setState({
            title: '编辑任务',
            textBtn: '保存',
            visible: true,
            currentRowData: {
                id: record.id,
                title: record.title,
                date: moment(record.gmt_expire),
                content: record.content
            }
        })
    }

    // 删除任务
    removeTask = (id: number) => {
        let ids = this.state.deleteId;
        ids.push(id)
        this.setState({
            visible: false,
            deleteId: ids
        })
        message.success(`删除成功！`);
    }

    // 提交添加或编辑表单
    onSubmit = (values: Values, type: number) => {
        const { currentRowData } = this.state;
        if (type === 1) {
            let data = {
                title: values.title,
                gmt_expire: moment(values.date).valueOf(),
                content: values.content,
                id:Date.now()
            }
            let addData = [...this.state.addList]
            addData.push(data)
            this.setState({addList:addData,visible: false,modifyData:{
            },
            deleteId:[]})
            message.success(`提交成功！`);
        } else if (type === 2) {
            this.setState({
                visible: false,
                modifyData:{
                    id: currentRowData.id,
                    title: values.title,
                    gmt_expire: moment(values.date).valueOf(),
                    content: values.content
                },
                deleteId:[]
            })
            message.success(`更新任务成功!`);
        }
    }

    // 关闭任务对话框
    onClose = () => {
        this.setState({
            visible: false,
            currentRowData: {
                id: -1,
                title: '',
                date: '',
                content: ''
            }
        })
    }

    render () {
        const { 
            loading, 
            columns, 
            visible, 
            title,
            textBtn,
            currentRowData,
            listData,
            addList,
            modifyData,
            deleteId 
        } = this.state;
        let list = [...listData.user.data,...addList];
        if(JSON.stringify(modifyData) !== '{}'){
            for(let i =0;i<list.length;i++){
                if(list[i]['id'] == modifyData['id']){
                    list[i] = modifyData
                }
            }
        }
        if(deleteId.length > 0){
            for(let i =0;i<list.length;i++){
                for(let j =0;j<deleteId.length;j++){
                    if(list[i] && list[i]['id'] && list[i]['id'] ==deleteId[j]){
                        delete list[i]
                    }
                }
            }
        }
        const { Option } = Select;

        return (
            <DocumentTitle title={'首页'}>
                <div className="home-container">

                    <div className="content clearfix">
                        <div className="list">
                            <h2 className="list-title">李杰的测试题</h2>
                            <div className="list-right">
                                <Space size="middle">
                                    <Button type="primary" size="large" onClick={ this.addTask }><PlusOutlined /> 添加任务</Button>
                                </Space>
                            </div>
                        </div>
                        <div className='pc'>
                            <Table 
                                bordered
                                rowKey={ record => record.id  } 
                                dataSource={ list } 
                                columns={ columns }
                                loading={ loading }
                                pagination={ false } 
                            />
                        </div>
                        <div className='mobile'>
                            {list.map((item, index) => {
                                return (
                                    <Card title={item.title} bordered={false}>
                                        <p>任务内容：{item.content}<Button style={{float:'right' }} onClick={ () => this.editTask(item, index) }>编辑</Button></p>
                                        <p>截止日期：{item.gmt_expire}</p>
                                        <p>任务状态：{ item.status === 0 ? '待办' : item.status === 1 ? '完成' : '删除'} <Button style={{float:'right' }} danger onClick={ () => this.removeTask(item.id) }>删除</Button></p>
                                    </Card>
                                    );
                                })
                            }
                        </div>
                        {/* <Pagination
                            className="pagination"
                            total={ total }
                            style={{ display: loading && total === 0 ? 'none' : '' }}
                            showTotal={total => `共 ${total} 条数据`}
                            onChange={ this.changePage }
                            current={ pageNo }
                            showSizeChanger={ false }
                            defaultPageSize={ pageSize }
                            hideOnSinglePage={ false }
                        /> */}
                    </div>

                    <AddEditTaskForm
                        title={ title }
                        textBtn={ textBtn } 
                        visible={ visible }
                        currentRowData={ currentRowData }
                        onSubmitDrawer={ this.onSubmit }
                        onCloseDrawer={ this.onClose }
                    />
                   
                </div>
            </DocumentTitle>
        )
    }
}

export default Home