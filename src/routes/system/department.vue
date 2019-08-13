<template>
  <div id="user">
    <el-card class="box-card" v-show="true">
      <div slot="header" class="clearfix">
        <span>部门管理</span>
      </div>
      <div class="form">
        <p class="top t-right">
          <el-button type="primary" @click="addDepartmentDialog()">添加一级目录</el-button>
        </p>
        <el-tree :data="dataList"
          :props="defaultProps"
          node-key="id"
          :render-content="renderContent">
        </el-tree>
      </div>
    </el-card>

    <!-- 添加目录 -->
    <el-dialog :title="'添加级目录'" :visible.sync="dialog1">
      <el-form>
        <el-form-item v-show="parentId" label="上级目录" label-width="100">
          <span>{{ parentName }}</span>
        </el-form-item>
        <el-form-item label="目录名称">
          <el-input class="w200" v-model="modifyName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog1 = false">取 消</el-button>
        <el-button type="primary" @click="addDepartmentSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="修改名称" :visible.sync="dialog2">
      <el-form label-width="100">
        <el-form-item label="部门名称">
          <el-input class="w200" v-model="modifyName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog2 = false">取 消</el-button>
        <el-button type="primary" @click="updateNameSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 顺序 -->
    <el-dialog title="修改顺序" :visible.sync="dialog3">
      <el-form label-width="100">
        <el-form-item label="部门顺序">
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
  name: 'department',
  data () {
    return {
      dataList: [],
      defaultProps: {
        children: 'childs',
        label: 'name'
      },

      dialog1: false,
      dialog2: false,
      dialog3: false,
      parentId: '',
      parentName: '',
      modifyId: '',
      modifyName: '',
      modifySequence: ''
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 获取数据列表
    getList () {
      this.$service.kms.getDepartmentList({
        department: 0,
        level: 100
      }).then(res => {
        if (res) this.dataList = res.data
      })
    },
    renderContent (h, { node, data, store }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>
          <span>
            （排序：{ data.sequence }）
            <span style="padding-left: 30px;">
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.addDepartmentDialog(data) }>添加</el-button>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.updateNameDialog(data) }>编辑</el-button>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.setSequenceDialog(data) }>调整顺序</el-button>
            </span>
          </span>
        </span>)
    },
    addDepartmentDialog (data) {
      if (data) {
        this.parentId = data.id
        this.parentName = data.name
      } else {
        this.parentId = ''
        this.parentName = ''
      }
      this.modifyId = ''
      this.modifyName = ''
      this.dialog1 = true
    },
    addDepartmentSubmit () {
      this.$service.kms.modifyDepartment({
        parentId: this.parentId || 0,
        name: this.modifyName
      }).then(res => {
        if (res) {
          this.getList()
          this.$message.success('操作成功！')
          this.dialog1 = false
        }
      })
    },
    updateNameDialog (data) {
      this.modifyId = data.id
      this.modifyName = data.name
      this.dialog2 = true
    },
    updateNameSubmit () {
      this.$service.kms.modifyDepartment({
        id: this.modifyId,
        name: this.modifyName
      }).then(res => {
        if (res) {
          this.getList()
          this.$message.success('操作成功！')
          this.dialog2 = false
        }
      })
    },
    setSequenceDialog (data) {
      this.modifyId = data.id
      this.modifySequence = data.sequence
      this.dialog3 = true
    },
    setSequenceSubmit () {
      this.$service.kms.modifyDepartment({
        id: this.modifyId,
        sequence: this.modifySequence
      }).then(res => {
        if (res) {
          this.getList()
          this.$message.success('操作成功！')
          this.dialog3 = false
        }
      })
    }
  }
}
</script>

<style scoped>
.top {
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}
label.w100 {
  display: inline-block;
  text-align: right;
}
.form p {
  margin-bottom: 10px;
}
</style>
