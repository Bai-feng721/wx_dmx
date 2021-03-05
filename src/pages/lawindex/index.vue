<template>
  <div class="container">
    <div class="banner">
      <img src="../../../static/images/zfd_banner.png" alt="">
    </div>
    <div class="pict">
      <img src="../../../static/images/rk_bg1.png" alt="">
      <div class="icon">
        <div class="com_buy" @click="gopunish">
          <div class="icon1_right3">
            <p>检查处罚</p>
          </div>
        </div>
        <div class="per_buy" @click="gosearch">
          <div class="icon1_right3">
            <p>飞行器管理</p>
          </div>
        </div>
        <div class="fly_admin" @click="gomy">
          <div class="icon1_right3">
            <p>个人中心</p>
          </div>
        </div>
      </div>
    </div>
    <div class="news">
      <div class="notice">
        <div class="newtop">
          <h1>公告通知</h1>
        </div>
        <div class="notice_cell"
          v-for="(item,index) in noticeData"
          :key="item.noticeId"
          :id="item.noticeId"
          @click="goContent(item.noticeId)"
          >
          <img :src= "src[item.noticeType]">
          <div class="right">
            <div class="tit_top">
              <h1 class="notice_h1">{{item.noticeTitle}}</h1>
              <h1 class="last_h1">{{item.createTime}}</h1>
            </div>
            <div class="tit_buttom">
              <p class="notice_p" >{{listContent[index]}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="newtop" @click="goplan">
        <h1>处置预案</h1>
        <p>查看更多></p>
      </div>
      <div class="newtop">
        <h1>禁飞信息管理</h1>
        <!-- <p>查看更多></p> -->

      </div>
      <div class="msg" v-if="tableData==''?true:false">----------暂无禁飞信息--------</div>
      <new-cell
       v-for="item in tableData"
       :key="item.id"
       :id="item.id"
       :newtitle="item.content"
       :newtime="$parseTime(item.createdTime,'{y}-{m}-{d}')"
       :imgurl="url+item.images"
       :createdBy="item.createdBy"
       :content="item.content"
       />

    </div>
  </div>
</template>

<script>
  import NewCell from '@/components/new-cell.vue'

  export default {
    data () {
      return {
         active: 0,
         tableData: [],
         noticeData:[],
         tongData:[],
         pagination: {
           page: 0,
           size: 10
         },
         url: process.env.VUE_APP_IMAGES,
         listContent:[],
         src:{"1":require("../../../static/images/notice_2.png"),"2":require("../../../static/images/notice_1.png")}

        }
      },

    components: {
      NewCell
    },
    onLoad: function (options) {
      let id = options.id
      wx.hideTabBar();
      // if (wx.getStorageSync('token')==="") {
      //     wx.reLaunch({
      //         url: '../login/main'
      //     })
      // }
     },
    mounted() {
      this.getList()
      this.getNotice()
    },
    methods: {
      goContent(id){
        console.log(id)
        mpvue.navigateTo({
          url:'../notice/main?id='+id
        })
      },
      getNotice(){
        let that = this
        this.$http
          .get({
            url: "noticeController/getNotice",
          })
          .then(res => {
           that.noticeData = res.rows
           that.noticeData.forEach(function(item, index) {
             var cont = item.noticeContent.replace(/<(?!img).*?>/g, "")
             that.listContent.push(cont)
            })
          });
      },


      getList() {
        let vm = this
        this.$http
          .get({
            url: "flyingController/list",
            data: this.pagination
          })
          .then(res => {
            vm.tableData = res.rows
          });
      },
      gosearch(){
        mpvue.navigateTo({
          url:'../search/main'
        })
      },
      gopunish(){
        mpvue.navigateTo({
          url:'../punish/main'
        })
      },
      gomy(){
        mpvue.navigateTo({
          url:'../my/main'
        })
      },
      goplan(){
        mpvue.navigateTo({
          url:'../plan/main'
        })
      }

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
    background-color: #f5f5f5;
    overflow: hidden;
  }

  .banner{
    width: 100%;
    height:320rpx;
  }
  .banner img{
    width: 100%;
    height: 320rpx;
  }
  .pict{
    height: 140rpx;
    width: 710rpx;
    padding: 20rpx;
    position: relative;
    display: flex;
    justify-content: space-between
  }
  .icon{
    height: 140rpx;
    width: 710rpx;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .com_buy ,.per_buy,.fly_admin{
    /* position: absolute; */
    width: 230rpx;
    height: 80rpx;
    display: flex;
    justify-content: space-around;
  }


  .icon1_right3 p{
     font-size: 30rpx;
     text-align: center;
     color: white;
     margin-top: 25rpx;
  }
 .pict img{
   width:100%;
   height:100%;
  }

  .flydeclare{
    position: absolute;
    width: 160rpx;
    height: 48rpx;
    background-color: white;
    border-radius: 24rpx;
    margin-left: 275rpx;
    margin-top: 107rpx;
    color: #5397f8;
    font-size: 26rpx;
    text-align: center;
    line-height:48rpx ;
    font-weight: 600;
  }
  .news{
    width: 710rpx;
    height: 100%;
    margin: 0 20rpx 20rpx 20rpx;
    background-color: white;
  }
  .newtop{
   height: 62rpx;
   display: flex;
   justify-content: space-between;
   padding: 20rpx 20rpx 0 20rpx;
   border-bottom: 1px solid #F2F2F2;
  }
  .newtop h1{
    font-size: 26rpx;
    font-weight: 600;
    letter-spacing: 4rpx;
    /* margin-top: 15rpx; */
  }
  .newtop p{
    font-size: 24rpx;
    color: #999999;
    /* margin-top: 15rpx; */
  }
  .notice{
    width: 100%;
    font-size: 28rpx;
  }
  .notice_left,.notice_right{
    height: 200rpx;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    margin-left: 30rpx;
  }
  .notice_cell{
    height: 140rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #F2F2F2;
  }
  .right{
    width: 540rpx;
    height: 140rpx;
  }
  .notice_cell img{
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    padding: 10rpx;
  }
  .tit_top{
    display: flex;
    justify-content: space-between;
  }
  .notice_h1{
    line-height: 70rpx;
    font-size: 30rpx;
  }
  .notice_p{
    line-height: 60rpx;
    color: #999999;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .last_h1{
    line-height: 70rpx;
    margin-right: 10rpx;
    font-size: 28rpx;
    color: #999999;
  }

  .msg{
    height: 100rpx;
    line-height: 100rpx;
    font-size: 24rpx;
    margin-left: 200rpx;
  }
</style>
