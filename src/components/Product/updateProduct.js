import axios from 'axios';
import {React ,  useEffect , useState} from 'react'
import { useParams, useHistory } from 'react-router-dom';

function UpdateProduct(){
    const params = useParams();
    let history = useHistory();
    const [products , updateProducts] = useState({})
    const [tags , updateTag] = useState([])
    const [handleError , setError] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8000/products').then(({data:products})=>{
            updateProducts(products)
            const product = products.filter((item)=>{
                return item._id === params.id
            })
            updateProducts(product[0]);
    });
    axios.get('http://localhost:8000/tags').then(({data:tags})=>{
        updateTag(tags)
    });
    },[]);

    function handleChangeName (event){
        updateProducts({...products , [event.target.name]:event.target.value})
    } 
    function handleChangeDetails (event){
        updateProducts({...products , [event.target.name]:event.target.value})
    }
    function handleChangePrice (event){
        updateProducts({...products , [event.target.name]:event.target.value})
    }
    function handleSelectTag(event){
        updateProducts({...products , [event.target.name]:event.target.value})
    }
    function saveProductUpdates(e){
        e.preventDefault();
        axios.patch(`http://localhost:8000/products/${params.id}` , products).then((res)=>{
            if(res.data){
                history.push('/products')
            }
        }).catch((error)=>{
            setError(error.response.data)
            history.push(`/product_form_edit/${params.id}`)   
    })
    }

    return(
        <center>
            <form className="col-4" onSubmit={saveProductUpdates}>
                {!handleError.length == 0 ? handleError.map((err)=>{
                    return <p className="text-danger"> {err}</p>

                }) : ''}    
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" value={products.name} className="form-control" name="name" placeholder="Enter Product Name" onChange={handleChangeName} />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control" value={products.description} name="description" placeholder="Enter description" onChange={handleChangeDetails}/>
                </div>
                 <div className="form-group">
                    <label>Price</label>
                    <input type="text" className="form-control" value={products.price} name="price" placeholder="Enter Price" onChange={handleChangePrice}/>
                </div>
                <div>
                    <label className="text-white">Tag</label>
                    <select className="form-control form-select" name="tag"  onChange={handleSelectTag}>
                        <option >Choose Tag For your Product</option>
                        {tags.map((tag)=>{
                            return <option value={tag._id}>{tag.name}</option>
                        })}
                    </select>
                </div>
                <button type="submit" className="btn btn-success">Done </button>
            </form>
        </center>
    );
}

export default UpdateProduct;