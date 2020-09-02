import { newsPage, newsCateList, newsAll } from '@/http/hnews'
import { groupPage, picPage } from '@/http/hcarousel'

// 获取全部新闻
export const getAllNews = () => {
  const sendData = {
    page: 1
  }
  return newsPage().then((rep) => {
    if(rep.error_code === 0) {
      if(rep.data && rep.data.list) {
        rep.data.list.forEach((item) => {
          item.time = item.time || '12-30'
        })
        return rep.data.list || []
      }
    }
    return []
  })
}

// 获取分组的新闻数据
export const getAllNewsByGroup = (newsList) => {
  return newsCateList().then(async (rep) => {
    if(rep.error_code === 0) {
      let cateList = []
      Object.keys(rep.data).forEach((key) => {
        cateList.push({
          id: key,
          name: rep.data[key]
        })
      })
      if(!newsList) {
        newsList = await getAllNews()
      }
      console.log('------newsList-------', newsList)
      // news_categories_id
      cateList.forEach((cate) => {
        cate.list = []
        newsList.forEach((news) => {
          if(news.news_categories_id == cate.id) {
            cate.list.push(news)
          }
        })
      })
      return cateList
    }
    return []
  })
}

// 获取全部轮播图
export const getAllCarousel = () => {
  const sendData = {
    page: 1
  }
  return picPage(sendData).then((rep) => {
    console.log('----picPage-----', rep.data)
    if(rep.error_code === 0) {
      if(rep.data && rep.data.list && rep.data.list.length) {
        rep.data.list.forEach((item) => {
          item.groups = item.group_id.split(',')
        })
        return rep.data.list
      }
    }
    return []
  })
}


// 获取全部轮播图分组
export const getCarouselGroups = () => {
  const sendData = {
    page: 1
  }
  return groupPage(sendData).then((rep) => {
    if(rep.error_code === 0) {
      if(rep.data  && rep.data.length) {
        return rep.data
      }
      return []
    }
  })
}

// 获取分组的轮播图
export const getAllCarouselByGroup = async () => {
   const groups = await getCarouselGroups()
   const carousel = await getAllCarousel()
   groups.forEach((g) => {
    g.list = []
    carousel.forEach((c) => {
      if(c.groups.indexOf(g.id) !== -1) {
        g.list.push(c)
      }
    })
   })
   return groups
}