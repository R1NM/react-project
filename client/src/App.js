import './App.css';
import React,{useState,useEffect} from 'react';
import Customer from './components/Customer';
import {Table, TableBody, TableHead, TableRow, TableCell, Paper} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import Axios from "axios"

const styles=theme=>({
  root:{
    width:'100%',
    marginTop: theme.spacing.unit*3,
    overflowX:'auto'
  },
  table:{
    minWidth:1080
  }

})


function App(props) {
  const [customers, setcustomers] = useState([])

  useEffect(() => {
    Axios.get("/api/customers")
      .then((res)=>{
        if(res.data){
          console.log(res.data);
          setcustomers(res.data)
        }else{
          alert('Customer List Load Failed')
        }
      })
  }, [])
  
  const customerList=customers.map((cus,idx)=>{
    return(<Customer id={cus.id} name={cus.name} image={cus.image} 
      birthday={cus.birthday} gender={cus.gender} group={cus.group}
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
            <TableCell>Group</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {customerList}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(App);
