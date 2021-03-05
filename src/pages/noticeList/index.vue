<template>
  <div class="container">
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
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      pagination: {
        page: 0,
        size: 10
      },
      src: {
        "1": require("../../../static/images/notice_2.png"),
        "2": require("../../../static/images/notice_1.png")
      },
      listContent: [],
			noticeData: [],
      url: process.env.VUE_APP_IMAGES
    };
  },
  mounted() {
    this.getNotice();
  },
  methods: {
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

  }
};
</script>

<style scoped>
.container {
  height: 100%;
 
  box-sizing: border-box;
  overflow: hidden;
  /* margin:0 30rpx 30rpx 30rpx; */
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
    font-size: 30rpx;
  }

  .last_h1 {
    line-height: 70rpx;
    margin-right: 10rpx;
    font-size: 28rpx;
    color: #999999;
  }

</style>
