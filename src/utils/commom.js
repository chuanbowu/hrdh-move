export function isPC () {
  let userAgentInfo = navigator.userAgent
  let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  let flag = true
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

export function checkPhone (rule, value, callback) { // 验证Phone
  if (!/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/.test(value)) callback(new Error('请输入正确的手机号'))
}

export function checkMobile (rule, value, callback) { // 验证Mobile
  if (!/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/.test(value)) callback(new Error('请输入正确的电话号码'))
}

export function checkQQ (rule, value, callback) { // 验证QQ
  if (!/^((\d{1,3}(,\d{3})*)|(\d+))(\.\d{2})?$/.test(value)) callback(new Error('请输入正确的QQ号码'))
}

export function checkIP (rule, value, callback) { // 验证IP
  if (!/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/.test(value)) callback(new Error('请输入正确的IP'))
}

export function checkEMAIL (rule, value, callback) { // 验证EMAIL
  if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) callback(new Error('请输入正确的EMAIL'))
}

export function checkPic (rule, value, callback) { // 验证金额
  if (!/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/.test(value)) callback(new Error('请输入正确的金额'))
}

export function checkNumber (rule, value, callback) { // 验证整数
  if (!/^-?\d+$ /.test(value)) callback(new Error('请输入正数'))
}

export function checkInt (rule, value, callback) { // 验证正整数（>0的整数）
  if (!/^[1-9]*[1-9][0-9]*$/.test(value)) callback(new Error('请输入正整数'))
}

export function checkInt2 (rule, value, callback) { // 验证正整数（>=0的整数）
  if (!/^[1-9]*[0-9][0-9]*$/.test(value)) callback(new Error('请输入正整数'))
}

export function checkDefeatInt (rule, value, callback) { // 验证负整数（<0的整数）
  if (!/^-[1-9]*[1-9][0-9]*$/.test(value)) callback(new Error('请输入负整数'))
}

export function checkDefeatInt2 (rule, value, callback) { // 验证负整数（<=0的整数）
  if (!/^-[1-9]*[0-9][0-9]*$/.test(value)) callback(new Error('请输入负整数'))
}

export function checkSmallNumber (rule, value, callback) { // 验证非负小数
  if (!/^(([0-9]+|0)\.([0-9]{1,}))$/.test(value)) callback(new Error('请输入非负小数'))
}

export function checkOneAsTwoSmallNumber (rule, value, callback) { // 验证1~2位非负小数
  if (!/^(([0-9]+|0)\.([0-9]{1,2}))$/.test(value)) callback(new Error('请输入非负小数，且最多两位小数'))
}

export function checkOneSmallNumber (rule, value, callback) { // 验证1位小数
  if (!/^(([^0][0-9]+|0)\.([0-9]{1}))$/.test(value)) callback(new Error('请输入1位小数'))
}

export function checkTwoSmallNumber (rule, value, callback) { // 验证2位小数
  if (!/^(([0-9]+|0)\.([0-9]{2}))$/.test(value)) callback(new Error('请输入2位小数'))
}

export function checkFourSmallNumber (rule, value, callback) { // 验证4位小数
  if (!/^(([^0][0-9]+|0)\.([0-9]{4}))$/.test(value)) callback(new Error('请输入4位小数'))
}

export function checkOneFlaseSmallNumber (rule, value, callback) { // 验证1位非负小数
  if (!/^(([0-9]+|0)\.([0-9]{1}))$/.test(value)) callback(new Error('请输入1位非负小数'))
}

export function checkTwoFlaseSmallNumber (rule, value, callback) { // 验证2位非负小数
  if (!/^(([0-9]+|0)\.([0-9]{2}))$/.test(value)) callback(new Error('请输入2位非负小数'))
}

export function checkFourFlaseSmallNumber (rule, value, callback) { // 验证4位非负小数
  if (!/^(([0-9]+|0)\.([0-9]{4}))$/.test(value)) callback(new Error('请输入4位非负小数'))
}

export const baseUrl = 'https://www.chuanbowu.com/'
