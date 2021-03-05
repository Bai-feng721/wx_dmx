<template>
  <div class="container">
    <div class="msg" v-if="tableData==''?true:false">
      --------暂无数据--------
    </div>
    <un-cell
      v-for="item in tableData"
      :key="item.id"
      :id="item.id"
      :newtitle="item.title"
      :newtime="$parseTime(item.createdTime,'{y}-{m}-{d}')"
      :imgurl="url+item.images"
      :createdBy="item.createdBy"
      :content="item.content"
    />
  </div>
</template>

<script>
import UnCell from "@/components/un-cell.vue";
export default {
  components: {
    UnCell
  },
  data() {
    return {
      tableData: [],
      pagination: {
        page: 0,
        size: 10
      },
      url: process.env.VUE_APP_IMAGES
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      let vm = this
      this.$http
        .get({
          url: "reservePlanController/list",
          data: this.pagination
        })
        .then(res => {
          vm.tableData = res.rows
        });
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
.msg{
    height: 100rpx;
    line-height: 100rpx;
  }
</style>
