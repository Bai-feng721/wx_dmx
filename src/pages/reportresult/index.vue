<template>
  <div class="container">

    <div class="content">
      <div class="choseuser">
        <van-field
          :value=" MyInfo.name "
          label="姓名"
          readonly
          input-align="right"

        />
        <van-field
          :value=" MyInfo.phone "
          label="电话"
          input-align="right"
          readonly
        />
        <van-field
          :value=" time "
          label="申报时间"
          input-align="right"
          readonly
        />
        <van-field
          :value=" status[MyInfo.status]"
          label="申报状态"
          input-align="right"
          readonly
          error="true"
        />
        <van-field
          :value=" MyInfo.details"
          label="申报详情"
          input-align="right"
          readonly
          type="textarea"
          autosize
          :border="false"
        />
        <van-field
          :value=" MyInfo.resultDesc"
          label="申报结果"
          input-align="right"
          readonly
          error="true"
        />
      </div>
    </div>

  </div>

</template>

<script>
import Button from "@/components/Button.vue"

export default {
  components: {
    Button
  },
  data () {
    return {
       time:'',
       MyInfo:{},
      status:{
        0:"审核中",
        1:'已通过',
        2:'未通过'
      },
    }
  },
  mounted () {
    this.getMyInfo(this.$root.$mp.query.id)
  },
  onShow: function (options) {
        if (wx.getStorageSync('token')==="") {
            wx.reLaunch({
                url: '../login/main'
            })
        }
   },
  methods:{
     getMyInfo(id){
       this.$http.get({
         url:'flightDeclareController/'+id,
       }).then(res=>{
         this.MyInfo = res.data
         var oDate = new Date(res.data.createdTime)
         var oYear = oDate.getFullYear()
         var oMonth = oDate.getMonth()+1
         var oDay = oDate.getDate()
         var oTime = oYear +'-'+(oMonth) +'-'+(oDay)
         this.time = oTime

       })
     },

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
    background-color: #f5f5f5;
  }
  .head{
    width: 710rpx;
    height:160rpx;
    display: flex;
    margin-top: 20rpx;
    background-color: #FFFFFF;
  }
  .content{
    width: 100%;
    padding: 20rpx;
  }
  .choseuser{
    width: 100%;
    margin-top: 20rpx;
  }
  .foot{
    margin: 50rpx 0;
  }
  .imgs{
    float: left;
  }
  .imgs img{
    width: 115rpx;
    height: 115rpx;
    border-radius: 20rpx;
    margin: 20rpx;
  }
  .info{
    display: flex;
    height: 40rpx;
  }
  .info h1{
    font-size: 26rpx;
    line-height: 40rpx;
    margin-right: 20rpx;
  }
  .info p{
    font-size: 22rpx;
    color: #969696;
    line-height: 40rpx;
    margin-right: 20rpx;
  }
  .pict{
    height: 160rpx;
    float: left;
    margin: 20rpx;
  }
  .finish{
    width: 710rpx;
    height: 88rpx;
    background:#5597f8;
    color:#fff; text-align:center;
    line-height:88rpx;
    border-radius:44rpx;
    font-size:34rpx;
  }
</style>
