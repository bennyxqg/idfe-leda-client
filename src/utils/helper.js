import moment from 'moment'

// 时间戳转时间
export const formatTime = (val, type) => {
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