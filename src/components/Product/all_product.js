import axios from "axios";
import {React , useEffect , useState } from "react";
import {Link , useHistory} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import './products.css'
 function AllProducts(){
    let history = useHistory();
    const [products , updateProducts] = useState([]);
    const header= {
        ContentType:'application/json',
        Accept: 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
    useEffect(()=>{
        axios.get('http://localhost:8000/products',{headers:header}).then(({data:products})=>{
            updateProducts(products)
    });
    },[]);

    function deleteProduct(id){
        axios.delete(`http://localhost:8000/products/${id}`).then((res)=>{
        const deletedProductArray = products.filter((item)=>{
            return item._id !== id
        })
        updateProducts(deletedProductArray)
    })
    }
    return(
       <div>
           <center>
                {localStorage.getItem('isAdmin')=='true' 
                    ?
                    <Link to="/product_form"> 
                            <img src="img/add.png" width="50" height="50" className="d-inline-block align-top mb-3" alt=""/>
                    </Link>
                    :
                ''}
            </center>
        <div className="row ml-3">
            {products.map((product)=>{
                return(
                    <div className="col-lg-3">
                        <div className="card border-dark mb-3" style={{width: "18rem"}}>
                        <img class="card-img-top" src={`http://localhost:8000/uploads/${product.productImg}`} width="200px" height="300px" alt="Card image cap" />

                            <div className="card-header text-white bg-transparent border-white">{product.name}</div>
                            <div className="card-body text-white">
                                <p className="card-text">{product.description}</p>
                                <p className="card-title">{product.price} $</p>
                                <p className="card-title badge badge-danger">{ product.tag[0] ? product.tag[0].name : '' }</p>
                            </div>
                            <IconButton aria-label="delete">
                                <SvgIcon >
                                    <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10" />
                                </SvgIcon>
                            </IconButton> 
                            <div className="card-footer bg-transparent border-white">
                                {/* delete and edit */}
                                {localStorage.getItem('isAdmin')=='true' 
                                ?
                                <div className="card-footer bg-transparent border-default">
                                    <Link to={`/product_form_edit/${product._id}`}  style={{cursor:"pointer"}}>
                                         <img src="img/edit.png" width="28" height="28" className="d-inline-block align-top  ml-5 mt-1" alt=""/>
                                    </Link>
                                    <a onClick={()=>deleteProduct(product._id)} style={{cursor:"pointer"}}>
                                        <img src="img/delete.png" width="35" height="35" className="d-inline-block align-top ml-5" alt=""/>
                                    </a>
                                </div>
                                :
                                ''}
                            </div>
                            </div>
                    </div>
                );
            })}
        </div>
        </div>
        );
}

export default AllProducts ;