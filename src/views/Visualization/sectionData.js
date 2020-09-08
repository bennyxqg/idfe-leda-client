import { randomCode, addOrEditForListItem } from '@/utils/helper'

export const sectionData = () => {
  return {
    'blankSection': {type: 'blankSection', label: '空白模块', data: {
      text: '空白模块',
      style: {
        width: '',
        height: 500,
        bg: {
          bgType: 1,
          bgColor: '#ffffff',
          bgImg: '',
          bgVideo: ''
        }
      }
    }}, 
    'mainSection': {type: 'mainSection', label: '首屏模块', data: {
      text: '首屏模块',
      btn: { // 操作按钮
        show: true,
        text: '',
        imgUrl: '//dl.gamdream.com//website/image/202009/5f4f8069c244b.png',
        style: {
          width: '',
          height: '',
          top: 0,
          left: 0
        },
        event: { // 交互事件
          type: 1, // 交互类型 1: 外链，2：内页 3：锚点 4：弹窗
          linkUrl: '', // 外链
          sitePageId: '', // 内页
          sectionId: '', // 锚点
          popupId: '', // 弹窗
          linkUrlType: 1 // 1：本窗口打开， 2：新窗口打开
        }
      },
      style: {
        width: '',
        height: 500,
        bg: {
          bgType: 2,
          bgColor: '#ffffff',
          bgImg: '//dl.gamdream.com//website/image/202009/5f4f7f8168692.png',
          bgVideo: ''
        }
      }
    }}, 
    'navSection': {type: 'navSection', label: '导航版块', data: {
      text: '导航版块',
      navList: [
        {
          Uid: randomCode(),
          label: '导航1',
          // linkType: '1', // 1：锚点，2：当前窗口打开，3：新窗口打开
          // url: 'https://www.jianshu.com/p/256b28d7b816',
          // sectionId: null
          event: { // 交互事件
            type: 1, // 交互类型 1: 外链，2：内页 3：锚点 4：弹窗
            linkUrl: '', // 外链
            sitePageId: '', // 内页
            sectionId: '', // 锚点
            popupId: '', // 弹窗
            linkUrlType: 1 // 1：本窗口打开， 2：新窗口打开
          }
        },
        {
          Uid: randomCode(),
          label: '导航2',
          // linkType: '2', // 1：锚点，2：当前窗口打开，3：新窗口打开
          // sectionId: null,
          // url: ''
          event: { // 交互事件
            type: 1, // 交互类型 1: 外链，2：内页 3：锚点 4：弹窗
            linkUrl: '', // 外链
            sitePageId: '', // 内页
            sectionId: '', // 锚点
            popupId: '', // 弹窗
            linkUrlType: 1 // 1：本窗口打开， 2：新窗口打开
          }
        }
      ],
      navImg: 'https://dl.gamdream.com/ids_cloud_platform/image/logo_t.png',
      style: {
        screenType: 1, // 1：普通， 2：宽屏
        width: '',
        height: 60,
        bg: {
          bgType: 1,
          bgColor: '#ffffff',
          bgImg: '//dl.gamdream.com//website/image/202009/5f4f7f8168692.png',
          bgVideo: ''
        },
        fontColor: '#000000', 
        fontSize: 18,
        isBold: false,
        align: 'right' // left, center, right
      }
    }}, 
    'singleImg': {type: 'singleImg', label: '图片版块', data: {
      text: 'test',
      url: 'http://oaa.uu.cc/manage/upload/image/oaa.uu.cc/2019-12-27/20191227_161637_544804.png',
      style: {
        widthType: 1, // 1:默认，2：固定
        width: '0',
        heightType: 1, // 1:自适应，2：固定
        height: '0',
        align: 'center',
        top: '0',
        left: '0'
      }
    }}, 
    'carouselSection': {type: 'carouselSection', label: '轮播图', data: {
      type: 2, // 1： 普通，2：卡片
      imgs: {
        groupId: null,
        list: [
          {
            url: 'http://oaa.uu.cc/manage/upload/image/oaa.uu.cc/2019-12-30/20191230_145747_624977.jpg',
            name: '测试图片',
            jump_url: 'http://www.baidu.com',
            desc: ''
          },
          {
            url: 'http://oaa.uu.cc/manage/upload/image/oaa.uu.cc/2019-12-30/20191230_145819_168342.jpg',
            name: '测试图片2',
            jump_url: 'http://www.baidu.com',
            desc: ''
          },
          {
            url: 'http://oaa.uu.cc/manage/upload/image/oaa.uu.cc/2019-12-30/20191230_145810_837739.jpg',
            name: '测试图片3',
            jump_url: 'http://www.baidu.com',
            desc: ''
          }
        ]
      },
      style: {
        align: 'center',
        paddingTop: '200',
        paddingBottom: '0',
        bg: {
          bgType: 2, // 1：颜色，2：图片 3：视频
          bgColor: '#17181a',
          bgImg: 'http://oaa.uu.cc/manage/upload/image/oaa.uu.cc/2019-12-26/20191226_152739_778898.jpeg',
          bgVideo: ''
        }
      }
    }}, 
    'imgNews': {
      type: 'imgNews', label: '图文信息', data: {
      imgs: {
        groupId: null,
        list: [
          {
            url: 'http://oaa.uu.cc/manage/upload/image/oaa.uu.cc/2019-12-27/20191227_161637_544804.png',
            name: '测试图片',
            jump_url: 'http://www.baidu.com',
            desc: ''
          },
          {
            url: 'http://oaa.uu.cc/manage/upload/image/oaa.uu.cc/2019-12-27/20191227_161637_544804.png',
            name: '测试图片2',
            jump_url: 'http://www.baidu.com',
            desc: ''
          }
        ]
      },
      newsList: {
        groups: [
          {
            title: '最新',
            state: 1,
            list: [
              {
                id: '1102',
                title: '通关干货 奇招获奇效',
                link: 'http://www.baidu.com',
                time: '12-30'
              },
              {
                id: '1132',
                title: '冷兵器时代的产物，《弓箭手大冒险》春节将至？',
                link: 'http://www.baidu.com',
                time: '12-30'
              },{
                id: '588',
                title: '干货在手 通关轻巧',
                link: 'http://www.baidu.com',
                time: '12-30'
              },{
                id: '352',
                title: '一款让你释放日常压力的弓箭游戏',
                link: 'http://www.baidu.com',
                time: '12-30'
              },{
                id: '156',
                title: '黑暗侵袭，《弓箭手大冒险》全军作战！',
                link: 'http://www.baidu.com',
                time: '12-30'
              }
            ]
          },
          {
            title: '新闻',
            state: 1,
            list: [
              {
                id: '156',
                title: '测试2',
                link: 'http://www.baidu.com',
                time: '12-30 '
              }
            ]
          },
          {
            title: '攻略',
            state: 1,
            list: [
              {
                id: '156',
                title: '测试3',
                link: 'http://www.baidu.com',
                time: '12-30 '
              }
            ]
          },
          {
            title: '活动',
            state: 1,
            list: [
              {
                id: '352',
                title: '测试4',
                link: 'http://www.baidu.com',
                time: '12-30 '
              }
            ]
          }
        ]
      },
      style: { // 样式
        bg: { // 背景
          type: 1,
          color: '#ffffff',
          imgSrc: 'http://www.baidu.com',
          videoSrc: 'http://www.baidu2.com'
        },
        news: { // 新闻
          nav: {
            fontColor: '#666', 
            fontSize: 18,
            isBold: false
          },
          list: {
            fontColor: '#666',
            fontSize: 12,
            isBold: false,
            lineHeight: 47,
            letterSpacing: 0
          }
        },
        carousel: {
          nav: {
            type: '1', // 1: 横线，2: 点
            color: '#ffffff',
          },
          autoPlay: true, // 是否自动轮播
          delay: 3000 // 轮播时间间隔
        }
      }
    }}
  }
} 

