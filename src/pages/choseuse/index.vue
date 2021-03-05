<template>
  <div class="container">
    <div class="topimg">
      <img src="../../../static/images/zc_bg.png" alt="">
      <div class="title">"低慢小"飞行器治安管控平台</div>
    </div>
    <div class="choseuser">
      请选择用户注册
    </div>
    <div class="foot">
      <div  @click="gopreson" :class="[isPreson?'diycolor':'diybtn']">个人</div>
      <div :class="[isCompany?'diycolor':'diybtn']" @click="golawer">执法者</div>

    </div>
    <input type="button" class="finish " value='下一步'  @click="gopage">

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
      isPreson: false,
      isCompany:false
    }
  },
  created () {
  },
  methods:{
    gopreson(){
      this.isPreson = true
      if(this.isPreson) {this.isCompany=false}
      // mpvue.navigateTo({
      //   url:'/pages/index1/main'
      // })
    },
    golawer(){
      this.isCompany =true
      if(this.isCompany) {this.isPreson=false}
    },
    gopage(){
      if(this.isPreson){
        mpvue.navigateTo({
          url: '../reg/main'
        })
      }else{
        mpvue.navigateTo({
          url:'../reglaw/main'
        })
      }

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
    /* margin:0 30rpx 30rpx 30rpx; */
  }
  .topimg{
    width: 100%;
    position: relative;
    display: flex;
  }
  .topimg img{
    width: 100%;
  }
  .choseuser{
    width: 100%;
    height: 180rpx;
    line-height: 180rpx;
    text-align: center;
    font-size: 34rpx;
  }
  .foot{
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 200rpx;
    }
  .diybtn{
    width:200rpx;
    height:88rpx;
    color:#5597f8;
    text-align:center;
    border-radius:44rpx;
    font-size:34rpx;
    border: 2rpx solid #5597f8;
    line-height:88rpx;
  }
  .diycolor{
    width: 200rpx;
    height: 88rpx;
    background:#5597f8;
    color:#fff; text-align:center;
    line-height:88rpx;
    border-radius:44rpx;
    font-size:34rpx;
  }
  .finish{
    width: 700rpx;
    height: 88rpx;
    background:#5597f8;
    color:#fff; text-align:center;
    line-height:88rpx;
    border-radius:44rpx;
    font-size:34rpx;
  }
  .title{
    position: absolute;
    font-size: 38rpx;
    color: white;
    margin:94rpx 100rpx;
    letter-spacing: 4rpx;
  }
</style>
