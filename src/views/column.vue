<template>
  <div>
    <!-- 添加栏目按钮  -->
    <el-button @click="onClick" type="success">添加栏目</el-button>
    <el-dialog
      width="30%"
      title="内层 Dialog"
      :visible.sync="innerVisible"
      append-to-body
    >
    </el-dialog>
    <el-dialog title="添加栏目" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input
            v-model="name"
            placeholder="请输入栏目名称"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onAddColumn">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 60%">
      <el-table-column type="index" label="编号" width="180"> </el-table-column>
      <el-table-column prop="name" label="栏目名称"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { category, addCategory } from '@/apis/category.js'
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '70px',
      innerVisible: false,
      tableData: [], // 栏目列表数据
      name: '' // 栏目名称
    }
  },
  methods: {
    // 获取栏目数据
    category() {
      category().then(res => {
        this.tableData = res.data.data
      })
    },
    // 添加栏目
    onAddColumn() {
      if (this.name) {
        addCategory({ name: this.name }).then(res => {
          this.category()
          this.name = ''
          this.$message.success(res.data.message)
        })
      } else {
        this.$message.warning('输入栏目名称名称不能为空')
      }

      this.dialogFormVisible = false
    },
    onClick() {
      this.outerVisible = true
      this.dialogFormVisible = true
    }
  },
  created() {
    // 获取栏目数据
    this.category()
  }
}
</script>

<style scoped lang="less"></style>
