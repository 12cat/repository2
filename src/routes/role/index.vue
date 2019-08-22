<template>
  <div id="user">
    <el-card class="box-card" v-show="true">
      <div slot="header" class="clearfix">
        <span>账号查询</span>
      </div>
      <div class="form">
        <el-button class="right" type="primary" @click="updateRoleDialog()">添 加</el-button>
      </div>

      <el-table :data="roleList">
        <el-table-column prop="name" label="角色名称"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="updateRoleDialog(scope.row)">修改</el-button>
            <el-button type="text" @click="deleteRole(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 修改 -->
    <el-dialog :title="id ? '修改' : '添加'" :visible.sync="dialog">
      <div class="my-form">
        <div class="sub-cont">
          <label>角色名称：</label>
          <el-input class="w200" v-model="name"></el-input>
        </div>
        <div class="sub-cont">
          <label>类目查看：</label>
          <div class="tree-cont">
            <el-tree :data="searchList" show-checkbox
              node-key="id" ref="tree1"
              :default-checked-keys="searchChoose"
              :props="defaultProps1">
            </el-tree>
          </div>
        </div>
        <div class="sub-cont">
          <label>历史版本查看：</label>
          <el-checkbox-group v-model="historyCode">
            <el-checkbox :label="history.code">{{ history.name }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="sub-cont">
          <label>上传：</label>
          <el-tree
            :data="uploadList" show-checkbox
            node-key="id" ref="tree2"
            :default-checked-keys="uploadChoose"
            :props="defaultProps1">
          </el-tree>
        </div>
        <div class="sub-cont">
          <label>后台权限：</label>
          <el-checkbox-group v-model="backCode">
            <el-checkbox v-for="item in back" :label="item.code" :key="item.code">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="updateRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'user',
  data () {
    return {
      roleList: [], // 角色列表

      id: '',
      name: '',
      backCode: [],
      back: [],
      historyCode: [],
      history: {},
      searchChoose: [],
      searchList: [],
      uploadChoose: [],
      uploadList: [],
      dialog: false,

      defaultProps1: {
        children: 'childs',
        label: 'name'
      },
      defaultProps2: {
        children: 'childs',
        label: 'name'
      }
    }
  },
  mounted () {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表
    getRoleList () {
      this.$service.kms.getRoleList().then(res => {
        if (res) {
          this.roleList = res.data
        }
      }).catch(_ => {})
    },
    // 删除角色
    deleteRole (row) {
      this.$confirm('确认需要删除该角色吗？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确认',
        type: 'warning'
      }).then(() => {
        this.$service.kms.deleteRole({
          roleId: row.id
        }).then(res => {
          this.$message.success('操作成功！')
          this.getRoleList()
        }).catch(_ => {})
      }).catch(_ => {})
    },
    updateRoleDialog (row) {
      if (row) {
        this.id = row.id
        this.name = row.name
        this.$service.kms.getRoleAuthority({
          roleId: row.id
        }).then(res => {
          if (res) {
            this.back = res.data.back || []
            this.backCode = []
            for (let i = 0; i < this.back.length; i++) {
              if (this.back[i].choose) {
                this.backCode.push(this.back[i].code)
              }
            }
            this.history = res.data.history || {}
            if (res.data.history.choose) {
              this.historyCode = [res.data.history.code]
            } else {
              this.historyCode = []
            }
            this.searchChoose = res.data.search.choose || []
            this.searchList = res.data.search.list || []
            this.uploadChoose = res.data.upload.choose || []
            this.uploadList = res.data.upload.list || []
            this.dialog = true
          }
        }).catch(_ => {})
      } else {
        this.id = null
        this.name = ''
        this.$service.kms.getRoleAuthority().then(res => {
          if (res) {
            this.backCode = []
            this.historyCode = []
            this.searchChoose = []
            this.uploadChoose = []
            this.back = res.data.back || []
            this.history = res.data.history || {}
            this.searchList = res.data.search.list || []
            this.uploadList = res.data.upload.list || []
            this.dialog = true
          }
        }).catch(_ => {})
      }
    },
    updateRole () {
      let arr = []
      for (let i = 0; i < this.backCode.length; i++) {
        arr.push(this.backCode[i])
      }
      this.historyCode.length > 0 && arr.push(this.historyCode[0])
      let param = {
        name: this.name,
        search: this.$refs.tree1.getCheckedKeys(),
        upload: this.$refs.tree2.getCheckedKeys(),
        other: arr
      }
      this.id && (param.roleId = this.id)
      this.$service.kms.modifyRoleAuthority(param).then(res => {
        if (res) {
          this.$message.success('操作成功！')
          this.getRoleList()
          this.dialog = false
        }
      }).catch(_ => {})
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
.dialogBox {
  max-height: 300px;
  overflow-y: auto;
}
.my-form .sub-cont {
  margin-bottom: 15px;
}
.my-form .sub-cont> label {
  font-size: 14px;
  line-height: 25px;
  margin-top: 15px;
}
.my-form .tree-cont {
  max-height: 200px;
  overflow: auto;
  padding: 5px;
  border: 1px solid #aaa;
  border-radius: 5px;
}
.el-table {
  max-height: 2000px !important;
}
</style>
