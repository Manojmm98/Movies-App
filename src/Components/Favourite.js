import React, { Component } from "react";
import { movies } from "./getMovies";

export class Favourite extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            gener:[],
            currgener :'All Genres',
            movies: [],
            currText : '',
            currPage:1,
            limit:6

        }
    }

   // now we will get the data from local storage inside componentDidMount
   componentDidMount() {
     
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
    27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

     let data = JSON.parse(localStorage.getItem("movies-app") || "[]")
     console.log(localStorage);
     // to show gener list
    let temp =[];
    data.forEach(movieObj => {
          if(temp.includes(genreids[movieObj.genre_ids[0]])==false){
              temp.push(genreids[movieObj.genre_ids[0]]);
          }
    })
    
    temp.unshift('All Genres') 
    
    this.setState({ 
      movies :[...data],
      gener : [...temp]
    })

   }
  
   // for genere click

   handlegenerChange=(gener)=>{
      this.setState({
        currgener : gener
      })
   }

   // for rating and Popularity

   sortPopularityDesc=()=>{
    let temp = this.state.movies;
    temp.sort(function(objA,objB){
        return objB.popularity-objA.popularity
    })
    this.setState({
        movies:[...temp]
    })
}
sortPopularityAsc=()=>{
    let temp = this.state.movies;
    temp.sort(function(objA,objB){
        return objA.popularity-objB.popularity
    })
    this.setState({
        movies:[...temp]
    })
}

sortRatingDesc=()=>{
    let temp = this.state.movies;
    temp.sort(function(objA,objB){
        return objB.vote_average-objA.vote_average
    })
    this.setState({
        movies:[...temp]
    })
}
sortRatingAsc=()=>{
    let temp = this.state.movies;
    temp.sort(function(objA,objB){
        return objA.vote_average-objB.vote_average
    })
    this.setState({
        movies:[...temp]
    })
}

// pagination in favourite page

handlePageChange=(page)=>{
   this.setState({
     currPage:page
   })
}
// to delete a movie from favourite list
handleDelete=(id)=>{
  let newArr=[]
 newArr= this.state.movies.filter((movieObj)=>  movieObj.id!=id )
  this.setState({
    movies:[...newArr]
  })
localStorage.setItem("movies-app",JSON.stringify(newArr))
}



  render() {
    
     let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
     27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

    // for making changes of gener according to movies type

    let filterArr = [];

    if(this.state.currText===''){
      filterArr=this.state.movies
    }
    
    // find the title and if our current text includes the typed letter then filter the movie list
    else{
      filterArr=this.state.movies.filter((movieObj)=>{
        
        let title = movieObj.original_title;
        title = String(title);
        title = title.toLowerCase();
        return title.includes(this.state.currText.toLowerCase())

      })
  }
  console.log(filterArr);
// if the gener is not all gener
    if(this.state.currgener!="All Genres")
    { 
      // if the id of current movie's id 
      filterArr = this.state.movies.filter((movieObj)=>genreids[movieObj.genre_ids[0]]==this.state.currgener)
    }

  // for pagination in favourites page

  let pages = Math.ceil(filterArr.length/this.state.limit);
  let pagesarr = [];
  for(let i=1;i<=pages;i++){
      pagesarr.push(i);
  }
  let si = (this.state.currPage-1)*this.state.limit;
  let ei = si+this.state.limit;
  filterArr = filterArr.slice(si,ei);

    return (
        <div>
        <>
        <div className="main">

         {/* for  list of geners */}

          <div className="row">
            <div className="col-lg-3 col-sm-12">
              <ul class="list-group favourites-genres"  >
                {
                    this.state.gener.map(gener =>(

                        this.state.currgener == gener?
                        <li class="list-group-item" style={{background:'#3f51b5',color:'white',fontWeight:'bold'}}>{gener}</li> 
                        : <li class="list-group-item" style={{background:'white',color:'#3f51b5'}} onClick={()=>{this.handlegenerChange(gener)}}>{gener}</li> 
                      ))
                }
              </ul>
        </div>
 

       {/* for table list */}

<div className="col-lg-9 favourites-table col-sm-12">
<div className="row">
  <input type="text" className="input-group-text col"  placeholder="Search your Favourite Movies"
    value={this.state.currText}
    onChange={(e)=>{this.setState({currText: e.target.value})}}
  />
  <input
    type="number"
    className="input-group-text col"
    placeholder="Number of Movies"
    value={this.state.limit}
    onChange={(e)=>{this.setState({limit:e.target.value})}}

  />
</div>

<div className="row">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Gener</th>
        <th scope="col"> <i class="fa-solid fa-sort-up" onClick={this.sortPopularityDesc}></i>Popularity<i class="fa-solid fa-sort-down" onClick={this.sortPopularityAsc}></i></th>
        <th scope="col"> <i class="fa-solid fa-sort-up" onClick={this.sortRatingDesc}></i>Rating<i class="fa-solid fa-sort-down"onClick={this.sortRatingAsc}></i></th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody >
        
        {
         
         filterArr.map((movieObj)=>(
       <tr>
          <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{width:'5rem'}}/> {movieObj.original_title}</td>
          <td>{genreids[movieObj.genre_ids[0]]}</td>
          <td>{movieObj.popularity}</td>
          <td>{movieObj.vote_average} </td>
          <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)}>Delete</button></td>
          
       </tr>
         ))

        }




    </tbody>
  </table>
</div> 

   {/* for  pagination        */}

      <nav aria-label="Page navigation example">
            <ul class="pagination">
            {
                pagesarr.map((page)=>(
                     <li class="page-item"><a class="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                           ))
            }
          </ul>
      </nav>
            
                       
            </div>
          </div>
          </div>
          </>
        </div>
    )
  }
}

export default Favourite;
