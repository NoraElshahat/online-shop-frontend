import {React,useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Users() {
    const [users , updateUsers] = useState([])
    const [disableuser , updateDisableUser] = useState(false)
    // const [header , setHeader]= useState({})
    const header= {
        ContentType:'application/json',
        Accept: 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
    useEffect(()=>{
        axios.get('http://localhost:8000/users',{headers:header}).then((res)=>{
        if(res.data){
            updateUsers(res.data)
            }
    }).catch((err)=>{
        console.log(err.response.data)
    })
    },[])
    function deleteUser(id){
        axios.delete(`http://localhost:8000/users/${id}`).then((res)=>{
            const usersAfterDelete = users.filter((item)=>{
                return item._id != id
            })
            updateUsers(usersAfterDelete)
        })
    }
    function disableUser(id){
        axios.get(`http://localhost:8000/users/${id}`).then((res)=>{
        const disabledUser = res.data
        disabledUser.isDisable = !disabledUser.isDisable
        updateDisableUser(disabledUser)
    }).catch((error)=>{
        console.log(error.response)
    })
    axios.patch(`http://localhost:8000/users/${id}` ,disableuser).then((res)=>{
        console.log(res.data)
    }).catch((error)=>{
        console.log(error.response)
    })
    }
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> Name</TableCell>
            <TableCell> email</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
            <TableCell>Disable</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
                
               <TableCell>{user.name}</TableCell>
               <TableCell>{user.email}</TableCell>
               <TableCell>
                   <Link to={`/edit_user/${user._id}`}>
                    <IconButton aria-label="delete">
                        <SvgIcon >
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </SvgIcon>
                    </IconButton>
                    </Link>
                </TableCell>
               <TableCell>
                    <IconButton aria-label="delete" onClick={()=>deleteUser(user._id)}>
                            <SvgIcon >
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </SvgIcon>
                    </IconButton>
               </TableCell>
               <TableCell>
                    <IconButton onClick={()=>disableUser(user._id)}>
                        <SvgIcon >
                                <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                        </SvgIcon>
                    </IconButton>
               </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
