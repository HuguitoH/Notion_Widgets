# 📊 Notion Widgets

Custom embeddable widgets that integrate with Notion's API to display real-time progress tracking and activity logs.

## 🎯 Features

- **Real-time data sync** with Notion databases via Notion API
- **LeetCode progress dashboard**: Category focus, problems solved, activity heatmap
- **Responsive design** optimized for embedding in Notion pages
- **Production deployment** on Vercel

## 🛠️ Tech Stack

- **Frontend**: HTML/CSS/JavaScript
- **API Integration**: Notion REST API
- **Database**: Notion Database
- **Hosting**: Vercel

## 🔗 Live Demo

[https://notion-widgets-blue.vercel.app/](https://notion-widgets-blue.vercel.app/)

## 🏗️ Architecture

1. Data stored in Notion database
2. Frontend queries Notion API for real-time updates
3. Widgets render data dynamically
4. Embedded in Notion pages via iframe

## 🔑 Setup

1. Create a Notion integration at https://www.notion.so/my-integrations
2. Copy `.env.example` to `.env`
3. Add your credentials:
```bash
NOTION_TOKEN=your_integration_token
DATABASE_ID_LEETCODE=your_database_id
```
4. Install dependencies:
```bash
npm install
```
5. Deploy to Vercel or run locally

## 💡 Motivation

Built to integrate coding practice tracking directly into my Notion workspace, demonstrating API integration, database querying, and real-time data visualization.

## 📜 License

MIT
