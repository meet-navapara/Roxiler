// PieChart.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import useForm from '../custom Hook/useForm';
import axios  from 'axios';
import style from '../css/table.module.css'


const PieChart = () => {
    let [State,setstate]=useState({})
    let initialState ={
        month:5,

    }
    let { formData, handleChange}=useForm(initialState)
    function storedata(e){
        e.preventDefault()
     
       
    }
    useEffect(()=>{
        Getdata()
        console.log(State);
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
      <h2>Pie Chart Example</h2>
     <div style={{height:'600px',width:"600px",margin:"20px auto"}}><Pie data={data} /></div> 
    </div>
  );
};

export default PieChart;
