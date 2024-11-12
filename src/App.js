// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component {
  pageSize = 8;
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            {/* <Route path='/about'><News pageSize={this.pageSize} country="us" category="general"/></Route>
        <Route path='/sports'><News pageSize={this.pageSize} country="us" category="sports"/></Route> */}
            <Route path='/general' element={<News key="general" pageSize={this.pageSize} country="us" category="general"/>}/>
            <Route path='/entertainment' element={<News key="entertainment" pageSize={this.pageSize} country="us" category="entertainment"/>}/>
            <Route path='/health' element={<News key="health" pageSize={this.pageSize} country="us" category="health"/>}/>
            <Route path='/science' element={<News key="science" pageSize={this.pageSize} country="us" category="science"/>}/>
            <Route path='/sports' element={<News key="sports" pageSize={this.pageSize} country="us" category="sports"/>}/>
            <Route path='/business' element={<News key="business" pageSize={this.pageSize} country="us" category="business"/>}/>
            <Route path='/technology' element={<News key="technology" pageSize={this.pageSize} country="us" category="technology"/>}/>
            <Route path="/" element={<div><h1 className='text-center'>Welcome to Quick Pulse</h1><News key="home" pageSize={this.pageSize} category="general"/></div>} />
            <Route path="*" element={<h1>404: Page Not Found</h1>} />

          </Routes>
        </Router>
      </div>
    )
  }
}
