<template>
  <div class="container">
    <div class="topimg">
       <img src="../../../static/images/dl_bg1.png" alt="">
      <div class="title">"低慢小"飞行器治安管控平台</div>
    </div>
    <div class="choseuser">
      <van-field
        :value=" username "
        label="用户账号"
        required
        input-align="right"
        placeholder="请输入用户名"
        @input="username=$event.mp.detail"
      />
      <van-field
        :value=" password "
        label="密码"
        required
        password
        input-align="right"
        placeholder="请输入6-12位密码"
         @input="password=$event.mp.detail"
         @blur = "checkInp(password,/^[\s\S]{6,12}/,'密码')"
      />
      <van-field
        :value=" repassword "
        label="确认密码"
        required
        password
        input-align="right"
        placeholder="请再次输入密码"
         @input="repassword=$event.mp.detail"
         @blur = "repwd"
      />
      <van-field
        :value=" nickName "
        label="昵称"
        required
        input-align="right"
        placeholder="请输入昵称"
        @input="nickName=$event.mp.detail"
      />
      <van-field
        :value=" email "
        label="邮箱"
        required
        input-align="right"
        placeholder="请输入邮箱"
        @input="email=$event.mp.detail"
        @blur = "checkInp(email,/^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/,'邮箱')"
      />
      <van-field
        :value=" phonenumber "
        label="手机号码"
        required
        input-align="right"
        placeholder="请输入手机号码"
        @input="phonenumber=$event.mp.detail"
        @blur = "checkInp(phonenumber,/^1[3456789]\d{9}$/,'电话号码')"
      />
    </div>
    <div class="foot">
      <div class="finish" @click="reg">注 册</div>
    </div>
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import Dialog from '../../../static/vant/dialog/dialog.js';
import Toast from '../../../static/vant/toast/toast.js';
export default {
  components: {
  },
  data () {
    return {
      username:'',
      password:'',
      repassword:'',
      nickName:'',
      email:'',
      phonenumber:''
    }
  },
  created () {
  },
  methods:{
    checkInp(value, reg,msg) {
    		if (!reg.test(value)) { // 符合
         Dialog.alert({
           message: msg+'格式不正确',
         }).then(() => {
           // on close
         });
    		} else {
    		}
    	},
      repwd(){
        if(this.password!==this.repassword){
          Dialog.alert({
            message: '密码不一致',
          }).then(() => {
            // on close
          });
        }
      },
      reg(){
        let that =this
        this.$http.post({
              url:"userRegistrationController/addGeneralUser",
              data:{
                "userName": that.username,
                "password": that.password,
                "nickName": that.nickName,
                "email": that.email,
                "phonenumber": that.phonenumber
              },
          }).then(res =>{
             console.log("status:"+res.code)
              if(res.code == 200) {
               wx.showToast({
                 title: "注册成功",
                 duration: 2000,
                 mask: true,
               });
               setTimeout(()=>{
                 wx.navigateTo({
                   url:'../login/main'
                  })
               },2000)
              } else if(res.code == 500){
                wx.showToast({
                  title: res.msg,
                  icon:'none',
                });
              }else {
                wx.showToast({
                title: '系统开小差',
                icon: 'loading',
                duration: 2000,
                mask: true,
              });
            }
          });
      }
  },
  mounted() {
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
    width: 100%;
    position: absolute;
    font-size: 38rpx;
    color: white;
    margin:94rpx 100rpx;
    letter-spacing: 4rpx;
  }
  .choseuser{
    width: 100%;
  }

  .finish{
    width: 710rpx;
    height: 88rpx;
    background:#5597f8;
    color:#fff; text-align:center;
    line-height:88rpx;
    border-radius:44rpx;
    font-size:34rpx;
    margin:80rpx 0rpx
  }
</style>
