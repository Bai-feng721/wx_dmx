<template>
  <div class="cell"  @click="getDetail">
    <div class="newimg">
      <img :src="imgurl" alt="">
    </div>
    <div class="newtitle">
      <h1 class="content">{{newtitle}}</h1>
      <div class="mess">
        <p>发布人:{{createdBy}}</p>
        <p>{{newtime}}</p>
      </div>

    </div>
  </div>
</template>

<script>
  export default{
    name:'NewCell',
    props:{
      data:{

      },
      imgurl:{
        type:String,
        default:null
      },
      newtitle:{
        type:String,
        default:null
      },
      issued:{
        type:String,
        default:null
      },
      newtime:{
        type:String,
        default:null
      },
      createdBy: {
        type: String,
        default: null
      },
      id: {
        type: Number,
        default: null
      },
    },
    mounted(){},
   methods: {
     getDetail() {
       let id = this.id
       mpvue.navigateTo({
         url: '../detailNofly/main?id='+id
       })
     }
   }
  }
</script>

<style scoped>
  .cell{
    width: 100%;
    height: 160rpx;
    display: flex;
    padding: 20rpx;
    border-bottom: 2rpx solid #f5f5f5;
  }
  .cell img{
    width: 200rpx;
    height: 160rpx;
  }
  .newtitle{
    width: 450rpx;
    height: 160rpx;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 20rpx;
  }
  .newtitle h1{
    font-size: 30rpx;
    font-weight: 600;
  }
  .mess{
    display: flex;
    justify-content: space-between;
  }
  .mess p{
    font-size: 26rpx;
  }
  .content{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    font-size: 26rpx;
  }
  .newimg img{
    border-radius: 15rpx;
  }
</style>
