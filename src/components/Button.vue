<template>
  <div class="Button">
   <input
      :value="value"
      class="diybtn"
      :style="{background:bgColor,width:buttonwidth,height:buttonheight}"
      @click="$emit('click')"
      :type="type"
    >
  </div>
</template>

<script>
  export default{
    name:'Button',
    props:{
      value:{
        type:String,
        default:'按 钮'
      },
      type:{
        type:String,
        default:'button'
      },
      bgColor:{
         type:String,
         default:'#5597f8'
      },
      buttonwidth:{
         type:String,
         default:'600rpx'
      },
      buttonheight:{
         type:String,
         default:'88rpx'
      }
    },
    data(){
      return{

      }
    }
  }
</script>

<style scoped>
  .diybtn{
    width:600rpx;height:88rpx; background:#5597f8; color:#fff; text-align:center; line-height:88rpx; border-radius:44rpx;  font-size:34rpx;
  }
</style>
