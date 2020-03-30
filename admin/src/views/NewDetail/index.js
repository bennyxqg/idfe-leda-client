import React, { Component } from 'react';

class index extends Component {
  componentDidMount() {
    console.log(this.props.history.location);
  }
  render() {
    return (
      <div>
        详情
      </div>
    );
  }
}

export default index;