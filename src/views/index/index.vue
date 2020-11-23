<template>
  <div>
    <!-- 数据统计信息 -->
    <el-row class="mb-3" :gutter="20">
      <el-col :span="6" v-for="(item, index) in counts" :key="index">
        <el-card shadow="hover">
          <div class="d-flex align-items-center">
            <i
              style="height:40px;width:40px;line-height:40px"
              :class="[item.icon, item.color]"
              class="text-white mb-0 h4 text-center mr-3 border "
            ></i>
            <div>
              <h4 class="mb-0">{{ item.count }}</h4>
              <small class="text-secondary">{{ item.desc }}</small>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 商品描述信息 -->
    <el-row :gutter="20">
      <el-col
        class="d-flex flex-column "
        style=" justify-content:space-between;height:370px"
        :span="12"
      >
        <el-card
          v-for="(tip, index) in tips"
          :key="index"
          shadow="never"
          class=" box-card"
        >
          <div slot="header" class="clearfix">
            <span>{{ tip.title }}</span>
            <el-button style="float: right; padding: 3px 0" type="text">{{
              tip.desc
            }}</el-button>
          </div>
          <div class="row">
            <div
              :class="tip.list.length | getCol"
              v-for="(tipList, indey) in tip.list"
              :key="indey"
            >
              <div class="btn btn-light w-100">
                <h4 class="mb-0">{{ tipList.num }}</h4>
                <small class="text-muted">{{ tipList.text }}</small>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- 图表信息 -->
      <el-col :span="12">
        <el-card shadow="never" style="height:370px" class="box-card">
          <div slot="header" class="clearfix">
            <span>订单总数统计</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >订单数量</el-button
            >
          </div>
          <!-- 图表容器 -->
          <div ref="myChart" style="height:270px;width:100%"></div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 销售统计和销售排名 -->
    <el-row :gutter="20" class="my-3">
      <el-col :span="12">
        <el-card shadow="never" class="box-card">
          <div slot="header" class="clearfix">
            <span>销售情况统计</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >操作按钮</el-button
            >
          </div>
          <div class="d-flex border mb-2 ">
            <div
              class="text-center"
              style="background-color:#e4e4e4;width:100px;height:80px;line-height: 80px;"
            >
              昨日销量
            </div>
            <div style="flex:1">
              <p
                class="pl-2 mb-0 border-bottom"
                style="height:40px;line-height: 40px;"
              >
                订单量（件）12
              </p>
              <p class="pl-2 mb-0 " style="line-height: 40px;">
                订单金额（元）12
              </p>
            </div>
          </div>
          <div class="d-flex border ">
            <div
              class="text-center"
              style="background-color:#e4e4e4;width:100px;height:80px;line-height: 80px;"
            >
              本月销量
            </div>
            <div style="flex:1">
              <p
                class="pl-2 mb-0 border-bottom"
                style="height:40px;line-height: 40px;"
              >
                订单量（件）12
              </p>
              <p class="pl-2 mb-0 " style="line-height: 40px;">
                订单金额（元）12
              </p>
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- 销量排行 -->
      <el-col :span="12" style="">
        <el-card shadow="never" class="box-card">
          <div slot="header" class="clearfix">
            <span>单品销售排名</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >操作按钮</el-button
            >
          </div>
          <!-- 表格信息 -->
          <el-table :data="tableData" height="170" border style="width: 100%">
            <el-table-column align="center" prop="id" label="#" width="40">
            </el-table-column>
            <el-table-column align="center" prop="name" label="商品信息">
            </el-table-column>
            <el-table-column align="center" prop="num" label="销量" width="50">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      counts: [
        {
          color: "bg-primary",
          icon: "el-icon-user-solid",
          count: "30",
          desc: "关注人数(个)",
        },
        {
          color: "bg-success",
          icon: "el-icon-s-finance",
          count: "120",
          desc: "订单总数(笔)",
        },
        {
          color: "bg-danger",
          icon: "el-icon-s-order",
          count: "4183.80",
          desc: "今日订单总额(元)",
        },
        {
          color: "bg-warning",
          icon: "el-icon-s-data",
          count: "100",
          desc: "本月销量(笔)",
        },
      ],
      tips: [
        {
          title: "店铺及商品信息",
          desc: "描述信息",
          list: [
            { num: 64, text: "出售中" },
            { num: 64, text: "待回复" },
            { num: 64, text: "库存预警" },
            { num: 64, text: "仓库中" },
          ],
        },
        {
          title: "店铺及商品信息",
          desc: "描述信息",
          list: [
            { num: 64, text: "待付款" },
            { num: 64, text: "待发货" },
            { num: 64, text: "已发货" },
            { num: 64, text: "已收货" },
            { num: 64, text: "退款中" },
            { num: 64, text: "代售后" },
          ],
        },
      ],
      tableData: [
        {
          id: "1",
          name: "小天鹅（LittleSwan）滚筒洗衣机",
          num: "50",
        },
        {
          id: "1",
          name: "小天鹅（LittleSwan）滚筒洗衣机",
          num: "50",
        },
        {
          id: "1",
          name: "小天鹅（LittleSwan）滚筒洗衣机",
          num: "50",
        },
        {
          id: "1",
          name: "小天鹅（LittleSwan）滚筒洗衣机",
          num: "50",
        },
        {
          id: "1",
          name: "小天鹅（LittleSwan）滚筒洗衣机",
          num: "50",
        },
        {
          id: "1",
          name: "小天鹅（LittleSwan）滚筒洗衣机",
          num: "50",
        },
        {
          id: "1",
          name: "小天鹅（LittleSwan）滚筒洗衣机",
          num: "50",
        },
      ],
    };
  },
  filters: {
    getCol(value) {
      return `col-${12 / value}`;
    },
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      const myChart = echarts.init(this.$refs.myChart);
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top",
              },
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      });
    },
  },
};
</script>

<style></style>
