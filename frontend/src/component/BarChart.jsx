// BarChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

import  axios  from "axios";
import useForm from '../custom Hook/useForm';
import style from '../css/table.module.css'



const BarChart = () => {
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
        console.log(State);
       },[formData])
       
   async function Getdata()
   {
        let {data}=await axios.get(`http://localhost:4000/products/barchartapi/?month=${formData.month}`)
        
            setstate(data.data)
        
   }
  

  const data = {
    labels: ['0-99', '100-199','200-299','300-399','400-499','500-599','600-699','700-799','800-899','>999'],
    datasets: [
      {
        label: 'Item ',
        backgroundColor: 'rgba(183, 218, 40, 0.748)',
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: Object.values(State)
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
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

      <div style={{ width: '999px', height: '500px',margin:"50px auto" }}><Bar  data={data} options={options} /></div>
    </div>
  );
};

export default BarChart;
