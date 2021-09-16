<template>
  <div>
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index/home' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item><a>文章管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>文章添加</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--  -->
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="80px">
        <!-- 标题 -->
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <!-- 类型 -->
        <el-form-item label="类型">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
          <!-- 富文本 -->
          <VueEditor
            v-show="form.type === 1"
            ref="vueEditor"
            :config="config"
          />
          <!-- 视频 -->
          <el-upload
            v-show="form.type === 2"
            class="upload-demo"
            :action="baseURL + '/upload'"
            :headers="{ Authorization: token }"
            :on-success="onSuccess"
            :on-exceed="onExceed"
            :on-remove="onRemove"
            :file-list="videoContent"
            :limit="1"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传视频</div>
          </el-upload>
        </el-form-item>
        <!-- 栏目 -->
        <el-form-item label="栏目">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group
            v-model="form.categories"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox v-for="v in categoryList" :label="v.id" :key="v.id">{{
              v.name
            }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 封面 -->
        <el-form-item label="封面">
          <el-upload
            :action="baseURL + '/upload'"
            :headers="{ Authorization: token }"
            :limit="3"
            :on-success="onCoverSuccess"
            :on-exceed="onCoverExceed"
            :on-remove="onCoverRemove"
            :file-list="form.cover"
            list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 发布文章按钮  -->
      <el-button @click="onPublish" type="success">发布文章</el-button>
    </el-card>
  </div>
</template>

<script>
import {
  publisherArticle,
  articleDetail,
  articleEditor
} from '@/apis/article.js'
import { category } from '@/apis/category.js'
import VueEditor from 'vue-word-editor'
import 'quill/dist/quill.snow.css'
import axios from '@/utils/request.js'
export default {
  components: { VueEditor },
  data() {
    return {
      baseURL: axios.defaults.baseURL, // url
      videoContent: [], // 上传视频内容
      token: localStorage.getItem('hm-token-backend'), // 请求头 token
      form: {
        content: '', // 文章内容
        title: '', // 文章标题
        type: 1, // 文章类型
        categories: [], // 栏目 id 集合
        cover: [] // 封面集合
      },
      config: {
        // 上传图片的配置
        uploadImage: {
          url: this.baseURL + '/upload',
          name: 'file',
          // 设置 请求头
          headers: { Authorization: localStorage.getItem('hm-token-backend') },
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            console.log(res)
            insert(this.baseURL + res.data.data.url)
          }
        }
      },
      checkAll: false, // 全选框状态
      categoryList: [], // 栏目列表
      isIndeterminate: false // 全选框显示状态
    }
  },
  methods: {
    // 上传图片超过提示
    onCoverExceed() {
      this.$message.warning('封面图片中能上传3张！')
    },
    // 封面删除的回调函数
    onCoverRemove(file) {
      const id = file.id || file.response.data.id
      this.form.cover = this.form.cover.filter(v => v.id !== id)
    },
    // 封面上传成功的回调函数
    onCoverSuccess(response) {
      // 保存整个对象
      delete response.data.uid // 删除 uid 避免同一个用户上传两张图片时报错
      response.data.url = this.baseURL + response.data.url // 拼接修改后的封面路径
      this.form.cover.push(response.data)
    },
    // 栏目触发的回调函数
    handleCheckAllChange(val) {
      // console.log(val)
      this.form.categories = val ? this.categoryList.map(v => v.id) : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      // 小选影响全选
      this.checkAll = value.length === this.categoryList.length
      // 设置全选显示状态
      this.isIndeterminate =
        value.length > 0 && value.length < this.categoryList.length
    },
    // 删除视频触发的回调函数
    onRemove() {
      this.videoContent = []
    },
    // 文件超出上传上限触发的回调函数
    onExceed() {
      this.$message.warning('视频只能上传一次！')
    },
    // 视频上传成功的回调函数
    onSuccess(response) {
      this.videoContent = [response.data]
    },
    // 发布文章
    onPublish() {
      // 标题判断
      if (!this.form.title) throw this.$message.warning('标题不能为空')
      // 文章类型
      if (this.form.type === 1) {
        this.form.content = this.$refs.vueEditor.editor.root.innerHTML
        // 富文本内容判断
        if (this.$refs.vueEditor.editor.getLength() === 1) {
          throw this.$message.warning('富文本内容不能为空')
        }
      } else {
        // 视频类型
        this.form.content = this.baseURL + this.videoContent.url
        // 上传视频判断
        if (!this.videoContent[0]) {
          throw this.$message.warning('上传视频不能为空')
        }
      }
      // 所属栏目 id 集合
      if (this.form.categories.length === 0) {
        throw this.$message.warning('请至少选择一个栏目') // 栏目 ID 判断
      }

      this.form.categories = this.form.categories.map(id => {
        return { id }
      })
      // 封面图片 id
      // 深拷贝
      // let query = JSON.parse(JSON.stringify(this.form))
      this.form.cover = this.form.cover.map(v => {
        return { id: v.id }
      })
      if (this.form.cover.length === 0) {
        throw this.$message.warning('请至少上传一个封面图片') // 上传封面判断
      }
      // 编辑文章
      if (this.$route.query.id) {
        articleEditor(this.$route.query.id, this.form).then(res => {
          if (res.data.message === '文章编辑成功') {
            this.$message.success(res.data.message) // 文章发布成功提示
            this.$router.push('/index/articleList') // 跳转到文章列表页
          } else {
            this.$message.error(res.data.message) // 文章发布失败提示
          }
        })
      } else {
        // 发起文章发布的 post 请求 publisherArticle
        publisherArticle(this.form).then(res => {
          if (res.data.message === '文章发布成功') {
            this.$message.success(res.data.message) // 文章发布成功提示
            this.$router.push('/index/articleList') // 跳转到文章列表页
          } else {
            this.$message.error(res.data.message) // 文章发布失败提示
          }
        })
      }
    }
  },
  created() {
    // 栏目列表的获取
    category().then(res => {
      this.categoryList = res.data.data.slice(2, 20)
    })
    // 获取文章详情
    if (this.$route.query.id) {
      articleDetail(this.$route.query.id).then(res => {
        this.form = res.data.data
        // 富文本内容
        if (this.form.type === 1) {
          let quill = this.$refs.vueEditor.editor
          quill.clipboard.dangerouslyPasteHTML(0, this.form.content)
        } else {
          // 设置视频
          this.videoContent = [{ url: this.form.content }]
        }
        // 栏目处理
        this.form.categories = this.form.categories.map(v => v.id)
        // 封面处理
        this.form.cover.map(v => {
          if (!v.url.includes('http')) {
            delete v.uid
            this.isIndeterminate = true
            v.url = this.baseURL + v.url
          }
          console.log(v.url)
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.el-card {
  margin-top: 20px;
}
</style>
