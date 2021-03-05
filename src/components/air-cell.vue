<template>
    <div class="newtitle" @click="gofile()">
     <div class="mess_left">
       <div class="title">
         <h1>无人机</h1>
         <p>{{manufacture}}</p>
       </div>
       <div class="left_1">
         <p>型号:</p>
         <h1>{{model}}</h1>
       </div>
       <div class="left_1">
         <p>用途:</p>
         <h1>{{purpose}}</h1>
       </div>
     </div>
     <div class="mess_right">
       >
     </div>
    </div>
</template>

<script>
  export default{
    name:'Cell',
    props:{
      data:{

      },
      manufacture: {
        type: String,
        default: null
      },
      model: {
        type: String,
        default: null
      },
      purpose: {
        type: String,
        default: null
      },
     id: {
       type: Number,
       default: null
     },
    },
    mounted(){},
    methods:{
      gofile(){
        let id = this.id
         mpvue.navigateTo({url: '../airfile/main?id='+id})
         
      }
        }
  }
</script>

<style scoped>
  .newtitle{
    width: 710rpx;
    height: 150rpx;
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    padding: 15rpx 20rpx;
    border-bottom: 4rpx solid #f5f5f5;
  }
  .mess_left{
    width: 690rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .title{
    display: flex;
    width: 500rpx;
    height:50rpx ;
  }
  .title h1{
    font-size: 30rpx;
    font-weight: 600;
    color: #5097ef;
    line-height: 50rpx;
    margin-right: 30rpx;
  }
  .title p{
    font-size: 26rpx;
    line-height: 50rpx;
  }
  .left_1{
    display: flex;
  }
  .left_1 h1{
    font-size: 26rpx;
    line-height: 50rpx;
    letter-spacing: 2rpx;
  }
  .left_1 p{
   font-size: 26rpx;
   color: #989898;
   line-height: 50rpx;
   letter-spacing: 2rpx;
  }
  .mess_right{
    line-height: 150rpx;
    font-size: 50rpx;
   color: #989898;
  }
</style>
