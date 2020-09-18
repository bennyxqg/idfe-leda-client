import moment from 'moment'

// 时间戳转时间
export const formatTime = (val, type) => {
  val += ''
  if (val && val.length === 10) {
    val += '000'
    val = parseInt(val)
  }
  if (!type) type = 'YYYY-MM-DD HH:mm:ss'
  if (!val) return ''
  if (val == 0) return ''
  // 兼容ie
  return moment(val).format(type)
}

// 获取参数
export function getQueryVariable(variable, url = '') {
  if (!url) {
    url = window.location.href.substring(1);
  }
  if (url.split('?').length < 2) {
    return '';
  }

  const query = decodeURIComponent(url.split('?')[1])
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return '';
}

// 获取随机字符串
export const randomCode = (length) => {
  var UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var LOWER = UPPER.toLocaleLowerCase()
  var DIGITS = '0123456789'
  var ALPHA_NUMBER = UPPER + LOWER + DIGITS
  // 字符串转成数组
  var symbols = []
  for (let i = 0; i < ALPHA_NUMBER.length; i++) {
    // symbols[i] = ALPHA_NUMBER.charAt(i)
    symbols.push(ALPHA_NUMBER.charAt(i))
  }
  // 随机拼接字符串
  var stateCode = ''
  for (let i = 0; i < length; i++) {
    stateCode += symbols[Math.floor((Math.random() * symbols.length))]
  }
  return stateCode
}

// 根据key获取列表项
export const getItemByKey = (list, key, value) => {
  let result = null
  list.some((item) => {
    if (item[key] == value) {
      result = item
      return true
    }
    return false
  })
  return result
}

// 根据key获取列表下标
export const getItemIndexByKey = (list, key, value) => {
  let result = -1
  list.some((item, index) => {
    if (item[key] == value) {
      result = index
      return true
    }
    return false
  })
  return result
}

/**
* 数组元素交换位置
* @param {array} arr 数组
* @param {number} index1 添加项目的位置
* @param {number} index2 删除项目的位置
* index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值，如1，5就是数组中下标为1和5的两个元素交换位置
*/
export const swapArray = (arr, index1, index2) => {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
   return arr;
}

// 列表数据新增数据或替换成编辑后的数据
export const addOrEditForListItem = (list, item, key) => {
  if(item[key]) {
    const index = getItemIndexByKey(list, key, item[key])
    item = Object.assign(list[index], item)
    list.splice(index, 1)
    list.splice(index, 0, item)
  } else {
    item.Uid = randomCode(10)
    list.push(item)
  }
  return list
}

	// 处理背景样式
export const handleBgStyle = (bgData) => {
  const style = {}
  if(!bgData) return style
  if(bgData.bgType === 1 && bgData.bgColor) {
    style.backgroundColor = bgData.bgColor
  } else if(bgData.bgType === 2 && bgData.bgImg){
    style.backgroundImage = `url(${bgData.bgImg})`;
    style.backgroundRepeat = 'no-repeat';
    style.backgroundPosition = 'center';
  } else if(bgData.bgType === 3 && bgData.bgVideo){
    style.backgroundImage = `url('${bgData.bgVideo}')`;
    style.backgroundRepeat = 'no-repeat';
    style.backgroundPosition = 'center';
  }
  console.log('-----handleBgStyle-----', style)
  return style
}

  // form promise函数
  export const formPromise = (targetRef) => {
    return new Promise((resolve, reject) => {
      if(!targetRef.validateFields) {
        reject()
        return
      }
      targetRef.validateFields().then((value) => {
        resolve(value)
      }).catch(() => {
        reject()
      })
    })
  }