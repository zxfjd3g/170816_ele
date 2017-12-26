import {
  requestGoods,
  requestRatings,
  requestSeller,
  getUser
} from '../api'
import {
  RECEIVE_SELLER,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCRMENT_FOOD_COUNT,
  DECRMENT_FOOD_COUNT,
  CLEAR_CART,
  GET_USERINFO,
  RECORD_USERINFO,
} from './mutation-types'

export default {
  async requestSeller({commit}, cb) {
    const result = await requestSeller()
    if(result.code===0) {
      const seller = result.data
      seller.score = 3.5
      commit(RECEIVE_SELLER, {seller})

      cb && cb()
    }
  },

  async requestRatings({commit}, cb) {
    const result = await requestRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})

      cb && cb()
    }
  },

  async requestGoods({commit}, cb) {
    const result = await requestGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
      cb && cb()
    }
  },

  // 增加/减少指定食物的数量
  updateFoodCount ({commit}, {food, isAdd}) {
    if(isAdd) {
      commit(INCRMENT_FOOD_COUNT, {food})
    } else {
      commit(DECRMENT_FOOD_COUNT, {food})
    }
  },

  // 清空购物车
  clearCart ({commit}, foods) {
    commit(CLEAR_CART, {foods})
  },

  async getUserInfo({commit, state}) {
    const info =  await getUser()
    commit(GET_USERINFO, {info})
  },

  recordUserinfo({commit}, info) {
    commit(RECORD_USERINFO, {info})
  },
}