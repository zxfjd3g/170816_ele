import axios from 'axios'

export function requestSeller() {
  return axios.get('/api2/seller')
}

export function requestRatings() {
  return axios.get('/api2/ratings')
}

export function requestGoods() {
  return axios.get('/api2/goods')
}