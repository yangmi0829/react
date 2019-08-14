import React, {useState} from 'react';
import { Button, Input, Row, Col } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './index.css'
class TodoItem extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            item: this.props.item,
            index: this.props.index
        }
    }
    doTask(){
        this.setState({
            item: {...this.state.item, status: 1}
        })
    }

    render() {
        return (
            <Row gutter={16} className={this.state.item.status === 0 ? 'item--todo' : 'item--finished'}>
                <Col className="gutter-row" span={18} >
                    {this.state.item.label}
                </Col>
                <Col className="gutter-row" span={6}>
                    {this.state.item.status === 0 ? <Button onClick={_ => this.props.doTask(this.state.index,1)}>完成</Button> : <Button onClick={_ => this.props.doTask(this.state.index,0)}>未完成</Button>}
                    <Button onClick={_ => this.props.del(this.state.index)}>删除</Button>
                </Col>
            </Row>
        )
    }
}

class ListItems extends React.Component{
    render() {
        return (
            this.props.list.map((item,index) => <TodoItem item={item} key={index} index={index} {...this.props}/>)
        )
    }
}

function App() {
    const [list, setList] = useState([{label:'吃饭',status: 0},{label:'刷牙',status: 1}])
    const [obj, setObj] = useState({label:'',status: 0})

    return (
        <>
            <Input
                placeholder="请输入"
                value={obj.label}
                onChange={e => setObj({...obj,label: e.target.value})}
                addonAfter={
                    <Button onClick={_ =>
                    {
                    list.push(obj)
                    setList([...list])
                    setObj({...obj,label: ''})
                    }}>新增
                    </Button>
                }
            >
            </Input>,
            <ListItems list={list} del={index => {
                list.splice(index,1)
                setList([...list])
            }} doTask={(index,status) => {
                list[index].status = status
                setList([...list])
            }}>
            </ListItems>
            <div>总任务数量:{list.length}</div>
            <div>todo数量:{list.filter(item => item.status === 0).length}</div>
            <div>已完成数量:{list.filter(item => item.status === 1).length}</div>
        </>
    )
}

export default App

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
