
export const ratingsMixin = {
  data() {
    return {
      onlyContent: true, //true/false
      selectType: 2 // 0/1/2
    }
  },

  computed: {
    filterRatings () {
      /*
      const {ratings} = this
      const {ratings} = this.food
      */
      const ratings = this.ratings || this.food.ratings
      if(!ratings) { // 如果还没有数据, 返回空数组
        return []
      }
      const {onlyContent, selectType} = this
      return ratings.filter(rating => {
        return (selectType===2 || selectType===rating.rateType) && (!onlyContent || rating.text.length>0)
      })
    }
  },

  methods: {
    toggleOnlyContent() {
      this.onlyContent = !this.onlyContent
      // 刷新scroll
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },

    setSelectType(selectType) {
      this.selectType = selectType
      // 刷新scroll
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
}


export const xxxMixin = {

}