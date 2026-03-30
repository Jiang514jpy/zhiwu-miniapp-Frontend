植物日记小程序 - 图片资源说明
================================

此文件夹包含小程序所需的图片资源。

现有文件：
---------
- weather-sunny.svg    - 晴天天气图标
- weather-cloudy.svg   - 多云天气图标
- weather-rainy.svg    - 雨天天气图标
- weather-snowy.svg    - 雪天天气图标
- plant-placeholder.svg - 植物占位图
- plants-decoration.svg - 添加日记页面底部装饰图
- tab-home.svg         - 首页图标（未选中）
- tab-home-active.svg  - 首页图标（选中）

需要补充的图片：
---------------
实际使用时，请替换以下图片：

1. 植物图片（用于植物头像和日记图片）
   - 建议放入 /images/plants/ 子文件夹
   - 格式：jpg 或 png
   - 建议尺寸：至少 300x300 像素

2. 如需使用 tabBar，请添加 PNG 格式的图标：
   - tab-home.png (81x81 像素)
   - tab-home-active.png (81x81 像素)
   - tab-message.png
   - tab-message-active.png
   - tab-plant.png
   - tab-plant-active.png
   - tab-profile.png
   - tab-profile-active.png

注意事项：
----------
- 微信小程序不支持直接使用 SVG 作为 tabBar 图标
- 建议使用工具将 SVG 转换为 PNG 后使用
- 图片总大小建议控制在 2MB 以内
