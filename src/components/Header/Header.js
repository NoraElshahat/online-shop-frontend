import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './header.css';

export default class Header extends React.Component{
    logout = ()=>{
        axios.post('http://localhost:8000/users/logout').then((res)=>{
            console.log(res.data , 'from front')
        })
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg mb-3 p-3">
                <a className="navbar-brand" href="#">
                <img src="/img/carts.png" width="30" height="30" className="d-inline-block align-top" alt=""/>
                    <span className="text-white ml-2 text-uppercase">Online Shop </span>
                </a>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to="/categories" className="nav-item nav-link active text-white" >Category</Link>
                        <Link to="/products" className="nav-item nav-link text-white" >Product </Link>
                        <Link to="/tags" className="nav-item nav-link text-white">Product Tag </Link>
                    </div>
                </div>
                <div class="form-inline">
                    <Link to="/login" className="nav-item nav-link active text-white" >Login</Link>
                    <button className="btn btn-danger" onClick={this.logout} >Logout </button>    
                </div>
            </nav>

        );
    }
}
