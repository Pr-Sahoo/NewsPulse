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
  articles = []
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalize(this.props.category)} - Quick Pulse`
  }
  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async Update() {
    const url = `http://newsapi.org/v2/top-headlines?country=${this.props.country}&catagory=${this.props.category}&apiKey=6ed0a6ed5e464326926c0e87370d32be&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
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
    const url = `http://newsapi.org/v2/top-headlines?country=${this.props.country}&catagory=${this.props.category}&apiKey=6ed0a6ed5e464326926c0e87370d32be&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, loading: false })
  }
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{ margin: "35px 0px" }}>QuickPulse - Top {this.capitalize(this.props.category)} Headlines</h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.articles.lenght !== this.state.totalResults}
          // loader={<h4>Loading...</h4>}
          loader={<Spinner />}
        >

          <div className="container">
            <div className="row">
              {/*!this.state.loading &&*/ this.state.articles.map((element, index) => {
                const uniqueKey = `${element.url}-${index}`
                return <div className="col-md-3" key={uniqueKey}>
                  <NewsItem title={element.title ? element.title.slice(0, 35) : ""} description={element.description ? element.description.slice(0, 88) : ""} url={element.url} imgUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type='button' className='btn btn-dark' onClick={this.handlePrev}>&larr; Previous</button>
          {/* <button disabled={this.state.articles.length<20} type='button' className='btn btn-dark' onClick={this.handelNext}>Next &rarr;</button> */}
        {/* <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNext}>Next &rarr;</button>
        </div> */}
      </div>
    )
  }
}
