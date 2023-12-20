let Helper = require('express-async-handler')
let Product = require('../model/product.model')


//api for searching products and pagination
let PaginationApi = Helper(async (req, res, next) => {
  let { page, limit, title, price, month } = req.query

  let SearhingProduct = {}
  if (title) {
    SearhingProduct.title = title
  }
  let product = await Product.find({ SearhingProduct })
  page = Number(page) || 1
  limit = Number(limit) || 10
  let skip = (page - 1) * limit
  
  if (month) {
    product = await Product.find({
      $expr: {
        $and: [{ $eq: [{ $month: '$dateOfSale' }, month] }]
      },
      ...SearhingProduct
    })
      .skip(skip)
      .limit(limit)
  } else {
    product = await Product.find({
      ...SearhingProduct
    })
      .skip(skip)
      .limit(limit)
  }
  if (product.length > 0) {
    return res.status(200).json({
      count: product.length,
      error: false,
      data: product
    })
  }
  res.json({
    count: product.length,
    error: true,
    data: product,
    message: 'no product found'
  })
})

//api for getting stats for particular months
let MonthlyDataApi = Helper(async (req, res, next) => {
  let { month, year } = req.query
  const startDate = new Date(year, month - 1, 1)
  const endDate = new Date(year, month, 1)
  let Data = await Product.find({
    dateOfSale: { $gte: startDate, $lte: endDate }
  })
  const totalSaleAmount = Data.reduce((sum, product) => sum + product.price, 0)
  let solditem = await Product.find({
    dateOfSale: { $gte: startDate, $lte: endDate },
    sold: true
  }).count()
  let unSolditem = await Product.find({
    dateOfSale: { $gte: startDate, $lte: endDate },
    sold: false
  }).count()
  res
    .status(200)
    .json({ error: false, Totalamount: totalSaleAmount, solditem, unSolditem })
})


//api for bar chart
let BarCharApi = Helper(async (req, res, next) => {
  let { month } = req.query
  let p000 = 0
  let p100 = 0
  let p200 = 0
  let p300 = 0
  let p400 = 0
  let p500 = 0
  let p600 = 0
  let p700 = 0
  let p800 = 0
  let p900 = 0

  let product = await Product.find({
    $expr: {
      $and: [{ $eq: [{ $month: '$dateOfSale' }, month] }]
    }
  })

  for (let i = 0; i < product.length; i++) {
    if (product[i]?.price >= 0 && product[i].price <= 100) {
      p000 = p000 + 1
      continue
    }
    if (product[i].price >= 101 && product[i].price <= 200) {
      p100 = p100 + 1
      continue
    }
    if (product[i].price >= 201 && product[i].price <= 300) {
      p200 = p200 + 1
      continue
    }
    if (product[i].price >= 301 && product[i].price <= 400) {
      p300 = p300 + 1
      continue
    }
    if (product[i].price >= 401 && product[i].price <= 500) {
      p400 = p400 + 1
      continue
    }
    if (product[i].price >= 501 && product[i].price <= 600) {
      p500 = p500 + 1
      continue
    }
    if (product[i].price >= 601 && product[i].price <= 700) {
      p600 = p600 + 1
      continue
    }
    if (product[i].price >= 701 && product[i].price <= 800) {
      p700 = p700 + 1
      continue
    }
    if (product[i].price >= 801 && product[i].price <= 900) {
      p800 = p800 + 1
      continue
    }
    if (product[i].price >= 900) {
      p900 = p900 + 1
      continue
    }
  }

  res
    .status(200)
    .json({
      error: false,
      data: { p000, p100, p200, p300, p400, p500, p600, p700, p800, p900 }
    })
})


//api for piechart
let PieChartApi = Helper(async (req, res, next) => {
  let { month } = req.query
  let categorys = await Product.find({}).select('category -_id')

  let resultObject = categorys.reduce((acc, item) => {
    let category = item.category
    acc[category] = 0
    return acc
  }, {})
  let product = await Product.find({
    $expr: {
      $and: [{ $eq: [{ $month: '$dateOfSale' }, month] }]
    }
  })
  product.forEach(({ category }) => {
    resultObject[category] += 1
  })
  res.status(200).json({ error: false, data: resultObject })
})

module.exports = { PaginationApi, MonthlyDataApi, BarCharApi, PieChartApi }
