import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static propTypes ={
    country: PropTypes.string
  }
  capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
constructor(props){
  super(props);
  this.state={
    articles: [],
    loading: true,
    page:1,
    totalResults:0
  }
  document.title =`${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
}

  async updateNews(){
    this.props.setProgress(10);

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props. category}&apiKey=7d1a333e9d0749c59774d53f76d298c2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data =await fetch(url);
    let parseData = await data.json();
    this.setState({articles: parseData.articles, totalResults:parseData.totalResults ,loading:false});
    this.props.setProgress(100);

  }


  async componentDidMount(){

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props. category}&apiKey=7d1a333e9d0749c59774d53f76d298c2&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data =await fetch(url);
    // let parseData = await data.json();
    // this.setState({articles: parseData.articles, totalResults:parseData.totalResults ,loading:false})
    this.updateNews();

  }
  handleNextClick= async()=>{
  //   if(this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)){

  //   }
  //   else{
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props. category}&apiKey=7d1a333e9d0749c59774d53f76d298c2&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true})
  //   let data =await fetch(url);
  //   let parseData = await data.json();
  //   this.setState({articles: parseData.articles})
  //   this.setState({page: this.state.page+1 ,loading:false})
  // }
  this.setState({page: this.state.page+1});
  this.updateNews();

}

  handlePrevClick=async()=>{
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props. category}&apiKey=7d1a333e9d0749c59774d53f76d298c2&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data =await fetch(url);
    // let parseData = await data.json();
    // this.setState({articles: parseData.articles})
    // this.setState({page: this.state.page-1,loading:false })
    this.setState({page: this.state.page-1});
    this.updateNews();

  }
  fetchMoreData = async() => {


    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props. category}&apiKey=7d1a333e9d0749c59774d53f76d298c2&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;



    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props. category}&apiKey=cc6be43c3c624f189d3470efde03e881&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;




    // this.setState({loading:true})
    this.setState({page: this.state.page+1});
    let data =await fetch(url);
    let parseData = await data.json();
    this.setState({articles: this.state.articles.concat(parseData.articles), totalResults:parseData.totalResults })

  };
  render() {
    return (
      <>
        <h1 className='text-center' style={{margin:'35px 0px', marginTop:'90px'}}>NewsMonkey - Top HeadLines: {this.capitalizeFirstLetter(this.props.category)}</h1>
        {this.state.loading&&<Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row conatiner">
        {this.state.articles.map((element)=>{
          console.log(element)
            return <div className="col-md-4" key={element.url}>
            <NewsItem  tittle={element.title? element.title.slice(0,40):""} description ={element.description? element.description.slice(0,88):""} imageUrl ={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        <div className="container d-flex justify-content-between my-5">
        {/* <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
         */}

        </div>
      </>
    )
  }
}

export default News
