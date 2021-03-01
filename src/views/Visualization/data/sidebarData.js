import {
  bgData
} from './utils'

export const sidebarData = () => {
  return {
    'commonSidebar': {
      type: 'commonSidebar', label: '通用侧边栏', data: {
        style: {
          width: 200,
          height: 472,
          borderRadius: 0,
          ...bgData()
        }
      }
    }
  }
}

