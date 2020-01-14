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
            <el-table-column prop="productTypeId" label="商品ID" min-width="150" />
            <el-table-column prop="redirectUrl" label="重定向URL" min-width="150" />
            <el-table-column prop="photoUrl" label="图片URL" min-width="150" />
            <el-table-column prop="photoUrl" label="图片预览" min-width="150">
              <template slot-scope="scope">
                <img :src="scope.row.photoUrl" alt style="width: 50%;height: 50%" />
              </template>
            </el-table-column>
            <el-table-column label="类型" min-width="150">
              <template slot-scope="scope ">
                <p>{{ scope.row.type | typeFilter }}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="250" align="center">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
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
        <el-form-item label="商品ID:" prop="name">
          <el-input v-model="dialog.editItem.productTypeId" placeholder="请填写商品ID" clearable />
        </el-form-item>
        <el-form-item label="重定向地址:" prop="name">
          <el-input v-model="dialog.editItem.redirectUrl" placeholder="请填写重定向地址" clearable />
        </el-form-item>
        <el-form-item label="图片地址:" prop="name">
          <el-input v-model="dialog.editItem.photoUrl" placeholder="请填写图片地址" clearable />
        </el-form-item>
        <el-form-item lable="上传图片" prop="name">
          <div class="upload-image">
            <el-upload
              action="http://47.92.244.242:8180/v1/product_types/uploadFile"
              list-type="picture-card"
              accept="multipart/form-data"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
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
                  content="点击上传Banner图片,最多不超过一张"
                  placement="bottom-start"
                >
                  <el-button>点击上传Banner图片,最多不超过一张</el-button>
                </el-tooltip>
                <p>原图:</p>
                <img :src="dialog.editItem.photoUrl" alt style="width: 100%;height: 100%" />
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="类型:" prop="type">
          <el-select v-model="dialog.editItem.type" placeholder="请选择">
            <el-option
              v-for="item in dialog.typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
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
import { all, add, update } from "@/api/banner";

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
        data: []
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

        if (this.list.editItem.editFlag == 1) {
          update(this.list.editItem).then(res => {
            if (res.retCode.code != 0) {
              this.$message({
                message: "添加出错:".res.retCode.msg,
                type: "warning"
              });
            } else {
              this.$message({
                message: "成功"
              });
            }

            this.editComplete(res.retCode.code);
          });
        } else {
          add(this.list.editItem).then(res => {
            if (res.retCode.code != 0) {
              this.$message({
                message: "编辑出错:".res.retCode.msg,
                type: "warning"
              });
            } else {
              this.$message({
                message: "成功"
              });
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
    handleSuccess(response) {
      this.dialog.editItem.photoUrl = response.data;
      console.log(this.dialog.editItem.photoUrl);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
