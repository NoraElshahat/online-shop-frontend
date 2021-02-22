import axios from 'axios';
import {React , useState , useEffect} from 'react'
import {useHistory , useParams} from 'react-router-dom'
export default function UpdateTag(){
    let history = useHistory();
    let params = useParams();
    const [tag , updateTag] = useState({});
    useEffect(()=>{
        axios.get(`http://localhost:8000/tags/${params.id}`).then((res)=>{
            const tag = res.data 
            updateTag(tag)
    })
    } , [])
    function handleChangeName (e) {
       updateTag({...tag , [e.target.name]:e.target.value})
    }
    function editTag (e){
        e.preventDefault()
        axios.patch(`http://localhost:8000/tags/${params.id}` , tag).then((res)=>{
            if(res.data){
                history.push('/tags')
            }
    })
    }
    return(
        <center>
              <form className="col-4" onSubmit={editTag}>
                <div className="form-group">
                    <label className="text-white">Name</label>
                    <input type="text" value={tag.name} className="form-control" name="name" placeholder="Enter Tag Name" onChange={handleChangeName}/>
                </div>
                <button type="submit" className="btn btn-success mt-2">Update </button>
            </form> 
        </center>
    );

}