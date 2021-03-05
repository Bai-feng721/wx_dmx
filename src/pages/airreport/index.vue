<template>
  <div class="container">
    <div class="choseuser">
      <van-field
        :value=" name	 "
        label="申报人姓名"
        required
        input-align="right"
        placeholder="请输入申报人姓名"
        @input="name =$event.mp.detail"
      />
      <van-field
        :value=" county1 "
        label="申报地"
        required
        is-link
        input-align="right"
         placeholder="请选择申报地"
        @click="showPopup1"
      />
      <van-popup
        :show="show1 "
        @close="onClose1">
        <div class="pick">
          <van-area
          :area-list=" areaList "
          @confirm="onConfirm1"
          @cancel="show1 = false"/>
        </div>
      </van-popup>
      <van-field
        :value=" details "
        label="详细地址"
        required
        input-align="right"
        placeholder="请输入详细地址"
         @input="details=$event.mp.detail"
      />
      <van-field
        :value=" auditDesc "
        label="申请原因"
        required
        input-align="right"
        placeholder="请输入申请原因"
         @input="auditDesc=$event.mp.detail"
      />
      <van-field
        label="申请时间"
        :value='timer'
      	required
        is-link
        placeholder="请选择申请时间"
        input-align="right"
        @click="showPopup2"
         />
      <van-popup
        :show="show2 "
        @close="onClose2">
        <div class="pick">
          <van-datetime-picker
            type="date"
            :value="currentDate"
            @confirm="onConfirm2"
            @cancel="show2 = false"
            @change="onChange2"
          />
        </div>
      </van-popup>
      <van-field
        :value=" phone "
        label="联系电话"
        required
        input-align="right"
        placeholder="请输入联系电话"
         @input="phone=$event.mp.detail"
          @blur =  "checkInp(phone,/^1[3456789]\d{9}$/,'电话号码')"
      />
      <van-field
        :value=" model "
        label="飞行器型号"
        is-link
				readonly
        required
        input-align="right"
        placeholder="请选择备案飞行器"
        @click="showPopup3"
        @input="model=$event.mp.detail"
      />
        <van-popup
          :show="show3 "
          @close="onClose3">
          <div class="pick">
            <van-picker title="请选择备案飞行器" show-toolbar :columns="columns3" @cancel="show3 = false" @confirm="onConfirm3"/>
          </div>
        </van-popup>
    </div>


    <div class="foot">
      <div class="finish" @click="finsh">确 定</div>

    </div>
    <van-dialog id="van-dialog" />
  </div>

</template>

<script>
 import Dialog from '../../../static/vant/dialog/dialog.js';
