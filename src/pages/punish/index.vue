<template>
  <div class="container">
    <div class="choseuser">
      <div class="main">
        <div class="imgs">
           <img v-if="planInfo.avator" :src="url+filename" alt="">
        </div>
        <div class="pict">
          <div class="info">
            <h1>{{planInfo.name}}</h1>
          </div>
          <div class="info">
            <p>警号:</p>
            <p>{{planInfo.enforceCode}}</p>
          </div>
        </div>
      </div>
      <div class="btn" @click="goreport">
       处罚上报
      </div>
    </div>
    <div class="msg" v-if="tableData==''?true:false">
      --------暂无数据--------
    </div>
    <div class="foot">
      <punish-cell
        v-for="item in tableData"
        :key="item.id"
        :punishName="item.punishName"
        :cardNumber="item.cardNumber"
        :punishResult="item.punishResult"
        :punishCode="item.punishCode"
        :punishBasis="item.punishBasis"
        :punishType="item.punishType"
        :isRecord="item.isRecord==0?'否':'是'"
        :punishTime="$parseTime(item.punishTime,'{y}-{m}-{d}')"
        :phone="item.phone"
      />
    </div>

  </div>
</template>

<script>
import PunishCell from "@/components/punish-cell.vue"
export default {
  components: {
   PunishCell
  },
  data () {
    return {
      tableData: [],
      planInfo:{},
      filename:'',
      url: process.env.VUE_APP_IMAGES
    }
  },
  mounted () {
    this.getPlanInfo();
    this.getList();
  },
  methods:{
    getPlanInfo(){
      this.$http.get({
        url:'punisherController/getInfo',
      }).then(res=>{
        this.planInfo = res.data
        this.filename = res.data.avator.replace('http://localhost/','/')

      })
    },
    getList(){
      this.$http.get({
        url: 'punisherController/list',
        data: {page: 0, size: 20}
      }).then(res=>{
        this.tableData = res.rows
      })
    },
    goreport(){
       mpvue.navigateTo({url: '../punishreport/main'})
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
    padding:20rpx;
  }
  .choseuser{
    width: 100%;
    height: 104rpx;
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    background-color: #fff;
    border-bottom: 4rpx solid #f5f5f5;
  }
  .main{
    width: 450rpx;
  }
  .imgs{
    float: left;
  }
  .imgs img{
    width: 80rpx;
    height: 80rpx;
    border-radius: 40rpx;
    margin-top: 10rpx;
  }
  .info{
    display: flex;
    height: 52rpx;
  }
  .info h1{
    font-size: 26rpx;
    line-height: 50rpx;
    margin-right: 20rpx;
  }
  .info p{
    font-size: 22rpx;
    color: #969696;
    line-height: 50rpx;
    margin-right: 20rpx;
  }
  .pict{
    height: 100rpx;
    float: left;
    margin-left: 20rpx;
  }
 .btn{
   font-size: 24rpx;
   text-align: center;
   line-height: 48rpx;
   width: 144rpx;
   height: 48rpx;
   border-radius: 24rpx;
   border: 1rpx solid #5097ef;
   margin-top: 30rpx;
 }
 .msg{
   height: 100rpx;
   line-height: 100rpx;
 }



</style>
