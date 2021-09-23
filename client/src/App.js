import logo from './logo.svg';
import './App.css';
import React from 'react'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      count:0
    }
    this.eventSource = new EventSource("http://localhost:8888/events")
  }
  componentDidMount(){
    this.eventSource.onmessage = (e) => {
        console.log(e)
        this.setState({count:e.data})
    }
  }
  render(){
    return (
      <h1>{this.state.count}</h1>
    )
  }
}

export default App;
