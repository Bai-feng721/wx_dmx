<template>
  <div class="container">
    <div class="head"><van-steps :steps="steps" :active="active" active-color="#5596fa" /></div>
    <div class="first" v-if="active == 0">
      <van-cell-group>
        <van-field :value="name" label="姓名" required placeholder="请输入姓名" input-align="right" @input="name = $event.mp.detail" />
        <van-field :value="phone" label="联系方式" required type="number" maxlength="11" placeholder="请输入联系方式" input-align="right" @input="phone = $event.mp.detail" />
        <van-field
          :value="email"
          label="邮箱"
          placeholder="请输入邮箱"
          input-align="right"
          @input="email = $event.mp.detail"
          @blur="checkInp(email, /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/, '邮箱')"
        />
        <van-field
          :value="idCard"
          label="身份证号"
          required
          placeholder="请输入身份证号"
          input-align="right"
          @input="idCard = $event.mp.detail"
          @blur="checkInp(idCard, /^[1-9]\d{5}(19|20)\d{2}[01]\d[0123]\d\d{3}[xX\d]$/, '身份证号')"
        />

        <van-field :value="county1" label="申报地" required is-link :readonly="true" input-align="right" @click="showPopup1" />
        <van-popup custom-style="width:700rpx;" :show="show1" @close="onClose1">
          <div class="pick"><van-area :area-list="areaList" @confirm="onConfirm1" @cancel="show1 = false" /></div>
        </van-popup>

        <van-field :value="addressDetails" label="详细地址" required placeholder="请输入详细地址" input-align="right" @input="addressDetails = $event.mp.detail" />

        <!-- <van-field
          :value=" isjia "
          label="是否有飞行执照"
           is-link
           :readonly="true"
          input-align="right"
          @click="showPopup10"
        />
        <van-popup
          :show="show10 "
          @close="onClose10">
          <div class="pick">
            <van-picker title="请选择是否有飞行执照" show-toolbar :columns="columns10" @cancel="show10 = false" @confirm="onConfirm10"/>
          </div>
        </van-popup>
        <van-field
          v-if="isjia=='是'"
          :value=" licenseNumber "
          label="执照编号"
          placeholder="请输入执照编号"
          input-align="right"
           @input="licenseNumber=$event.mp.detail"
        />
        <van-field
          v-if="isjia=='是'"
          :value=" categoryLevel "
          label="类别等级"
           is-link
           :readonly="true"
          input-align="right"
          @click="showPopup7"
        />
        <van-popup
          :show="show7 "
          @close="onClose7">
          <div class="pick">
            <van-picker title="请选择类别等级" show-toolbar :columns="columns6" @cancel="show7 = false" @confirm="onConfirm7"/>
          </div>
        </van-popup>
        <van-field
          v-if="isjia=='是'"
          :value=" classificationLevel "
          label="分类等级"
           is-link
           :readonly="true"
          input-align="right"
          @click="showPopup8"
        />
        <van-popup
          :show="show8 "
          @close="onClose8">
          <div class="pick">
            <van-picker title="请选择分类等级" show-toolbar :columns="columns7" @cancel="show8 = false" @confirm="onConfirm8"/>
          </div>
        </van-popup>
        <van-field
           v-if="isjia=='是'"
          :value=" driverLevel "
          label="驾驶员等级"
           is-link
           :readonly="true"
          input-align="right"
          @click="showPopup9"
        />
        <van-popup
          :show="show9 "
          @close="onClose9">
          <div class="pick">
            <van-picker title="请选择驾驶员等级" show-toolbar :columns="columns8" @cancel="show9 = false" @confirm="onConfirm9"/>
          </div>
        </van-popup> -->

        <van-field label="个人证照" required readonly />
      </van-cell-group>
      <div class="crad">
        <div class="crad_left">
          <van-uploader :file-list="file1" @afterread="afterZm">
            <div class="zm_crad"><img :src="zmimg" alt="" /></div>
          </van-uploader>
          <h1>身份证正面</h1>
        </div>
        <div class="crad_left">
          <van-uploader :file-list="file2" @afterread="afterFm">
            <div class="fm_crad"><img :src="fmimg" alt="" /></div>
          </van-uploader>
          <h1>身份证反面</h1>
        </div>
      </div>
      <van-field v-if="isjia == '是'" label="飞行执照" required readonly />
      <div class="port" v-if="isjia == '是'">
        <div class="crad_left">
          <van-uploader :file-list="file2" @afterread="afterzz">
            <div class="port_img"><img :src="zzimg" alt="" /></div>
          </van-uploader>
          <h1>飞行执照</h1>
        </div>
      </div>
    </div>

    <div class="second" v-else-if="active == 1">
      <van-cell-group>
        <van-field :value="snCode" label="机身sn码" placeholder="请输入机身sn码" input-align="right" @input="snCode = $event.mp.detail" @blur="snchange" />

        <van-field :value="ytCnCode" label="云台sn码" placeholder="请输入云台sn码" input-align="right" @input="ytCnCode = $event.mp.detail" />

        <van-field :value="manufacture" label="制造商" placeholder="请输入制造商" input-align="right" @input="manufacture = $event.mp.detail" />
        <van-field :value="model" label="飞行器型号" placeholder="请输入飞行器型号" input-align="right" @input="model = $event.mp.detail" />

        <van-field :value="wheelBase" label="飞行器直径" placeholder="请输入数字" type="digit" input-align="right" @input="wheelBase = $event.mp.detail" />
        <van-field :value="type1" label="结构类型" is-link :readonly="true" input-align="right" @click="showPopup2" />
        <van-popup :show="show2" @close="onClose2">
          <div class="pick"><van-picker title="平台结构类型" show-toolbar :columns="columns2" value-key="dictLabel" @cancel="show2 = false" @confirm="onConfirm2" /></div>
        </van-popup>

        <van-field :value="purpose1" label="用途" is-link :readonly="true" input-align="right" @click="showPopup3" />
        <van-popup :show="show3" @close="onClose3">
          <div class="pick"><van-picker title="请选择用途" show-toolbar :columns="columns3" @cancel="show3 = false" value-key="dictLabel" @confirm="onConfirm3" /></div>
        </van-popup>
        <van-field :value="scale1" label="飞行器等级" is-link :readonly="true" input-align="right" @click="showPopup4" />
        <van-popup :show="show4" @close="onClose4">
          <div class="pick"><van-picker title="请选择飞行器等级" show-toolbar :columns="columns4" value-key="dictLabel" @cancel="show4 = false" @confirm="onConfirm4" /></div>
        </van-popup>

        <van-field :value="deadWeight" label="自重" type="digit" placeholder="请输入数字" input-align="right" @input="deadWeight = $event.mp.detail" />
        <van-field :value="maximumPayload" label="最大载重" type="digit" placeholder="请输入数字" input-align="right" @input="maximumPayload = $event.mp.detail" />
        <van-field :value="endurance" label="飞行续航" type="digit" placeholder="请输入数字" input-align="right" @input="endurance = $event.mp.detail" />
        <van-field :value="windLoading" label="抗风等级" type="digit" placeholder="请输入数字" input-align="right" @input="windLoading = $event.mp.detail" />
        <van-field :value="enduranceMileage" label="续航里程" type="digit" placeholder="请输入数字" input-align="right" @input="enduranceMileage = $event.mp.detail" />
        <van-field :value="flightSpeed" label="最大飞速" type="digit" placeholder="请输入数字" input-align="right" @input="flightSpeed = $event.mp.detail" />

        <van-field :value="flightAltitude" label="飞行高度" type="digit" placeholder="请输入数字" input-align="right" @input="flightAltitude = $event.mp.detail" />

        <van-field :value="propellerSize" label="桨叶尺寸" type="digit" placeholder="请输入数字" input-align="right" @input="propellerSize = $event.mp.detail" />

        <van-field :value="remoteControl" label="遥控器sn码" placeholder="请输入遥控器sn码" input-align="right" @input="remoteControl = $event.mp.detail" />
      </van-cell-group>
    </div>
    <div class="foot"><div class="finish" @click="next">下一步</div></div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import Toast from '../../../static/vant/toast/toast';
