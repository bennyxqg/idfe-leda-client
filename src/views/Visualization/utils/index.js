// 跳转事件
export const eventLink = (data) => {
  const eventData = data.event
  if (!eventData) {
    return
  }
  if (eventData.type == 3 && eventData.sectionId) {
    const target = document.getElementById("section_" + eventData.sectionId)
    if (target) {
      target.scrollIntoView();
    }
  } else if (eventData.type == 1 && eventData.linkUrl) {
    if (eventData.linkUrlType == 1) {
      window.location.href = eventData.linkUrl
    } else {
      window.open(eventData.linkUrl)
    }
  } else {
  }
}

export function getUnit(value) {
  if (/px$/.test(value)) {
    return 'px';
  }

  if (/%$/.test(value)) {
    return '%';
  }

  return 'px';
}

export function toValue(value) {
  value = parseFloat(value);
  return isNaN(value) ? 0 : value;
}

// 处理宽度数据
export const handleWidth = (width) => {
  return toValue(width) + getUnit(width)
}

// 复制内容
export const copyText = (text) => {
  let oInput = document.createElement('input')
  oInput.value = text
  document.body.appendChild(oInput)
  oInput.select()
  document.execCommand("Copy")
  oInput.style.display = 'none'
  document.body.removeChild(oInput)
}