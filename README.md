# React Google Integration

🚀 Ứng dụng React tích hợp Google Sheets, Google Drive với hệ thống cảnh báo và báo cáo tự động.

## 🌐 Live Demo

- **Frontend**: <https://leafy-baklava-595711.netlify.app/>
- **Backend API**: <https://react-google-backend.onrender.com>
- **GitHub Repository**: <https://github.com/caovinhphuc/react-google-integration>

> ✨ **Hoàn toàn functional với real Google APIs!** Không phải demo data.

## ✨ Tính năng

- 📊 **Google Sheets Integration**: Đọc/ghi dữ liệu, tạo sheet mới
- 💾 **Google Drive Integration**: Upload file, tạo thư mục, chia sẻ file
- 🚨 **Alert System**: Cảnh báo qua Email và Telegram
- 📈 **Report Dashboard**: Báo cáo với biểu đồ và thống kê
- ⏰ **Scheduler**: Báo cáo tự động theo lịch
- 🔔 **Threshold Alerts**: Cảnh báo khi vượt ngưỡng

## 🏗️ Cấu trúc dự án

```
react-google-integration/
Frontend

├── src/                    # Frontend React application
│   ├── components/         # React components
│   │   ├── GoogleSheetsTest.js
│   │   ├── GoogleDriveTest.js
│   │   ├── AlertTest.js
│   │   └── ReportDashboard.js
│   ├── services/          # API services
│   │   ├── googleSheetsService.js
│   │   ├── googleDriveService.js
│   │   ├── alertService.js
│   │   └── reportService.js
│   ├── config/            # Configuration
│   │   └── googleConfig.js
│   ├── App.js             # Main app component
│   └── index.js           # Entry point
├── docs/                  # Documentation
│   ├── setup/             # Setup guides
│   ├── guides/            # Usage guides
│   ├── project/           # Project info
│   └── README.md          # Documentation index
├── public/                # Static assets
├── build/                 # Production build (generated)
├── server.js              # Backend Express server
├── deploy.sh              # 🚀 Quick deployment script
├── package.json           # Dependencies & scripts
├── .env.example           # Environment template
└── README.md              # Main documentation
```

## 🚀 Hướng dẫn cài đặt

> 📚 **Hướng dẫn chi tiết**: Xem [`docs/setup/QUICK_SETUP.md`](docs/setup/QUICK_SETUP.md)

### 1. Chuẩn bị Google Service Account

#### Bước 1: Tạo Google Cloud Project

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project hiện có
3. Enable các APIs sau:
   - Google Sheets API
   - Google Drive API

#### Bước 2: Tạo Service Account

1. Vào **IAM & Admin** > **Service Accounts**
2. Nhấn **Create Service Account**
3. Điền thông tin và nhấn **Create and Continue**
4. Bỏ qua phần roles và nhấn **Done**

#### Bước 3: Tạo Key cho Service Account

1. Nhấn vào Service Account vừa tạo
2. Vào tab **Keys** > **Add Key** > **Create New Key**
3. Chọn **JSON** và nhấn **Create**
4. File JSON sẽ được tải xuống - **BẢO MẬT FILE NÀY**

### 2. Chuẩn bị Google Sheets & Drive

#### Google Sheets

1. Tạo Google Sheet mới
2. Copy **Sheet ID** từ URL (phần giữa `/d/` và `/edit`)
3. Chia sẻ Sheet với email của Service Account (với quyền Editor)

#### Google Drive

1. Tạo thư mục trên Google Drive để chứa file upload
2. Copy **Folder ID** từ URL
3. Chia sẻ thư mục với email của Service Account (với quyền Editor)

### 3. Cài đặt ứng dụng

#### Bước 1: Clone và cài đặt dependencies

```bash
# Cài đặt dependencies cho frontend
npm install

# Cài đặt dependencies cho backend
npm install express nodemailer node-cron cors dotenv
```

#### Bước 2: Cấu hình môi trường

```bash
# Copy file cấu hình
cp .env.example .env

# Chỉnh sửa file .env với editor yêu thích
```

#### Bước 3: Cấu hình .env

