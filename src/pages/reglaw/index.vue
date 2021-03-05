<template>
  <div class="container">
    <div class="topimg">
       <img src="../../../static/images/dl_bg1.png" alt="">
      <div class="title">"低慢小"飞行器治安管控平台</div>
    </div>
    <div class="choseuser">
      <van-field
        :value=" userName "
        label="用户账号"
        required
        input-align="right"
        placeholder="请输入3-16位字母，数字，下划线"
        @input="userName=$event.mp.detail"
        @blur = "checkInp(userName,/^[a-zA-Z0-9_-]{3,16}$/,'用户名')"
      />
      <van-field
        :value=" password "
        label="密码"
        required
        password
        input-align="right"
        placeholder="请输入6-12位密码"
         @input="password=$event.mp.detail"
         @blur = "checkInp(password,/^[\s\S]{6,12}/,'密码')"
      />
      <van-field
        :value=" nickName "
        label="用户昵称"
        required
        input-align="right"
        placeholder="请输入昵称"
        @input="nickName=$event.mp.detail"
      />
      <van-field
       :value=" phonenumber "
       label="手机号码"
       required
       input-align="right"
       placeholder="请输入手机号码"
        @input="phonenumber=$event.mp.detail"
        @blur = "checkInp(phonenumber,/^1[3456789]\d{9}$/,'电话号码')"
      />

      <van-field
        :value=" email "
        label="邮箱"
        required
        input-align="right"
        placeholder="请输入邮箱"
         @input="email=$event.mp.detail"
         @blur = "checkInp(email,/^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/,'邮箱')"
      />

      <van-field
        :value=" sexer "
        label="性别"
        required
        input-align="right"
        is-link
				readonly
        @click="showPopup6"
      />
      <van-popup
        :show="show6 "
        @close="onClose6"

       >
        <div class="pick">
          <van-picker title="请选择性别" :default-index=" 0 " show-toolbar :columns="columns6" @cancel="show6 = false" @confirm="onConfirm6"/>
        </div>
      </van-popup>
      <van-field
        :value=" name "
        label="姓名"
        placeholder="请输入真实姓名"
        input-align="right"
         @input="name=$event.mp.detail"
      />

      <van-field
        :value=" enforceCode "
        label="警号"
        placeholder="请输入警号"
        input-align="right"
        @input="enforceCode=$event.mp.detail"
      />
      <van-field
        :value=" workCode "
        label="单位编号"
        placeholder="请输入单位编号"
        input-align="right"
        @input="workCode=$event.mp.detail"
      />
     
      <div class="head">
        <h1>头像</h1>
        <van-uploader
          :file-list="fileList"
          @afterread="afterRead">
          <div class="headimg" >
            <img :src="imgsrc" alt="" ref="headimgs">
          </div>
        </van-uploader>

      </div>
    </div>
    <div class="foot">
      <div class="finish" @click="reg">注 册</div>
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
      columns1: ['中共党员', '共青团员', '民主党派','无党派人士'],
      columns2:['初中','高中','大学专科','大学本科','研究生及以上'],
      columns3:['市厅级正职','市厅级副职','县处级正职','县处级副职','科级正职','科级副职','科员及以下'],
      columns4: ['执法人员', '执法监督人员', '复议应诉人员','国家部委发证执法者'],
      columns6: ['男', '女'],
      fileList: [],
      fileName:'',
      imgsrc:'',
      currentDate: new Date().getTime(),
      minDate: new Date().getTime(),
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      timer:'',
      sexer:'',
      userName:'',
      password:'',
      nickName:'',
      email:'',
      phonenumber:'',
      sex:'',
      name:'',
      enforceCode:'',
      workCode:'',
      nation:'',
      politicCountenance:'',
      education:'',
      rank:'',
      personnelType:'',
      cardNumber:'',
      issuingAuthority:'',
      issuingTime:'',
      lssuingType:'',
      lssuingArea:'',
      avator:''

    }
  },
  created () {
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
     showPopup4(){
        this.show4= true
      },
    showPopup5(){
       this.show5= true
     },
     showPopup6(){
        this.show6= true
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
    onClose4() {
       this.show4=false
     },
    onClose5() {
       this.show5=false
     },
     onClose6() {
        this.show6=false
      },

     onConfirm1(e) {
       this.politicCountenance = e.target.value
       this.show1=false
     },
     onConfirm2(e) {
       this.education = e.target.value
       this.show2=false
     },
     onConfirm3(e) {
       this.rank = e.target.value
       this.show3=false
     },
     onConfirm4(e) {
       this.personnelType = e.target.value
       this.show4=false
     },
     onConfirm5(e) {
      this.issuingTime =e.mp.detail
      var oDate = new Date(this.issuingTime)
      var oYear = oDate.getFullYear()
      var oMonth = oDate.getMonth()+1
      var oDay = oDate.getDate()
      var oTime = oYear +'-'+(oMonth) +'-'+(oDay)
      this.timer = oTime
      this.show5=false
     },
     onConfirm6(e) {
       this.sexer = e.target.value
       this.sex = e.target.index
       this.show6=false
     },
      afterRead(event) {
        let that = this
        const { file } = event.target;
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        mpvue.uploadFile({
          url: process.env.api+'/common/upload',
          filePath: file.path,
          name: 'file',
          formData: {  },
          success(res) {
            let data = JSON.parse(res.data)
            that.fileList = data.url
            that.fileName = data.fileName
            that.imgsrc= process.env.VUE_APP_IMAGES+that.fileName
          },
        });
      },

     //表单验证
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
    //注册
    reg(){
      let that = this
      if(that.nickName!==''&&that.phonenumber!==''&&that.email!==''&&that.password!==''&&that.sex!==''&&that.userName!==''&&that.name!==''&&that.enforceCode!==''&&that.workCode!==''&&that.nation!==''&&that.politicCountenance!==''&&that.education!==''&&that.rank!==''&&that.personnelType!==''&&that.cardNumber!==''&&that.issuingAuthority!==''&&that.issuingTime!==''&&that.lssuingType!==''&&that.lssuingArea!==''){
        this.$http
           .post({
             url: "/userRegistrationController/addUserEnforce",
             data:{
                 "nickName":that.nickName,
                 "phonenumber":that.phonenumber,
                 "email":that.email,
                 'password':that.password,
                 'sex':that.sex,
                 'userName':that.userName,
                 "name":that.name,
                 "enforceCode":that.enforceCode,
                 "workCode":that.workCode,
                 "nation":that.nation,
                 "politicCountenance":that.politicCountenance,
                 "education":that.education,
                 'rank':that.rank,
                 "personnelType":that.personnelType,
                 "cardNumber":that.cardNumber,
                 "issuingAuthority":that.issuingAuthority,
                 "issuingTime":that.issuingTime,
                 "lssuingType":that.lssuingType,
                 "lssuingArea":that.lssuingArea,
                 "avator":that.fileName,
             }
           })
           .then(res => {
             console.log("res", res);
             if(res.code == 200) {
               wx.showToast({
                 title: '注册成功！',
                 icon: 'loading',
                 duration: 2000,
                 mask: true,
               });
                setTimeout(()=>{
                  mpvue.navigateTo({
                    url:'../login/main'
                  })
                },2000)
               } else {
                 Dialog.alert({
                   message: res.msg
                 }).then(() => {
                   // on close
                 });
             }
           });
      }else{
       Dialog.alert({
         message: '请完善注册信息',
       }).then(() => {
         // on close
       });
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
	.head{
	  width: 670rpx;
	  height: 88rpx;
	  display: flex;
	  justify-content: space-between;
    margin-left: 30rpx;
	}
	.head h1{
	  font-size: 14px;
	  margin-top: 20rpx;
    font-weight: 0;
	}
	.headimg{
	  width: 80rpx;
	  height: 80rpx;
    margin-top:15rpx;
	  background-color: skyblue;
	}
	.headimg img{
	  width: 80rpx;
	  height: 80rpx;
	}
  .topimg{
   height:350rpx;
   width: 100%;
    position: relative;
    display: flex;
  }
  .topimg img{
    width: 100%;
    height:100%;
  }
  .title{
    width: 100%;
    position: absolute;
    font-size: 38rpx;
    color: white;
    margin:94rpx 100rpx;
    letter-spacing: 4rpx;
  }
  .choseuser{
    width: 100%;
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
    margin:80rpx 0rpx
  }
</style>
