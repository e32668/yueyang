<template>
  <div class="app-container">
    <!-- 查询 Start -->
    <el-card class="box-card no-padding">
      <div slot="header" class="clearfix">
        <span>
          <i class="el-icon-search" /> 查询
        </span>
      </div>

      <el-row class="card-body">
        <el-form :model="list.queryItem" label-position="right" label-width="150px">
          <!--          <el-row-->
          <!--            :span="24"-->
          <!--            class="form-group">-->
          <!--            <el-col-->
          <!--              :xs="24"-->
          <!--              :sm="8">-->
          <!--              <el-form-item-->
          <!--                label="名称:"-->
          <!--                prop="name">-->
          <!--                <el-input/>-->
          <!--              </el-form-item>-->
          <!--            </el-col>-->

          <!--            <el-col-->
          <!--              :xs="24"-->
          <!--              :sm="8">-->
          <!--              <el-form-item-->
          <!--                label="类别:"-->
          <!--                prop="type">-->
          <!--                <el-select-->
          <!--                  v-model="list.queryItem.type"-->
          <!--                  placeholder="请选择">-->
          <!--                  <el-option-->
          <!--                    v-for="item in dialog.typeOptions"-->
          <!--                    :key="item.value"-->
          <!--                    :label="item.label"-->
          <!--                    :value="item.value"/>-->
          <!--                </el-select>-->
          <!--              </el-form-item>-->
          <!--            </el-col>-->

          <!--          </el-row>-->
        </el-form>
      </el-row>

      <el-row class="card-footer">
        <el-row>
          <el-col :span="24" :push="1">
            <el-button type="success" icon="el-icon-plus" @click="add()">增加</el-button>
            <!--            <el-button-->
            <!--              type="primary"-->
            <!--              icon="el-icon-search">查询</el-button>-->
          </el-col>
        </el-row>
      </el-row>
    </el-card>
    <!-- 查询 End -->

    <!-- 列表 Start -->
    <div>
      <el-card class="box-card no-padding">
        <div slot="header" class="clearfix">
          <span>
            <i class="el-icon-menu" /> 列表
          </span>
        </div>

        <el-row :span="24">
          <el-table
            :data="list.data"
            align="left"
            header-align="left"
            stripe
            border
            highlight-current-row
          >
            <template slot="empty">暂无数据</template>
            <el-table-column prop="id" label="分类ID" min-width="150" />
            <el-table-column prop="name" label="分类名称" min-width="150" />
            <el-table-column prop="updated" label="最后修改时间" min-width="150" />
            <el-table-column prop="created" label="创建时间" min-width="150" />
            <!-- <el-table-column prop="viewUrl" label="缩略图图片预览" min-width="150">
              <template slot-scope="scope">
                <img :src="scope.row.viewUrl" alt style="width: 50%;height: 50%" />
              </template>
            </el-table-column> -->
            <!-- <el-table-column prop="photoUrl" label="商品Banner图片预览" min-width="150">
              <template slot-scope="scope">
                <img :src="scope.row.photoUrl" alt style="width: 50%;height: 50%" />
              </template>
            </el-table-column>
            <el-table-column prop="detailPhotoUrl" label="商品详情图片预览" min-width="150">
              <template slot-scope="scope">
                <img :src="scope.row.detailPhotoUrl" alt style="width: 50%;height: 50%" />
              </template>
            </el-table-column>-->
            <!-- <el-table-column label="类型" min-width="150">
              <template slot-scope="scope ">
                <p>{{ scope.row.type | typeFilter }}</p>
              </template>
            </el-table-column>-->
            <el-table-column label="操作" width="250" align="center">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
                <el-button type="warning" size="mini" @click="deleteCategoryHandler(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>

        <!-- <el-row class="card-footer">
        <el-pagination background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="listParam.page"
                       :page-sizes="[5,10,20,30, 50]"
                       :page-size="listParam.pageSize"
                       layout="total, sizes, jumper, next , pager, prev"
                       :total="total">
        </el-pagination>
        </el-row>-->
      </el-card>
    </div>
    <!-- 列表 End -->

    <!-- 编辑路由弹框 Start -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialog.visible"
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <el-form
        ref="formEdit"
        :rules="dialog.rules"
        :model="dialog.editItem"
        label-position="right"
        label-width="100px"
      >
        <el-form-item label="分类名称:" prop="name">
          <el-input v-model="dialog.editItem.name" placeholder="请填写分类名称" clearable />
        </el-form-item>
        <!-- <el-form-item label="运费:" prop="name">
          <el-input v-model="dialog.editItem.transportCost" placeholder="请填写运费" clearable />
        </el-form-item>
        <el-form-item label="价格:" prop="name">
          <el-input v-model="dialog.editItem.price" placeholder="请填写价格" clearable />
        </el-form-item>
        <el-form-item label="简介:" prop="name">
          <el-input v-model="dialog.editItem.description" placeholder="请填写简介" clearable />
        </el-form-item>
        <el-form-item label="商品缩略图图片地址:" prop="name">
          <el-input v-model="dialog.editItem.viewUrl" placeholder="无需填写，请点击下方上传" clearable />
        </el-form-item> -->
        <!-- <el-form-item lable="上传图片" prop="name">
          <div class="upload-image">
            <el-upload
              action="http://47.92.244.242:8180/v1/product_types/uploadFile"
              list-type="picture-card"
              accept="multipart/form-data"
              :on-preview="handlePictureCardPreview0"
              :on-remove="handleRemoveViewUrl"
              :on-success="handleSuccessViewUrl"
              :limit="1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
            <div class="box">
              <div class="bottom">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="点击上传Banner图片,最大一张"
                  placement="bottom-start"
                >
                  <el-button>点击上传缩略图图片,最大一张</el-button>
                </el-tooltip>
                <p>原图:</p>
                <img :src="dialog.editItem.viewUrl" alt style="width: 10%;height: 10%" />
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="商品Banner图片地址:" prop="name">
          <el-input v-model="dialog.editItem.photoUrl" placeholder="无需填写，请点击下方上传" clearable />
        </el-form-item>
        <el-form-item lable="上传图片" prop="name">
          <div class="upload-image">
            <el-upload
              action="http://47.92.244.242:8180/v1/product_types/uploadFile"
              list-type="picture-card"
              accept="multipart/form-data"
              :on-preview="handlePictureCardPreview1"
              :on-remove="handleRemovePhotoUrl"
              :on-success="handleSuccessPhotoUrl"
              :limit="10"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
            <div class="box">
              <div class="bottom">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="点击上传商品Banner图片,最大十张"
                  placement="bottom-start"
                >
                  <el-button>点击上传商品Banner图片,最大十张</el-button>
                </el-tooltip>
                <el-table
                  :data="dialog.editItem.photoUrlArr"
                  height="300"
                  style="width: 100%"
                  :default-sort="{prop: 'ID', order: 'descending'}"
                  element-loading-text="Loading"
                  border
                  fit
                  highlight-current-row
                >
                  <el-table-column prop="Id" align="center" label="图片Id" sortable width="80">
                    <template slot-scope="scope">{{ scope.row.Id }}</template>
                  </el-table-column>
                  <el-table-column
                    prop="photoUrl"
                    align="center"
                    label="商品Banner图片"
                    sortable
                    width="120"
                  >
                    <template slot-scope="scope">
                      <img :src="scope.row.photoUrl" alt style="width: 50%;height: 50%" />
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    align="center"
                    width="80"
                    class-name="small-padding fixed-width"
                  >
                    <template slot-scope="scope">
                      <el-button
                        type="warning"
                        size="mini"
                        @click="handleDeletePhotoUrl(scope.row.Id)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="商品详情图片地址:" prop="name">
          <el-input v-model="dialog.editItem.detailPhotoUrl" placeholder="无需填写，请点击下方上传" clearable />
        </el-form-item>
        <el-form-item lable="上传图片" prop="name">
          <div class="upload-image">
            <el-upload
              action="http://47.92.244.242:8180/v1/product_types/uploadFile"
              list-type="picture-card"
              accept="multipart/form-data"
              :on-preview="handlePictureCardPreview2"
              :on-remove="handleRemoveDetailPhotoUrl"
              :on-success="handleSuccessDetailPhotoUrl"
              :limit="99"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
            <div class="box">
              <div class="bottom">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="点击上传商品详情图片,数量不限"
                  placement="bottom-start"
                >
                  <el-button>点击上传商品详情图片,数量不限</el-button>
                </el-tooltip>
                <el-table
                  :data="dialog.editItem.detailUrlArr"
                  height="300"
                  style="width: 100%"
                  :default-sort="{prop: 'ID', order: 'descending'}"
                  element-loading-text="Loading"
                  border
                  fit
                  highlight-current-row
                >
                  <el-table-column prop="Id" align="center" label="图片Id" sortable width="80">
                    <template slot-scope="scope">{{ scope.row.Id }}</template>
                  </el-table-column>
                  <el-table-column
                    prop="photoUrl"
                    align="center"
                    label="商品详情图片"
                    sortable
                    width="120"
                  >
                    <template slot-scope="scope">
                      <img :src="scope.row.photoUrl" alt style="width: 50%;height: 50%" />
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    align="center"
                    width="80"
                    class-name="small-padding fixed-width"
                  >
                    <template slot-scope="scope">
                      <el-button
                        type="warning"
                        size="mini"
                        @click="handleDeleteDetailUrl(scope.row.Id)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-form-item> -->
        <!-- <el-form-item label="类型:" prop="type">
          <el-select v-model="dialog.editItem.type" placeholder="请选择">
            <el-option
              v-for="item in dialog.typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button v-loading.fullscreen="loading.edit" type="primary" @click="save">提交</el-button>
      </div>
    </el-dialog>
    <!-- 编辑路由弹框 End -->
  </div>