```env
# Google Service Account Configuration
REACT_APP_GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
REACT_APP_GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----"
REACT_APP_GOOGLE_PROJECT_ID=your-google-project-id

# Google Sheets & Drive
REACT_APP_GOOGLE_SHEET_ID=your-google-sheet-id
REACT_APP_GOOGLE_DRIVE_FOLDER_ID=your-google-drive-folder-id

# Email Configuration (Gmail example)
REACT_APP_EMAIL_SERVICE=gmail
REACT_APP_EMAIL_USER=your-email@gmail.com
REACT_APP_EMAIL_PASS=your-app-password
REACT_APP_ALERT_EMAIL_TO=recipient@example.com

# Telegram Configuration
REACT_APP_TELEGRAM_BOT_TOKEN=your-telegram-bot-token
REACT_APP_TELEGRAM_CHAT_ID=your-telegram-chat-id

# Other settings
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_ALERT_THRESHOLD_LOW=10
REACT_APP_ALERT_THRESHOLD_HIGH=100
```

### 4. Cấu hình Email (Gmail)

1. Bật **2-Step Verification** cho Gmail
2. Tạo **App Password**:
   - Vào **Google Account** > **Security**
   - Chọn **2-Step Verification** > **App passwords**
   - Tạo password mới cho "Mail"
   - Sử dụng password này trong `REACT_APP_EMAIL_PASS`

### 5. Cấu hình Telegram Bot

1. Tìm **@BotFather** trên Telegram
2. Gửi `/newbot` và làm theo hướng dẫn
3. Copy **Bot Token** vào `REACT_APP_TELEGRAM_BOT_TOKEN`
4. Để lấy Chat ID:
   - Gửi tin nhắn cho bot
   - Truy cập: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Copy `chat.id` vào `REACT_APP_TELEGRAM_CHAT_ID`

## 🎯 Chạy ứng dụng

### Production (Đã deploy)

- **Frontend**: <https://leafy-baklava-595711.netlify.app/>
- **Backend**: <https://react-google-backend.onrender.com>

### Development Mode (Local)

```bash
# Terminal 1: Start backend server
node server.js

# Terminal 2: Start React app
npm start
```

Ứng dụng local sẽ chạy tại:

- Frontend: <http://localhost:3000>
- Backend: <http://localhost:3001>

### 🚀 Quick Deployment (Recommended)

Sử dụng script tự động để deploy nhanh:

```bash
# Deploy với commit message
./deploy.sh "🎨 Update UI design"

# Hoặc script sẽ prompt cho message
./deploy.sh

# Xem hướng dẫn
./deploy.sh --help
```

**Script sẽ tự động:**

- 📦 Build frontend (`npm run build`)
- ➕ Add tất cả changes (`git add .`)
- 💾 Commit với message
- 🚀 Push lên GitHub (`git push origin main`)
- ☁️ Trigger auto-deploy cho Netlify & Render

### 🛠️ Manual Deployment

```bash
# Build frontend
npm run build

# Manual commit & push
git add .
git commit -m "Your message"
git push origin main

# Auto-deploy sẽ trigger cho:
# - Netlify (Frontend): 3-5 phút
# - Render (Backend): 5-10 phút
```

## 📖 Hướng dẫn sử dụng

### 1. Test Google Sheets

- Vào tab **Google Sheets**
- Nhấn **Kết nối Google Sheets**
- Test các chức năng: Đọc dữ liệu, Ghi dữ liệu, Tạo sheet mới

### 2. Test Google Drive

- Vào tab **Google Drive**
- Nhấn **Kết nối Google Drive**
- Test upload file, tạo thư mục, chia sẻ file

### 3. Test Cảnh báo

- Vào tab **Cảnh báo**
- Test gửi email và telegram
- Test các loại cảnh báo khác nhau

### 4. Xem Báo cáo

- Vào tab **Báo cáo**
- Chọn khoảng thời gian và tạo báo cáo
- Xem biểu đồ và thống kê

## 🔧 Troubleshooting

### Lỗi kết nối Google APIs

```
Error: No key or keyFile set
```

**Giải pháp**: Kiểm tra GOOGLE_PRIVATE_KEY trong .env, đảm bảo có `\n` thay vì xuống dòng thật.

### Lỗi gửi email

```
Error: Invalid login
```

**Giải pháp**:

1. Kiểm tra Email và App Password
2. Đảm bảo đã bật 2-Step Verification
3. Sử dụng App Password thay vì password thường

### Lỗi Telegram

```
Error: Bad Request: chat not found
```

**Giải pháp**:

1. Đảm bảo đã gửi tin nhắn cho bot trước
2. Kiểm tra Chat ID từ getUpdates API

### Lỗi Google Sheets/Drive

