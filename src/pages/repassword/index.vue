<template>
  <div class="container">
    <div class="choseuser">
      <div class="content">
        <dmx-input type="password" placeholder="请设置新密码" v-model.lazy="password"></dmx-input>
        <dmx-input type="password" placeholder="请再次输入新密码" v-model.lazy="password"></dmx-input>
      </div>
    </div>
    <div class="foot">
      <div class="finish" @click="finsh">完 成</div>
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
       password:'',
       qpassword:'',
    }
  },
  created () {
  },
  methods:{
    //根据用户名改密码
    rereg(){
      axios({
        url:'',
        method:'post',
        data:{
          username:this.username
        }
      }).then(
        res=>{
          //跳转之前的页面
          mpvue.navigateTo({
            url:''
          })


        }
      )
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
  .choseuser{
    width: 100%;
    font-size: 34rpx;
  }
  .content{
    width: 600rpx;
    height: 100%;
    margin-left: 56rpx;
    margin-bottom: 74rpx;
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
