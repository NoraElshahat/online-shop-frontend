import React from 'react';
import axios from 'axios';

export default class updateCategory extends React.Component{

    state ={
        categories:[],
        name:"",
        details:"",
        handleError:[]
    }
    componentDidMount () {
        axios.get('http://localhost:8000/categories').then((res)=>{
            const categories = res.data;
            this.setState({categories});
            const category = this.state.categories.filter((item)=>{
                return item._id === this.props.match.params.id
            })
            this.setState({name:category[0].name , details:category[0].details })
        })
    }
    handleChangeName = (event)=>{
        this.setState({name:event.target.value})
    }

    handleChangeDetails = (event)=>{
        this.setState({details:event.target.value})
    }

    updateCat = e =>{
        e.preventDefault();
        const history = this.props.history
        const oneCategory = {
            name: this.state.name,
            details : this.state.details
        }
        const id = this.props.match.params.id;
        axios.patch(`http://localhost:8000/categories/${id}`, oneCategory).then((res)=>{
            console.log(res.data);
            if(res.data){
                history.push('/categories')
            }
        }).catch((error)=>{
            this.setState({handleError:error.response.data})
            history.push(`/category_form_edit/${id}`)   
    })
    }

    render(){
        return(
            <center>
            <form className="col-4" onSubmit={this.updateCat}>
                    {!this.state.handleError.length == 0 ? this.state.handleError.map((err)=>{
                           return <p className="text-danger"> {err}</p>

                    }) : ''}
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleChangeName}/>
                </div>
                <div className="form-group">
                    <label>Details</label>
                    <input type="text" className="form-control" name="details" value={this.state.details} onChange={this.handleChangeDetails}/>
                </div>
                <button type="submit" className="btn btn-success">Done </button>
            </form>
            </center>
        );
    }
}