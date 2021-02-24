import axios from 'axios';
import React from 'react';
export default class Login extends React.Component{
  state={
    name:'',
    email:'',
    password:'',
    isAdmin : false,
    handleError : [],
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
  handleCheck = (e) =>{
    e.preventDefault()
    this.setState({isAdmin:e.target.checked})
  }
  handleSubmit = (e)=>{
    const history = this.props.history
    e.preventDefault()
    const user = {...this.state}
    axios.post("http://localhost:8000/users" , user).then((res)=>{
      const userName = res.data.user.name
      const userToken = res.data.token
      const id = res.data.user._id
      const isAdmin = res.data.user.isAdmin
      localStorage.setItem('name' , userName)
      localStorage.setItem('token' , userToken)
      localStorage.setItem('isAdmin' , isAdmin)
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
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" name="isAdmin" id="flexCheckDefault" onChange={this.handleCheck}/>
              <label class="form-check-label mb-3" for="flexCheckDefault" >
                as admin
              </label>
            </div>
            <button type="submit" class="btn btn-primary">Sign up</button>
        </form>
        );
    }
}
