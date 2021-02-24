import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default class Login extends React.Component{
    state={
        email:'',
        password:'',
        isAdmin : false,
        handleError : []
      }
      handleEmail = (e)=>{
        e.preventDefault()
        this.setState({email:e.target.value})
      }
      handlePass = (e)=>{
        e.preventDefault()
        this.setState({password:e.target.value})
      }
      handleSubmit = (e)=>{
        const history = this.props.history
        e.preventDefault()
        const user = {...this.state}
        axios.post("http://localhost:8000/users/login" , user).then((res)=>{
        const userName = res.data.user.name
        const token = res.data.token
        const id = res.data.user._id
        const isAdmin = res.data.user.isAdmin

        localStorage.setItem('name' , userName)
        localStorage.setItem('isAdmin' , isAdmin)
        localStorage.setItem('token' , token)
        localStorage.setItem('id' , id)
        if(res.data){
            history.push('/categories')
          }
        }).catch((err)=>{
            this.setState({handleError:err.response.data})
        })
      }
    render(){
        return(
                <div className="container">
                    <div className="row">
                    <form className="col-4 m-auto" onSubmit={this.handleSubmit}>
                      {!this.state.handleError.length == 0 ? this.state.handleError.map((err)=>{
                           return<p className="text-danger"> {err}</p>

                      }) : ''}
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" name="email" value={this.state.email} placeholder="Enter Your Email" onChange={this.handleEmail}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" value = {this.state.password} placeholder="Enter Your password" onChange={this.handlePass}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Log in</button>
                        <span>
                            <Link to='/signup' className="ml-2">SignUp if you don't have account</Link>
                        </span>
                    </form>
                    </div>
                </div>
        );
    }
}
