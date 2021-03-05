<template>
  <div class="container" >
    <div class="choseuser">
      <div class="main"
        v-if="planInfo==''?false:true"
        v-for="item in planInfo"
        :key="item.toString"
        @click="gonext(item.id)"
        >
        <div class="pict">
          <div class="info">
            <h1>{{item.name}}</h1>
          </div>
          <div class="info">
            <p>申请时间:</p>
            <p>{{time}}</p>
          </div>
        </div>
        <div class="imgs">
          {{status[item.status]}}
        </div>
      </div>
      <div class="msg"
      v-if="planInfo==''?true:false">--------暂无数据--------</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      planInfo:{},
      time:'',
      status:{
        0:"审核中",
        1:'已通过',
        2:'未通过'
      }
    }
  },
  mounted () {
    this.getInfo()
  },
  methods:{

    getInfo(){
      let that = this
      this.$http.get({
        url:'flightDeclareController/auditList',
      }).then(res=>{
        this.planInfo = res.rows
        var oDate = new Date(res.rows[0].createdTime)
        var oYear = oDate.getFullYear()
        var oMonth = oDate.getMonth()+1
        var oDay = oDate.getDate()
        var oTime = oYear +'-'+(oMonth) +'-'+(oDay)
        this.time = oTime

      })
    },
    gonext(id){
      wx.navigateTo({
        url:'../reportresult/main?id='+id
      })
    }
  }
}
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
    padding:20rpx;
  }
  .choseuser{
    width: 100%;
    min-height: 104rpx;
    display: flex;
     flex-direction: column;
    justify-content: space-between;
    padding: 20rpx;
    background-color: #fff;
  }
  .main{
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 0;
    border-bottom: 4rpx solid #f5f5f5;
  }
  .imgs{
    float: left;
    height: 80rpx;
    width: 160rpx;
    text-align: center;
    line-height: 80rpx;
    background-color: #5397f8;
    color: white;
    border-radius: 40rpx;
  }
  .msg{
    text-align: center;
    height: 100rpx;
    line-height: 100rpx;
  }
  .info{
    display: flex;
    height: 52rpx;
  }
  .info h1{
    font-size: 32rpx;
    line-height: 50rpx;
    margin-right: 20rpx;
  }
  .info p{
    font-size: 28rpx;
    color: #969696;
    line-height: 50rpx;
    margin-right: 20rpx;
  }
  .pict{
    height: 100rpx;
    float: left;
    margin-left: 20rpx;
  }
 .btn{
   font-size: 24rpx;
   text-align: center;
   line-height: 48rpx;
   width: 144rpx;
   height: 48rpx;
   border-radius: 24rpx;
   border: 1rpx solid #5097ef;
   margin-top: 30rpx;
 }




</style>
