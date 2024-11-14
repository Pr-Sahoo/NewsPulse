import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, url, author, date, source } = this.props;
    return (
      <div className='my-3'>
        <div className="card">
          <div style={{display: "flex", justifyContent: "flex-end", position: "absolute", right: "0"}}>
          <span className="badge rounded-pill bg-danger">
            {source}
          </span>
          </div>
          <img src={!imgUrl ? "https://media.gettyimages.com/id/1339466666/vector/breaking-news.jpg?s=612x612&w=gi&k=20&c=eK_UQucPkqLJC9IrrsoE4SZSSCHa74YhXlG8zM2xvBY=" : imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5><span className='badge text-bg-success'>Recent news</span>
            <p className="card-text">{description}</p>
            <p className='card-text'><small>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={url} target='_blank' rel='noreferrer' className="btn btn-sm btn-dark">Go somewhere</a>
          </div>
        </div>
      </div>
    )
  }
}
