import {React, useState , useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

function AddProduct(){
    let history = useHistory();
    const [product , updateProduct] = useState({name:'' , description:'' , price:''})
    const [categories , setCategories ] = useState([])
    const [tags , updateTag] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8000/categories').then(({data:categories})=>{
            setCategories(categories)
            console.log(categories);
    });
    axios.get('http://localhost:8000/tags').then(({data:tags})=>{
        updateTag(tags)
    });
    },[])
    function handleChangeName(event){
        updateProduct({...product , [event.target.name]:event.target.value});
    }
    function handleChangeDesc(event){
        updateProduct({...product , [event.target.name]:event.target.value})

    }
    function handleChangePrice(event){
        updateProduct({...product , [event.target.name]:event.target.value})

    }
    function handleSelect(event){
        updateProduct({...product , [event.target.name]:event.target.value})
    }
    function handleSelectTag(event){
        updateProduct({...product , [event.target.name]:event.target.value})
    }
    function AddProduct(e){
        e.preventDefault();
        axios.post('http://localhost:8000/products' , product).then((res)=>{
        if(res.data){
            history.push('/products')
        }else{
            history.push('/product_form')

        }
    })
    }
    return(
            <center>
            <form className="col-4" onSubmit={AddProduct} >
                <div className="form-group">
                    <label className="text-white">Name</label>
                    <input type="text" value={product.name} className="form-control" name="name" placeholder="Enter Product Name" onChange={handleChangeName}/>
                </div>
                <div className="form-group">
                    <label className="text-white">Description</label>
                    <input type="text" className="form-control" value={product.description} name="description" placeholder="Enter description" onChange={handleChangeDesc}/>
                </div>
                 <div className="form-group">
                    <label className="text-white">Price</label>
                    <input type="text" className="form-control" value={product.price} name="price" placeholder="Enter Price" onChange={handleChangePrice}/>
                </div>
                <div>
                    <label className="text-white">Category</label>
                    <select className="form-control form-select" name="category"  onChange={handleSelect}>
                        <option value="selected">Choose Category For your Product</option>
                        {categories.map((category)=>{
                            return <option value={category._id}>{category.name}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label className="text-white">Tag</label>
                    <select className="form-control form-select" name="tag"  onChange={handleSelectTag}>
                        <option value="selected">Choose Tag For your Product</option>
                        {tags.map((tag)=>{
                            return <option value={tag._id}>{tag.name}</option>
                        })}
                    </select>
                </div>
                <button type="submit" className="btn btn-success mt-2">Done </button>
            </form>
            </center>
    );
}
export default AddProduct;