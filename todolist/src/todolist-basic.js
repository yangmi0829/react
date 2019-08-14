import React from 'react';
import { Button, Input, Row, Col } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './index.css'

class TaskItem extends React.Component{
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
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('TaskItem componentDidUpdate')
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true
    }

    render() {
        return (
            <Row gutter={16}  className={this.state.item.status === 0 ? 'item--todo' : 'item--finished'}>
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
    constructor(props) {
        super(props)
        // 0未完成 1已完成
        this.state = {
            list: this.props.list
        }
    }
    render() {
        const {
            ...rest
        } = this.props
        return (
            this.state.list.map((item,index) => <TaskItem item={item} key={index} index={index} {...rest}/>)
        )
    }
}



class App extends React.Component{
    constructor(props) {
        super(props)
        // 0未完成 1已完成
        this.state = {
            list: [{label:'吃饭',status: 0},{label:'刷牙',status: 1}],
            obj: {label:'',status: 0},
            status: null
        }
    }
    doTask(index, status){
        const {list} = this.state
        const newList = [...list]
        newList[index].status = status
        this.setState({
            list:newList
        })
    }
    del(index) {
        const {list} = this.state
        list.splice(index, 1)
        this.setState({
            list:list
        })
    }
    add() {
        let {list, obj} = this.state
        list.push(obj)
        obj = Object.assign({}, obj,{label:''})
        this.setState({
            list: list,
            obj:obj
        })
    }

    render (){
        return (
            <>
                <Input ref="input" placeholder="Basic usage" value={this.state.obj.label} onChange={e => {
                    this.setState({
                        obj: {...this.state.obj, label:e.target.value}
                    })
                }} addonAfter={<Button onClick={_ => this.add()}>新增</Button>}></Input>,
                <ListItems key={this.state.status} list={this.state.status === null ? this.state.list : this.state.list.filter(item => item.status === this.state.status)} del={index => this.del(index)}  doTask={(index,status) => this.doTask(index,status)}></ListItems>
                <div>总任务数量:{this.state.list.length}</div>
                <div>未完成数量:{this.state.list.filter(item => item.status === 0).length}</div>
                <div>已完成数量:{this.state.list.filter(item => item.status === 1).length}</div>
                <Button onClick={_ => this.setState({
                    status: null
                })}>全部任务</Button>
                <Button onClick={_ => this.setState({
                    status: 0
                })}>未完成</Button>
                <Button onClick={_ => this.setState({
                    status: 1
                })}>已完成</Button>
            </>
        )
    }
}

export default App

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
