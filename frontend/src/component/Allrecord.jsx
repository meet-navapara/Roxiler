import React, { useEffect, useState } from 'react';
import useForm from '../custom Hook/useForm';
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

    async function getdata(){
        let {data} = await axios.get(`http://localhost:4000/products/pagination/?title=${formData.data}&color=${formData.data}&month=${parseInt(formData.month)}&page=${page}&limit=${skip}`)
  
       
        
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
     <option   value="1">January</option>
     <option   value="2">February</option>
     <option   value="3" >March</option>
     <option   value="4">April</option>
     <option   value="5">May</option>
     <option   value="6">June</option>
     <option   value="7">July</option>
     <option   value="8">August</option>
     <option   value="9">September</option>
     <option   value="10">October</option>
     <option   value="11">November</option>
     <option   value="12">December</option>

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
            </tbody>:<tbody><h1>No Products is there</h1></tbody>}
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