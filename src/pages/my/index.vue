<template>
  <div class="container">
    <div class="head">
      <div class="imgs">
         <img v-if="MyInfo.avator" :src="url+filename" alt="">
      </div>
      <div class="pict">
        <div class="info">
          <h1>{{MyInfo.name}}</h1>
        </div>
        <div class="info">
          <p>警号:</p>
          <p>{{MyInfo.enforceCode}}</p>
        </div>
        <div class="info">
         <p>执法大队第三小组队长</p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="choseuser">
        <van-field
          :value=" MyInfo.name "
          label="姓名"
          readonly
          input-align="right"

        />
        <van-field
          :value=" MyInfo.enforceCode "
          label="编号"
          input-align="right"
          readonly
        />
        <van-field
          :value=" MyInfo.workCode "
          label="单位编号"
          input-align="right"
          readonly
        />
        <van-field
          :value=" timer "
          label="注册时间"
          input-align="right"
          readonly
        />


        <!-- <van-field
          :value=" MyInfo.cardNumber "
          label="证件号码"
          input-align="right"
          readonly
        />
        <van-field
          :value=" MyInfo.issuingAuthority "
          label="发证机关"
         input-align="right"
         readonly
        />


        <van-field
          :value=" MyInfo.lssuingArea "
          label="执法区域"
         input-align="right"
         readonly
        /> -->
      </div>


    </div>
    <div class="foot">
       <div class="finish" @click="loginout">退 出 登 录</div>
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
       timer:'',
       name:'',
       enforceCode:'',
       workCode:'',
       nation:'',
       politicCountenance:'',
       education:'',
       rank:'',
       personnelType:'',
       cardNumber:'',
       issuingAuthority:'',
       issuingTime:'',
       lssuingType:'',
       lssuingArea:'',
       avator:'',
       MyInfo:{},
			 filename:'',
       url: process.env.VUE_APP_IMAGES
    }
  },
  mounted () {
    this.getMyInfo();
  },
  onShow: function (options) {
        if (wx.getStorageSync('token')==="") {
            wx.reLaunch({
                url: '../login/main'
            })
        }
   },
  methods:{
     getMyInfo(){
       this.$http.get({
         url:'punish/enforce/getInfo',
       }).then(res=>{
         this.MyInfo = res.data
          this.filename = res.data.avator.replace('http://localhost/','/')
          var oDate = new Date(this.MyInfo.createdTime)
          var oYear = oDate.getFullYear()
          var oMonth = oDate.getMonth()+1
          var oDay = oDate.getDate()
          var oTime = oYear +'-'+(oMonth) +'-'+(oDay)
          this.timer = oTime

       })
     },
     loginout(){
      wx.removeStorageSync('token')
      mpvue.navigateTo({
        url:'../login/main'
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
