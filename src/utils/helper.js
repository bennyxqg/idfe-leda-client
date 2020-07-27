import moment from 'moment'

// 时间戳转时间
export const formatTime = (val, type) => {
  val += ''
  if(val && val.length === 10) {
    val += '000'
    val = parseInt(val)
  }
  if (!type) type = 'YYYY-MM-DD HH:mm:ss'
  if (!val) return ''
  if(val == 0)  return ''
  // 兼容ie
  return moment(val).format(type)
}

// 获取参数
export function getQueryVariable(variable, url = '')
{
  if(!url) {
    url = window.location.href.substring(1);
  }
		if(url.split('?').length < 2) {
			return '';
		}
		
			 const query = decodeURIComponent(url.split('?')[1])
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
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