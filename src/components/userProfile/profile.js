import React from 'react';
import axios from 'axios'
import './profile.css'
export default class profile extends React.Component{
    state = {
        name : '' ,
        email :'',
        isAdmin:''
    }
    componentDidMount(){
        axios.get(`http://localhost:8000/users/${localStorage.getItem('id')}`).then((res)=>{
        if(res.data){
                this.setState({name:res.data.name})
                this.setState({email:res.data.email})
                this.setState({isAdmin:res.data.isAdmin})
            }
        })
    }
    render(){
        return(
        <div class="page-content page-container" id="page-content">
        <div class="padding">
            <div class="row container d-flex justify-content-center">
                <div class="col-xl-6 col-md-12">
                    <div class="card user-card-full">
                        <div class="row m-l-0 m-r-0">
                            <div class="col-sm-4 bg-c-lite-green user-profile">
                            <div class="card-block text-center text-white">
                                <div class="m-b-25"> <img src="/img/user.png" width="30" height="30" className="d-inline-block align-top" alt=""/>
 </div>
                                <h6 class="f-w-600">{this.state.name}</h6>
                                <p>FullStack developer</p> <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <div class="card-block">
                                <h6 class="m-b-20 p-b-5 b-b-default f-w-600 text-light">Information</h6>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600 text-light">Email</p>
                                        <h6 class="text-muted f-w-400">{this.state.email}</h6>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600 text-light">Admin</p>
                                        <h6 class="text-muted f-w-400">{this.state.isAdmin ? 'Yes' : 'No'}</h6>
                                    </div>
                                </div>
                                <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600 text-light">Projects</h6>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600 text-light">Recent</p>
                                        <h6 class="text-muted f-w-400">Online Shop</h6>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        );
    }
}
