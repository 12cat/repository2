<template>
  <div id="role">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>页面内容管理</span>
      </div>
      <div class="form">
        <p>
          <label class="w100">页面未知选择</label>
          <el-select class="w180" v-model="type" placeholder="请选择" @change="getCategoryList">
            <el-option v-for="item in selectList" :key="item.id"
              :label="item.name" :value="item.id"></el-option>
          </el-select>
        </p>
        <p>
          <label class="w100">添加类目</label>
        </p>
        <div class="mar-l120">
          <ul class="list1">
            <li v-for="(item, index) in categoryList" :key="index">
              <span class="p1">
                {{ item.name }}
                <el-button type="text" class="right" @click="openSelected(3, index, null, item.id)">修改</el-button>
                <el-button type="text" class="right" @click="delItem(index, null)">删除</el-button>
              </span>
              <div class="p2">
                <span v-for="(e, i) in item.childs" :key="i">
                  <span>
                    {{ e.name }}
                    <el-button type="text" class="right" @click="openSelected(4, index, i, e.id)">修改</el-button>
                    <el-button type="text" class="right" @click="delItem(index, i)">删除</el-button>
                  </span>
                </span>
                <span>
                  <el-button type="primary" @click="openSelected(2, index, null, item.id)">添加二级目录</el-button>
                </span>
              </div>
            </li>
            <li>
              <span class="p1">
                <el-button type="primary" @click="openSelected(1, null, null, null)">添加一级目录</el-button>
              </span>
            </li>
          </ul>
        </div>
        <div class="mar-l120 mar-t80">
          <el-button type="primary" @click="submit">保 存</el-button>
        </div>
      </div>
    </el-card>

    <!-- 修改 -->
    <el-dialog title="编辑" :visible.sync="dialog">
      <el-form label-width="100">
        <el-form-item label="请选择">
          <el-cascader class="w200" v-model="param"
            :options="allList"
            :props="props"
            change-on-select>
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="submitSelected">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'page',
  data () {
    return {
      selectList: [],
      categoryList: [],
      allList: [],
      type: '',
      dialog: false,
      param: '',
      props: {
        value: 'id',
        label: 'name',
        children: 'childs'
      },
      selectType: 1, // 1添加一级，2添加二级，3修改一级，4修改二级
      t1: '',
      t2: ''
    }
  },
  mounted () {
    this.getSelectList()
    this.getAllCategory()
  },
  methods: {
    getSelectList () {
      this.$service.kms.getPageCategoryType().then(res => {
        if (res) {
          this.selectList = res.data
          if (this.selectList.length > 0) {
            this.type = res.data[0].id
            this.getCategoryList(this.type)
          }
        }
      }).catch(_ => {})
    },
    getCategoryList (id) {
      this.$service.kms.getPageCategory({
        type: this.type
      }).then(res => {
        if (res) {
          this.categoryList = res.data
        }
      }).catch(_ => {})
    },
    getAllCategory () {
      this.$service.kms.getAllCategory().then(res => {
        if (res) {
          this.allList = res.data
        }
      }).catch(_ => {})
    },
    delItem (t1, t2) {
      let arr = this.categoryList
      if (t2 !== null) {
        arr[t1].childs.splice(t2, 1)
      } else {
        arr.splice(t1, 1)
      }
      this.categoryList = arr
    },
    openSelected (type, t1, t2, id) {
      this.selectType = type
      this.t1 = t1
      this.t2 = t2
      this.param = [id] || []
      this.dialog = true
    },
    submitSelected () {
      let e = {}
      let item = null
      for (let i = 0; i < this.allList.length; i++) {
        item = this.allList[i]
        if (item.id === this.param[0]) {
          e.id = item.id
          e.config = item.config
          e.name = item.name
          e.parentId = item.parentId
          e.sequence = item.sequence
          e.type = item.type
          e.childs = []
        }
      }
      if (this.selectType === 1) {
        this.categoryList.push(e)
      } else if (this.selectType === 2) {
        this.categoryList[this.t1].childs.push(e)
      } else if (this.selectType === 3) {
        this.categoryList[this.t1].id = e.id
        this.categoryList[this.t1].config = e.config
        this.categoryList[this.t1].name = e.name
        this.categoryList[this.t1].parentId = e.parentId
        this.categoryList[this.t1].sequence = e.sequence
        this.categoryList[this.t1].type = e.type
      } else {
        this.categoryList[this.t1].childs[this.t2].id = e.id
        this.categoryList[this.t1].childs[this.t2].config = e.config
        this.categoryList[this.t1].childs[this.t2].name = e.name
        this.categoryList[this.t1].childs[this.t2].parentId = e.parentId
        this.categoryList[this.t1].childs[this.t2].sequence = e.sequence
        this.categoryList[this.t1].childs[this.t2].type = e.type
      }
      this.dialog = false
    },
    submit () {
      let category = this.getParam()
      this.$service.kms.modifyPageCategory({
        type: this.type,
        category: category
      }).then(res => {
        if (res) {
          this.$message.success('操作成功！')
        }
      }).catch(_ => {})
    },
    getParam () {
      let param = []
      let i, j, item, e
      let obj = {}
      for (i = 0; i < this.categoryList.length; i++) {
        item = this.categoryList[i]
        obj = {}
        obj.category1 = item.id
        obj.category2 = []
        for (j = 0; j < item.childs.length; j++) {
          e = item.childs[j]
          obj.category2.push(e.id)
        }
        param.push(obj)
      }
      return param
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
.list1 > li {
  margin: 10px 20px;
  line-height: 32px;
}
.list1 > li .p1 {
  position: absolute;
  margin-top: 10px;
  width: 200px;
}
.list1 > li .p2 {
  margin-left: 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.list1 > li .p2 > span {
  display: inline-block;
  margin: 10px 20px;
  width: 200px;
}
</style>
