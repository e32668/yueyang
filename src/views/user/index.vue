<template>

  <div class="app-container">
    <!-- 查询 Start -->
    <el-card class="box-card no-padding">
      <div slot="header"
           class="clearfix">
        <span>
          <i class="el-icon-search"></i> 查询
        </span>
      </div>

      <el-row class="card-body">
        <el-form :model="list.queryItem"
                 label-position="right"
                 label-width="150px">

          <el-row :span="24"
                  class="form-group">
            <el-col :xs="24"
                    :sm="8">
              <el-form-item label="名称:"
                            prop="name">
                <el-input></el-input>
              </el-form-item>
            </el-col>

          </el-row>

        </el-form>
      </el-row>

      <el-row class="card-footer">
        <el-row>
          <el-col :span="24"
                  :push="1">
            <el-button type="primary"
                       icon="el-icon-search">查询</el-button>
          </el-col>
        </el-row>
      </el-row>

    </el-card>
    <!-- 查询 End -->

    <!-- 列表 Start -->
    <div>
      <el-card class="box-card no-padding">
        <div slot="header"
             class="clearfix">
          <span>
            <i class="el-icon-menu"></i> 列表
          </span>
        </div>

        <el-row :span="24">
          <el-table :data="list.data"
                    align="left"
                    header-align="left"
                    stripe
                    border
                    highlight-current-row>
            <template slot="empty">
              暂无数据
            </template>
            <el-table-column prop="openId"
                             label="微信唯一ID"
                             min-width="150">
            </el-table-column>
            <el-table-column prop="mobile"
                             label="手机号"
                             min-width="150">
            </el-table-column>
            <el-table-column prop="points"
                             label="积分"
                             min-width="150">
            </el-table-column>
            <el-table-column prop="type"
                             label="类型"
                             min-width="150">
            </el-table-column>
            <el-table-column prop="accountNum"
                             label="余额"
                             min-width="150">
            </el-table-column>
            <el-table-column prop="name"
                             label="姓名"
                             min-width="150">
            </el-table-column>
            <el-table-column prop="description"
                             label="描述"
                             min-width="150">
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
      </el-row> -->

      </el-card>
    </div>
    <!-- 列表 End -->

    <!-- 编辑路由弹框 Start -->
    <el-dialog :title="dialogTitle"
               :visible.sync="dialog.visible"
               @close="closeDialog"
               :close-on-click-modal="false">
      <el-form :rules="dialog.rules"
               ref="formEdit"
               :model="dialog.editItem"
               label-position="right"
               label-width="100px">

        <el-form-item label="名称:"
                      prop="name">
          <el-input v-model="dialog.editItem.name"
                    placeholder="请填写名称"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="类型:"
                      prop="type">
          <el-select v-model="dialog.editItem.type"
                     placeholder="请选择">
            <el-option v-for="item in dialog.typeOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否有效:"
                      prop="status">
          <el-select v-model="dialog.editItem.status"
                     placeholder="请选择">
            <el-option v-for="item in dialog.statusOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary"
                   @click="save"
                   v-loading.fullscreen="loading.edit">提交</el-button>
      </div>
    </el-dialog>
    <!-- 编辑路由弹框 End -->

  </div>

</template>

<script>
import { list, getById, add, update, deleteById } from "@/api/user";

export default {
  name: "user",
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
        rules: {
          name: [{ required: true, message: "名称必填", trigger: "blur" }]
        },
        defaultItem: {
          name: "",
          type: 1,
          status: 1
        },
        typeOptions: [
          { value: 1, label: "品牌" },
          { value: 2, label: "香型" },
          { value: 3, label: "酒精度范围" },
          { value: 4, label: "产地" },
          { value: 5, label: "净含量范围" },
          { value: 6, label: "使用场景" }
        ],
        statusOptions: [
          { value: 1, label: "有效" },
          { value: 0, label: "无效" }
        ],
        editItem: {}
      }
    };
  },
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
        1: "品牌",
        2: "香型",
        3: "酒精度范围",
        4: "产地",
        5: "净含量范围",
        6: "使用场景"
      };
      return typeMap[type];
    }
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
      list(this.queryItem).then(res => {
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
    }
  }
};
</script>