export default {
  components: {
  },
  data () {
    return {
       areaList:{
          province_list: {620000: '甘肃省'},
          city_list: {
            620100: '兰州市',
            620200: '嘉峪关市',
            620300: '金昌市',
            620400: '白银市',
            620500: '天水市',
            620600: '武威市',
            620700: '张掖市',
            620800: '平凉市',
            620900: '酒泉市',
            621000: '庆阳市',
            621100: '定西市',
            621200: '陇南市',
            622900: '临夏回族自治州',
            623000: '甘南藏族自治州'
          },
          county_list: {
             620102: '城关区',
              620103: '七里河区',
              620104: '西固区',
              620105: '安宁区',
              620111: '红古区',
              620121: '永登县',
              620122: '皋兰县',
              620123: '榆中县',
              620201: '市辖区',
              620290: '雄关区',
              620291: '长城区',
              620292: '镜铁区',
              620293: '新城镇',
              620294: '峪泉镇',
              620295: '文殊镇',
              620302: '金川区',
              620321: '永昌县',
              620402: '白银区',
              620403: '平川区',
              620421: '靖远县',
              620422: '会宁县',
              620423: '景泰县',
              620502: '秦州区',
              620503: '麦积区',
              620521: '清水县',
              620522: '秦安县',
              620523: '甘谷县',
              620524: '武山县',
              620525: '张家川回族自治县',
              620602: '凉州区',
              620621: '民勤县',
              620622: '古浪县',
              620623: '天祝藏族自治县',
              620702: '甘州区',
              620721: '肃南裕固族自治县',
              620722: '民乐县',
              620723: '临泽县',
              620724: '高台县',
              620725: '山丹县',
              620802: '崆峒区',
              620821: '泾川县',
              620822: '灵台县',
              620823: '崇信县',
              620825: '庄浪县',
              620826: '静宁县',
              620881: '华亭市',
              620902: '肃州区',
              620921: '金塔县',
              620922: '瓜州县',
              620923: '肃北蒙古族自治县',
              620924: '阿克塞哈萨克族自治县',
              620981: '玉门市',
              620982: '敦煌市',
              621002: '西峰区',
              621021: '庆城县',
              621022: '环县',
              621023: '华池县',
              621024: '合水县',
              621025: '正宁县',
              621026: '宁县',
              621027: '镇原县',
              621102: '安定区',
              621121: '通渭县',
              621122: '陇西县',
              621123: '渭源县',
              621124: '临洮县',
              621125: '漳县',
              621126: '岷县',
              621202: '武都区',
              621221: '成县',
              621222: '文县',
              621223: '宕昌县',
              621224: '康县',
              621225: '西和县',
              621226: '礼县',
              621227: '徽县',
              621228: '两当县',
              622901: '临夏市',
              622921: '临夏县',
              622922: '康乐县',
              622923: '永靖县',
              622924: '广河县',
              622925: '和政县',
              622926: '东乡族自治县',
              622927: '积石山保安族东乡族撒拉族自治县',
              623001: '合作市',
              623021: '临潭县',
              623022: '卓尼县',
              623023: '舟曲县',
              623024: '迭部县',
              623025: '玛曲县',
              623026: '碌曲县',
              623027: '夏河县'
          }
        },
       currentDate: new Date().getTime(),
       minDate: new Date().getTime(),
       columns3:[],
       columns2:["1","2"],
       show1: false,
       show2: false,
       show3: false,
       timer:'',
       county1:'',
       county:'',
       name:'',
       details:'',
       auditDesc:'',
       declareTime:'',
       phone:'',
       model:'',
       recordId:''
    }
  },
  mounted () {
    this.getId()
  },
  methods:{
    getId(){
        this.$http.get({
          url:'flightDeclareController/listRecord',
        }).then(res=>{

            this.model = res.rows[0].model

          this.recordId = res.rows[0].recordId
          this.columns3.push(this.model)
        })
    },
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
       this.county1 = e.target.values[2].name
       this.county = e.target.values[2].code
       this.show1=false
     },

     onConfirm2(e) {
      this.declareTime =e.mp.detail
      var oDate = new Date(this.declareTime)
      var oYear = oDate.getFullYear()
      var oMonth = oDate.getMonth()+1
      var oDay = oDate.getDate()
      var oTime = oYear +'-'+(oMonth) +'-'+(oDay)
      this.timer = oTime
      this.show2=false
     },
     onConfirm3(e) {
       this.show3=false
     },
     checkInp(value, reg,msg) {
       console.log(value)
       console.log(reg.test(value))
     		if (!reg.test(value)) { // 符合
          Dialog.alert({
            message: msg+'格式不正确',
          }).then(() => {
            // on close
          });
     		} else {
     		}
     	},
     finsh(){
       let data = {
        'name': this.name,
        'county': this.county,
        'details':this.details,
        'auditDesc': this.auditDesc,
        'declareTime': this.declareTime,
        'phone': this.phone,
        'recordId': this.recordId
       }
       if(this.name!=""&&this.county!=""&&this.details!=""&&this.auditDesc!=""&&this.declareTime!=""&&this.phone!=""&&this.recordId!=""){
         this.$http.post({
            url: 'flightDeclareController',
            data
          }).then(res=>{
            if(res.code===200){
              wx.showToast({
                title: res.msg,
                duration: 2000,
                mask: true,
              });
							this.name=''
							this.county1=''
							this.details=''
							 this.auditDesc=''
							 this.timer=''
							 this.phone=''
              setTimeout(()=>{
                mpvue.navigateBack({
                  data: 1
                })
              },2000)
            }else{
               wx.showToast({
                 title: '申请失败',
                 icon:'none',
               });
            }
          })
       }else{
         wx.showToast({
           title: '请完善信息！',
           icon:'none',
         });
       }
     },
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
