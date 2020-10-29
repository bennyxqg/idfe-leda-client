import React, { Component } from "react";

import {
    TagsOutlined,
    ContainerOutlined,
    CommentOutlined,
    AudioOutlined,
    PictureOutlined,
    VideoCameraAddOutlined,
    AppstoreAddOutlined,
    UserOutlined
  } from '@ant-design/icons';

export const menus = [{
        name: "网站信息",
        path: "",
        key: '',
        icon: [<TagsOutlined />],
        children: [{
                name: "基本信息",
                path: "/basic",
                icon: "",
            },
            {
                name: "全局配置",
                path: "/home",
                icon: "",
            },
        ],
    },
    {
        name: "新闻管理",
        path: "/new",
        icon: [<ContainerOutlined />],
    },
    {
        name: "评论管理",
        path: "/reply",
        icon: [<CommentOutlined />]
    },
    {
        name: "留言管理",
        path: "/message",
        icon: [<AudioOutlined />]
    },
    {
        name: "轮播图模块",
        path: "/carousel",
        icon: [<PictureOutlined />],
        children: [{
                name: "分组列表",
                path: "/group",
                icon: "",
            },
            {
                name: "轮播图列表",
                path: "/list",
                icon: "",
            },
        ]
    },
    {
        name: "视频模块",
        path: "/video",
        icon: [<VideoCameraAddOutlined />],
        children: [
            {
                name: "视频列表",
                path: "/list",
                icon: "",
            },
        ]
    },
    {
        name: "模板管理",
        path: "/template",
        icon: [<AppstoreAddOutlined />]
    }
];

export const adminMenus = [
    {
        name: "管理员模块",
        path: "/adminConf",
        icon: [<UserOutlined />],
        children: [
            {
                name: "网站管理",
                path: "/site",
                icon: "",
            },
            {
                name: "用户管理",
                path: "/user",
                icon: "",
            },
        ]
    }
]

