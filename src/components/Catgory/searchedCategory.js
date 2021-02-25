import React from 'react';
import { Link } from 'react-router-dom';


export default class SearchCategory extends React.Component{
    state={
        categories : []
    }
    componentDidMount(){
        const category = this.props.history.location.state
        this.setState({categories:category})
    }
    render(){
        const {categories} = this.state
        return (
            <div>
                <div className="row ml-2">
                    {
                        categories.map((item)=>{
                            return(
                                <div className="col-lg-3">
                                    <div className="card border-dark mb-3" style={{width: "18rem"}}>
                                    <img class="card-img-top" src={`http://localhost:8000/uploads/${item.categoryImg}`} width="200px" height="300px" alt="Card image cap" />
        
                                    <Link to={`/products_category/${item._id}`}>
                                        <div className="card-header text-white bg-transparent border-default">{item.name}</div>
                                    </Link>                                        <div className="card-body text-white">
                                            <p className="card-text">{item.details}</p>
                                        </div>
                                    </div>
                                </div>
                                )
                        })
                    }
                </div>
            </div>
         
        );
    }
}