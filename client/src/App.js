import './App.css';
import React,{useState,useEffect} from 'react';
import Customer from './components/Customer';
import {Table, TableBody, TableHead, TableRow, TableCell, Paper} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import Axios from "axios";
import { CircularProgress } from '@material-ui/core';

const styles=theme=>({
  root:{
    width:'100%',
    marginTop: theme.spacing.unit*3,
    overflowX:'auto'
  },
  table:{
    minWidth:1080
  },
  progress:{
    margin: theme.spacing.unit*2
  }
})


function App(props) {
  const [customers, setcustomers] = useState([])
  const [completed, setcompleted] = useState(0)
  const [isLoad, setisLoad] = useState(false)

  useEffect(() => {
    
    let timer=setInterval(()=>{
      completed >=100 ? setcompleted(0) : setcompleted(completed +1);
      if(isLoad){
        clearInterval(timer)
      }
    },20);
    Axios.get("/api/customers")
      .then((res)=>{
        if(res.data){
          setisLoad(true);
          console.log(res.data);
          setcustomers(res.data)
        }else{
          alert('Customer List Load Failed')
        }
      })
  }, [isLoad])
  
  const customerList=customers.map((cus,idx)=>{
    return(<Customer id={cus.id} name={cus.name} image={cus.image} 
      birthday={cus.birthday} gender={cus.gender} job={cus.job}
      />)
  });
  
  const {classes}=props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Job</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {customers? customerList : 
          <TableRow>
            <TableCell colSpan="6" align="center">
              <CircularProgress className={classes.progress} variant="determinate" value={completed}/>
            </TableCell>  
          </TableRow>}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(App);
