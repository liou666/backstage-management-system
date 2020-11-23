<template>
  <div>
    <el-container style="position:absolute;top:55.4px;bottom:0;left:0;right:0">
      <el-header class="border-bottom">
        <!-- 头部区域 -->
        <div class="d-flex align-items-center h-100">
          <el-select
            style="width:200px"
            v-model="form.order"
            placeholder="请选择图片的排序方式"
            size="mini"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>

          <el-input
            class="mx-2"
            style="width:200px"
            placeholder="输入相册名称"
            v-model="form.keywords"
            size="mini"
          ></el-input>

          <el-button size="mini" type="primary" class="bg-success mr-auto"
            >搜索</el-button
          >
          <el-button
            size="mini"
            v-if="imageChecked[0]"
            type="primary"
            class="bg-warning"
            @click="deleteImage({ all: true })"
            >批量删除</el-button
          >
          <el-button size="mini" @click="openAlbumModel(false)" type="success"
            >创建相册</el-button
          >
          <el-button
            size="mini"
            type="warning"
            @click="isUplodeMoudleShow = true"
            >上传图片</el-button
          >
        </div>
      </el-header>
      <el-container>
        <el-aside
          style="position:absolute;top:60px;bottom:60px;left:0"
          width="200px"
          class="border-right"
        >
          <!-- 侧边区域 -->
          <ul class="list-group">
            <album-item
              :actived="index == currentIndex"
              v-for="(item, index) in albums"
              :key="index"
              :item="item"
              :index="index"
              @changed="itemClick"
              @edit="openAlbumModel"
              @delete="albumDelete"
            />
          </ul>
        </el-aside>
        <el-container>
          <el-main
            style="position:absolute;top:60px;bottom:60px;left:200px;right:0"
          >
            <!-- 内容 -->
            <el-row :gutter="10">
              <el-col
                v-for="(item, index) in imageList"
                :key="index"
                :span="24"
                :lg="4"
                :md="8"
                :sm="12"
              >
                <el-card
                  style="cursor:pointer"
                  class="mb-2 box-card position-relative "
                  :body-style="{ padding: '0px' }"
                >
                  <div
                    class="border"
                    :class="{ 'border-danger': item.isChecked }"
                  >
                    <!-- 如果在有v-if的条件下尽量使用原生标签，性能更高 -->
                    <span
                      v-if="item.isChecked"
                      style="top:0;right:0"
                      class="position-absolute badge badge-danger"
                      >{{ item.order }}</span
                    >
                    <!-- <el-tag
                      effect="dark"
                      size="mini"
                      type="danger"
                      class="position-absolute  bg-danger"
                      style="top:0;right:0"
                      v-if="item.isChecked"
                      >1</el-tag
                    > -->
                    <img
                      @click="choose(item)"
                      class="w-100 "
                      style="height:100px;"
                      :src="item.url"
                      alt=""
                    />
                    <div
                      class="pl-1 w-100  text-white"
                      style=" position:absolute; margin-top:-25px;background:rgba(0,0,0,0.5)"
                    >
                      {{ item.name }}
                    </div>
                    <div
                      class=" p-2 d-flex justify-content-center align-items-center"
                    >
                      <el-button-group>
                        <el-button
                          size="mini"
                          @click="priviewImg(item)"
                          icon="el-icon-view"
                        ></el-button>
                        <el-button
                          @click="editImage(item, index)"
                          size="mini"
                          icon="el-icon-edit"
                        ></el-button>
                        <el-button
                          @click="deleteImage({ index })"
                          size="mini"
                          icon="el-icon-delete"
                        ></el-button>
                      </el-button-group>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
      <el-footer class="px-0">
        <!-- 底部区域 -->
        <div class="d-flex  align-items-center h-100 ">
          <div
            class="d-flex justify-content-center h-100 border-right align-items-center "
            style="width:200px"
          >
            <el-button-group>
              <el-button size="mini" icon="el-icon-arrow-left"
                >上一页</el-button
              >
              <el-button size="mini"
                >下一页<i class="el-icon-arrow-right el-icon--right"></i
              ></el-button>
            </el-button-group>
          </div>
          <div class="pl-2">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
            >
            </el-pagination>
          </div>
        </div>
      </el-footer>
    </el-container>
    <!-- 创建|编辑模态框 -->
    <div>
      <el-dialog
        :title="dailogTitle"
        :visible.sync="isAlbumModelShow"
        width="30%"
      >
        <el-form ref="form" :model="albumForm" label-width="80px">
          <el-form-item label="相册名称">
            <el-input
              placeholder="请输入相册名称"
              v-model="albumForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="相册排序">
            <el-input-number
              v-model="albumForm.order"
              :min="0"
            ></el-input-number>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isAlbumModelShow = false">取 消</el-button>
          <el-button type="primary" @click="confirmEdit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 上传图片模态框 -->
    <div>
      <el-dialog title="上传图片" :visible.sync="isUplodeMoudleShow" width="50%"
        ><div class="text-center">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </div>
      </el-dialog>
    </div>
    <!-- 图片预览模态框 -->
    <div>
      <el-dialog :visible.sync="isPriviewMoudelShow" width="50%" top="50px">
        <div class="position-relative" style=" margin:-60px -20px -30px -20px">
          <img class="w-100" :src="priviewUrl" alt="" />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import albumItem from "@/components/album/albumItem.vue";

