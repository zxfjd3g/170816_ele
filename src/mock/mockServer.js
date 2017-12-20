import Mock from 'mockjs'
import data from './data.json'

console.log('mockServer')
// 指定监听的url和对应的json数据模板
Mock.mock('/api2/goods', {
  code: 0,
  data: data.goods
})
Mock.mock('/api2/ratings', {
  code: 0,
  data: data.ratings
})
Mock.mock('/api2/seller', {
  code: 0,
  data: data.seller
})

// export default xxx  不需要