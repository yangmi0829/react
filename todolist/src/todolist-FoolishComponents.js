import React, {useState} from 'react'
import { Button, Input, Row, Col } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './index.css'


const TaskItem = (props) => {
    const { doTask, del, className, item} = props
    return (
        <Row gutter={16} className={className}>
            <Col className="gutter-row" span={18} >
                {item.label}
            </Col>
            <Col className="gutter-row" span={6}>
                {item.status === 0 && <Button onClick={doTask}>完成</Button>}
                <Button onClick={del}>删除</Button>
            </Col>
        </Row>
    )
}

const ListItem = (props) => {
    const {list,doTask,del} = props
    return (
        list.map((item,index) =>
            <TaskItem
                className={item.status === 0 ? 'item--todo' : 'item--finished'}
                key={index}
                item={item}
                del={_ => {
                    del(item,index)
                    }
                }
                doTask={_ => doTask(item,index)}
                />)
    )
}

const Action = (props) => {
    const { add, ...rest} = props
    return (
        <Input  {...rest} addonAfter={<Button onClick={add}>新增</Button>}></Input>
    )
}


function App() {
    let [list, setList] = useState([{label:'吃饭',status:0},{label:'睡觉',status:1}])
    let [label, setLabel] = useState('')
    let [status, setStatus] = useState(null)
    return(
        <>
            <Action onChange={e => setLabel(e.target.value)} add={_ => {
                list.push({label, status:0})
                setList([...list])
            }}/>,
            <ListItem
                list={status === null ? list : list.filter(item => item.status === status)}
                key={status}
                del={(item,index) => {
                    list.splice(index, 1)
                    setList([...list])
                 }}
                doTask={(item,index) => {
                list[index].status = 1
                setList([...list])
            }}/>
            <Button onClick={_ => setStatus(null)}>全部</Button>
            <Button onClick={_ => setStatus(0)}>未完成</Button>
            <Button onClick={_ => setStatus(1)}>已完成</Button>
        </>
    )
}

export default App
