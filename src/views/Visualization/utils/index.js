	// 跳转事件
	export const eventLink = (data) => {
    const eventData = data.event
    if(!eventData) {
      return
    }
		if(eventData.type == 3 && eventData.sectionId) {
      const target = document.getElementById("section_" + eventData.sectionId)
      if(target) {
        target.scrollIntoView();
      }
    } else if(eventData.type == 1 && eventData.linkUrl){
      if(eventData.linkUrlType == 1) {
        window.location.href = eventData.linkUrl
      } else {
        window.open(eventData.linkUrl)
      }
    } else {
    }
	}