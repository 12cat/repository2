<template>
  <div id="user">
    <el-card class="box-card" v-show="true">
      <div slot="header" class="clearfix">
        <span>文档类目管理</span>
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
    <el-dialog :title="'添加目录'" :visible.sync="dialog1">
      <el-form>
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
  </div>
</template>

<script>

export default {
  name: 'category',
  data () {
    return {
      dataList: [],
      defaultProps: {
        children: 'childs',
        label: 'name'
      },

      dialog1: false,
      dialog2: false,
      parentId: '',
      modifyId: '',
      modifyParentId: '',
      modifyName: ''
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 获取数据列表
    getList () {
      this.$service.kms.getCategoryList({
        category: 0,
        level: 100
      }).then(res => {
        if (res) {
          this.dataList = res.data
        }
      })
    },
    renderContent (h, { node, data, store }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>
          <span style="padding-left: 30px;">
            <el-button style="font-size: 12px;" type="text"
              on-click={ () => this.addDepartmentDialog(data.id) }>添加</el-button>
            <el-button style="font-size: 12px;" type="text"
              on-click={ () => this.updateNameDialog(data) }>编辑</el-button>
            <el-button style="font-size: 12px;" type="text"
              on-click={ () => this.sequence(data.id, data.parentId, 1) }>
              <i class="el-icon-sort-up"></i>
            </el-button>
            <el-button style="font-size: 12px;" type="text"
              on-click={ () => this.sequence(data.id, data.parentId, 0) }>
              <i class="el-icon-sort-down"></i>
            </el-button>
            <el-button style="font-size: 12px;" type="text"
              on-click={ () => this.delCategory(data.id, data.parentId) }>删除</el-button>
          </span>
        </span>)
    },
    addDepartmentDialog (n) {
      if (n >= 0) {
        this.parentId = n
      } else {
        this.parentId = ''
      }
      this.modifyId = ''
      this.modifyName = ''
      this.dialog1 = true
    },
    addDepartmentSubmit () {
      this.modifyCategory({
        parentId: this.parentId || 0,
        name: this.modifyName,
        del: 0
      })
    },
    updateNameDialog (data) {
      this.modifyId = data.id
      this.modifyName = data.name
      this.modifyParentId = data.parentId
      this.dialog2 = true
    },
    updateNameSubmit () {
      this.modifyCategory({
        id: this.modifyId,
        parentId: this.modifyParentId,
        name: this.modifyName,
        del: 0
      })
    },
    delCategory (id, parentId) {
      this.$confirm('确认需要删除该目录吗？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确认',
        type: 'warning'
      }).then(() => {
        this.modifyCategory({id, parentId, del: 1})
      })
    },
    sequence (id, parentId, sequence) {
      this.modifyCategory({id, parentId, sequence, del: 0})
    },
    modifyCategory ({id, parentId, name, sequence, del}) {
      this.$service.kms.modifyCategory({id, parentId, name, sequence, del}).then(res => {
        if (res) {
          this.getList()
          this.$message.success('操作成功！')
          this.dialog1 = false
          this.dialog2 = false
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
