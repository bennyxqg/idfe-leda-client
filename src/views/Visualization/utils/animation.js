import { debounce } from "lodash";
import { animationElementList } from "@/views/Visualization/utils/cacheData";
let $ = window.jQuery = window.$ = require("jquery");

require("velocity-animate/velocity.js");
require("velocity-animate/velocity.ui.js"); // velocity.ui 在 velocity 之后加载

// const handleAnimate = () => {
//   // [].forEach.call(document.querySelectorAll(".el-wrapper"), (item) => {
//   //   // Velocity(item, {
//   //   //   top: 50,
//   //   //   opacity: 0.5
//   //   // }, {
//   //   //     duration: 1000,
//   //   //     easing: "swing",
//   //   // });
//   //   Velocity(item, {
//   //     top: 50,
//   //     opacity: 0.5
//   //   }, {
//   //       duration: 1000,
//   //       easing: "swing",
//   //   });
//   // })
//   // console.log('----el-wrapper---------', $('.el-wrapper').velocity)
  
//   // $('.el-wrapper').velocity("fadeOut", { duration: 1500 })
//   // .velocity("fadeIn", { delay: 500, duration: 1500 });
//   $('.el-wrapper-' + data.elementId).hide()
//   .velocity('transition.slideRightBigIn', {})
//   // .velocity("transition.bounceUpIn", {  });
  
// }

export const initAnimate = debounce(() => {
  $('.el-wrapper-animate').each(function() {
    const id = $(this).data('id')
    let isStartAnimation = true
    if(animationElementList.indexOf(id) !== -1) {
      isStartAnimation = false
    }
    let animationJson = $(this).data('animation-json')
    if(!animationJson) {
      isStartAnimation = false
    }
    let animationData = animationJson
    // try {
    //   animationData = JSON.parse(animationJson)
    // } catch(err) {
    //   console.error(err)
    // }
    if(!animationData.type) {
      isStartAnimation = false
    }
    if(animationData.type === 'none') {
      isStartAnimation = false
    }
    if(!isStartAnimation) {
      $(this).css('visibility', 'inherit')
      if(animationElementList.indexOf(id) === -1) {
        animationElementList.push(id)
      }
      return true
    }
    let velocityAnimation = 'transition.slideRightBigIn'
    let options = {
      // loop: true,
    }
    // {"type":"shake","duration":1,"delay":"2"}
    if(animationData.duration) {
      options.duration = animationData.duration * 1000
    }
    if(animationData.delay) {
      options.delay = animationData.delay * 1000
    }
    // if(animationData.loop) {
    //   options.loop = true
    // }
    if(animationData.type === 'shake') {
      velocityAnimation = 'callout.shake'
    }
    if(animationData.type === 'bounce') {
      velocityAnimation = 'callout.bounce'
    }
    if(animationData.type === 'swing') {
      velocityAnimation = 'callout.swing'
    }
    if(animationData.type === 'flash') {
      velocityAnimation = 'callout.flash'
    }
    if(animationData.type === 'scale') {
      velocityAnimation = {
        scale: '1',
        opacity: 1
      }
    }
    if(animationData.type === 'rotate') {
      velocityAnimation = {
        rotateZ: "360deg"
      }
      options.easing = 'linear'
    }
    if(animationData.type === 'slide') {
      if(animationData.direction === 'top') {
        velocityAnimation = 'transition.slideDownBigIn'
      } else if(animationData.direction === 'bottom') {
        velocityAnimation = 'transition.slideUpBigIn'
      } else if(animationData.direction === 'left') {
        velocityAnimation = 'transition.slideLeftBigIn'
      } else if(animationData.direction === 'right') {
        velocityAnimation = 'transition.slideRightBigIn'
      }
    }
    if(animationData.type === 'fadeIn') {
      velocityAnimation = 'fadeIn'
    }
    
    if(($(window).scrollTop() + $(window).height())>$(this).offset().top) {
      animationElementList.push(id)
      // $(this).hide()
      $(this).css('visibility', 'inherit')
      // 设置初始状态
      if(animationData.type === 'scale') {
        $(this).velocity({
          scale: 0.01,
          opacity: 0
        }, {
          duration: 0
        })
      } else if(animationData.type === 'slide' || 
      animationData.type === 'fadeIn') {
        $(this).velocity({
          opacity: 0
        }, {
          duration: 0
        })
      }
      $(this).velocity(velocityAnimation, options)
      
    }
  })
}, 100)

export const handleAnimate = () => {
  setTimeout(() => {
    // $('.el-wrapper-animate').css('visibility', 'inherit')
    // return
    initAnimate()
    $(window).on('scroll', () => {
      initAnimate()
    })
  }, 0)
}

