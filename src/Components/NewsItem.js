import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {tittle, description,imageUrl, newsUrl,date,source} = this.props;
    return (
      <div className='my-3'>
            <div className="card" >
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-dark" style= {{left:'87%', zIndex:'1'}}>{source}</span>
              <img src={!imageUrl? "https://img.freepik.com/premium-vector/word-news-vector-banner-with-text-colored-rainbow_100655-2729.jpg?w=2000":imageUrl} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{tittle}...</h5>
                <p className="card-text">{description}...</p>
                <p class="card-text"><small className="text-body-secondary">By {!this.props.author? "Unknown":this.props.author} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark" >Read More</a>
              </div>
            </div> 
     </div>
      )
  }
}

export default NewsItem
