import React from 'react';

class List extends React.Component{
    constructor(props) {
        super(props)
    }

    back(str) {
        console.log(str)
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                这是列表页面
                <button onClick={this.back.bind(this, '返回首页')}>返回首页</button>
            </div>
        )
    }
}

export default List