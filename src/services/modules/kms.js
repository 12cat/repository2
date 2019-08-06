/**
 * 系统管理 url
 */

export default {
  category: 'kms',
  pathList: [
    // 登录
    {key: 'login', url: 'user/login'},
    // 退出
    {key: 'logout', url: 'user/logout'},

    // 获取部门信息
    {key: 'getDepartmentList', url: 'department/getDepartmentList'},
    // 获取个人信息
    {key: 'getUserInfo', url: 'user/getUserInfo'},
    // 获取账号列表
    {key: 'getAccountList', url: 'user/getAccountList'},
    // 操作账号
    {key: 'modifyAccount', url: 'user/modifyAccount'},
    // 获取操作日志
    {key: 'getOperatorLog', url: 'user/getOperatorLog'},

    // 获取权限列表
    {key: 'getAuthorityList', url: 'user/getAuthorityList'},
    // 获取其他用户权限
    {key: 'getUserAuthority', url: 'user/getUserAuthority'},
    // 修改权限
    {key: 'modifyUserAuthority', url: 'user/modifyUserAuthority'},

    // 获取密级列表
    {key: 'getSecrecyList', url: 'user/getSecrecyList'},

    // 获取部门列表
    {key: 'getDepartmentList', url: 'department/getDepartmentList'},
    // 操作部门
    {key: 'modifyDepartment', url: 'department/modifyDepartment'},

    // 获取轮播图列表
    {key: 'getSlideList', url: 'config/getSlideList'},
    // 操作轮播图
    {key: 'modifySlide', url: 'other/modifySlide'},

    // 获取共献图谱
    {key: 'getUrlList', url: 'other/getUrlList'},
    // 修改共献图谱
    {key: 'modifyUrl', url: 'other/modifyUrl'},

    // 根据类型显示类目
    {key: 'getCategoryListByType', url: 'department/getCategoryListByType'},
    // 根据类型显示类目
    {key: 'getCategoryList', url: 'config/getCategoryList'},
    // 修改类型
    {key: 'modifyCategory', url: 'config/modifyCategory'},
    // 根据类型，设置页面类目配置
    {key: 'setCategoryListByType', url: 'department/setCategoryListByType'},

    // 获取所有类型
    {key: 'getPageCategoryType', url: 'config/getPageCategoryType'},
    // 获取所有类目列表
    {key: 'getAllCategory', url: 'config/getAllCategory'},
    // 获取某个类型下的类目列表
    {key: 'getPageCategory', url: 'config/getPageCategory'},
    // 修改某个类型的类目列表
    {key: 'modifyPageCategory', url: 'config/modifyPageCategory'},

    // 推荐／取消推荐
    {key: 'recommendDocument', url: 'config/recommendDocument'},
    // 获取文档列表
    {key: 'searchDocument', url: 'config/searchDocument'},
    // 获取文档列表
    {key: 'deleteDocument', url: 'config/deleteDocument'},
    // 获取文档列表
    {key: 'getDocumentById', url: 'config/getDocumentById'},
    // 操作文档
    {key: 'uploadDocument', url: 'config/uploadDocument'},
    // 操作文档
    {key: 'modifyDocument', url: 'document/modifyDocument'}
  ]
}
