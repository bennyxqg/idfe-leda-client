import {
  randomCode,
} from '@/utils/helper'
import {
  bgData,
  swiperData,
  eventData
} from './utils'
import demoNav from '@/assets/images/visualization/demo-nav.png'
import demoCarouselCard from '@/assets/images/visualization/demo-carousel-card.png'
import demoImgNewsCommon from '@/assets/images/visualization/demo-imgNews-common.png'
import demoBlank from '@/assets/images/visualization/demo-blank.png'

export const sectionData = () => {
  return {
    'blankSection': {
      type: 'blankSection',
      label: '空白板块',
      examples: [
        {
          img: demoBlank
        }
      ],
      data: {
        name: '',
        style: {
          width: '',
          height: 500,
          ...bgData()
        }
      }
    },
    // 'mainSection': {type: 'mainSection', label: '首屏模块', data: {
    //   text: '首屏模块',
    //   style: {
    //     width: '',
    //     height: 500,
    //     bg: {
    //       bgType: 2,
    //       bgColor: '#ffffff',
    //       bgImg: '//dl.gamdream.com//website/image/202009/5f4f7f8168692.png',
    //       bgVideo: ''
    //     }
    //   }
    // }}, 
    'navSection': {
      type: 'navSection',
      label: '导航菜单',
      name: '',
      examples: [
        {
          img: demoNav
        }
      ],
      data: {
        name: '',
        navList: [{
            Uid: randomCode(),
            label: '首页',
            // linkType: '1', // 1：锚点，2：当前窗口打开，3：新窗口打开
            // url: 'https://www.jianshu.com/p/256b28d7b816',
            // sectionId: null
            event: { // 交互事件
              type: 1, // 交互类型 1: 外链，2：内页 3：锚点 4：弹窗
              linkUrl: '', // 外链
              sitePage: null, // 内页
              sectionId: '', // 锚点
              popupId: '', // 弹窗
              linkUrlType: 1 // 1：本窗口打开， 2：新窗口打开
            }
          },
          {
            Uid: randomCode(),
            label: '联系我们',
            // linkType: '2', // 1：锚点，2：当前窗口打开，3：新窗口打开
            // sectionId: null,
            // url: ''
            event: { // 交互事件
              type: 1, // 交互类型 1: 外链，2：内页 3：锚点 4：弹窗
              linkUrl: '', // 外链
              sitePage: null, // 内页
              sectionId: '', // 锚点
              popupId: '', // 弹窗
              linkUrlType: 1 // 1：本窗口打开， 2：新窗口打开
            }
          }
        ],
        navImg: 'http://dl.gamdream.com//website/image/202009/5f61a50a0e834.png',
        style: {
          screenType: 1, // 1：普通， 2：宽屏
          navType: 'default', // default：固定 fixed：滚动时固定
          width: '',
          height: 60,
          selectLine: { // 选中横线
            show: true,
            color: '#2469f2',
            height: 2
          },
          selectFont: { // 选中的文字颜色
            color: '#000000'
          },
          menuMargin: { // 菜单边距
            left: 0,
            right: 0
          },
          ...bgData(),
          fontColor: '#000000',
          fontSize: 18,
          isBold: false,
          align: 'left' // left, center, right
        }
      }
    },
    // 'singleImg': {
    //   type: 'singleImg',
    //   label: '图片模块',
    //   name: '',
    //   data: {
    //     name: '',
    //     url: 'http://oaa.uu.cc/manage/upload/image/oaa.uu.cc/2019-12-27/20191227_161637_544804.png',
    //     style: {
    //       widthType: 1, // 1:默认，2：固定
    //       width: '0',
    //       heightType: 1, // 1:自适应，2：固定
    //       height: '0',
    //       align: 'center',
    //       top: '0',
    //       left: '0'
    //     }
    //   }
    // },
    'carouselSection': {
      type: 'carouselSection',
      label: '轮播图',
      name: '',
      examples: [
        {
          img: demoCarouselCard
        }
      ],
      data: {
        name: '',
        imgs: {
          groupId: null,
          list: [{
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
          type: 1, // 1： 普通，2：卡片
          width: '',
          height: '',
          align: 'center',
          paddingTop: '0',
          paddingBottom: '0',
          img: {
            width: '',
            height: '',
          },
          ...bgData(),
          ...swiperData()
        }
      }
    },
    'imgNews': {
      type: 'imgNews',
      label: '图文信息',
      examples: [
        {
          img: demoImgNewsCommon
        }
      ],
      data: {
        name: '',
        imgs: {
          groupId: null,
          list: [{
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
          groups: [{
              title: '最新',
              state: 1,
              list: [{
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
                }, {
                  id: '588',
                  title: '干货在手 通关轻巧',
                  link: 'http://www.baidu.com',
                  time: '12-30'
                }, {
                  id: '352',
                  title: '一款让你释放日常压力的弓箭游戏',
                  link: 'http://www.baidu.com',
                  time: '12-30'
                }, {
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
              list: [{
                id: '156',
                title: '测试2',
                link: 'http://www.baidu.com',
                time: '12-30 '
              }]
            },
            {
              title: '攻略',
              state: 1,
              list: [{
                id: '156',
                title: '测试3',
                link: 'http://www.baidu.com',
                time: '12-30 '
              }]
            },
            {
              title: '活动',
              state: 1,
              list: [{
                id: '352',
                title: '测试4',
                link: 'http://www.baidu.com',
                time: '12-30 '
              }]
            }
          ]
        },
        style: { // 样式
          base: { // 基础信息
            ...bgData(),
            paddingTop: 0,
            paddingBottom: 0,
            height: ''
          },
          news: { // 新闻
            ...bgData(),
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
          ...swiperData()
        }
      }
    }
  }
}