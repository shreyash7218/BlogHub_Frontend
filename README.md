# 🌐 BlogHub Frontend

Frontend client for the **BlogHub** platform — a full-stack blogging application built with React.js.

## 🚀 Features

- 🔐 User authentication (register, login, logout)
- 📝 Blog post management (create, read, update, delete)
- ✍️ Rich text editing with CKEditor 5
- 🔎 Search functionality
- 🗂️ Category filtering
- 📱 Responsive design for mobile and desktop

## 🛠️ Technologies Used

- ⚛️ React.js
- 🧭 React Router for navigation
- 🔗 Axios for API requests
- ✒️ CKEditor 5 for rich text editing
- 🎨 Tailwind CSS for styling
- 💠 React Icons

## ⚙️ Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   Make sure the backend server is running on `http://localhost:5000`

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── blog/          # Blog-specific components
│   └── common/        # General components like Navbar
├── contexts/          # React Context API providers
├── pages/             # Page components
├── services/          # API service functions
├── utils/             # Date Format function
├── App.jsx            # Main application component
└── main.jsx           # Application entry point
```

## 🧩 Component Overview

### 📄 Pages

- **HomePage** – Displays all blog posts with filtering options
- **BlogPost** – Shows a single blog post with full content
- **Dashboard** – User dashboard to manage their posts
- **CreatePost / EditPost** – Forms for creating and editing posts
- **Login / Register** – Authentication pages

### 🧱 Components

- **BlogCard** – Displays a preview of a blog post
- **BlogEditor** – Rich text editor for creating/editing posts
- **Navbar** – Navigation menu
- **Footer** – Site footer
- **CategoryFilter** – Filter posts by category

## 🎥 Demo Video

Watch a walkthrough of the BlogHub frontend in action:  
👉 [Demo](https://drive.google.com/file/d/1uqzKmYOXtvmi2n7_jbkwpuTcZN0oS6Zp/view?usp=sharing)
👉 [Demo YouTube](https://youtu.be/4b6ShuIvaaQ?feature=shared)

## 🤖 How I Used AI to Build This

I used AI tools like ChatGPT to help with:

- 🧠 Setting up the project structure and organization
- 🧩 Generating Mind Maps for component design
- 🎨 Styling suggestions using Tailwind CSS
- 🐞 Debugging issues and suggesting optimizations
- 📚 Implementing best practices for React development

The AI helped save time on boilerplate code and styling, allowing me to focus on creating a great user experience and implementing the core functionality.