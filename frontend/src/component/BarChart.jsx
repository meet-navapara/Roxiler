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

      <div style={{ width: '999px', height: '500px',margin:"50px auto" }}><Bar  data={data} options={options} /></div>
    </div>
  );
};

export default BarChart;
