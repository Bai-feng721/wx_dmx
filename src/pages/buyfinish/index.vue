<template>
  <div class="container">
    <div class="main">
      <img src="../../../static/images/wancheng.png" alt="">
      <h1>恭喜您，完成购买备案！</h1>
    </div>
    <div class="foot">
      <div class="finish" @click="finsh">完 成</div>
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

    }
  },
  created () {
  },
  methods:{
    //根据用户名改密码
    finsh(){
      wx.switchTab({
        url:'../index/main'
      })
    }
  },
  
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
  }
  .main{
    height: 1024rpx;
  }
  .main img{
    width: 250rpx;
    height: 135rpx;
    margin-top: 310rpx;
    margin-left: 60rpx;
  }
  .main h1{
    margin-top: 56rpx;
    font-size: 34rpx;
    margin-left: 20rpx;
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
