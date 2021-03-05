<template>
  <div class="container">
		<div class="msg" v-if="tableData==''?true:false">
      --------暂无数据--------
    </div>
    <div class="foot">
      <air-cell
        v-for="item in tableData"
        :key="item.id"
        :id="item.id"
        :manufacture="item.manufacture"
        :model="item.model"
        :purpose="item.purpose"
      />
    </div>

  </div>
</template>

<script>
import AirCell from "@/components/air-cell.vue"
export default {
  components: {
   AirCell
  },
  data () {
    return {
    tableData:[],
    }
  },
  mounted() {
    this.gofile();
  },
  methods:{
      gofile(){
      this.$http.post({
           url:"aircraftManagement/aircraftFiles",
          }).then(res =>{
         this.tableData=res.data
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
    padding:20rpx;
  }
  .msg{
    height: 100rpx;
    line-height: 100rpx;
  }



</style>
