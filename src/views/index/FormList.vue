<template>
  <div class="layout">
    <el-container class="formlist_container">
      <el-aside width="150px">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
        >
          <h5>业务表单分类</h5>
          <el-button-group>
            <el-button type="primary" size="mini">
              新增
            </el-button>
            <el-button type="primary" size="mini">
              刷新
            </el-button>
          </el-button-group>
          <el-menu-item v-for="item in formTypes" :key="item">
            <span slot="title">{{ item }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container class="rightLayout">
        <el-header height="120px">
          <el-form :inline="true" :model="formSearch" class="formlist_header" size="mini">
            <el-form-item label="表单名称">
              <el-input v-model="formSearch.user" />
            </el-form-item>
            <el-form-item label="业务模型">
              <el-input v-model="formSearch.user" />
            </el-form-item>
            <el-form-item class="search_btn">
              <el-button type="primary" size="mini">
                搜索
              </el-button>
              <el-button type="danger" size="mini">
                清空搜索
              </el-button>
            </el-form-item>
            <el-form-item label="表单类型">
              <el-select v-model="formSearch.type" placeholder="请选择">
                <el-option
                  v-for="item in searchType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="标识键">
              <el-input v-model="formSearch.user" />
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="formSearch.state" placeholder="请选择">
                <el-option
                  v-for="item in searchState"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <div>
            <el-dropdown size="mini" split-button type="primary" class="header_add">
              新建
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>在线设计表单</el-dropdown-item>
                <el-dropdown-item>根据业务建模新建表单</el-dropdown-item>
                <el-dropdown-item>新增URL表单</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button-group>
              <el-button type="primary" size="mini">
                导入
              </el-button>
              <el-button type="primary" size="mini">
                导出
              </el-button>
              <el-button type="danger" size="mini">
                删除
              </el-button>
            </el-button-group>
          </div>
        </el-header>
        <el-main class="formlist_main">
          <el-table
            :data="currentData"
            style="width: 100%"
            height="430"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              prop="operate"
              label="操作"
              width="180"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleClick(scope.row)">
                  编辑
                </el-button>
                <el-button type="text" size="small">
                  删除
                </el-button>
                <el-dropdown class="operate_dropdown">
                  <span class="el-dropdown-link">
                    更多<i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>版本</el-dropdown-item>
                    <el-dropdown-item>复制</el-dropdown-item>
                    <el-dropdown-item>预览</el-dropdown-item>
                    <el-dropdown-item>清除BO</el-dropdown-item>
                    <el-dropdown-item>编辑BO</el-dropdown-item>
                    <el-dropdown-item>编辑模板</el-dropdown-item>
                    <el-dropdown-item>PFD模板</el-dropdown-item>
                    <el-dropdown-item>服务器调用接口</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称"
              width="200"
            />
            <el-table-column
              prop="key"
              label="标识键"
              width="200"
            />
            <el-table-column
              prop="type"
              label="类型"
              width="140"
            />
            <el-table-column
              prop="version"
              label="版本号"
              width="140"
            />
            <el-table-column
              prop="state"
              label="状态"
              width="140"
            />
            <el-table-column
              prop="time"
              label="创建时间"
              width="140"
            />
          </el-table>
          <div class="pagination">
            <el-pagination
              :current-page="currentPage"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="tableData.length"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'FormList',
  data() {
    return {
      formItem: [],
      formSearch: {
      },
      searchType: [{
        value: '自定义表单',
        label: '自定义表单'
      }, {
        value: '在线表单设计',
        label: '在线表单设计'
      }],
      searchState: [{
        value: '草稿',
        label: '草稿'
      }, {
        value: '发布',
        label: '发布'
      }],
      tableData: [{
      }, {}, {
      }, {}, {
      }, {}, {
      }, {}, {
      }, {}, {
      }, {}, {
      }, {}],
      currentPage: 1,
      pageSize: 10,
      currentData: [],
      formTypes: ['资产管理', '应收管理', '应付管理', '总账工单', '税务工单']
    }
  },
  mounted() {
    const oldJsonStr = localStorage.getItem('drawFormDataJson')
    if (oldJsonStr) {
      const oldJson = JSON.parse(oldJsonStr)
      console.log('oldJson:', oldJson)
      this.formItem = oldJson
    }
    this.currentData = this.tableData.slice(0, this.pageSize)
  },
  methods: {
    handleCurrentChange(cur) {
      this.currentPage = cur
      this.currentData = this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  }
}
</script>

<style lang='scss' scoped>
  $font-mini:12px;
  .formlist_container {
    height: 100%;
  }
  .el-menu{
    border: none;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
  }
  .el-header{
    background-color: white;
    height: 80px;
  }
  .el-aside {
    text-align: center;
    margin-right: 5px;
  }

  .el-main {
    text-align: center;
    padding: 0px;
  }
  .el-menu-item {
    font-size:$font-mini;
    height: 45px;
  }
  .layout {
    height: 600px;
    font-size: $font-mini;
    margin: 0 auto;
    margin-top: 50px;
  }
  .header_add{
    margin-right: 5px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .operate_dropdown{
    margin-left: 10px;
    font-size: $font-mini;
  }
  .pagination{
    margin-top: 10px;
  }

</style>

<style lang="scss">
$font-mini:9px;
  .formlist_header {
    margin-top: 10px;
    width: 800px;

    .search_btn{
      margin-left: 20px;
    }
    .el-form-item{
      margin-bottom: 5px;
      margin-right: 5px;;
    }
    .el-select{
      width: 170px;
    }
    .el-form-item__label{
      font-size: 9px;
    }
}
  .formlist_main {
    .el-table {
      th {
      font-size: $font-mini;
      font-weight: normal;
      color: #333;
      }
    }
  }
</style>
