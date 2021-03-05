<template>
  <div class="container">
    <div class="banner">
      <img src="../../../static/images/gr_pic.jpg" alt="">
    </div>
    <div class="pict">
      <img src="../../../static/images/rk_bg1.png" alt="">
      <div class="icon">
        <div class="com_buy" @click="gobuycompany">
          <div class="imgicon_1"></div>
          <div class="icon1_right">
            <h1>单位</h1>
            <p>购买备案</p>
          </div>
        </div>
        <div class="per_buy" @click="gobuyperson">
          <div class="imgicon_2"></div>
          <div class="icon1_right">
            <h1>个人</h1>
            <p>购买备案</p>
          </div>
        </div>
        <div class="fly_admin">
          <div class="imgicon_3"></div>
          <div class="icon1_right3" @click="goairinfo">
            <p>飞行器信息</p>
          </div>
        </div>
      </div>
    </div>

   <!-- <div class="fxsb">
      <img src="../../../static/images/fxsb.png" alt="">
      <div class="flydeclare" @click="airreport">飞行申报</div>
      <div class="mydeclare" @click="myreport">我的申报</div>
    </div> -->

    <div class="news">
      <div class="notice">
        <div class="newtop" @click="goNotice">
          <h1>公告通知</h1>
					 <p>查看更多></p>
        </div>
        <div class="notice_cell" v-if="noticeData" v-for="(item,index) in noticeData" :key="item.noticeId" :id="item.noticeId"
          @click="goContent(item.noticeId)">
          <img :src="src[item.noticeType]">
          <div class="right">
            <div class="tit_top">
              <h1 class="notice_h1">{{item.noticeTitle}}</h1>

            </div>
            <div class="tit_buttom">
              <p class="notice_p">{{listContent[index]}}</p>
              <h1 class="last_h1">{{item.createTime}}</h1>
            </div>
          </div>
        </div>
        <div v-if="!noticeData" class="isnotice">----暂无公告通知----</div>
      </div>

      <div class="newtop" @click="gonofly">
        <h1>禁飞信息管理</h1>
        <p>查看更多></p>
      </div>
      <div class="searchlist" v-if="tableData.length>0">
        <new-cell
         v-for="item in tableData"
         :key="item.id"
         :id="item.id"
         :newtitle="item.address"
         :newtime="$parseTime(item.createdTime,'{y}-{m}-{d}')"
         :imgurl="url+item.images"
         :createdBy="item.createdBy"
         :content="item.content"
         />
      </div>
      <div v-if="tableData.length==0" class="isnotice">----暂无禁飞信息----</div>
    </div>
    <van-dialog
      use-slot
      :show="show"
      @close="onClose"
    >
      <div style="padding: 30rpx;">
        <p style="text-indent: 50rpx;">为进一步加强“低慢小”飞行器治安管控工作，维护社会治安秩序和公共安全，购买“低慢小”飞行器的单位及个人需及时在本系统中进行自主购买备案，并了解相关禁飞信息。</p>
        <p style="color: red;text-indent: 50rpx;">对未按要求及时备案，或在禁飞区域及时间内违法违规起飞、升空的“低慢小”飞行器，公安机关将依据《中华人民共和国反恐怖主义法》《中华人民共和国治安管理处罚法》、《无人驾驶航空器飞行管理暂行条例》等法规依法严肃追究有关单位和人员的责任。</p>

      </div>
    </van-dialog>
  </div>
</template>

