import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './category.css';

export default class Category extends React.Component {
    state = {
        categories : [] ,
    }
    componentDidMount () {
        axios.get('http://localhost:8000/categories').then((res)=>{
            const categories = res.data;  
            this.setState({categories});
        })
    }
    deleteCategory(id){
        const history = this.props.history;
        axios.delete(`http://localhost:8000/categories/${id}`).then((res)=>{
            const newCategories = this.state.categories.filter((item)=>{
                return item._id !== id
            })
            this.setState({categories:newCategories})
        })
    }
    render(){
        return (
            <div>
                <center>
                    <Link to="/category_form"> 
                            <img src="img/add.png" width="50" height="50" className="d-inline-block align-top mb-3" alt=""/>
                    </Link>
                </center>
            <div className="row ml-2">
                    {this.state.categories.map((item)=>{
                        return(
                         <div className="col-lg-3">

                            <div className="card border-dark mb-3" style={{width: "18rem"}}>
                                <img class="card-img-top" src="/img/static.jpg" alt="Card image cap" />
                                {/* link to products belong to this category */}
                                <Link to={`/products_category/${item._id}`}>
                                    <div className="card-header text-white bg-transparent border-default">{item.name}</div>
                                </Link>
                                <div className="card-body text-white">
                                    <p className="card-text">{item.details}</p>
                                </div>

                                {/* delete and edit */}
                                <div className="card-footer bg-transparent border-default">
                                    <Link to={`/category_form_edit/${item._id}`}  style={{cursor:"pointer"}}>
                                         <img src="img/edit.png" width="28" height="28" className="d-inline-block align-top ml-5 mt-1" alt=""/>
                                    </Link>
                                    <a onClick={()=>{this.deleteCategory(item._id)}} style={{cursor:"pointer"}}>
                                        <img src="img/delete.png" width="35" height="35" className="d-inline-block align-top ml-5 mb-3" alt=""/>
                                    </a>
                                </div>
                            </div>
                            </div>
                        )
                    })}
             </div>
             </div>
         
        );
    }
}