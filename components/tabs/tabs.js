// components/search/search.js
Component({
  properties: {
      tabs:{
        type:Array,
        value:[]
      }
  },
  data: {
  },
  methods: {
    handleItemTap(e){
      // 获取索引
      const { index } = e.currentTarget.dataset;
      // 触发父元素事件
      this.triggerEvent("tabsItemChang",{index})
    }
  }
})
