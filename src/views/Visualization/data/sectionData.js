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
import demoCarouselCommon from '@/assets/images/visualization/demo-carousel-common.png'
import demoImgNewsCommon from '@/assets/images/visualization/demo-imgNews-common.png'
import demoBlank from '@/assets/images/visualization/demo-blank.png'
import demoNewsDetailCommon from '@/assets/images/visualization/demo-newsDetail-common.png'

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
            ...eventData()
          },
          {
            Uid: randomCode(),
            label: '联系我们',
            ...eventData()
          }
        ],
        navImg: 'http://dl.gamdream.com//website/image/202009/5f6ac25fdf668.png',
        style: {
          screenType: 1, // 1：普通， 2：宽屏
          navType: 'default', // default：固定 fixed：滚动时固定
          width: '',
          height: 64,
          selectLine: { // 选中横线
            show: true,
            color: '#3233FF',
            height: 5
          },
          selectFont: { // 选中的文字颜色
            color: '#000000'
          },
          menuMargin: { // 菜单边距
            left: 0,
            right: 0
          },
          ...bgData(),
          fontColor: '#333333',
          fontSize: 15,
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
          img: demoCarouselCommon,
          data: {
            style: {
              type: 1
            }
          },
          // 移动端配置数据
          wapData: {
            data: {
              style: {
                type: 1,
                img: {
                  width: 375,
                  height: ''
                }
              }
            }
          }
        },
        {
          img: demoCarouselCard,
          data: {
            style: {
              paddingTop: 20,
              paddingBottom: 30,
              img: {
                width: 657,
                height: 370,
              }
            }
          },
          // 移动端配置数据
          wapData: {
            data: {
              style: {
                img: {
                  width: 220,
                  height: ''
                },
                swiper: {
                  navBtn: { // 前后按钮
                    show: false
                  }
                }
              }
            }
          }
        },
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
          type: 2, // 1： 普通，2：卡片
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
    },
    'newsDetailSection': {
      type: 'newsDetailSection',
      label: '新闻详情',
      examples: [
        {
          img: demoNewsDetailCommon
        }
      ],
      data: {
        name: '',
        newsId: '', // 固定id
        bindPathParam: true, // 是否使用地址栏中的参数
        pathParam: 'newsId', // 绑定地址栏中的参数
        style: {
          width: '',
          height: '',
          ...bgData()
        }
      }
    },
  }
}