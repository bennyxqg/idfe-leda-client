import React from 'react';

class Index extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            count: 0
        }
    }
    router(){
        this.props.history.push('/list')
    }
    render() {
        return (
            <div>
                <p>评论页面</p>
            </div>
        )
    }
}

export default Index