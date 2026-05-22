# 🎮 Mini Game Arcade

轻量前端小游戏站 —— 零构建、纯 HTML/CSS/JS，适合 GitHub Pages 部署。

## 🌐 在线预览

> https://yuwl.github.io/Mini-Game-Arcade/

## 🎯 特性

- **零构建**：无需 Node.js / Webpack，`git push` 即部署
- **可扩展**：新增游戏只需 2 步
- **响应式**：手机 / 平板 / 桌面自适应
- **深色模式**：一键切换，偏好持久化
- **搜索 + 标签筛选**：快速找到想玩的游戏

## 📁 项目结构

```
├── index.html          ← 游戏大厅
├── style.css           ← 全局样式
├── app.js              ← 大厅逻辑
├── games/
│   ├── registry.json   ← 游戏注册表
│   ├── snake/          ← 贪吃蛇
│   └── 2048/           ← 2048
└── README.md
```

## ➕ 如何添加新游戏

### 第 1 步：创建游戏目录

```bash
mkdir games/your-game
# 在里面创建 index.html（完整独立的游戏页面）
```

### 第 2 步：注册到 registry.json

在 `games/registry.json` 中追加一条：

```json
{
  "id": "your-game",
  "name": "游戏名称",
  "description": "一句话描述",
  "path": "games/your-game/index.html",
  "thumb": "",
  "tags": ["标签1", "标签2"],
  "color": "#FF5722",
  "added": "2026-01-01"
}
```

然后 `git push`，完成！

## 🛠️ 技术栈

- HTML5 / CSS3 / Vanilla JavaScript
- CSS Grid + CSS Variables
- Canvas API（游戏渲染）
- LocalStorage（分数持久化）
- GitHub Pages（部署）

## 📄 License

MIT
