<template>
  <div class="container">
    <van-field
      :value=" snCode "
      left-icon="search"
      placeholder="请输入sn码查询"
      input-align="center"
       @input="snCode=$event.mp.detail"
       @change="snchange"

    />
    <div class="second" v-if="isCode">
      <van-cell-group>
        <van-field
          :value=" form.hsCode "
          label="hs编码"
          disabled
          input-align="right"
           @input="hsCode=$event.mp.detail"
        />
        <van-field
          :value=" form.ytCnCode "
          label="云台sn码"
          disabled
          input-align="right"
           @input="ytCnCode=$event.mp.detail"
        />

        <van-field
          :value=" form.manufacture "
          label="制造商"
          disabled
          input-align="right"
           @input="manufacture=$event.mp.detail"
        />
        <van-field
          :value=" form.model"
          label="飞行器型号"
          disabled
          input-align="right"
           @input="model	=$event.mp.detail"
        />

        <van-field
          :value=" form.wheelBase "
          label="飞行器轴距"
          disabled
          input-align="right"
           @input="wheelBase=$event.mp.detail"
        />
        <van-field
          :value=" form.type "
          label="平台结构类型"
           disabled
          input-align="right"
        />


        <van-field
          :value=" form.purpose "
          label="用途"
          disabled
          input-align="right"

        />


        <van-field
          :value=" form.purposeResult "
          label="	使用场景"
          disabled
          input-align="right"
           @input="purposeResult=$event.mp.detail"
        />
        <van-field
          :value=" form.scale "
          label="使用尺度"
          disabled
          input-align="right"
        />

       <van-field
         :value=" form.activeRadius "
         label="活动半径"
          disabled
         input-align="right"
       />

        <van-field
          :value=" form.deadWeight "
          label="自重"
          disabled
          input-align="right"
           @input="deadWeight=$event.mp.detail"
        />
        <van-field
          :value="form.maximumPayload+'kg' "
          label="最大载重"
          disabled
          input-align="right"
           @input="maximumPayload=$event.mp.detail"
        />
        <van-field
          :value=" form.endurance +'分钟' "
          label="飞行续航"
          disabled
          input-align="right"
           @input="endurance=$event.mp.detail"
        />
        <van-field
          :value=" form.windLoading +'级' "
          label="抗风等级"
          disabled
          input-align="right"
           @input="windLoading=$event.mp.detail"
        />
        <van-field
          :value=" form.enduranceMileage +'Km' "
          label="续航里程"
          disabled
          input-align="right"
           @input="enduranceMileage=$event.mp.detail"
        />
        <van-field
          :value=" form.flightSpeed +'km/h' "
          label="飞行速度"
          disabled
          input-align="right"
           @input="flightSpeed=$event.mp.detail"
        />
        <van-field
          :value=" form.aircraftSize+'m' "
          label="飞行尺寸"
          disabled
          input-align="right"
           @input="aircraftSize=$event.mp.detail"
        />
        <van-field
          :value=" form.remoteControl "
          label="遥控器"
          disabled
          input-align="right"
           @input="remoteControl=$event.mp.detail"
        />
        <van-field
          :value=" form.flightAltitude+'m' "
          label="飞行高度"
          disabled
          input-align="right"
           @input="flightAltitude=$event.mp.detail"
        />
        <van-field
          :value=" form.materialQuality "
          label="材质"
          disabled
          input-align="right"
           @input="materialQuality=$event.mp.detail"
        />
        <van-field
          :value=" form.propellerSize+'m' "
          label="桨叶尺寸"
          disabled
          input-align="right"
           @input="propellerSize=$event.mp.detail"
        />
        <van-field
          :value=" form.batteryVoltage+'v'"
          label="电池电压"
          disabled
          input-align="right"
           @input="batteryVoltage=$event.mp.detail"
        />
        <van-field
          :value=" form.flightControl "
          label="飞控芯片"
          disabled
          input-align="right"
           @input="flightControl=$event.mp.detail"
        />
      </van-cell-group>
    </div>
    <div class="foot">
      <div class="finish" @click="search">查 询</div>
    </div>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import Button from "@/components/Button.vue"
  import Dialog from '../../../static/vant/dialog/dialog.js'
export default {
  components: {
    Button
  },
  data () {
    return {
			snCode:'',
     form:{},
     isCode:false,

    }
  },

  methods:{
   //查询sn码
    search(){
      this.$http.post({
          url:"aircraftManagement/getTbDistributorSale",
          data:{
            "snCode": this.snCode
          },
       }).then(res =>{
        if(res.code==200){
          this.isCode = true
          this.form = res.data
        }else{
          Dialog.alert({
            message: res.msg
          }).then(() => {
                   // on close
          });
        }

      });
    },
    snchange(){
      this.isCode=false
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
  .head{
    width: 700rpx;
    height: 150rpx;
  }
  .first{
    width: 100%;
  }
  .second{
    width: 100%;
  }
  .port{
    width: 100%;
    height: 272rpx;
  }
  .crad{
    width: 100%;
    height: 272rpx;
    display: flex;
    justify-content: space-around;
  }
  .crad_left{
    width: 330rpx;
    height: 210rpx;
  }
  .crad_left h1{
    text-align: center;
    font-size: 26rpx;
  }
  .port_img{
    width: 330rpx;
    height: 210rpx;
    position: relative;
    background: url(../../../static/images/yyzz.png);
    background-size: 330rpx 210rpx;
    margin-left: 30rpx;
  }
  .zm_crad{
    width: 330rpx;
    height: 210rpx;
    position: relative;
    background: url(../../../static/images/sfzzm.png);
    background-size: 330rpx 210rpx;
  }
  .fm_crad{
    width: 330rpx;
    height: 210rpx;
    position: relative;
    background: url(../../../static/images/sfzfm.png);
    background-size: 330rpx 210rpx;
  }
  .zm_crad img,.fm_crad img,.port_img img{
    width: 60rpx;
    height: 60rpx;
    position: absolute;
    left: 130rpx;
    top: 75rpx;
  }
  .pick{
    width: 700rpx;
    height: 620rpx;
  }
  .foot{
    margin: 100rpx 10rpx;
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
