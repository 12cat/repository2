<template>
  <div id="user">
    <el-card class="box-card" v-show="true">
      <div slot="header" class="clearfix">
        <span>幻灯管理</span>
        <el-button class="right" type="primary" @click="showDialog()">添加内容</el-button>
      </div>
      <el-table :data="dataList">
        <el-table-column prop="id" label="幻灯ID"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.src" width="50">
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.status === 1 ? '开启' : '禁用' }}
          </template>
        </el-table-column>
        <el-table-column prop="sequence" label="顺序"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="showDialog(scope.row)">修改</el-button>
            <el-button type="text" @click="sequenceSlide(scope.row)">修改顺序</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 增加 ／ 编辑内容 -->
    <el-dialog title="幻灯配置" :visible.sync="dialog">
      <el-form label-width="100">
        <el-form-item label="标题">
          <el-input class="w200" v-model="param.title"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="param.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="链接">
          <el-input class="w200" v-model="param.url"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload class="upload-demo mar-l100"
            :action="$store.state.uploadPath"
            :on-success="uploadFile">
            <span>{{ param.src }}</span>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modifySlideSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 顺序 -->
    <el-dialog title="修改顺序" :visible.sync="dialog3">
      <el-form label-width="100">
        <el-form-item label="顺序">
          <el-input class="w200" v-model="modifySequence"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog3 = false">取 消</el-button>
        <el-button type="primary" @click="setSequenceSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'slide',
  data () {
    return {
      dialog: false,
      dialog3: false,
      src: '',
      param: {
        id: '',
        title: '',
        status: '',
        url: '',
        src: '',
        sequence: ''
      },
      dataList: [],

      modifyId: '',
      modifySequence: ''
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 获取数据列表
    getList () {
      this.$service.kms.getSlideList().then(res => {
        if (res) this.dataList = res.data
      }).catch(_ => {})
    },
    showDialog (row) {
      if (row) {
        this.param.id = row.id
        this.param.title = row.title
        this.param.status = row.status
        this.param.url = row.url
        this.param.src = row.src
      } else {
        this.param.id = ''
        this.param.title = ''
        this.param.status = 1
        this.param.url = ''
        this.param.src = ''
      }
      this.param.sequence = ''
      this.dialog = true
    },
    modifySlideSubmit () {
      this.modifySlide(this.param)
    },
    sequenceSlide (row) {
      this.modifyId = row.id
      this.modifySequence = row.sequence
      this.dialog3 = true
    },
    setSequenceSubmit () {
      this.modifySlide({
        id: this.modifyId,
        sequence: this.modifySequence
      })
    },
    modifySlide ({id, title, status, src, url, sequence}) {
      this.$service.kms.modifySlide({
        id, title, status, src, url, sequence
      }).then(res => {
        if (res) {
          this.getList(this.pageIndex)
          this.$message.success('操作成功！')
          this.dialog = false
          this.dialog3 = false
        }
      }).catch(_ => {})
    },
    uploadFile (res, file) {
      if (res.data) {
        this.param.src = res.data.path
        this.src = file.name
      }
    }
  }
}
</script>

<style scoped>

</style>
