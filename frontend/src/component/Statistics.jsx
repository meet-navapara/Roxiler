import React, { useEffect, useState } from 'react'
import useForm from '../custom Hook/useForm'
import axios from 'axios'
import style from '../css/table.module.css'

function Statistics (props) {
  let [info, setinfo] = useState({})
  let initialState = {
    year: 2022,
    month: 3
  }
  let { formData, handleChange } = useForm(initialState)
  async function getdata () {
    let { data } = await axios.get(
      `http://localhost:4000/products/monthlydata/?month=${parseInt(
        formData.month
      )}&year=${parseInt(formData.year)}`
    )

    setinfo(data)
  }
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  useEffect(() => {
    getdata()
  }, [formData])
  function storedata (e) {
    e.preventDefault()
  }
  return (
    <div>
      <form action='' onChange={storedata}>
        <div className={style.selectbutton}>
          <select
            className={style.selects}
            name='month'
            onChange={handleChange}
            defaultValue={formData.month}
          >
            <option value='1'>January</option>
            <option value='2'>February</option>
            <option value='3'>March</option>
            <option value='4'>April</option>
            <option value='5'>May</option>
            <option value='6'>June</option>
            <option value='7'>July</option>
            <option value='8'>August</option>
            <option value='9'>September</option>
            <option value='10'>October</option>
            <option value='11'>November</option>
            <option value='12'>December</option>
          </select>
          <select
            className={style.selects}
            name='year'
            onChange={handleChange}
            defaultValue={formData.year}
          >
            <option value='2020'>2020</option>
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
            <option value='2023'>2023</option>
          </select>
        </div>
      </form>
      <div className={style.monthname}>
        <h4>
          Statistics : {months[formData.month - 1]} {formData.year}
        </h4>
      </div>
      <div className={style.card}>
        <h4 className={style.detail}>
          <span className={style.span}>Total Sale : </span> {info.Totalamount}
        </h4>
        <h4 className={style.detail}>
          <span className={style.span}>Total Sold Item : </span>
          {info.solditem}
        </h4>
        <h4 className={style.detail}>
          <span className={style.span}>Total Unsold Item : </span>
          {info.unSolditem}
        </h4>
      </div>
    </div>
  )
}

export default Statistics
