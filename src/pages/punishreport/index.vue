<template>
  <div class="container">

   <div class="choseuser">

      <van-field
        :value=" punishResult "
        label="处罚原因"
        required
        input-align="right"
        placeholder="请输入处罚原因"
        @input="punishResult=$event.mp.detail"
      />
      <van-field
        :value=" punishName "
        label="被处罚人"
        required
        input-align="right"
        placeholder="请输入被处罚人"
         @input="punishName=$event.mp.detail"
      />
      <van-field
        :value=" Record "
        label="是否备案"
        is-link
        input-align="right"
         required
         @click="showPopup1"
      />
      <van-popup
        :show="show1 "
        @close="onClose1">
        <div class="pick">
          <van-picker title="请选择是否备案" show-toolbar :columns="columns1" @cancel="show1 = false" @confirm="onConfirm1"/>
        </div>
      </van-popup>

      <van-field
        label="处罚文书号"
        :value = "punishCode"
        input-align="right"
        placeholder="请输入处罚文书号"
        @input="punishCode=$event.mp.detail"
         />
      <van-field
        label="处罚类别"
        :value = "punishType"
        is-link
        input-align="right"
        @click="showPopup2"
         />
      <van-popup
        :show="show2 "
        @close="onClose2">
        <div class="pick">
          <van-picker title="请选择处罚类别" show-toolbar :columns="columns2" @cancel="show2 = false" @confirm="onConfirm2"/>
        </div>
      </van-popup>

      <van-field
        label="处罚依据"
        :value = "punishBasis"
        input-align="right"
        placeholder="请输入处罚依据"
        @input="punishBasis=$event.mp.detail"
         />

      <van-field
        :value=" cardNumber "
        label="证件号"
        placeholder="请输入证件号"
        input-align="right"
        @input="cardNumber=$event.mp.detail"
      />
      <van-field
        :value=" phone "
        label="被处罚人联系方式"
        placeholder="请输入被处罚人联系方式"
        input-align="right"
        @input="phone=$event.mp.detail"
      />
      <van-field
        label="处罚时间"
        :value='timer'
        is-link
        input-align="right"
        @click="showPopup3"
         />
      <van-popup
        :show="show3 "
        @close="onClose3">
        <div class="pick">
          <van-datetime-picker
            type="date"
            :value="currentDate"
            @confirm="onConfirm3"
            @cancel="show3 = false"
            @change="onChange3"
          />
        </div>
      </van-popup>
   </div>
    <div class="foot">
      <div class="finish" @click="finsh">确 定</div>

    </div>
  </div>

</template>

<script>
import Button from "@/components/Button.vue"
import Toast from '../../../static/vant/toast/toast';

export default {
  components: {
    Button
  },
  data () {
    return {
       columns1: ['否','是' ],
       columns2:['警告','罚款','没收','责令停产停业','暂扣','行政拘留'],
       currentDate: new Date().getTime(),
       minDate: new Date().getTime(),
       show1: false,
       show2: false,
       show3: false,
       timer:'',
       Record:'',
       punishResult:'',
       punishName:'',
       isRecord:'',
       punishCode:'',
       punishType:'',
       punishBasis:'',
       personnelType:'',
       cardNumber:'',
       punishTime	:'',
       phone:''
    }
  },
  mounted () {
  },
  methods:{
    showPopup1(){
       this.show1= true
     },
    showPopup2(){
       this.show2= true
      },
    showPopup3(){
       this.show3= true
     },
    onClose1() {
       this.show1=false
     },
    onClose2() {
        this.show2=false
     },
    onClose3() {
       this.show3=false
     },
     onConfirm1(e) {
       this.isRecord = e.target.index
       this.Record = e.target.value
       console.log(e.target.index)
       this.show1=false
     },
     onConfirm2(e) {
       this.punishType = e.target.value
       this.show2=false
     },
     onConfirm3(e) {
      this.punishTime =e.mp.detail
      var oDate = new Date(this.punishTime)
      var oYear = oDate.getFullYear()
      var oMonth = oDate.getMonth()+1
      var oDay = oDate.getDate()
      var oTime = oYear +'-'+(oMonth) +'-'+(oDay)
      this.timer = oTime
      this.show3=false
     },

     finsh(){
       let data = {
          punishResult:this.punishResult,
          punishName:this.punishName,
          isRecord: this.isRecord,
          punishCode:this.punishCode,
          punishType:this.punishType,
          punishBasis:this.punishBasis,
          // personnelType:this.personnelType,
          cardNumber:this.cardNumber,
          punishTime	:this.punishTime,
          phone:this.phone
       }
       if(
        //this.punishResult!=''&&this.punishName!=''&&this.isRecord!=''
        this.punishCode!=''&&this.punishType!=''&&this.punishBasis!=''&&this.cardNumber!=''&&this.punishTime!=''&&this.phone!=''
       ){
         this.$http.post({
           url: 'punisherController',
           data
         }).then(res=>{
           mpvue.navigateTo({
             url:'../punish/main'
           })
         })
       }else{
         wx.showToast({
           title: "请完善信息",
           icon:'none',
         })
       }

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
    margin-top: 20rpx;
  }
  .foot{
    margin: 50rpx 0;
  }
  .pick{
    width: 700rpx;
    height: 620rpx;
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
