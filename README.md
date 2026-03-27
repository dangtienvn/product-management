## Product Managemnent
A fullstack e-commerce application that allows users to browse products, manage carts, and securely checkout using JWT authentication.

## Demo 

## 📸 Screenshots

### Home Page

(Add screenshot here)

### Dashboard

(Add screenshot here)

---

## 🔥 Key Features

🔐 Authentication & Authorization
    Login / Sign in
    JWT / session
    Refresh token
    Forgot password (email / OTP)
    Phân quyền (RBAC):
    Admin
    User

👤 User Management
    CRUD user (admin)
    Update profile (user)
    Change avatar
    Upload avatar

⚙️ Settings System
    Setting system (admin)
    Config chung (logo, title, email, …)

📦 Product Management
    CRUD product
    Upload image
    price
    State (active / hidden)
    category
    Search / filter / sort / pagination

🗂 Category Management
    CRUD category
    Danh mục cha - con (tree)
    Slug SEO

🛡 Role & Permission Management
    Tạo role (admin, staff…)
    Gán quyền:
    CRUD product
    CRUD user
    Middleware check permission

👨‍💼 Admin Account Management
    CRUD admin
    Gán role
    Lock / unlock account

👥 User Account Management
    Xem danh sách user
    Khoá / mở user
    Reset mật khẩu
📝 Blog / Article Management
    CRUD bài viết
    Rich text editor
    Ảnh đại diện
    Tag / category bài viết
    Publish / draft

⚙️ Personal Profile (Admin)
    Update info
    Đổi mật khẩu

⚙️ General Settings
    Cấu hình website:
    Logo
    Banner
    Email
    Footer

🏠 Homepage
    Banner
    Sản phẩm nổi bật
    Danh mục
📂 Product Listing
    Theo danh mục
    Filter:
    Giá
    Danh mục
    Sort:
    Giá
    Mới nhất
    Pagination

🔍 Search System
    Search theo tên
    Suggest keyword
    Highlight kết quả

📄 Product Detail
    Thông tin sản phẩm
    Gallery ảnh
    Giá
    Add to cart
🛒 Cart System
    Thêm / xoá sản phẩm
    Update số lượng
    Lưu session / database
💳 Checkout System
    Nhập thông tin
    Đặt hàng
    (Optional) thanh toán online

🔐 Auth (Client)
    Đăng ký
    Đăng nhập
    Quên mật khẩu
👤 User Profile
    Xem / sửa thông tin
    Xem lịch sử đơn hàng
    📰 Blog (Client)
    List bài viết
    Chi tiết bài viết
---

## 🧠 What I Learned?

* Designed scalable project structure (MVC / Modular architecture)
* Implemented authentication & token refresh strategy
* Built reusable API service with axios interceptors
* Handled global error handling and validation
* Optimized performance and API calls

---

## 🏗️ Application Architecture

Describe how your system is structured.

* Client – Server architecture
* RESTful API design
* MVC / Layered architecture
* (Optional) Add diagram here

---

## ⚙️ Technology Stack

### Frontend

*  HTML 
*  CSS 
*  JS
*  Bootstrap

### Backend

* Express

### Database

* MongoDB 

### Other Tools

* npm / pug / nodemon / mongoose /.env

---

## 📁 Project Structure

```bash
product-management/
│── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   └── config/
│
│── client/
│── public/
│── .env
│── package.json
```

---

## 🔐 Authentication & Security

### Authentication Flow

* User login → server returns access token & refresh token
* Access token used for API requests

### Token Refresh Strategy

* Automatically refresh token when expired
* Prevent user from being logged out unexpectedly

### Protected Routes

* Middleware checks authentication before accessing resources

---

## 🔄 API Communication Strategy

* Centralized API service (Axios / Fetch)
* Interceptors for:

  * Attach token
  * Handle errors globally
* Clean separation between API and UI

---

## 🌍 Environment Configuration

Create a `.env` file:

PORT=3000


---

## 🖥️ Running Locally

```bash
# Install dependencies
npm install

# Run server
npm run dev
```

---

## 🔗 Integration with Backend API

Describe how frontend communicates with backend:

* REST API endpoints
* Authentication headers
* Data flow

---


## 🚀 Future Improvements

* Add real-time features (WebSocket)
* Improve UI/UX
* Add unit & integration tests
* Deploy to cloud (AWS / Vercel)

---

## 👤 Author

* [Name]: Đặng Tiến
* [GitHub]: https://github.com/dangtienvn
* [Email]: td2812009@gmail.com
