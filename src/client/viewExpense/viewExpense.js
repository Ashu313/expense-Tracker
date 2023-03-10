import React, { useEffect, useState } from 'react';
import {  MDBPagination } from 'mdb-react-ui-kit';
import { fetchAllExpense } from '../../redux/slices/expense/expense';
import { useDispatch,useSelector } from 'react-redux';
import { UserProfile } from '../../redux/slices/users/userslice';
import ExpenseTable from './userContent';
import Pagination from './pagination';
import AddExpense from '../expenseTable/expense';




const ViewExpense=()=>
 {
  const [showExpense,setShowExpense]=useState(false);
  const toggleExpense=()=>{
    setShowExpense(!showExpense)
  }
  const[page,setPage]=useState(1);

  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(UserProfile());
  },[dispatch]);

useEffect(()=>{
  dispatch(fetchAllExpense(page))
},[page]);
  const state=useSelector(state=>state?.users);
  const {Profile}=state;
  console.log(state);
  const expense=useSelector(state=>state?.expense);
  const {expenseList}=expense;
  console.log(expense);
  console.log(expenseList?.docs);
 
  return (
    <>
    
   <nav>
    <a href='/'><button>Dashbaord</button></a>
   </nav>
    <div className="table-content">
      <h1 style={{textDecoration:'none',textAlign:'center'}}> HELLO ! {Profile?.firstname}</h1>
      <p style={{textAlign:'center'}}>This is your expenses</p>
    </div>
    <button onClick={toggleExpense} >Add expense</button>
    <AddExpense  showIncomeBox={showExpense} toggleIncomeBox={toggleExpense}/>
    <table class="table" style={{backgroundColor:'black',color:'white',position:'relative'}}>
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Amount</th>
      <th scope="col">Date</th>
      <th scope="col">Edit</th>
      <th scope='col'>delete</th>
    </tr>
  </thead>
  <tbody>
    <>
    {expenseList?.length <= 0 ? (
                      <h2>No Expense Found</h2>
                    ) :
    
      (expenseList?.docs?.map(exp=>(
        <ExpenseTable items={exp} key={exp?.id}/>
      ))
    )}
    </>
 
  </tbody>
</table>
<>
{
  expenseList?.docs?.length>1 &&(
    <Pagination
    setPage={setPage}
    items={ expenseList?.totalPages}
    page={page}
     />
  )
}
</>
</>
  )
}
export default ViewExpense;