
export default {
  /**
   * 表单验证
   * @param {*} v 验证值
   * @param { 正则表达式 } r 正则
   * @param { function } f1 这则验证回调
   * @param { function } f2 空值验证回调，不填则为非必填校验
   */
  testReg (v, r, f1, f2) {
    if (f2 && !v) { f2(); return true }
    if (!r.test(v)) { f1(); return true }
    return false
  }
}
