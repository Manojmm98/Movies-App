import React, { Component } from 'react'
import {movies} from "./getMovies"
import axios from 'axios'

export class MovieList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hover : "",
            // intialy page number is 1
            PagenumArr: [1],
            currPage: 1,
            movies :[],
            favourites: [],
        }
    }
    
    async componentDidMount(){
       // console.log('mounting done');
         let res =  await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=0d04c50f34e1303e0f6eb2274b1e143e&language=en-US&page=${this.state.currPage}`)
         let data = res.data;
         // get the result of movies from api
         // set the state to new result of data
         this.setState({
             movies:[...data.results]
         })
    }

      //  works for to change the movies according to page number
     changeMovies =async()=>{
        let res =  await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=0d04c50f34e1303e0f6eb2274b1e143e&language=en-US&page=${this.state.currPage}`)
        let data = res.data;
        // get the result of movies from api
        // set the state to new result of data
        this.setState({
            movies:[...data.results]
        })
    }
    // to go for next movies page 

    handleNext=()=>{
     
        // create a temp array to store the new movies list
    let newMoviesArr=[];
   // go from 1st page to page+1 th page
   for(let i=1;i<=this.state.PagenumArr.length+1;i++){
       newMoviesArr.push(i)
   }
     // set the state as per the current movies and update the current page and call the change movies function in arg to set state
      this.setState({
          PagenumArr:[...newMoviesArr],
          currPage : this.state.currPage+1
      },this.changeMovies)
    }
    // to go for previous movies
    // just make the page number less than 1 of current page we have no 0th page so if the currpage is not equal to 1 then change the page number to
    // currpage-1 and set the state 
    handlePrevious=()=>{
        if(this.state.currPage!=1){
            this.setState({
                currPage : this.state.currPage-1
            },this.changeMovies)
        }
        
    }

    // paticular page number
    // if we click on a paticular page number then if the current page is not pointing to that number then set it to that page
    // call the changemovies function to change the MovieList
    clickOnPageNumber=(value)=>{
        if(this.state.currPage!=value){
            this.setState({
                currPage:value
                },this.changeMovies);
        }
    }

    handleFavourites=(movie)=>{
        console.log(movie);
      // find old data
      // if not then just push it into olddata
      // set the  item in localstorage WE have to convert it into string bcz in localstorage data are stored in string format
      let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]")
        if(this.state.favourites.includes(movie.id)){
            oldData = oldData.filter((filtermovies)=>filtermovies.id!=movie.id)
        }else{
            oldData.push(movie)
        }
        localStorage.setItem("movies-app",JSON.stringify(oldData));
        this.handleFavouritesState();
        console.log(oldData);

    }
    // to store in localstorage
    // set temp == favourite to update favourite
    // find id of movies

    handleFavouritesState=()=>{
      let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]")
      let temp = oldData.map((movie)=>movie.id);
      this.setState({
          favourites:[...temp]
      })

    }

    render() {
       //console.log('render');
        return (
            <>
            {   

            this.state.movies.length === 0 ?
             <div class="spinner-border text-secondary" role="status">
             <span class="visually-hidden">Loading...</span>
          </div>  :
         <div>
         <h4 style={{textAlign: 'center'}}><b> Trending Lists🔥 </b> </h4>
        <div className="movies-list">
         {
          this.state.movies.map(movieObj=>(
            <div className="card movies-card" onMouseEnter={()=>{this.setState({hover: movieObj.id})}}>
            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}  alt={movieObj.title} className="movies-img"/>
                <h4 className="card-title movies-title">{movieObj.original_title}</h4>
                {/* <p class="card-text movie-text">{movieObj.overview}</p> */}
                <div className="button-wrapper" style={{display:'flex',width:'100%',justifyContent:'center'}}>
                      {   
                      this.state.hover == movieObj.id &&
                      <a  className="btn btn-primary movies-button" onClick={()=>this.handleFavourites(movieObj)}>{this.state.favourites.includes(movieObj.id)?"Remove from favourites":"Add to 💓 Favourite"} </a>
                      
                      }
                </div>

            </div>
           ))
           }
        <nav aria-label="...">
  <ul class="pagination">
    <li class="page-item ">
    <a class="page-link" onClick={this.handlePrevious}>Previous</a>
    </li>
    {
          this.state.PagenumArr.map((value)   =>(
              // create li according to value at first the value is 1 and next time page number will be increase
              // pass value as to onclickon page number function to opreate as per clicked on page number
              <li class="page-item " aria-current="page">
            <a class="page-link"  onClick={() =>{this.clickOnPageNumber(value)}} >{value}</a>
            </li>
          ))
    }
    <li class="page-item ">
    <a class="page-link" onClick={this.handleNext}>Next</a></li>
  </ul>
</nav>
        </div>


          
         </div>
            
            }
            </>
        )
    }
}

export default MovieList











