import './App.css';
import React,{useState,useEffect} from 'react';
import Customer from './components/Customer';
import {Table, TableBody, TableHead, TableRow, TableCell, Paper} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import Axios from "axios";
import CustomerAdd from './components/CustomerAdd';

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
      birthday={cus.birthday} gender={cus.gender} job={cus.job}
      />)
  });
  
  const {classes}=props;
  return (
    <div>
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
          {customerList}
        </TableBody>
      </Table>
    </Paper>
    <CustomerAdd/>
    </div>
    
  );
}

export default withStyles(styles)(App);
