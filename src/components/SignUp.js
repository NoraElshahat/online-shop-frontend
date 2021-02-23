import axios from 'axios';
import React from 'react';
export default class Login extends React.Component{
  state={
    name:'',
    email:'',
    password:'',
    handleError : []
  }
  handleName = (e)=>{
    e.preventDefault()
    this.setState({name:e.target.value})
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
    axios.post("http://localhost:8000/users" , user).then((res)=>{
      console.log(res , 'hi result')
      const userName = res.data.user.name
      const userToken = res.data.token
      const id = res.data.user._id
      localStorage.setItem('name' , userName)
      localStorage.setItem('token' , userToken)
      localStorage.setItem('id' , id)
      if(res.data){
        history.push('/categories')
      }
    }).catch((error)=>{
      this.setState({handleError:error.response.data})
    })
  }
    render(){
        return(
        <form className="col-4 m-auto" onSubmit={this.handleSubmit}>
          {!this.state.handleError.length == 0 ? this.state.handleError.map((err)=>{
            return <p className="text-danger">{err}</p>

          }) : ''}
            <div className="form-group">
              <label for="name">Name </label>
              <input type="text" className="form-control" name="username" value={this.state.name} placeholder="Enter Your Name" onChange={this.handleName}/>
            </div>
            <div className="form-group">
              <label >Email address</label>
              <input type="email" className="form-control" name="useremail" value = {this.state.email} placeholder="Enter Your email" onChange={this.handleEmail}/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" name="password" value={this.state.password} placeholder="Enter Your Password" onChange={this.handlePass}/>
            </div>
            <button type="submit" class="btn btn-primary">Sign up</button>
        </form>
        );
    }
}
