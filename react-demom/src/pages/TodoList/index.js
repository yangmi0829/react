import React, {useState} from 'react'
import { Button, Input, Row, Col } from 'antd';
import {addItem,deleteItem,changeItemStatus} from '../../redux/TodoList/action'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

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
                    {this.props.item.status === 0 && <Button onClick={()=>this.props.finish(this.props.index)}>完成</Button>}
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

function TodoList({addItem,deleteItem,changeItemStatus,list}) {
    const [label,setLabel] = useState('')
    const [status,setStatus] = useState(null)

    return (
        <>
            <BaseAction onChange={e => setLabel(e.target.value)} add={_ => {
                addItem({label})
            }}/>,
            <BaseList
                list={status === null ? list : list.filter(item => item.status === status)}
                key={status}
                finish={(index) =>{changeItemStatus({index})}}
                del={(index) =>{deleteItem({index})}}
            />
            <Button onClick={_ => setStatus(null)}>全部</Button>
            <Button onClick={_ => setStatus(0)}>未完成</Button>
            <Button onClick={_ => setStatus(1)}>已完成</Button>
        </>
    )
}

const mapStateToProps = (state) => {
    return {list:state.list}
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItem: bindActionCreators(addItem,dispatch),
        deleteItem: bindActionCreators(deleteItem,dispatch),
        changeItemStatus: bindActionCreators(changeItemStatus,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoList);
