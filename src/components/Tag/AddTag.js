import axios from 'axios';
import {React , useState} from 'react'
import {useHistory} from 'react-router-dom'
export default function AddTag(){
    let history = useHistory();
    const [tag , updateTag] = useState({name:''});
    function handleChangeName (e) {
       updateTag({...tag , [e.target.name]:e.target.value})
    }
    function AddTag (e){
        e.preventDefault()
        axios.post('http://localhost:8000/tags' , tag).then((res)=>{
            if(res.data){
                history.push('/tags')
            }
        })
    }
    return(
        <center>
             <form className="col-4" onSubmit={AddTag} >
                <div className="form-group">
                    <label className="text-white">Name</label>
                    <input type="text" value={tag.name} className="form-control" name="name" placeholder="Enter Tag Name" onChange={handleChangeName}/>
                </div>
                <button type="submit" className="btn btn-success mt-2">Done </button>
            </form>
        </center>
    );
}