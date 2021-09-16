<template>
  <div>
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index/home' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item><a>文章管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>文章列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- table 表格 -->
    <template>
      <el-card class="box-card">
        <el-table
          height="calc(100vh - 230px)"
          :data="tableData"
          border
          style="width: 100%"
        >
          <!-- type 属性 设置 type="index" 表示显示改行的索引(从 1 开始计算) -->
          <el-table-column type="index" label="序号" width="60">
          </el-table-column>
          <el-table-column prop="title" label="标题"> </el-table-column>
          <el-table-column label="类型" width="180">
            <template v-slot="{ row }">
              {{ row.type === 1 ? '文章' : '视频' }}
            </template>
          </el-table-column>
          <el-table-column prop="user.nickname" label="作者" width="180">
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template v-slot="{ row, $index }">
              <!-- scope.$index 为当前下标 -->
              <!-- scope.row.属性名 可以获取当前行对应的属性值 -->
              <el-button @click="toArticleEditor(row.id)" size="mini"
                >编辑</el-button
              >
              <el-button
                @click="delArticleList($index)"
                type="danger"
                size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!--
          current-page : 表示当前页数
          size-change ： 表示 pageSize 改变时会触发 (每条页数)
          current-change ： 当前页改变时会触发
          layout ： 组件布局，子组件名用逗号分隔
        -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[2, 5, 10, 15, 20]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-card>
    </template>
  </div>
</template>

<script>
import { post } from '@/apis/article.js'
export default {
  data() {
    return {
      total: 0, // 数据总条数
      pageSize: 2, // 数据条数
      pageIndex: 1, // 当前页数
      tableData: [] // 文章列表
    }
  },
  created() {
    // 请求获取总页数
    post({
      pageSize: 9999,
      pageIndex: 1
    }).then(res => {
      this.total = res.data.data.length
    })
    this.getArticleList()
  },
  methods: {
    // 跳转到文章编辑页面
    toArticleEditor(id) {
      this.$router.push({
        path: '/index/addArticle',
        query: {
          id
        }
      })
    },
    // 删除文章
    delArticleList(i) {
      this.tableData.splice(i, 1)
      // console.log(this.tableData.length)
      // 如果 所显示的文章列表的 length 为 0 时，当前页 ++
      if (this.tableData.length === 0) {
        this.pageIndex++
        this.getArticleList()
      }
    },
    // 封装文章列表数据请求函数
    async getArticleList() {
      const res = await post({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
      this.tableData = res.data.data
    },
    // pageSize 改变时会触发的函数
    handleSizeChange(v) {
      // console.log(v)
      this.pageSize = v
      this.getArticleList()
    },
    // handleCurrentChange pageIndex  当前页改变时会触发的函数
    handleCurrentChange(v) {
      // console.log(v)
      this.pageIndex = v
      this.getArticleList()
    }
  }
}
</script>

<style scoped lang="less">
.el-card,
.el-pagination {
  margin-top: 20px;
}
</style>