export default {
  components: { albumItem },
  data() {
    return {
      form: {
        order: "",
        keywords: "",
      },
      albums: [],
      currentIndex: 0,
      isAlbumModelShow: false,
      albumForm: {
        num: 0,
        order: 0,
        name: "",
      },
      albumEditIndex: -1,
      dailogTitle: "",
      isUplodeMoudleShow: false,
      isPriviewMoudelShow: false,
      priviewUrl: "",
      imageList: [],
      imageChecked: [],
      currentPage: 1,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      for (let i = 1; i <= 20; i++) {
        this.albums.push({
          name: "相册" + i,
          num: Math.floor(Math.random() * 100),
          order: 0,
        });
      }
      for (let i = 0; i <= 20; i++) {
        this.imageList.push({
          id: i,
          name: "图片" + i,
          url:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          isChecked: false,
          order: 0,
        });
      }
    },
    itemClick(index) {
      this.currentIndex = index;
    },
    albumDelete(index) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.albums.splice(index, 1);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    openAlbumModel(obj) {
      //编辑页面初始化
      if (obj) {
        console.log(1);
        this.dailogTitle = "编辑相册";
        const { index, item } = obj;
        this.albumForm.num = item.num;
        this.albumForm.name = item.name;
        this.albumForm.order = item.order;
        this.albumEditIndex = index;
        this.isAlbumModelShow = true;
      } else {
        this.dailogTitle = "创建相册";
        this.isAlbumModelShow = true;
      }
    },
    confirmEdit() {
      if (this.albumEditIndex >= 0) {
        this.albumEdit();
        this.isAlbumModelShow = false;
      } else {
        this.albums.unshift({
          name: this.albumForm.name,
          num: 0,
          order: this.albumForm.order,
        });
        this.isAlbumModelShow = false;
      }
    },
    albumEdit() {
      this.albums[this.albumEditIndex].name = this.albumForm.name;
      this.albums[this.albumEditIndex].order = this.albumForm.order;
    },
    priviewImg(item) {
      this.priviewUrl = item.url;
      this.isPriviewMoudelShow = true;
    },
    editImage(item, index) {
      this.$prompt("请输入图片名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: item.name,
        inputValidator(val) {
          return val.length > 0;
        },
        inputErrorMessage: "图片名称不能为空",
      }).then(({ value }) => {
        item.name = value;
        this.$message({
          type: "success",
          message: "修改成功",
        });
      });
    },
    deleteImage(obj) {
      this.$confirm(obj.all ? "批量删除图片?" : "删除该图片？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (obj.all) {
          this.imageList = this.imageList.filter((a) => {
            return !this.imageChecked.some((b) => {
              return b.id == a.id;
            });
          });
          this.imageChecked = [];
        } else {
          this.imageList.splice(obj.index, 1);
        }
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    choose(item) {
      if (!item.isChecked) {
        this.imageChecked.push(item);
        item.order = this.imageChecked.length;
        item.isChecked = true;
      } else {
        this.imageChecked = this.imageChecked.filter((a) => a.id !== item.id);
        item.order = this.imageChecked.length;
        this.imageChecked.forEach((b, index) => {
          b.order = index + 1;
        });
        item.isChecked = false;
      }
    },
    handleSizeChange(val) {
      console.log(`handleSizeChange每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`handleCurrentChange当前页: ${val}`);
    },
  },
};
</script>

<style scoped>
.album-active {
  background: #f1fffe;
  color: #3ae374;
}
</style>
