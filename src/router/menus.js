export const menus = [
  {name: '网站信息', path: '/home'},
  {
    name: '新闻管理', 
    path: '/new',
    child: [
			{
				path: '/detail',
				name: '新闻'
			}
		]
  },
  {name: '评论管理', path: '/reply'},
  {name: '留言管理', path: '/message'}
]