<template>
    <div class="newtitle" >
      <div class="title">
        <h1>{{punishName}}</h1>
        <p>{{cardNumber}}</p>
      </div>
      <div class="mess">
        <div class="mess_left">
          <div class="left_1">
            <p>处罚原因:</p>
            <h1>{{punishResult}}</h1>
          </div>
          <div class="left_1">
            <p>处罚文书:</p>
            <h1>{{punishCode}}</h1>
          </div>
          <div class="left_1">
            <p>处罚时间:</p>
            <h1>{{punishTime}}</h1>
          </div>
        </div>
        <div class="mess_left">
          <div class="left_1">
            <p>是否备案:</p>
            <h1>{{isRecord}}</h1>
          </div>
          <div class="left_1">
            <p>处罚类别:</p>
            <h1>{{punishType}}</h1>
          </div>
          <div class="left_1">
            <p>电话:</p>
            <h1>{{phone}}</h1>
          </div>
        </div>

      </div>

    </div>
</template>

<script>
  export default{
    name:'PunishCell',
    props:{
      punishName:{
        type: String,
        default: null
      },
      cardNumber: {
        type: String,
        default: null
      },
      punishResult:{
        type: String,
        default: null
      },
      punishCode: {
        type: String,
        default: null
      },
      punishBasis:{
        type: String,
        default: null
      },
      punishType: {
        type: String,
        default: null
      },
      isRecord:{
        type: String,
        default: null
      },
      phone: {
        type: String,
        default: null
      },
      punishTime: {
        type: String,
        default: null
      },
    },
    mounted(){},
    methods:{
    }
  }
</script>

<style scoped>
  .newtitle{
    width: 700rpx;
    height: 180rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: #fff;
    padding: 15rpx 20rpx;
    border-bottom: 4rpx solid #f5f5f5;
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
  .mess{
    width: 700rpx;
    height: 125rpx;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15rpx;
  }
  .mess_left{
    width: 350rpx;
    height: 150rpx;
  }
  .mess_left p{
    font-size: 26rpx;
    color: #989898;
    line-height: 45rpx;
    letter-spacing: 2rpx;
  }
  .mess_left h1{
    font-size: 26rpx;
    line-height: 45rpx;
    letter-spacing: 2rpx;
  }
  .left_1{
    display: flex;
  }
</style>
