<template>
  <div class="container">
    <div class="load"></div>
    <van-loading type="spinner" color="#1989fa" size="24px">
      加载中...
    </van-loading>
  </div>

</template>

<script>
  export default {
    components: {},
    data() {
      return {
        jscode: '',
      }
    },
    mounted() {
      if (wx.getStorageSync('openid') == '') {
        //获取code
        let that = this;
        wx.login({
          success(res) {
            if (res.code) {
              console.log('1111',res)
              that.jscode = res.code
              that.login()
            } else {
              wx.showToast({
                title:'登录失败！' + res.errMsg,
                duration: 2000,
              });
            }
          }
        });
      }
    },

    methods: {
      login() {
        //获取openid
        let data = {
          code: this.jscode
        }
        this.$http.post({
          url: 'weChatLogin/appletsLogin',
          data
        }).then(res => {
          console.log('openid',res.openid)
          if(res.openid){
            wx.setStorageSync(
              "openid",res.openid,
            )
            wx.switchTab({
              url: '../index/main'
            })
          }else if(res.code==2245){
            wx.showToast({
              title:res.msg,
              duration: 2000,
              icon:'none'
            });
          }
        })
      },

    }
  }
</script>

<style scoped>
  .container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
  }

  .load {
    width: 100rpx;
    height: 500rpx;

  }
</style>
