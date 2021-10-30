import React, { Component } from 'react'
import {Link} from 'react-router-dom'

// link helps to move through different route through click on that text
export class Navbar extends Component {
    render() {
        return (
            <>
            <div style={{paddingLeft:'2rem',paddingTop:"1rem",display: 'flex'}}>
             <Link to ="/" style={{textDecoration:'none'}} > <h2>MKM Movies🎬</h2></Link>
             <Link to ="/favourite" style={{textDecoration:'none'}} >   <h3 style={{paddingLeft:'4rem',paddingTop:'0.3rem'}}> Favourite 💗 movies </h3><br></br></Link>
                
                
            </div>
            </>
        )
    }
}

export default Navbar
