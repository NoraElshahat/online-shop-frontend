import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './header.css';

export default class Header extends React.Component{
    state = {
        userName : localStorage.getItem('name'),
         token : localStorage.getItem('token'),
         id : localStorage.getItem('id')
    }
    header= {
        ContentType:'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${this.state.token}`
    }
    logout = (e)=>{
        e.preventDefault()
        const history = this.props.history
        axios.post('http://localhost:8000/users/logoutAll' , '', {headers:this.header} ).then((res)=>{
        if(res){
                this.setState({userName:'',token:''})
                localStorage.clear();
                history.push('/login')
            }
        })
    }
    render(){
        return(
            <nav className="navbar navbar-expand-lg mb-3 p-3">
                <Link className="navbar-brand" to='/'>
                <img src="/img/carts.png" width="30" height="30" className="d-inline-block align-top" alt=""/>
                    <span className="text-white ml-2 text-uppercase" >Online Shop </span>
                </Link>
                    <Link to="/categories" className="nav-item nav-link active text-white" >Category</Link>
                        {
                        localStorage.getItem('name') !== null && localStorage.getItem('token') !== null ?
                             <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav">
                                    <Link to="/products" className="nav-item nav-link text-white" >Product </Link>
                                    <Link to="/tags" className="nav-item nav-link text-white">Product Tag </Link>
                                </div>
                            </div>
                        :
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup"></div> }         
                <form className="form-inline" onSubmit={this.logout}>
                   {
                     !localStorage.getItem('name') ? <Link to="/login" className="nav-item nav-link active text-white" >Login</Link> 
                   :
                     <Link to ={`/me/${this.state.id}`}> <span className="text-white mr-3">{localStorage.getItem('name')}</span></Link>}
                    <button className="btn btn-danger">Logout </button>    
                </form>
            </nav>

        );
    }
}
