const express = require('express')
const {PaginationApi,MonthlyDataApi, BarCharApi, PieChartApi} = require('../controller/product.controller')

let router = express.Router()

router.get('/pagination',PaginationApi)
router.get('/monthlydata',MonthlyDataApi)
router.get('/barchartapi',BarCharApi)
router.get('/piechartapi',PieChartApi)




module.exports =router