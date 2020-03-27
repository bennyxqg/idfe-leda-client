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
    add(num){
        let count = this.state.count
        this.setState({
            count: count + num
        })
    }
    render() {
        return (
            <div>
                <p>这是首页</p>
                <p>{this.state.count}<button onClick={() => this.add(2)}>增加2</button></p>
                <button onClick={() => this.router()}>去其他页面</button>
            </div>
        )
    }
}

export default Index