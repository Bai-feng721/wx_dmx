<template>
  <div class="container">
    <div class="topimg">
       <img src="../../../static/images/dl_bg1.png" alt="">
      <div class="title">"低慢小"飞行器治安管控平台</div>

    </div>
    <!-- <button  open-type="getUserInfo" bindgetuserinfo="getUserInfo"> 获取头像昵称 </button> -->
    <div class="choseuser">
      <div class="content">
        <van-field
          :value=" username "
          label="用户账号"
          required
          input-align="right"
          placeholder="请输入用户账号"
          @input="username=$event.mp.detail"
        />
        <van-field
          :value=" password "
          label="密码"
          required
          password
          input-align="right"
          placeholder="请输入密码"
          @input="password=$event.mp.detail"
        />
      </div>
    </div>
    <div class="foot">
      <div class="finish" @click="login">登 录</div>
    </div>
    <div class="footer">
      <div class="reg " @click="toreg">注册</div>
      <div class="perfect" @click="forget">忘记密码?</div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue"
import DmxInput from "@/components/dmx-input.vue"
export default {
  components: {
    Button,DmxInput
  },
  data () {
    return {
       username:'',
       password:'',
    }
  },
  
  onload:function(options){

  },
  methods:{

    login(){

      let data = {
        username: this.username,
        password: this.password,
        }
      if(this.username!=''&&this.password!=''){
        this.$http.post({
              url:"userRegistrationController/login",
              data,
          }).then(
           res=>{
             if(res.code == 200) {
              wx.showToast({
                title: "登录成功",
                duration: 2000,
                mask: true,
              });
              if(res.data.roleId==7){
                wx.switchTab({
                  url:'../lawindex/main'
                 })
              }else{
                wx.switchTab({
                  url:'../index/main'
                 })
              };
              //种token信息
               wx.setStorageSync(
                "token",res.data.token
              )
             }else{
               wx.showToast({
                 title: res.msg,
                 icon:'none',
               });
             }
           }
         )
      }else{
        wx.showToast({
          title:'请完善登录信息！',
          icon:'none'
        })
      }
    },
    toreg(){
      mpvue.navigateTo({
        // url:'../choseuse/main'
        url:'../reg/main'
      })
    },

    forget(){
      mpvue.navigateTo({
        url:''
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
  }
  .topimg{
   height:350rpx;
   width: 100%;
    position: relative;
    display: flex;
  }
  .topimg img{
    width: 100%;
    height:100%;
  }
  .title{
    position: absolute;
    font-size: 38rpx;
    color: white;
    margin:94rpx 100rpx;
    letter-spacing: 4rpx;
  }
  .choseuser{
    width: 100%;
    font-size: 34rpx;
  }
  .content{
    width: 710rpx;
    height: 100%;
    margin-left: 20rpx;
    margin-bottom: 74rpx;
  }
  .dmx-input{
    width: 600rpx;
    border-bottom:1px solid #e5e7e8;
    height:114rpx;
    position:relative;
  }
  .dmx-input input{
    padding-left:71rpx;
    height:100%;
    font-size:26rpx;
    letter-spacing: 4rpx;
  }
  .dmx-input span{
    width:31rpx;
    height:34rpx;
    position:absolute;
    top:39rpx;left:20rpx;
    text-align:center;
    background: url(../../../static/images/dl_icon.png) no-repeat -37rpx;
    background-size:68rpx;
  }
  .footer{
    width: 600rpx;
    display: flex;
    justify-content: space-between;
  }
  .perfect{
    width: 120rpx;
    font-size: 26rpx;
    color: #5596fa;
    margin-top: 28rpx;
  }
  .reg{
    width: 150rpx;
    font-size: 26rpx;
    color: #5596fa;
     margin-top: 28rpx;
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
