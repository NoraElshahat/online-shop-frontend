import React from 'react';
import axios from 'axios';

export default class updateCategory extends React.Component{

    state ={
        categories:[],
        name:"",
        details:"",
        categoryImg:null,
        handleError:[],
        header: {
            ContentType:'application/json',
            Accept: 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
    componentDidMount () {
        axios.get('http://localhost:8000/categories',{headers:this.state.header}).then((res)=>{
            const categories = res.data;
            this.setState({categories});
            const category = this.state.categories.filter((item)=>{
                return item._id === this.props.match.params.id
            })
            this.setState({name:category[0].name , details:category[0].details ,categoryImg:category[0].categoryImg})
        })
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

    updateCat = e =>{
        e.preventDefault();
        const {name , details , categoryImg} = this.state
        const history = this.props.history
        const data = new FormData() 
        data.append('name' , name)
        data.append('details' , details)
        data.append('categoryImg' , categoryImg)
        const id = this.props.match.params.id;
        axios.patch(`http://localhost:8000/categories/${id}`, data).then((res)=>{
            if(res.data){
                history.push('/categories')
            }
        }).catch((error)=>{
            this.setState({handleError:error.response.data})
            history.push(`/category_form_edit/${id}`)   
    })
    }

    render(){
        const {handleError} = this.state
        return(
            <center>
            <form className="col-4" onSubmit={this.updateCat} enctype="multipart/form-data">
                    {!handleError.length == 0 ? handleError.map((err)=>{
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