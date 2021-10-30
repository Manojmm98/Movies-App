// here the front banner of our app will displayed ----> here we are going to use bootstarp copy cdn link and paste inside index.js
import React, { Component } from "react";
import { movies } from "./getMovies";

export class Banner extends Component {
  // find the movie name
  render() {
    let movie = movies.results[0];
    return (
      <>
           {   movie == ''?
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>:
                <div className="card banner-card">
                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}    alt={movie.title} className=" banner-img"/>
                    <h1 className="card-title banner-title">{movie.original_title}</h1>
                    <p class="card-text banner-text">{movie.overview}</p>
                </div>
            }
      </>
    );
  }
}

export default Banner;
