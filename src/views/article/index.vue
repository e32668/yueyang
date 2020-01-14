<template>
  <div class="app-container">
    <!-- 查询 Start -->
    <el-card class="box-card no-padding">
      <!-- <div slot="header" class="clearfix">
        <span>
          <i class="el-icon-search" /> 查询
        </span>
      </div>-->

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
            <el-table-column prop="id" label="文章ID" min-width="150" />
            <el-table-column prop="title" label="文章标题" min-width="150" />
            <el-table-column prop="created" label="发布时间" min-width="150" />
            <!-- <el-table-column prop="photoUrl" label="图片预览" min-width="150">
              <template slot-scope="scope">
                <img :src="scope.row.photoUrl" alt style="width: 50%;height: 50%" />
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
                <el-button type="warning" size="mini" @click="deleteArticle(scope.row)">删除</el-button>
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
      <div class="editor-container">
        <el-tag class="tag-title">Basic:</el-tag>
        <markdown-editor v-model="content1" height="300px" />
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button v-loading.fullscreen="loading.edit" type="primary" @click="save">提交</el-button>
      </div>
    </el-dialog>
    <!-- 编辑路由弹框 End -->
  </div>
</template>

<script>
import MarkdownEditor from "@/components/MarkdownEditor";
import { listByCondition, add, update, deleteArticle } from "@/api/article";

export default {
  name: "Banner",
  components: { MarkdownEditor },
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
          title: "",
          content: ""
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
      dialogImageUrl: null,
      content1: null,
      editFlag: 0
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
      var item = {};
      listByCondition(item).then(res => {
        if (res.retCode.code != 0) {
          alert(res.retCode.msg);
          return;
        }
        this.list.data = res.data.list;
        for (var i in this.list.data) {
          this.list.data[i].title = this.list.data[i].content.slice(0, 20);
        }
        console.log(this.list.data);
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
      // this.$router.push("markdown");
    },
    /**
     * 编辑
     * @param {object} routeItem 当前行路由数据信息
     */
    edit(item = {}) {
      this.dialog.editItem = {
        ...item,
        editFlag: 1
      };
      this.editFlag = 1;
      var articleItem = { ...item, editFlag: 1 };
      this.content1 = articleItem.content;
      this.dialog.visible = true;
    },
    /**
     * 删除
     */
    deleteArticle(e) {
      console.log(e);
      deleteArticle({ id: e.id }).then(res => {
        this.$message({
          message: "删除成功"
        });
        this.getList();
      });
    },
    /**
     * 弹框"取消"
     */
    closeDialog() {
      this.dialog.visible = false;
      // this.dialog.editItem = this.dialog.defaultItem;
      // this.resetForm("formEdit");
    },
    /**
     * 弹框"确认
     * 1. 表单校验
     * 2. 执行保存操作
     */
    save() {
      // this.$refs["formEdit"].validate(valid => {
      //   if (!valid) {
      //     this.$message({
      //       message: "请完善表单信息后再提交",
      //       type: "warning"
      //     });
      //     return false;
      //   }

      this.loading.edit = false;
      this.list.editItem = { ...this.dialog.editItem };

      var preEditArticleDic = {
        casVersion: this.list.editItem.casVersion,
        categoryId: this.list.editItem.categoryId,
        content: this.list.editItem.content,
        created: this.list.editItem,
        id: this.list.editItem,
        score: this.list.editItem,
        status: this.list.editItem,
        updated: this.list.editItem
      };

      var preArticleDic = {
        categoryId: 0,
        content: this.content1,
        status: 1
      };
      console.log(preEditArticleDic);
      console.log(this.list.editItem);
      // console.log(preArticleDic)
      if (this.editFlag == 1) {
        update(preEditArticleDic).then(res => {
          // console.log(res);
          if (res.retCode.code != 0) {
            this.$message({
              message: "编辑出错:".res.retCode.msg,
              type: "warning"
            });
          } else {
            this.$message({
              message: "编辑成功"
            });
          }

          this.editComplete(res.retCode.code);
        });
      } else {
        add(preArticleDic).then(res => {
          console.log(res);
          if (res.retCode.code != 0) {
            this.$message({
              message: "添加出错:".res.retCode.msg,
              type: "warning"
            });
          } else {
            this.$message({
              message: "添加成功"
            });
          }

          this.editComplete(res.retCode.code);
        });
      }
      // });
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
