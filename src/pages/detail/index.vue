<template>
  <div class="container">
    <div class="title">
      <h1>{{data.title}}</h1>
      <div class="mess">
        <div class="jin">
          <img src="../../../static/images/jinhui.jpg" alt="">
          <p>发布人:{{data.createdBy}}</p>
        </div>
        <p>{{data.createdTime}}</p>
      </div>
    </div>
    <div class="content">
      <p>{{data.content}}</p>
    </div>
    <div class="detailimg">
      <img v-if="data.images" :src="url + data.images" alt />
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      data: {},
      url: process.env.VUE_APP_IMAGES
    };
  },
  mounted() {
    this.getData(this.$root.$mp.query.id);
    console.log(this.$root.$mp)
  },
  methods: {
    getData(id) {
      if (id) {
        this.$http
          .get({
            url: "reservePlanController/" + id
          })
          .then(res => {
            this.data = res.data
            this.data.createdTime = this.$parseTime(this.data.createdTime,'{y}-{m}-{d}')
          });
      } else {
        console.log(id);
      }
    }
  }
};
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  overflow: hidden;
}
.title {
    width: 100%;
    height: 160rpx;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #F2F2F2;
  }
  .title h1 {
    font-size: 36rpx;
    font-weight: 600;

  }
  .jin{
    width: 350rpx;
    display: flex;

  }
  .jin img{
    width: 60rpx;
    height: 40rpx;
  }
  .mess {
   width: 90%;
   display: flex;
   justify-content: space-between;
  }
  .mess p {
    font-size: 30rpx;
    color: #666666;
  }
  .content {
    margin-bottom: 30rpx;
    padding: 20rpx;
  }
  .content p {
    font-size: 28rpx;
    text-indent: 50rpx;
    color: #666666;
    line-height: 50rpx;
    letter-spacing: 2rpx;
  }

.detailimg img {
  height: 550rpx;
}
</style>