```
Error: Insufficient Permission
```

**Giải pháp**:

1. Đảm bảo đã chia sẻ Sheet/Folder với Service Account
2. Kiểm tra quyền Editor
3. Verify Service Account email

## 📊 Dữ liệu mẫu cho Google Sheets

Tạo sheet với cấu trúc sau để test báo cáo:

### Sheet "Orders" (A1:F)

```
date,product,quantity,total,status,customer_id
2024-01-01,Sản phẩm A,2,200000,completed,CUST001
2024-01-02,Sản phẩm B,1,150000,pending,CUST002
2024-01-03,Sản phẩm A,3,300000,completed,CUST003
```

### Sheet "Reports" (A1:E)

```
timestamp,type,statistics,summary,dateRange
```

### Sheet "Logs" (A1:D)

```
timestamp,activity,details,status
```

## 🚀 Lộ trình phát triển

### Phase 1: ✅ Hoàn thành

- [x] Google Sheets integration (Real API)
- [x] Google Drive integration (Real API)
- [x] Alert system (Email + Telegram)
- [x] Basic reporting with charts
- [x] **Production deployment** (Netlify + Render)
- [x] **Real Google APIs** thay vì demo data
- [x] Full-stack architecture với Node.js backend

### Phase 2: 🔄 Đang phát triển

- [ ] Advanced scheduling với cron jobs
- [ ] Enhanced UI/UX design
- [ ] Performance optimization
- [ ] Error handling improvements

### Phase 3: 📋 Kế hoạch

- [ ] Multi-user authentication system
- [ ] Role-based access control
- [ ] Advanced analytics & machine learning
- [ ] Mobile responsive design
- [ ] API rate limiting & caching

## 🔒 Bảo mật

- ⚠️ **KHÔNG** commit file .env
- ⚠️ **KHÔNG** share Service Account keys
- ✅ Sử dụng App Passwords cho email
- ✅ Restrict API keys nếu có thể
- ✅ Regular rotation của credentials

## 🚀 Quick Deploy Examples

```bash
# Bug fix
./deploy.sh "🐛 Fix login validation issue"

# New feature
./deploy.sh "✨ Add dark mode toggle"

# Documentation update
./deploy.sh "📝 Update API documentation"

# UI improvements
./deploy.sh "🎨 Improve dashboard responsiveness"

# Performance optimization
./deploy.sh "⚡ Optimize image loading speed"
```

## 📚 Documentation

- **[Setup Guides](docs/setup/)** - Hướng dẫn cài đặt và cấu hình
- **[Usage Guides](docs/guides/)** - Hướng dẫn sử dụng và deployment
- **[Project Info](docs/project/)** - Thông tin chi tiết về dự án
- **[Documentation Index](docs/README.md)** - Danh mục tài liệu đầy đủ

## 📞 Hỗ trợ

Nếu gặp vấn đề:

1. Kiểm tra logs trong console
2. Verify các credentials
3. Test từng service riêng biệt
4. Kiểm tra network connectivity
5. Tham khảo [`docs/`](docs/) cho hướng dẫn chi tiết

## 📄 License

MIT License - Tự do sử dụng cho mục đích học tập và phát triển.

## 🎯 Tech Stack

### Frontend

- **React 18** - Modern React với hooks
- **Recharts** - Biểu đồ và visualization
- **CSS3** - Responsive design
- **Netlify** - Static hosting & deployment

### Backend

- **Node.js + Express** - RESTful API server
- **Google APIs** - Sheets v4, Drive v3, Auth Library
- **Nodemailer** - Email service
- **Node-cron** - Task scheduling
- **Render.com** - Backend hosting

### Integration

- **Google Service Account** - Secure API authentication
- **CORS** - Cross-origin resource sharing
- **Environment Variables** - Secure configuration

---

## 🏆 Thành tựu đạt được

✅ **Full-stack application** hoàn chỉnh với real Google APIs
✅ **Production deployment** trên Netlify + Render
✅ **Real-time data operations** với Google Sheets & Drive
✅ **Professional alerting system** via Email & Telegram
✅ **Beautiful dashboard** với charts và analytics
✅ **Secure authentication** với Service Account
✅ **Clean, maintainable code** với modern React patterns

---

🎉 **Chúc bạn thành công với React Google Integration!**

> 💡 **Tip**: Dự án này có thể làm foundation cho các ứng dụng business intelligence, CRM systems, hoặc automation platforms!
