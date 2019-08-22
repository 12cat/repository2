<template>
  <div id="role">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共现图谱管理</span>
      </div>
      <el-table :data="dataList">
        <el-table-column prop="sequence" label="序号"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="url" label="URL"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="modeifyPathDialog(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 修改 -->
    <el-dialog title="修改链接" :visible.sync="dialogShow">
      <el-form label-width="100">
        <el-form-item label="标题名称">
          <el-input class="w200" v-model="modifyTitle"></el-input>
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input class="w200" v-model="modifyUrl"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload class="upload-demo mar-l100"
            :action="$store.state.uploadPath"
            :on-success="uploadFile">
            <span>{{ src }}</span>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="modeifyPathSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'atlas',
  data () {
    return {
      dataList: [
        {
          no: 2,
          title: '共献图谱管理',
          url: 'www.baidu.com'
        }
      ],
      dialogShow: false,
      src: '',
      modifyId: '',
      modifyTitle: '',
      modifyUrl: '',
      modifySrc: ''
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList (index) {
      this.pageIndex = index || 1
      this.$service.kms.getUrlList().then(res => {
        if (res) {
          this.dataList = res.data
        }
      }).catch(_ => {})
    },
    modeifyPathDialog (row) {
      this.modifyId = row.id
      this.modifyTitle = row.title
      this.modifyUrl = row.url
      this.modifySrc = row.src
      this.dialogShow = true
    },
    modeifyPathSubmit () {
      this.$service.kms.modifyUrl({
        id: this.modifyId,
        title: this.modifyTitle,
        url: this.modifyUrl,
        src: this.modifySrc
      }).then(res => {
        if (res) {
          this.getList()
          this.dialogShow = false
        }
      }).catch(_ => {})
    },
    uploadFile (res, file) {
      if (res.data) {
        this.modifySrc = res.data.path
        this.src = file.name
      }
    }
  }
}
</script>

<style scoped>
label.w100 {
  display: inline-block;
  text-align: right;
}
.form p {
  margin-bottom: 10px;
}
</style>
