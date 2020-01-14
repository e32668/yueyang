<template>

  <div class="app-container">
    <!-- 查询 Start -->
    <el-card class="box-card no-padding">
      <div
        slot="header"
        class="clearfix">
        <span>
          <i class="el-icon-search"/> 查询
        </span>
      </div>

      <el-row class="card-body">
        <el-form
          :model="list.queryItem"
          label-position="right"
          label-width="150px">

          <el-row
            :span="24"
            class="form-group">
            <el-col
              :xs="24"
              :sm="8">
              <el-form-item
                label="电话号码:"
                prop="mobile">
                <el-input
                  v-model="list.queryItem.mobile"
                  placeholder="请填写电话号码(从左匹配模糊查询)"
                  clearable/>
              </el-form-item>
            </el-col>
            <el-col
              :xs="24"
              :sm="8">
              <el-form-item
                label="状态:"
                prop="status">
                <el-select
                  v-model="list.queryItem.status"
                  placeholder="请选择">
                  <el-option
                    v-for="item in dialog.statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </el-row>

      <el-row class="card-footer">
        <el-row>
          <el-col
            :span="24"
            :push="1">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="getList()">查询
            </el-button>
          </el-col>
        </el-row>
      </el-row>

    </el-card>
    <!-- 查询 End -->

    <!-- 列表 Start -->
    <div>
      <el-card
        class="
              no-padding">
        <div
          slot="header"
          class="clearfix">
          <span>
            <i class="el-icon-menu"/> 列表
          </span>
        </div>

        <el-row :span="24">
          <el-table
            :data="list.data"
            align="left"
            header-align="left"
            stripe
            border
            highlight-current-row>
            <template slot="empty">
              暂无数据
            </template>
            <el-table-column
              prop="uniqueId"
              label="订单唯一编号"
              min-width="150"/>

            <el-table-column
              prop="trackingNumber"
              label="快递单号"
              min-width="150"/>

            <el-table-column
              prop="receiveAddress"
              label="收货地址"
              min-width="150"/>

            <el-table-column
              prop="mobile"
              label="电话"
              min-width="150"/>
            <el-table-column
              prop="price"
              label="价格"
              min-width="100"/>
            <el-table-column
              prop="message"
              label="留言"
              min-width="150"/>
            <el-table-column
              label="状态"
              min-width="100">
              <template slot-scope="scope ">
                <el-tag :type="scope.row.status | statusClassFilter ">{{ scope.row.status | statusFilter }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="250"
              align="center">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  size="mini"
                  @click="view(scope.row)">查看</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="edit(scope.row)">编辑</el-button>
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
      </el-row> -->

      </el-card>
    </div>
    <!-- 列表 End -->

    <!-- 编辑路由弹框 Start -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialog.editVisible"
      :close-on-click-modal="false"
      @close="closeDialog">
      <el-form
        ref="formEdit"
        :rules="dialog.rules"
        :model="dialog.editItem"
        label-position="right"
        label-width="120px">

        <el-form-item
          label="订单唯一编号:"
          prop="name">
          <el-input
            v-model="dialog.editItem.uniqueId"
            readonly/>
        </el-form-item>
        <el-form-item
          label="快递单号:"
          prop="name">
          <el-input
            v-model="dialog.editItem.trackingNumber"
            placeholder="请填写快递单号"
            clearable/>
        </el-form-item>
        <el-form-item
          label="状态:"
          prop="type">
          <el-select
            v-model="dialog.editItem.status"
            placeholder="请选择">
            <el-option
              v-for="item in dialog.statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button
          v-loading.fullscreen="loading.edit"
          type="primary"
          @click="save">提交
        </el-button>
      </div>
    </el-dialog>
    <!-- 编辑路由弹框 End -->

    <!-- 查看路由弹框 Start -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialog.viewVisible"
      :close-on-click-modal="false"
      @close="closeDialog">
      <el-form
        ref="formEdit"
        :rules="dialog.rules"
        :model="dialog.editItem"
        label-position="right"
        label-width="120px">

        <el-form-item
          label="订单唯一编号:"
          prop="name">
          <el-input
            v-model="dialog.editItem.uniqueId"
            readonly/>
        </el-form-item>
        <el-form-item
          label="微信支付单号:"
          prop="name">
          <el-input
            v-model="dialog.editItem.wxOrderId"
            readonly/>
        </el-form-item>
        <el-form-item
          label="快递单号:"
          prop="name">
          <el-input
            v-model="dialog.editItem.trackingNumber"
            readonly/>
        </el-form-item>
        <el-form-item
          label="发货地址:"
          prop="name">
          <el-input
            v-model="dialog.editItem.sentAddress"
            readonly/>
        </el-form-item>
        <el-form-item
          label="收货地址:"
          prop="name">
          <el-input
            v-model="dialog.editItem.receiveAddress"
            readonly/>
        </el-form-item>
        <el-form-item
          label="手机号:"
          prop="name">
          <el-input
            v-model="dialog.editItem.mobile"
            readonly/>
        </el-form-item>
        <el-form-item
          label="拓展信息:"
          prop="name">
          <el-input
            v-model="dialog.editItem.extend"
            readonly/>
        </el-form-item>
        <el-form-item
          label="留言:"
          prop="name">
          <el-input
            v-model="dialog.editItem.message"
            readonly/>
        </el-form-item>
        <el-form-item
          label="价格:"
          prop="name">
          <el-input
            v-model="dialog.editItem.price"
            readonly/>
        </el-form-item>
        <el-form-item
          label="状态:"
          prop="type">
          <el-tag :type="dialog.editItem.status | statusClassFilter ">{{ dialog.editItem.status | statusFilter }}</el-tag>
        </el-form-item>

      </el-form>
    </el-dialog>
    <!-- 查看路由弹框 End -->

  </div>

</template>

<script>
import { list, update } from '@/api/order'

export default {
  name: 'Order',
  filters: {
    statusClassFilter(status) {
      const statusMap = {
        99: 'danger',
        1: 'success',
        5: 'success',
        10: 'success',
        15: 'success',
        20: 'success'
      }
      return statusMap[status]
    },
    statusFilter(status) {
      const statusMap = {
        99: '失效',
        1: '待付款',
        5: '待发货',
        10: '待收货',
        15: '待评价',
        20: '已完成'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // 列表相关
      list: {
        editItem: {},
        queryItem: {
          uid: 0,
          status: 1,
          mobile: ''
        },
        data: []
      },
      // 是否加载完毕控制项
      loading: {
        edit: false
      },
      // 弹框相关
      dialog: {
        editVisible: false,
        viewVisible: false,
        rules: {
          // name: [{ required: true, message: '名称必填', trigger: 'blur' }]
        },
        defaultItem: {
          name: '',
          type: 1,
          status: 1
        },
        statusOptions: [
          { value: 1, label: '待支付' },
          { value: 5, label: '待发货' },
          { value: 10, label: '待收货' },
          { value: 15, label: '待评价' },
          { value: 20, label: '已完成' },
          { value: 99, label: '无效' }
        ],
        editItem: {}
      }
    }
  },

  computed: {
    dialogTitle() {
      return this.dialog.editItem.id ? '编辑' : '增加'
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      list(this.list.queryItem).then(res => {
        if (res.retCode.code != 0) {
          return
        }

        this.list.data = res.data
      })
    },
    /**
       * 增加
       */
    add() {
      this.dialog.editItem = {
        ...this.dialog.defaultItem,
        editFlag: 0
      }
      this.dialog.visible = true
    },
    /**
       * 编辑
       * @param {object} routeItem 当前行路由数据信息
       */
    edit(item = {}) {
      this.dialog.editItem = { ...item, editFlag: 1 }
      this.dialog.editVisible = true
    },
    /**
     * 查看
     * @param {object} routeItem 当前行路由数据信息
     */
    view(item = {}) {
      this.dialog.editItem = { ...item, editFlag: 1 }
      this.dialog.viewVisible = true
    },
    /**
       * 弹框"取消"
       */
    closeDialog() {
      this.dialog.editVisible = false
      this.dialog.viewVisible = false
      this.dialog.editItem = this.dialog.defaultItem
      this.resetForm('formEdit')
    },
    /**
       * 弹框"确认
       * 1. 表单校验
       * 2. 执行保存操作
       */
    save() {
      this.$refs['formEdit'].validate(valid => {
        if (!valid) {
          this.$message({
            message: '请完善表单信息后再提交',
            type: 'warning'
          })
          return false
        }

        this.loading.edit = false
        this.list.editItem = { ...this.dialog.editItem }

        if (this.list.editItem.editFlag == 1) {
          update(this.list.editItem).then(res => {
            if (res.retCode.code != 0) {
              this.$message({
                message: '添加出错:'.res.retCode.msg,
                type: 'warning'
              })
            } else {
              this.$message({
                message: '成功'
              })
            }

            this.editComplete(res.retCode.code)
          })
        } else {
          add(this.list.editItem).then(res => {
            if (res.retCode.code != 0) {
              this.$message({
                message: '编辑出错:'.res.retCode.msg,
                type: 'warning'
              })
            } else {
              this.$message({
                message: '成功'
              })
            }

            this.editComplete(res.retCode.code)
          })
        }
      })
    },
    /**
       * 表单重置（如提示信息清空等）
       */
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    /**
       * 完成编辑
       */
    editComplete(code) {
      this.loading.edit = false
      code === 0 && (this.dialog.visible = false)
      this.getList()
    }
  }
}
</script>
