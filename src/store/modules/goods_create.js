import $Util from "common/util.js";
export default {
  state: {
    sku_type: 0,
    name: "",
    category: [],
    desc: "",
    unit: "",
    stock: 0,
    min_stock: 0,
    display_stock: 0,
    template: "",
    status: 0,
    express: "",
    market_price: 0,
    sell_price: 0,
    deal_price: 0,
    weight: 0,
    volume: 0,
    sku_card: [
      {
        name: "颜色",
        type: 0, //规格 0无 1颜色 2图片,
        list: [
          {
            name: "黄色",
            color: "",
            image: "",
          },
          { name: "红色", color: "", image: "" },
        ],
      },
      {
        name: "尺寸",
        type: 0, //规格 0无 1颜色 2图片,
        list: [
          {
            name: "XL",
            color: "",
            image: "",
          },
          { name: "XXL", color: "", image: "" },
        ],
      },
    ],
    ths: [
      { name: "商品规格", rowspan: 1, colspan: 1, width: "" },
      { name: "sku图片", rowspan: 2, width: "60" },
      { name: "销售价", rowspan: 2, width: "100" },
      { name: "市场价", rowspan: 2, width: "100" },
      { name: "成本价", rowspan: 2, width: "100" },
      { name: "库存", rowspan: 2, width: "100" },
      { name: "体积", rowspan: 2, width: "100" },
      { name: "重量", rowspan: 2, width: "100" },
      { name: "编码", rowspan: 2, width: "100" },
    ],
  },
  getters: {
    skuLable(state) {
      return state.sku_card.filter((v) => v.list.length > 0);
    },
    //获取表头
    tableThs(state, getters) {
      let length = getters.skuLable.length;
      state.ths[0].rowspan = length > 0 ? 1 : 2;
      state.ths[0].colspan = length;
      return state.ths;
    },
    //获得表格数据，处理数据结构为[[{}]]
    tableData(state) {
      if (state.sku_card.length === 0) {
        return [];
      }
      let sku_list = [];
      state.sku_card.forEach((item) => {
        if (item.list.length > 0) {
          sku_list.push(item.list);
        }
      });
      if (sku_list.length == 0) {
        return [];
      }
      let arr = $Util.cartesianProductOf(...sku_list);
      arr = arr.map((v) => {
        let obj = {
          skus: [],
          sku_image: "",
          market_price: 0,
          sell_price: 0,
          deal_price: 0,
          stock: 0,
          weight: 0,
          volume: 0,
          code: "",
        };
        obj.skus = v;
        return obj;
      });
      return arr;
    },
  },
  mutations: {
    vModelState(state, { key, value }) {
      state[key] = value;
    },
    //添加商品规格卡片
    addGoodsSku(state) {
      state.sku_card.push({
        name: "规格名称",
        type: 0, //规格 0无 1颜色 2图片,
        list: [],
      });
    },
    deleteGoodsSku(state, index) {
      state.sku_card.splice(index, 1);
    },
    //修改规格卡片
    vModelSku(state, { key, index, value }) {
      state.sku_card[index][key] = value;
    },
    //增加规格值
    addSkuValue(state, index) {
      state.sku_card[index].list.push({
        name: "规格名称",
        image: "",
        color: "",
      });
    },
    //删除指定规格值 index为sku_card的索引 ; indey为list的索引
    deleteSkuValue(state, { index, indey }) {
      state.sku_card[index].list.splice(indey, 1);
    },
    //修改指定规格值
    editSkuValue(state, { index, indey, key, value }) {
      state.sku_card[index].list[indey][key] = value;
      console.log(value);
    },
  },
  actions: {},
};
