import React, { useEffect, useState } from 'react';
import useFetch from '../custom Hook/useFetch';
import useForm from '../custom Hook/useForm';
import DropDown from './DropDown';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import  axios  from "axios";
import style from '../css/table.module.css'


function Allrecord(props) {
    let [page,setpage]=useState(1)
    let [skip,setskip]=useState(4)

    let [array,setarray]=useState({})
    let initialState ={
        data:"",
        month:3,

    }
    let { formData, handleChange}=useForm(initialState)
    console.log(formData);
    async function getdata(){
        let {data} = await axios.get(`http://localhost:4000/products/pagination/?title=${formData.data}&color=${formData.data}&month=${parseInt(formData.month)}&page=${page}&limit=${skip}`)
        console.log(data);
       
        
            setarray(data)
        
       
    }
    useEffect(()=>{
        setpage(1)
    },[formData])
    useEffect(()=>{
        getdata()
    },[formData,page])
   
    function storedata(e){
        e.preventDefault()
     
       
    }




    return (
        <>
       
        <form action="" onChange={storedata}>
        
           <input className={style.input}type="text" name="data" placeholder='search product based on title' onKeyUp={handleChange}/> 
           <select className={style.select} name='month' onChange={handleChange} defaultValue={formData.month}>
     <option   value="1">jan</option>
     <option   value="2">fab</option>
     <option   value="3" >march</option>
     <option   value="4">apr</option>
     <option   value="5">may</option>
     <option   value="6">jun</option>
     <option   value="7">july</option>
     <option   value="8">aug</option>
     <option   value="9">sept</option>
     <option   value="10">acto</option>
     <option   value="11">nov</option>
     <option   value="12">dec</option>

   </select>
        </form> 
        <div className="table-responsive-lg"> 
<Table striped bordered hover   style={{marginTop:"40px"}}>
                <thead>
                <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>category</th>
                        <th>Sold</th>
                        <th>DateOfSale</th>
                        <th>Image</th>
                        <th>Price</th>

                    </tr>
                </thead>
              {array.error===false ?   <tbody>
                {array.data.map(({title,image,sold,dateOfSale,category,price,id,description},index)=>{
            return(
                <tr className={style.td} style={{height:"10px",color:"red"}}key={id}>
                <td style={{color:"green"}}>{index+1}</td>
                <td>{title}</td>
                <td  style={{height:"10px"}}>{description}</td>
                <td>{category}</td>
                <td>{sold.toString()}</td>
                <td>{dateOfSale}</td>              
                <td><img height="100px"src={image} alt="" /></td>
                <td>{price}</td>      
            </tr>

            )
        })}
            </tbody>:<h1>No Products is there</h1>}
            </Table>
            </div>
            <div className={style.div}>
                <h5>Page No : {page}</h5>
               <div>
               <button onClick={()=>{
                    setpage(page-1)
                }}>previous</button>
               <button onClick={()=>{
                    setpage(page+1)
                }}>next</button>
               
               </div>
                <h5>Par Page : {skip} items</h5>

            </div>
        </>
    );
}

export default Allrecord;