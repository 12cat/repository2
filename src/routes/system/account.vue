<template>
  <div id="user">
    <el-card class="box-card" v-show="true">
      <div slot="header" class="clearfix">
        <span>账号查询</span>
      </div>
      <div class="form">
        <p>
          <el-select class="w100" v-model="userType" placeholder="请选择" @change="user = null">
            <el-option label="用户名" :value="1"></el-option>
            <el-option label="账号id" :value="2"></el-option>
          </el-select>
          <el-input class="w180" v-model="user"></el-input>
          <label class="w100">开始时间</label>
          <el-date-picker class="w180" v-model="startTime" type="date" value-format="yyyy-MM-dd"></el-date-picker>
          <label class="w100">结束时间</label>
          <el-date-picker class="w180" v-model="endTime" type="date" value-format="yyyy-MM-dd"></el-date-picker>
        </p>
        <p>
          <label class="w100">状态</label>
          <el-select class="w180" v-model="status" placeholder="请选择">
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
          <label class="w100">部门</label>
          <el-cascader class="w180" v-model="department"
            :options="departmentList"
            :props="departmentProps"
            change-on-select>
          </el-cascader>
        </p>
        <p>
          <label class="w100">&nbsp;</label>
          <el-button type="primary" @click="getList(1)">查询</el-button>
          <el-button @click="clearParam">重置</el-button>
        </p>
      </div>

      <el-table :data="accountList">
        <el-table-column prop="id" label="账号ID"></el-table-column>
        <el-table-column prop="account" label="用户名"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{ scope.row.status === 0 ? '禁用' : '启用' }}</template>
        </el-table-column>
        <el-table-column prop="departmentName" label="部门"></el-table-column>
        <el-table-column prop="secrecyName" label="密级"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{ scope.row.createTime | ymdt }}</template>
        </el-table-column>
        <el-table-column label="最后一次登录">
          <template slot-scope="scope">{{ scope.row.lastLoginTime | ymdt }}</template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="updateAuthorityDialog(scope.row)">修改权限</el-button>
            <el-button type="text" @click="updateStatusDialog(scope.row)">修改状态</el-button>
            <el-button type="text" @click="updateInfoDialog(scope.row)">修改信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="pageIndex"
        :page-size="20"
        :total="total"
        @current-change="getList"
        layout="total, prev, pager, next">
      </el-pagination>
    </el-card>

    <!-- 修改状态 -->
    <el-dialog title="修改状态" :visible.sync="dialog1">
      <el-form>
        <el-form-item label="修改状态" label-width="100">
          <el-select class="w200" v-model="updateStatus">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog1 = false">取 消</el-button>
        <el-button type="primary" @click="updateStatusSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改信息 -->
    <el-dialog title="修改信息" :visible.sync="dialog2">
      <el-form label-width="100">
        <el-form-item label="姓名">
          <el-input class="w200" v-model="updateUsername"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-cascader class="w200" v-model="updateDepartment"
            :options="departmentList"
            :props="departmentProps"
            change-on-select>
          </el-cascader>
        </el-form-item>
        <el-form-item label="密级">
          <el-select class="w200" v-model="updateSecrecy">
            <el-option v-for="item in secrecyList" :key="item.id"
              :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog2 = false">取 消</el-button>
        <el-button type="primary" @click="updateInfoSubmit">确 定</el-button>
      </div>
    </el-dialog>

     <!-- 修改权限 -->
    <el-dialog title="修改权限" :visible.sync="dialog3">
      <el-form label-width="100">
        <el-form-item label="姓名">
          <span>{{ update3name }}</span>
        </el-form-item>
        <el-form-item class="dialogBox" label="权限">
          <el-tree
            :data="update3tree"
            show-checkbox
            default-expand-all
            :default-checked-keys="update3list"
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps">
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog3 = false">取 消</el-button>
        <el-button type="primary" @click="updateAuthority">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'user',
  data () {
    return {
      userType: 1,
      user: '',
      status: '',
      startTime: '',
      endTime: '',
      department: [],
      accountList: [],
      pageIndex: 1,
      total: 0,

      secrecyList: [],
      departmentList: [],
      departmentProps: {
        value: 'id',
        label: 'name',
        children: 'childs'
      },
      defaultProps: {
        label: 'name',
        children: 'childs'
      },

      arr: [],
      flag: true,

      updateId: '',
      dialog1: false,
      updateStatus: 1,
      dialog2: false,
      updateUsername: '',
      updateDepartment: [],
      updateSecrecy: '',

      update3tree: [],
      dialog3: false,
      update3id: '',
      update3name: '',
      update3list: []
    }
  },
  mounted () {
    this.getList()
    this.getDepartmentList()
    this.getSecrecyList()
  },
  methods: {
    // 重置
    clearParam () {
      this.userType = 1
      this.user = ''
      this.status = '' // 状态枚举
      this.startTime = ''
      this.endTime = ''
      this.department = [] // 部门
    },
    // 获取部门列表
    getDepartmentList () {
      this.$service.kms.getDepartmentList({
        department: 0,
        level: 999
      }).then(res => {
        if (res) this.departmentList = res.data
      })
    },
    // 获取密级列表
    getSecrecyList () {
      this.$service.kms.getSecrecyList().then(res => {
        if (res) this.secrecyList = res.data
      })
    },
    // 获取数据列表
    getList (n) {
      this.pageIndex = n || 1
      let department = this.department.length - 1
      department = this.department[department]
      this.$service.kms.getAccountList({
        username: '', // 姓名
        account: this.userType === 1 ? this.user : '',
        userId: this.userType === 2 ? this.user : '',
        startTime: this.startTime,
        endTime: this.endTime,
        status: this.status,
        department: department,
        pageIndex: this.pageIndex,
        pageSize: 20
      }).then(res => {
        if (res) {
          this.accountList = res.data.data
          this.pageIndex = res.data.pageIndex
          this.total = res.data.total
        }
      })
    },
    updateStatusDialog (row) {
      this.updateId = row.id
      this.updateStatus = row.status
      this.dialog1 = true
    },
    updateStatusSubmit () {
      this.$service.kms.modifyAccount({
        userId: this.updateId,
        status: this.updateStatus
      }).then(res => {
        if (res) {
          this.getList(this.pageIndex)
          this.$message.success('操作成功！')
          this.dialog1 = false
        }
      })
    },
    updateInfoDialog (row) {
      this.arr = []
      this.flag = true
      this.dist(row.department, this.departmentList)
      this.updateId = row.id
      this.updateUsername = row.name
      this.updateDepartment = this.arr
      this.updateSecrecy = row.secrecy
      this.dialog2 = true
    },
    dist (id, list) {
      for (let i = 0; i < list.length; i++) {
        this.flag && this.arr.push(list[i].id)
        if (list[i].id === id) this.flag = false
        else this.flag && this.dist(id, list[i].childs)
      }
      this.flag && this.arr.splice(-1, 1)
    },
    updateInfoSubmit () {
      let department = this.updateDepartment.length - 1
      department = this.updateDepartment[department]
      this.$service.kms.modifyAccount({
        userId: this.updateId,
        userName: this.updateUsername,
        department: department,
        secrecy: this.updateSecrecy
      }).then(res => {
        if (res) {
          this.getList(this.pageIndex)
          this.$message.success('操作成功！')
          this.dialog2 = false
        }
      })
    },
    updateAuthorityDialog (row) {
      this.update3id = row.id
      this.update3name = row.name
      this.getTree()
      this.dialog3 = true
    },
    getTree () {
      this.$service.kms.getUserAuthority({
        uid: this.update3id
      }).then(res => {
        if (res) {
          this.update3tree = res.data.tree
          this.update3list = res.data.list
        }
      })
    },
    updateAuthority () {
      let authority = this.$refs.tree.getCheckedKeys()
      this.$service.kms.modifyUserAuthority({
        uid: this.update3id,
        authority: authority
      }).then(res => {
        if (res) {
          this.$message.success('操作成功！')
          this.dialog3 = false
        }
      })
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
</style>
