import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default class Login extends React.Component{
    state={
        email:'',
        password:''
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
          if(res.data){
            history.push('/categories')
          }else{
            history.push('/signup')
          }
        })
      }
    render(){
        return(
                <div className="container">
                    <div class="row">
                    <form className="col-4 m-auto" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" name="email" value={this.state.email} placeholder="Enter Your Email" onChange={this.handleEmail}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" value = {this.state.password} placeholder="Enter Your password" onChange={this.handlePass}/>
                        </div>
                        <button type="submit" class="btn btn-primary">Log in</button>
                        <span>
                            <Link to='/signup' class="ml-2">SignUp if you don't have account</Link>
                        </span>
                    </form>
                    </div>
                </div>
        );
    }
}
