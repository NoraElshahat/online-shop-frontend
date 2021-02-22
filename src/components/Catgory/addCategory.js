import axios from 'axios';
import React from 'react';

export default class addCategory extends React.Component{
    state={
        name:'',
        details :'',
        categoryImg:{},
        handleError : ''
    }
    handleChangeName = (event)=>{
       this.setState({name:event.target.value})
    }
    handleChangeDetails = (event)=>{
        this.setState({details:event.target.value})
     }
     handleImg = (e) =>{
        this.setState({categoryImg:e.target.files[0].name})
     }
    add_category = e =>{
        e.preventDefault();
        const history = this.props.history
        const category ={
            name : this.state.name,
            details : this.state.details,
            categoryImg : this.state.categoryImg
        };
        axios.post('http://localhost:8000/categories' , category).then(res =>{
            if(res.data){
                history.push('/categories')
            } 
    }).catch((error)=>{
        if(error.response){
            this.setState({handleError:error.response.data})
            history.push('/category_form')   
        }
    })
  
}
    render(){
        return(
            <center>
                {this.state.handleError ? <span className="text-danger">{this.state.handleError}</span> : ''}
            <form className="col-4" onSubmit={this.add_category} >
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" placeholder="Enter Category Name" onChange={this.handleChangeName}/>
                </div>
                <div className="form-group">
                    <label>Details</label>
                    <input type="text" className="form-control" name="details" placeholder="Enter Details" onChange={this.handleChangeDetails}/>
                </div>
                <div className="form-group">
                    <label>Upload Image</label>
                    <input className="form-control" name="categoryImg" type="file" onChange={this.handleImg}/>
                </div>
                <button type="submit" className="btn btn-success">Done </button>
            </form>
            </center>
        );
    }
}