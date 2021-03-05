<template>
  <div class="container">
    <div class="top">
      <div class="sear">
        <van-field
          :value=" keyword "
          left-icon="search"
          placeholder="请输入区域关键字查询"
          input-align="center"
           @input="keyword=$event.mp.detail"
        />
      </div>
      <div class="finish" @click="search">查 询</div>
    </div>
    <div class="newlist" v-if="listdata==''?true:false">
      <new-cell
       v-for="item in tableData"
       :key="item.id"
       :id="item.id"
       :newtitle="item.address"
       :newtime="$parseTime(item.createdTime,'{y}-{m}-{d}')"
       :imgurl="url+item.images"
       :createdBy="item.createdBy"
       :content="item.content"
       />
    </div>
    <div class="searchlist" v-if="listdata==''?false:true">
      <new-cell
       v-for="item in listdata"
       :key="item.id"
       :id="item.id"
       :newtitle="item.address"
       :newtime="$parseTime(item.createdTime,'{y}-{m}-{d}')"
       :imgurl="url+item.images"
       :createdBy="item.createdBy"
       :content="item.content"
       />
    </div>

  </div>
</template>

<script>
import NewCell from "@/components/new-cell.vue";
export default {
  components: {
    NewCell
  },
  data() {
    return {
      isCode:true,
      keyword:'',
      pagination: {
        page: 0,
        size: 10
      },
			listdata:[],
      tableData: [],
      url: process.env.VUE_APP_IMAGES
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    search(){
      let that = this
      this.$http.get({
          url:"flyingController/list",
          data:{
            page: 1,
            size: 10,
            address:this.keyword
          }
       }).then(res =>{
        if(res.code==200){
          that.isCode = true
          that.listdata = res.rows
          if(that.listdata==''){
            wx.showToast({
              title:'暂无查询数据',
              icon:'none'
            })
          }
        }else{
          wx.showToast({
            title:'暂无查询数据',
            icon:'none'
          })
        }

      });
    },
    getList() {
      let vm = this
      this.$http
        .get({
          url: "flyingController/list",
          data: this.pagination
        })
        .then(res => {
          vm.tableData = res.rows
        });
    },
  }
};
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  overflow: hidden;
  /* margin:0 30rpx 30rpx 30rpx; */
}
.sear{
  width: 600rpx;
}
.top{
  width:100% ;
  display: flex;
  align-items: center;
}
.finish{
    width: 120rpx;
    height: 60rpx;
    background:#5597f8;
    color:#fff; text-align:center;
    line-height:60rpx;
    border-radius:30rpx;
    font-size:30rpx;
  }

</style>
