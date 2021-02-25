import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './header.css';

export default class Header extends React.Component{
    state = {
        userName : localStorage.getItem('name'),
         token : localStorage.getItem('token'),
         id : localStorage.getItem('id'),
         categorySearch : '',
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
        }).catch((error)=>{
            console.log(error.response)
        })
    }
    handleSearch = (e) => {
        this.setState({categorySearch:e.target.value})
    }
    searchProduct = (e) => {
        e.preventDefault()
        const history = this.props.history
        axios.get('http://localhost:8000/categories').then((res)=>{
            const categories = res.data
            console.log(categories)
            const categoryFiended = categories.filter((item)=>{
                return item.name == this.state.categorySearch
            })
            history.push({pathname:'/category_search' , state:categoryFiended})
        })
    }
    
    render(){
        return(
            <nav className="navbar navbar-expand-lg mb-3 p-3">
                <Link className="navbar-brand" to='/'>
                <img src="/img/carts.png" width="30" height="30" className="d-inline-block align-top" alt=""/>
                   {localStorage.getItem('isAdmin')=='true'? <span className="text-white ml-2 text-uppercase" >DashBoard </span> : <span className="text-white ml-2 text-uppercase" >Online Shop </span>} 
                </Link>
                    <Link to="/categories" className="nav-item nav-link active text-white" >Category</Link>
                        {
                        localStorage.getItem('name') !== null && localStorage.getItem('token') !== null ?
                             <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav">
                                    <Link to="/products" className="nav-item nav-link text-white" >Product </Link>
                                    {localStorage.getItem('isAdmin')=='true' ?<Link to="/tags" className="nav-item nav-link text-white">Product Tag </Link> : ''}
                                   {localStorage.getItem('isAdmin')=='true' ?<Link to="/users" className="nav-item nav-link text-white">Users </Link> : ''} 
                                </div>
                            </div>
                        :
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup"></div> }         
                <form className="form-inline" onSubmit={this.searchProduct}>
                        <input class="form-control mr-sm-2" type="search" placeholder="Search For Category" aria-label="Search" value={this.state.categorySearch} onChange={this.handleSearch}/>
                        <button class="btn btn-outline-success my-2 my-sm-0 mr-3" type="submit">Search</button>
                </form>
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