<script>
  import NewCell from '@/components/new-cell.vue'
  import UnCell from '@/components/un-cell.vue'
  import Dialog from '../../../static/vant/dialog/dialog';

  export default {
    data() {
      return {
         show: true,
        active: 0,
        noticeData: [],
        tongData: [],
        content1: '',
        listContent: [],
        pagination: {
         pageNum: 1,
         pageSize: 5,
        },
        tableData: [],
        url: process.env.VUE_APP_IMAGES,
        src: {
          "1": require("../../../static/images/notice_2.png"),
          "2": require("../../../static/images/notice_1.png")
        },
      }
    },

    components: {
      NewCell,
      UnCell
    },
    onload() {},
    mounted() {
      wx.hideTabBar();
      if (wx.getStorageSync('openid') == '') {
       wx.redirectTo({
          url: '../loading/main'
        })
      }else{
        //获取token
        wx.removeStorageSync('token')
        let data = {
          openid: wx.getStorageSync('openid')
        }
        this.$http.post({
          url: 'weChatLogin/login',
          data
        }).then(res=>{
          if(res.code!=200){
            wx.showToast({
              title:res.msg,
              duration: 2000,
              icon:'none'
            });
          }
          wx.setStorageSync(
            "token",res.data.token,
          )
          this.getNotice();
          this.getList();
          Dialog.alert({
            message:'为进一步加强“低慢小”飞行器治安管控工作，维护社会治安秩序和公共安全，购买“低慢小”飞行器的单位及个人需及时在本系统中进行自主购买备案，并了解相关禁飞信息。\n对未按要求及时备案，或在禁飞区域及时间内违法违规起飞、升空的“低慢小”飞行器，公安机关将依据《中华人民共和国反恐怖主义法》《中华人民共和国治安管理处罚法》、《无人驾驶航空器飞行管理暂行条例》等法规依法严肃追究有关单位和人员的责任。',
          }).then(() => {
            // on close
          });
        })
      }

    },

    methods: {
      //关闭弹窗
      onClose() {
          this.show=false ;
       },
      //自动登录获取token

      goContent(id) {
        mpvue.navigateTo({
          url: '../notice/main?id=' + id
        })
      },
      getNotice() {
        let that = this
        this.$http
          .get({
            url: "noticeController/getNotice",
						data: this.pagination
          })
          .then(res => {
            that.noticeData = res.rows
            that.noticeData.forEach(function(item, index) {
              var cont = item.noticeContent.replace(/<(?!img).*?>/g, "")
              that.listContent.push(cont)
            })
            // that.content1 = that.noticeData.noticeContent.replace(/<(?!img).*?>/g, "")
          });
      },
      //获取禁飞列表
      getList() {
        let vm = this
        this.$http
          .get({
            url: "flyingController/listXcx",
            data: this.pagination
          })
          .then(res => {
            vm.tableData = res.rows
          });
      },
      gobuycompany() {
        mpvue.navigateTo({
          url: '../buycompany/main'
        })
      },
      gobuyperson() {
        mpvue.navigateTo({
          url: '../buyperson/main'
        })
      },
      // airreport() {
      //   mpvue.navigateTo({
      //     url: '../airreport/main'
      //   })
      // },
      // myreport() {
      //   mpvue.navigateTo({
      //     url: '../myreport/main'
      //   })
      // },
      goairinfo() {
        wx.navigateTo({
          url: '../airinfo/main'
        })
      },
      goNotice(){
        wx.navigateTo({
          url: '../noticeList/main'
        })
      },
      gonofly() {
        wx.navigateTo({
          url: '../nofly/main'
        })
      },
      // onChange(event) {
      //   wx.showToast({
      //     title: `切换到标签 ${event.detail.name}`,
      //     icon: 'none',
      //   });
      // },

    },


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
    /* background-color: #f5f5f5; */
    overflow: hidden;
  }

  .banner {
    width: 100%;
    height: 320rpx;
  }

  .banner img {
    width: 100%;
    height: 320rpx;
  }

  .pict {
    height: 140rpx;
    width: 710rpx;
    padding: 20rpx;
    position: relative;
    display: flex;
    justify-content: space-between
  }

  .icon {
    height: 140rpx;
    width: 710rpx;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .com_buy,
  .per_buy,
  .fly_admin {
    /* position: absolute; */
    width: 230rpx;
    height: 80rpx;
    display: flex;
    justify-content: space-around;
  }

  .imgicon_1 {
    width: 65rpx;
    height: 65rpx;
    margin: 10rpx 0 0 10rpx;
    border-radius: 50%;
    background: url(../../../static/images/rk_icon.png) 0rpx 0rpx no-repeat;
    background-size: 200rpx 64rpx;
  }

  .imgicon_2 {
    width: 65rpx;
    height: 65rpx;
    margin: 10rpx 0 0 10rpx;
    border-radius: 50%;
    background: url(../../../static/images/rk_icon.png) -67rpx 0rpx no-repeat;
    background-size: 200rpx 64rpx;
  }

  .imgicon_3 {
    width: 65rpx;
    height: 65rpx;
    margin: 10rpx 0 0 10rpx;
    border-radius: 50%;
    background: url(../../../static/images/rk_icon.png) -135rpx 0rpx no-repeat;
    background-size: 200rpx 64rpx;
  }

  .icon1_right {
    width: 120rpx;
  }

  .icon1_right h1 {
    font-size: 30rpx;
    letter-spacing: 10rpx;
    text-align: center;
    color: white;
    font-weight: 600;
  }

  .icon1_right p {
    font-size: 24rpx;
    text-align: center;
    color: white;
    margin-top: 10rpx;
  }

  .icon1_right3 p {
    font-size: 24rpx;
    text-align: center;
    color: white;
    margin-top: 25rpx;
  }

  .pict img {
    width: 100%;
    height: 100%;
  }

  .fxsb {
    height: 180rpx;
    width: 710rpx;
    padding: 0 20rpx 20rpx 20rpx;
    position: relative;
    display: flex;
  }

  .fxsb img {
    width: 100%;
    height: 100%;
  }

  .flydeclare {
    position: absolute;
    width: 160rpx;
    height: 48rpx;
    background-color: white;
    border-radius: 24rpx;
    margin-left: 175rpx;
    margin-top: 107rpx;
    color: #5397f8;
    font-size: 26rpx;
    text-align: center;
    line-height: 48rpx;
    font-weight: 600;
  }

  .mydeclare {
    position: absolute;
    width: 160rpx;
    height: 48rpx;
    background-color: white;
    border-radius: 24rpx;
    margin-left: 400rpx;
    margin-top: 107rpx;
    color: #5397f8;
    font-size: 26rpx;
    text-align: center;
    line-height: 48rpx;
    font-weight: 600;
  }

  .news {
    width: 710rpx;
    height: 100%;
    margin: 0 20rpx 20rpx 20rpx;
    background-color: white;
  }

  .newtop {
    height: 62rpx;
    display: flex;
    justify-content: space-between;
    padding: 20rpx 20rpx 0 20rpx;
    border-bottom: 1px solid #F2F2F2;
  }

  .newtop h1 {
    font-size: 26rpx;
    font-weight: 600;
    letter-spacing: 4rpx;
    /* margin-top: 15rpx; */
  }

  .newtop p {
    font-size: 24rpx;
    color: #999999;
    /* margin-top: 15rpx; */
  }

  .notice {
    width: 100%;
    font-size: 28rpx;
  }

  .isnotice {
    text-align: center;
  }

  .notice_left,
  .notice_right {
    height: 200rpx;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    margin-left: 30rpx;
  }

  .notice_cell {
    height: 140rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #F2F2F2;
  }

  .right {
    width: 540rpx;
    height: 140rpx;
  }

  .notice_cell img {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    padding: 10rpx;
  }

  .tit_top {
    display: flex;
    justify-content: space-between;
  }
  .tit_buttom{
    display: flex;
    justify-content: space-between;
  }
  .notice_h1 {
    line-height: 70rpx;
    font-size: 30rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .notice_p {
    line-height: 60rpx;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 230rpx;
  }

  .last_h1 {
    line-height: 70rpx;
    margin-right: 10rpx;
    font-size: 28rpx;
    color: #999999;
  }
</style>
