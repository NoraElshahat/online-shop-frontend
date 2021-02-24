import axios from 'axios';
import {React , useState , useEffect} from 'react'
import {useHistory , useParams} from 'react-router-dom'
export default function UpdateTag(){
    let history = useHistory();
    let params = useParams();
    const [user , updateUser] = useState({});
    useEffect(()=>{
        axios.get(`http://localhost:8000/users/${params.id}`).then((res)=>{
            const user = res.data 
            updateUser(user)
    })
    } , [])
    function handleChangeName (e) {
       updateUser({...user , [e.target.name]:e.target.value})
    }
    function handleChangeEmail (e) {
        updateUser({...user , [e.target.name]:e.target.value})
     }
    function editUser (e){
        e.preventDefault()
        axios.patch(`http://localhost:8000/users/${params.id}` , user).then((res)=>{
            if(res.data){
                history.push('/users')
            }
    }).catch((error)=>{
        console.log(error.response)
    })
    }
    return(
        <center>
              <form className="col-4" onSubmit={editUser}>
                <div className="form-group">
                    <label className="text-white">Name</label>
                    <input type="text" value={user.name} className="form-control" name="name" placeholder="Enter User Name" onChange={handleChangeName}/>
                </div>
                <div className="form-group">
                    <label className="text-white">email</label>
                    <input type="text" value={user.email} className="form-control" name="email" placeholder="Enter User Email" onChange={handleChangeEmail}/>
                </div>
                <button type="submit" className="btn btn-success mt-2">Update </button>
            </form> 
        </center>
    );

}