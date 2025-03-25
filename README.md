# Bilibili 标签过滤器

## 简介

Bilibili 标签过滤器是一个 Chrome 浏览器扩展，用于自动过滤不符合您兴趣的 B站视频。当您访问不包含您指定关键词标签的视频时，扩展会自动弹出提示并关闭该页面，帮助您节省时间，只专注于自己感兴趣的内容。

## 功能特点

- 自定义感兴趣的标签关键词
- 自动检测 Bilibili 视频页面的标签
- 当视频标签不符合期望时自动提示并关闭页面
- 简洁易用的设置界面

## 安装方法

### 从源码安装（开发者模式）

1. 下载或克隆本仓库到本地
2. 打开 Chrome 浏览器，在地址栏输入 `chrome://extensions/`
3. 在右上角打开「开发者模式」
4. 点击「加载已解压的扩展程序」
5. 选择本扩展的文件夹 `d:\WorkSpace\chrome_plugins`
6. 安装完成后，扩展图标将出现在浏览器工具栏中

## 使用方法

1. 点击浏览器工具栏上的扩展图标打开设置面板
2. 在文本框中输入您感兴趣的标签关键词，用英文逗号分隔（例如：编程,技术,教程）
3. 点击「保存」按钮保存设置
4. 现在当您浏览 Bilibili 视频时，如果视频标签中不包含您设置的任何关键词，将会弹出提示并自动关闭页面

## 文件结构

- `manifest.json` - 扩展的配置文件
- `background.js` - 扩展的后台脚本，处理标签页监听和消息传递
- `content.js` - 内容脚本，在 Bilibili 视频页面上运行，检查视频标签
- `popup.html` - 扩展的弹出界面
- `popup.js` - 处理弹出界面的交互逻辑
- `styles.css` - 样式文件
- `images/` - 存放扩展图标的文件夹

## 调试指南

1. 在扩展管理页面找到扩展卡片，点击「背景页」或「service worker」链接，打开调试窗口
2. 访问 Bilibili 视频页面，右键点击并选择「检查」或按 F12 打开开发者工具
3. 在「Console」标签页查看日志输出
4. 在「Sources」标签页的左侧文件导航面板中找到「Content scripts > Extension: [扩展ID] > content.js」可以设置断点进行调试

## 故障排除

1. **扩展不生效**：确保您已经设置了标签关键词并保存
2. **没有检测到标签**：B站页面结构可能已更新，查看控制台日志中的警告信息
3. **扩展无法加载**：检查manifest.json文件格式是否正确

## 注意事项

- 本扩展仅适用于 Bilibili 视频页面
- 标签匹配为不区分大小写的包含匹配
- 为了获得最佳体验，建议使用具体明确的关键词

## 隐私声明

本扩展不会收集或上传您的任何个人数据。所有您设置的标签关键词仅保存在浏览器本地存储中。

## 许可

MIT
