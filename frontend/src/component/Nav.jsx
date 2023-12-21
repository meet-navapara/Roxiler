import React from 'react';
import {Link}from 'react-router-dom'
import style from '../css/nav.module.css'


function Nav(props) {
    return (
        <div className={style.div}>
            <Link className={style.a} to="/">All Products</Link>
            <Link className={style.a} to='/barchart'>BarChart</Link>
            <Link className={style.a} to='piechart'>PieChart</Link>
            <Link className={style.a} to='/statistics'>Statistics</Link>
        </div>
    );
}

export default Nav;