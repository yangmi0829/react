import React, {useState} from 'react'
import { Button, Input, Row, Col } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './index.css'

class BaseAction extends React.Component {
    render() {
        return (
            <Input onChange={this.props.onChange} addonAfter={<Button onClick={this.props.add}>新增</Button>}></Input>
        )
    }
}


class BaseItem extends React.Component {
    render() {
        return (
            <Row gutter={16}  className={this.props.item.status === 0 ? 'item--todo' : 'item--finished'}>
                <Col className="gutter-row" span={18} >
                    {this.props.item.label}
                </Col>
                <Col className="gutter-row" span={6}>
                    {this.props.item.status === 0 && <Button onClick={this.props.finish.bind(this,this.props.index)}>完成</Button>}
                    <Button onClick={this.props.del.bind(this,this.props.index)}>删除</Button>
                </Col>
            </Row>
        )
    }
}

class BaseList extends React.Component{
    render() {
        return (
            this.props.list.map((item,index) =>
                <BaseItem
                    item={item}
                    {...this.props}
                    key={index}
                    index={index}
                    />)
        )
    }
}

const connect = (Com) => {
    return class newCom extends React.Component{
        render() {
            return (
                <Com {...this.props} />
            )
        }
    }
}

const Action = connect(BaseAction)
const List = connect(BaseList)

function App() {
    let [label, setLabel] = useState('')
    let [list, setList] = useState([{label:'周一',status:0},{label:'周二',status:1}])
    let [status, setStatus] = useState(null)
    return (
        <>
            <Action onChange={e => setLabel(e.target.value)} add={_ => {
                list.push({label,status:0})
                setList([...list])
                setLabel('')
                console.log(list)
            }}/>,
            <List
            list={status === null ? list : list.filter(item => item.status === status)}
            key={status}
            finish={(index) =>{
                list[index].status = 1
                setList([...list])
            }}
            del={(index) =>{
                list.splice(index,1)
                setList([...list])
            }}/>
            <Button onClick={_ => setStatus(null)}>全部</Button>
            <Button onClick={_ => setStatus(0)}>未完成</Button>
            <Button onClick={_ => setStatus(1)}>已完成</Button>
        </>
    )
}

export default App
