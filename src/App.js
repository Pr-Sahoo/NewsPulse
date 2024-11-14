
import './App.css';

import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
// import News1 from './components/News1';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  state = {
    progress: 0
  }
  
  setProgress = (progress) =>{
    this.setState({progress: progress})
  }
  // apiKey = process.env.REACT_APP_NEWS_API_KEY;

  pageSize = 8;
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11996'
            height={3}
            progress={this.state.progress}
          />
          <Routes>
            <Route path='/general' element={<News setProgress={this.setProgress} apiKey= {this.apiKey} key="general" pageSize={this.pageSize} country="us" category="general" />} />
            <Route path='/entertainment' element={<News setProgress={this.setProgress} apiKey= {this.apiKey} key="entertainment" pageSize={this.pageSize} country="us" category="entertainment" />} />
            <Route path='/health' element={<News setProgress={this.setProgress} apiKey= {this.apiKey} key="health" pageSize={this.pageSize} country="us" category="health" />} />
            <Route path='/science' element={<News setProgress={this.setProgress} apiKey= {this.apiKey} key="science" pageSize={this.pageSize} country="us" category="science" />} />
            <Route path='/sports' element={<News setProgress={this.setProgress} apiKey= {this.apiKey} key="sports" pageSize={this.pageSize} country="us" category="sports" />} />
            <Route path='/business' element={<News setProgress={this.setProgress} apiKey= {this.apiKey} key="business" pageSize={this.pageSize} country="us" category="business" />} />
            <Route path='/technology' element={<News setProgress={this.setProgress} apiKey= {this.apiKey} key="technology" pageSize={this.pageSize} country="us" category="technology" />} />
            <Route path="/" element={<div><h1 className='text-center'>Welcome to Quick Pulse</h1><News setProgress={this.setProgress} key="home" pageSize={this.pageSize} category="general" /></div>} />
            <Route path="*" element={<h1>404: Page Not Found</h1>} />

          </Routes>
        </Router>
      </div>
    )
  }
}
