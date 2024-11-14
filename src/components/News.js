import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general"
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
 
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalize(this.props.category)} - Quick Pulse`
  }
  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async Update() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6ed0a6ed5e464326926c0e87370d32be&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.Update();
  }
  handleNext = async () => {
    this.setState({ page: this.state.page + 1 });
    this.Update();
  }
  handlePrev = async () => {
    this.setState({ page: this.state.page - 1 });
    this.Update();
  };
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6ed0a6ed5e464326926c0e87370d32be&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults})
  }
  render() {
    return (
      <>
        <h1 className='text-center' style={{ margin: "35px 0px" }}>QuickPulse - Top {this.capitalize(this.props.category)} Headlines</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >

          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-3" key={element.url}>
                  <NewsItem title={element.title ? element.title: ""} description={element.description ? element.description: ""} url={element.url} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* < className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.handlePrev}>&larr; Previous</button>
          {/* <button disabled={this.state.articles.length<20} type='button' className='btn btn-dark' onClick={this.handelNext}>Next &rarr;</button> */}
        {/* <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNext}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}