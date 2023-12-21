// PieChart.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import useForm from '../custom Hook/useForm';
import axios  from 'axios';
import style from '../css/table.module.css'


const PieChart = () => {
    let [State,setstate]=useState({})
    let initialState ={
        month:3,

    }
    let { formData, handleChange}=useForm(initialState)
    function storedata(e){
        e.preventDefault()
     
       
    }
    useEffect(()=>{
        Getdata()
       },[formData])
       
   async function Getdata()
   {
        let {data}=await axios.get(`http://localhost:4000/products/piechartapi/?month=${formData.month}`)
        
            setstate(data.data)
        
   }
  
  const data = {
    labels: Object.keys(State),
    datasets: [
      {
        data: Object.values(State),
        backgroundColor: [
          'rgba(255, 99, 12, 0.6)',
          'rgba(54, 12, 250, 0.6)',
          'rgba(18, 210, 44, 0.834)',
          'rgba(240, 206, 17, 0.834)',
         
        ],
        hoverBackgroundColor: [
          'rgba(135, 9, 12, 0.8)',
          'rgba(102, 100, 100, 0.8)',
          'rgba(255, 160, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
         
        ],
      },
    ],
  };

  return (
    <div>
          <form action="" onChange={storedata}>
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
     <div style={{height:'550px',width:"550px",margin:"20px auto"}}><Pie data={data} /></div> 
    </div>
  );
};

export default PieChart;
