import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import LoadingBar from 'react-top-loading-bar'
import News from './Components/News';
import ChatB from './Components/ChatB';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

export default class App extends Component {

  state={
    progress:0
  }

  setProgress = (progress)=>{
    this.setState({progress:progress})
  }

  render() {
    return (
      <div>
        <BrowserRouter>
        
        <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
      />

        <Navbar/>
        <Routes>
        <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={6} country="in" category="general" />} />
        <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={6} country="in" category="business" />} />
        <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={6} country="in" category="entertainment" />} />
        <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={6} country="in" category="general" />} />
        <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={6} country="in" category="health" />} />
        <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={6} country="in" category="science" />} />
        <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={6} country="in" category="sports" />} />
        <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={6} country="in" category="technology" />} />
        <Route exact path="/chat" element={<ChatB/>} />
        </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
