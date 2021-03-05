<template>
  <div class="container">
		<div class="pict">
			<div class="info">
				<h1>无人机</h1>
				<p>杭州无人机制造有限公司</p>
			</div>
      <div class="destroy" @click=logout>
        销毁
      </div>
		</div>

       <div class="choseuser">
        <van-field
          :value="form.model "
          label="型号"
          readonly
          input-align="right"

        />
        <van-field
          :value="form.purpose "
          label="用途"
          input-align="right"
          readonly
        />
        <van-field
          :value="form.deadWeight+'kg' "
          label="自重"
          input-align="right"
          readonly
        />
        <van-field
          :value="form.endurance+'min' "
          label="飞行续航"
          input-align="right"
          readonly
        />

        <van-field
          label="抗风等级"
          :value = "form.windLoading+'级' "
          input-align="right"
          readonly
           />

        <van-field
          label="续航里程"
          :value = "form.enduranceMileage+'km' "
         input-align="right"
         readonly
           />

        <van-field
          label="最大飞速"
          :value = "form.flightSpeed+'km/h' "
         input-align="right"
         readonly
           />

        <van-field
          label="遥控器sn码"
          :value = "form.remoteControl"
         input-align="right"
         readonly
           />

        <van-field
          :value="form.flightAltitude+'m' "
          label="飞行高度"
          input-align="right"
          readonly
        />
        <!-- <van-field
          :value="form.materialQuality "
          label="材质"
         input-align="right"
         readonly
        /> -->

        <van-field
          label="桨叶类型"
          :value=" form.propellerSize "
         input-align="right"
         readonly
           />

        <!-- <van-field
          :value="form.batteryVoltage+'v' "
          label="电池电压"
          input-align="right"
          readonly
        />
        <van-field
          :value="form.flightControl "
          label="飞控芯片"
         input-align="right"
         readonly
        /> -->
      </div>
  </div>

</template>

<script>
import Button from "@/components/Button.vue"

export default {
  components: {
    Button
  },
  data () {
    return {
/*       model:'',
       purpose:'',
       deadWeight:'',
       endurance:'',
       windLoading:'',
       enduranceMileage:'',
       flightSpeed:'',
       remoteControl:'',
       flightAltitude:'',
       materialQuality:'',
       propellerSize:'',
       batteryVoltage:'',
       flightControl:'', */
        form: {},
    }
  },
  created() {

  },
  mounted () {
    this.findId(this.$root.$mp.query.id)
  },
  methods:{
     logout(){
       let id= this.$root.$mp.query.id;
        this.$http.post({
                url:"aircraftManagement/aircraftDestruction",
                data:{
                "id": id,
                },
            }).then(res =>{
              if(res.code==200){
                wx.showToast({
                  title: "销毁成功",
                  duration: 2000,
                  mask: true,
                });
      /*          wx.navigateBack({
                  delta: 1
                }) */
                 mpvue.navigateTo({url: '../airinfo/main'})
              }else{
               wx.showToast({
                 title: "销毁失败",
                 duration: 2000,
                 mask: true,
               });
              }

            });
     },
     findId(id){
      this.$http.post({
              url:"aircraftManagement/findId",
              data:{
              "id": id,
              },
          }).then(res =>{
          this.form=res.data
          console.log(res.data)
          });
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
    background-color: #f5f5f5;
  }

  .choseuser{
    width: 100%;
    margin-top: 20rpx;
  }
  .foot{
    margin: 50rpx 0;
  }
  .pict{
    width: 700rpx;
    height: 80rpx;
    margin: 20rpx;
    background-color: #fffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .info{
    display: flex;
    height: 40rpx;
  }
  .info h1{
    font-size: 28rpx;
    line-height: 40rpx;
    margin-right: 20rpx;
    color: #5597f5;
  }
  .info p{
    font-size: 24rpx;
    color: #969696;
    line-height: 40rpx;
    margin-right: 20rpx;
  }
  .destroy{
    width: 124rpx;
    height: 40rpx;
    text-align: center;
    line-height: 40rpx;
    font-size: 24rpx;
    color: #5597f5;
    border-radius: 20rpx;
    border: 2rpx solid #5597f5;

  }

</style>