</template>

<script>
import {
  all,
  add,
  addCP,
  deleteCategory,
  deleteCP
} from "@/api/category";

export default {
  name: "Banner",
  filters: {
    statusClassFilter(status) {
      const statusMap = {
        0: "danger",
        1: "success"
      };
      return statusMap[status];
    },
    statusFilter(status) {
      const statusMap = {
        0: "无效",
        1: "有效"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      const typeMap = {
        1: "商品",
        2: "重定向URL"
      };
      return typeMap[type];
    }
  },
  data() {
    return {
      // 列表相关
      list: {
        editItem: {},
        queryItem: {
          name: "",
          type: 1
        },
        data: [
          {
            photoUrlArr: [],
            detailUrlArr: []
          }
        ]
      },
      // 是否加载完毕控制项
      loading: {
        edit: false
      },
      // 弹框相关
      dialog: {
        visible: false,
        // rules: {
        //   name: [{ required: true, message: "名称必填", trigger: "blur" }]
        // },
        defaultItem: {
          name: "",
          type: 1,
          status: 1
        },
        typeOptions: [
          { value: 1, label: "商品" },
          { value: 2, label: "重定向URL" }
        ],
        statusOptions: [
          { value: 1, label: "有效" },
          { value: 0, label: "无效" }
        ],
        editItem: {}
      },
      // 上传图片相关
      dialogVisible: null,
      dialogImageUrl: null
    };
  },

  computed: {
    dialogTitle() {
      return this.dialog.editItem.id ? "编辑" : "增加";
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      all(this.queryItem).then(res => {
        if (res.retCode.code != 0) {
          alert(res.retCode.msg);
          return;
        }

        this.list.data = res.data;
        // console.log(this.list.data);
      });
    },
    /**
     * 增加
     */
    add() {
      this.dialog.editItem = {
        ...this.dialog.defaultItem,
        editFlag: 0
      };
      this.dialog.visible = true;
    },
    /**
     * 编辑
     * @param {object} routeItem 当前行路由数据信息
     */
    edit(item = {}) {
      this.dialog.editItem = { ...item, editFlag: 1 };
      this.dialog.visible = true;
    },
    /**
     * 删除
     */
    deleteCategoryHandler(item = {}){
      var preDeleteItem = {...item};
      // console.log(preDeleteItem.id)
      var id = parseInt(preDeleteItem.id)
      deleteCategory(id).then(res => {
        if (res.retCode.code != 0) {
              this.$message({
                message: "删除出错:".res.retCode.msg,
                type: "warning"
              });
            } else {
              this.$message({
                message: "成功"
              });
              this.getList();
              // this.$router.go(0);
            }
      })
    },
    /**
     * 弹框"取消"
     */
    closeDialog() {
      this.dialog.visible = false;
      this.dialog.editItem = this.dialog.defaultItem;
      this.resetForm("formEdit");
    },
    /**
     * 弹框"确认
     * 1. 表单校验
     * 2. 执行保存操作
     */
    save() {
      this.$refs["formEdit"].validate(valid => {
        if (!valid) {
          this.$message({
            message: "请完善表单信息后再提交",
            type: "warning"
          });
          return false;
        }

        this.loading.edit = false;
        this.list.editItem = { ...this.dialog.editItem };

        console.log(this.list.editItems);

        if (this.list.editItem.editFlag == 1) {
          update(this.list.editItem).then(res => {
            if (res.retCode.code != 0) {
              this.$message({
                message: "编辑出错:".res.retCode.msg,
                type: "warning"
              });
            } else {

              this.$message({
                message: "成功"
              });
              // this.$router.go(0);
            }

            this.editComplete(res.retCode.code);
          });
        } else {
              // console.log(this.list.editItem);
          add(this.list.editItem).then(res => {
            if (res.retCode.code != 0) {
              this.$message({
                message: "添加出错:".res.retCode.msg,
                type: "warning"
              });
            } else {
              // console.log(res);
              // console.log(this.list.editItem);
              this.list.editItem.productTypeId = res.data.id;

              this.$message({
                message: "成功"
              });
              // this.$router.go(0);
            }

            this.editComplete(res.retCode.code);
          });
        }
      });
    },
    /**
     * 表单重置（如提示信息清空等）
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /**
     * 完成编辑
     */
    editComplete(code) {
      this.loading.edit = false;
      code === 0 && (this.dialog.visible = false);
      this.getList();
    },
    /**
     * 图片上传相关
     */

    /**
     * 缩略图
     */
    handleSuccessViewUrl(response) {
      this.dialog.editItem.viewUrl = response.data;
      // console.log(this.dialog.editItem.viewUrl);
    },
    handleRemoveViewUrl(file, fileList) {
      // console.log(file, fileList);
    },

    /**
     * banner图
     */
    handleSuccessPhotoUrl(response) {
      if (this.dialog.editItem.photoUrl == undefined) {
        this.dialog.editItem.photoUrl = response.data + ",";
        return;
      }
      this.dialog.editItem.photoUrl =
        this.dialog.editItem.photoUrl + response.data + ",";
      // console.log(this.dialog.editItem.photoUrl);
    },
    handleRemovePhotoUrl(file, fileList) {
      // console.log(file, fileList);
    },
    handleDeletePhotoUrl(a) {
      this.dialog.editItem.photoUrlArr.splice(a, 1);
    },

    /**
     * 详情图
     */
    handleSuccessDetailPhotoUrl(response) {
      if (this.dialog.editItem.detailPhotoUrl == undefined) {
        this.dialog.editItem.detailPhotoUrl = response.data + ",";
        return;
      }
      this.dialog.editItem.detailPhotoUrl =
        this.dialog.editItem.detailPhotoUrl + response.data + ",";
      // console.log(this.dialog.editItem.detailPhotoUrl);
    },
    handleRemoveDetailPhotoUrl(file, fileList) {
      // console.log(file, fileList);
    },
    handleDeleteDetailUrl(a) {
      this.dialog.editItem.detailUrlArr.splice(a, 1);
    },
    handlePictureCardPreview0(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePictureCardPreview1(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePictureCardPreview2(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