export default {
  components: {
    Button
  },
  data() {
    return {
      isjia: '',
      columns2: [],
      columns3: [],
      columns4: [],
      columns5: [],
      columns6: [],
      columns7: [],
      columns8: [],
      columns10: ['是', '否'],
      steps: [{ desc: '个人信息' }, { desc: '飞行器信息' }, { desc: '完成' }],
      areaList: {
        province_list: { 620000: '甘肃省' },
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
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
      show8: false,
      show9: false,
      show10: false,
      zmimg: '',
      fmimg: '',
      zzimg: '',
      active: '0',
      file1: [],
      file2: [],
      file3: [],
      fileName1: '',
      fileName2: '',
      fileName3: '',
      county1: '',
      county: '',
      name: '',
      phone: '',
      email: '',
      idCard: '',
      licenseNumber: '',
      categoryLevel: '',
      classificationLevel: '',
      driverLevel: '',
      addressDetails: '',
      hsCode: '',
      ytCnCode: '',
      snCode: '',
      manufacture: '',
      model: '',
      wheelBase: '',
      type1: '',
      type: '',
      purpose: '',
      purpose1: '',
      purposeResult: '',
      scale: '',
      scale1: '',
      activeRadius: '',
      activeRadius1: '',
      deadWeight: '',
      maximumPayload: '',
      endurance: '',
      windLoading: '',
      enduranceMileage: '',
      flightSpeed: '',
      aircraftSize: '',
      remoteControl: '',
      flightAltitude: '',
      materialQuality: '',
      propellerSize: '',
      batteryVoltage: '',
      flightControl: '',
      aaa: {},
      bbb: {},
      ccc: {}
    };
  },
  mounted() {
    // this.getcategoryLevel()
    // this.getclassification()
    // this.getdriverLevel()
    this.getUse();
    this.getJglx();
    this.getSize();
  },
  methods: {
    //省市区选择
    showPopup1() {
      this.show1 = true;
    },
    showPopup2() {
      this.show2 = true;
    },
    showPopup3() {
      this.show3 = true;
    },
    showPopup4() {
      this.show4 = true;
    },
    showPopup5() {
      this.show5 = true;
    },
    showPopup6() {
      this.show6 = true;
    },
    showPopup7() {
      this.show7 = true;
    },
    showPopup8() {
      this.show8 = true;
    },
    showPopup9() {
      this.show9 = true;
    },
    showPopup10() {
      this.show10 = true;
    },
    onClose1() {
      this.show1 = false;
    },
    onClose2() {
      this.show2 = false;
    },
    onClose3() {
      this.show3 = false;
    },
    onClose4() {
      this.show4 = false;
    },
    onClose5() {
      this.show5 = false;
    },
    onClose6() {
      this.show6 = false;
    },
    onClose7() {
      this.show7 = false;
    },
    onClose8() {
      this.show8 = false;
    },
    onClose9() {
      this.show9 = false;
    },
    onClose10() {
      this.show10 = false;
    },
    onConfirm1(e) {
      console.log(e.target.values[2].code);
      this.county1 = e.target.values[2].name;
      this.county = e.target.values[2].code;
      this.show1 = false;
    },
    onConfirm2(e) {
      this.type = e.target.value.dictValue;
      this.type1 = e.target.value.dictLabel;
      this.show2 = false;
    },
    onConfirm3(e) {
      this.purpose = e.target.value.dictValue;
      this.purpose1 = e.target.value.dictLabel;
      this.show3 = false;
    },
    onConfirm4(e) {
      this.scale = e.target.value.dictValue;
      this.scale1 = e.target.value.dictLabel;
      this.show4 = false;
    },
    onConfirm5(e) {
      this.activeRadius = e.target.index + 1;
      this.activeRadius1 = e.target.value;
      this.show5 = false;
    },
    onConfirm7(e) {
      this.categoryLevel = e.target.value;
      this.show7 = false;
    },
    onConfirm8(e) {
      this.classificationLevel = e.target.value;
      this.show8 = false;
    },
    onConfirm9(e) {
      this.driverLevel = e.target.value;
      this.show9 = false;
    },
    onConfirm10(e) {
      this.isjia = e.target.value;
      this.show10 = false;
    },
    afterZm(event) {
      let that = this;
      const { file } = event.target;
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      mpvue.uploadFile({
        url: process.env.api + '/uploadIdCardRecognition',
        filePath: file.path,
        name: 'file',
        formData: {},
        success(res) {
          let data = JSON.parse(res.data);
          console.log('ssss', data);
          that.name = data.iDCardInformation.name;
          that.idCard = data.iDCardInformation.idNumber;
          that.file1 = data.url;
          that.fileName1 = data.fileName;
          that.zmimg = process.env.VUE_APP_IMAGES + that.fileName1;
        }
      });
    },
    afterFm(event) {
      let that = this;
      const { file } = event.target;
      mpvue.uploadFile({
        url: process.env.api + '/common/upload',
        filePath: file.path,
        name: 'file',
        formData: {},
        success(res) {
          let data = JSON.parse(res.data);
          that.file2 = data.url;
          that.fileName2 = data.fileName;
          that.fmimg = process.env.VUE_APP_IMAGES + that.fileName2;
        }
      });
    },
    //驾照
    afterzz(event) {
      let that = this;
      const { file } = event.target;
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      mpvue.uploadFile({
        url: process.env.api + '/common/upload',
        filePath: file.path,
        name: 'file',
        formData: {},
        success(res) {
          let data = JSON.parse(res.data);
          that.file3 = data.url;
          that.fileName3 = data.fileName;
          that.zzimg = process.env.VUE_APP_IMAGES + that.fileName3;
        }
      });
    },
    //查询结构类型
    getJglx() {
      this.$http
        .post({
          url: 'dictDataController/dictType?dictType=platform_structure_type'
        })
        .then(res => {
          this.columns2 = res.data;
        });
    },
    //查询使用尺度
    getSize() {
      this.$http
        .post({
          url: 'dictDataController/dictType?dictType=aircraft_size'
        })
        .then(res => {
          this.columns4 = res.data;
        });
    },
    //查询用途
    getUse() {
      this.$http
        .post({
          url: 'dictDataController/dictType?dictType=aircraft_use'
        })
        .then(res => {
          this.columns3 = res.data;
        });
    },
    //查询类别等级
    getcategoryLevel() {
      this.$http
        .post({
          url: 'dictDataController/dictType?dictType=license_category_level'
        })
        .then(res => {
          res.data.map((item, index) => {
            this.columns6.push(item.dictLabel);
          });
        });
    },
    //查询分类等级
    getclassification() {
      this.$http
        .post({
          url: 'dictDataController/dictType?dictType=license_classification_level'
        })
        .then(res => {
          res.data.map((item, index) => {
            this.columns7.push(item.dictLabel);
          });
        });
    },
    //查询驾驶员等级
    getdriverLevel() {
      this.$http
        .post({
          url: 'dictDataController/dictType?dictType=driver_level'
        })
        .then(res => {
          res.data.map((item, index) => {
            this.columns8.push(item.dictLabel);
          });
        });
    },
    //表单验证
    checkInp(value, reg, msg) {
      if (!reg.test(value)) {
        // 符合
        Toast({
          message: msg + '格式不正确',
          duration: 1000
        });
      }
    },
    //sn回显
    snchange() {
      this.$http
        .post({
          url: 'aircraftManagement/getTbDistributorSale',
          data: {
            snCode: this.snCode
          }
        })
        .then(res => {
          if (res.code == 200) {
            this.hsCode = res.data.hsCode;
            this.ytCnCode = res.data.ytCnCode;
            this.manufacture = res.data.manufacture;
            this.model = res.data.model;
            this.wheelBase = res.data.wheelBase;
            this.purposeResult = res.data.purposeResult;
            this.deadWeight = res.data.deadWeight;
            this.maximumPayload = res.data.maximumPayload;
            this.endurance = res.data.endurance;
            this.enduranceMileage = res.data.enduranceMileage;
            this.windLoading = res.data.windLoading;
            this.flightSpeed = res.data.flightSpeed;
            this.aircraftSize = res.data.aircraftSize;
            this.remoteControl = res.data.remoteControl;
            this.flightAltitude = res.data.flightAltitude;
            this.materialQuality = res.data.materialQuality;
            this.propellerSize = res.data.propellerSize;
            this.batteryVoltage = res.data.batteryVoltage;
            this.flightControl = res.data.flightControl;
          } else {
          }
        });
    },
    //分步骤跳转
    back() {
      this.active == 0;
    },
    next() {
      let that = this;
      if (this.active == 0) {
        if (that.name != '' && that.phone != '' && that.idCard != '' && that.county != '' && that.addressDetails != '' && that.file1 != '' && that.file2 != '') {
          this.active++;
          (this.aaa = {
            name: that.name,
            phone: that.phone,
            email: that.email,
            idCard: that.idCard,
            county: that.county,
            addressDetails: that.addressDetails,
            id_card_front_img: that.fileName1,
            id_card_opposite_img: that.fileName2,
            type: '1'
          }),
            (this.ccc = {
              licenseNumber: that.licenseNumber,
              categoryLevel: that.categoryLevel,
              classificationLevel: that.classificationLevel,
              driverLevel: that.driverLevel,
              imageUrl: that.fileName2
            });
          that.name = '';
          that.phone = '';
          that.email = '';
          that.idCard = '';
          that.county1 = '';
          that.addressDetails = '';
          that.zmimg = '';
          that.licenseNumber = '';
          that.categoryLevel = '';
          that.classificationLevel = '';
          that.driverLevel = '';
          that.zzimg = '';
        } else {
          Toast({
            message: '请完善信息！',
            duration: 1000
          });
        }
      } else if (this.active == 1) {
        //飞行器信息注册
        if (
          that.ytCnCode != '' &&
          that.snCode != '' &&
          that.manufacture != '' &&
          that.model != '' &&
          that.wheelBase != '' &&
          that.purpose != '' &&
          that.scale != '' &&
          that.deadWeight != '' &&
          that.maximumPayload != '' &&
          that.endurance != '' &&
          that.windLoading != '' &&
          that.enduranceMileage != '' &&
          that.flightSpeed != '' &&
          that.remoteControl != '' &&
          that.flightAltitude != '' &&
          that.propellerSize != ''
        ) {
          that.bbb = {
            hsCode: that.hsCode,
            ytCnCode: that.ytCnCode,
            snCode: that.snCode,
            manufacture: that.manufacture,
            model: that.model,
            wheelBase: that.wheelBase,
            type: that.type,
            purpose: that.purpose,
            scale: that.scale,
            deadWeight: that.deadWeight,
            maximumPayload: that.maximumPayload,
            endurance: that.endurance,
            windLoading: that.windLoading,
            enduranceMileage: that.enduranceMileage,
            flightSpeed: that.flightSpeed,
            remoteControl: that.remoteControl,
            flightAltitude: that.flightAltitude,
            propellerSize: that.propellerSize
          };

          this.$http
            .post({
              url: 'purchaseRecordController/addRecord',
              data: {
                record: that.aaa,
                tbDistributorSale: that.bbb,
                license: that.ccc
              }
            })
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                this.active++;
                wx.redirectTo({
                  url: '../buyfinish/main'
                });
                if (this.active == 2) {
                  setTimeout(() => {
                    this.active = 0;
                    this.name = '';
                    this.phone = '';
                    this.email = '';
                    this.idCard = '';
                    this.county1 = '';
                    this.zmimg = '';
                    this.addressDetails = '';
                    this.fmimg = '';
                  }, 4000);
                }
              } else {
                Toast({
                  message: '系统开小差！',
                  duration: 2000
                });
              }
            });
        } else {
          Toast({
            message: '请完善信息！',
            duration: 1000
          });
        }
      }
    }
  }
};
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
.head {
  width: 700rpx;
  height: 150rpx;
}
.first {
  width: 100%;
}
.second {
  width: 100%;
  margin: 10rpx;
}
.crad {
  width: 100%;
  height: 272rpx;
  display: flex;
  justify-content: space-around;
}
.crad_left {
  width: 330rpx;
  height: 210rpx;
}
.crad_left h1 {
  text-align: center;
  font-size: 26rpx;
}
.zm_crad {
  width: 330rpx;
  height: 210rpx;
  position: relative;
  background: url(../../../static/images/sfzzm.png);
  background-size: 330rpx 210rpx;
}
.fm_crad {
  width: 330rpx;
  height: 210rpx;
  position: relative;
  background: url(../../../static/images/sfzfm.png);
  background-size: 330rpx 210rpx;
}
.port_img {
  width: 330rpx;
  height: 210rpx;
  position: relative;
  background: url(../../../static/images/fxzz.png);
  background-size: 330rpx 210rpx;
  margin-left: 30rpx;
}
.zm_crad img,
.fm_crad img,
.port_img img {
  width: 320rpx;
  height: 210rpx;
  position: absolute;
}
.pick {
  width: 700rpx;
  height: 620rpx;
}
.foot {
  margin: 50rpx 10rpx;
}
.back {
  margin: 30rpx 20rpx 0rpx;
  width: 710rpx;
  height: 88rpx;
  background: #5597f8;
  color: #fff;
  text-align: center;
  line-height: 88rpx;
  border-radius: 44rpx;
  font-size: 34rpx;
}
.finish {
  width: 710rpx;
  height: 88rpx;
  background: #5597f8;
  color: #fff;
  text-align: center;
  line-height: 88rpx;
  border-radius: 44rpx;
  font-size: 34rpx;
}
</style>
