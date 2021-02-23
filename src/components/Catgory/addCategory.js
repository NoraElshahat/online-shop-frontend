import axios from 'axios';
import React from 'react';

export default class addCategory extends React.Component{
    state={
        name:'',
        details :'',
        categoryImg:null,
        handleError : []
    }
    handleChangeName = (event)=>{
       this.setState({name:event.target.value})
    }
    handleChangeDetails = (event)=>{
        this.setState({details:event.target.value})
     }
     handleImg = (e) =>{
        this.setState({categoryImg:e.target.files[0]})
     }
    add_category = e =>{
        e.preventDefault();
        const {name , details , categoryImg} = this.state
        const history = this.props.history
        const data = new FormData() 
        data.append('name' , name)
        data.append('details' , details)
        data.append('categoryImg' , categoryImg)
        axios.post('http://localhost:8000/categories' , data).then(res =>{
            if(res.data){
                history.push('/categories')
            } 
    }).catch((error)=>{
            this.setState({handleError:error.response.data})
            history.push('/category_form')   
    })
    
}
    render(){
        const {handleError} = this.state
        return(
            <center>
            <form className="col-4" onSubmit={this.add_category} enctype="multipart/form-data" >
                    {!handleError.length == 0 ? handleError.map((err)=>{
                           return <p className="text-danger"> {err}</p>

                    }) : ''}
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
                    <input className="form-control" type="file" name="categoryImg" id="categoryImg" onChange={this.handleImg}/>
                </div>
                <button type="submit" className="btn btn-success">Done </button>
            </form>
            </center>
        );
    }
}