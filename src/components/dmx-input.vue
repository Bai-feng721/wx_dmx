<template>
  <div class="dmx-input">
    <input :type="type" :value="value" :placeholder="placeholder"  @input="$emit('input', e.mp.detail.value)" @keyup.ctrl.enter="$emit('login')"/>
    <span ></span>
  </div>
</template>

<script>
  export default {
    name:'dmx-input',
    props:{
      placeholder:{
        type:String,
        default:'请输入'
      },
      value:{
        type:String,
        default:''
      },
      type:{
        type:String,
        default:'text'
      },
      offex:{
        type:String,
         default:'-37rpx'
      }
    },
    data(){
      return {

      }
    },
    components:{},
    mounted(){},
    updated(){},
    methods:{}
  }
</script>

<style scoped>
  .dmx-input{width: 600rpx; border-bottom:1px solid #e5e7e8;height:114rpx; position:relative;}
  .dmx-input input{padding-left:71rpx;height:100%; font-size:26rpx; letter-spacing: 4rpx;}
  .dmx-input span{width:31rpx;height:34rpx; position:absolute;top:39rpx;left:20rpx;  text-align:center; background: url(../../static/images/dl_icon.png) no-repeat ;background-size:68rpx;}
</style>
