# Kanban Board - Task Management Application

A modern, full-featured task management application built with ReactJS, featuring drag-and-drop functionality, user authentication, and a beautiful responsive UI.

## 🚀 Features

### 1. User Authentication
- **Registration**: Complete sign-up form with validation
  - Name, Username, Email (mandatory)
  - Contact Number
  - Password with strength requirements
  - Field validations for all inputs
  
- **Login**: Secure authentication system
  - Login via email or username
  - Password authentication
  - CAPTCHA verification
  - Automatic redirect to dashboard

### 2. Dashboard
- **Task Statistics**:
  - Total tasks created
  - Completed tasks count
  - Pending tasks count
  - Overall completion rate
- User profile display
- Quick navigation to Kanban board

### 3. Kanban Board (Main Feature)
- **4 Task Stages**:
  - Backlog (Stage 0)
  - To Do (Stage 1)
  - Ongoing (Stage 2)
  - Done (Stage 3)

- **Task Properties**:
  - Name (unique identifier)
  - Stage (0-3)
  - Priority (High, Medium, Low)
  - Deadline (due date)

- **Task Operations**:
  - ✅ Create new tasks
  - ✏️ Edit task details
  - 🗑️ Delete tasks (with confirmation)
  - ← → Move tasks between stages

- **Frontend**: React 18+ with Hooks
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Forms**: Formik + Yup validation
- **Drag & Drop**: react-beautiful-dnd
- **Styling**: Custom CSS with modern design
- **Build Tool**: Vite
- **Date Handling**: date-fns
- **API**: Axios (with localStorage mock backend)


### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Clone or extract the project**
```bash
cd kanban-board
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
```
http://localhost:3000
```

## 📁 Project Structure

```
kanban-board/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Register.jsx
│   │   │   └── Login.jsx
│   │   ├── dashboard/
│   │   │   └── Dashboard.jsx
│   │   ├── kanban/
│   │   │   ├── KanbanBoard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── EditTaskModal.jsx
│   │   └── common/
│   │       └── DeleteModal.jsx
│   ├── redux/
│   │   ├── store.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       └── taskSlice.js
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── validators.js
│   ├── styles/
│   │   ├── App.css
│   │   ├── Auth.css
│   │   ├── Dashboard.css
│   │   └── Kanban.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 🎨 Design Features

- **Modern Gradient UI**: Beautiful gradient backgrounds
- **Smooth Animations**: Fade-ins, slides, and hover effects
- **Glassmorphism**: Backdrop blur effects
- **Responsive Grid**: Adapts to all screen sizes
- **Custom Typography**: Syne + DM Sans font pairing
- **Color-coded Priorities**: Visual priority indicators
- **Interactive Cards**: Hover states and transformations

## 🔐 Authentication Flow

1. User visits the app → Redirected to Login
2. New users click "Sign Up" → Registration form
3. Fill registration form with validations
4. After successful registration → Redirected to Login
5. Login with email/username + password + CAPTCHA
6. Successful login → Redirected to Dashboard
7. Access Kanban board from Dashboard

## 📝 Task Management Flow

1. Click "Go to Board" from Dashboard
2. Fill task creation form (Name, Priority, Deadline)
3. Click "Create Task" → Task appears in Backlog
4. **Move tasks**:
   - Use ← → buttons to move between stages
   - OR drag and drop to any stage
   - Drag to trash bin to delete (with confirmation)
5. **Edit tasks**: Click ✏️ icon
6. **Delete tasks**: Click 🗑️ icon (with confirmation)

## 🧪 Testing the Application

### Test User Flow:
1. **Register a new account**
   - Name: John Doe
   - Username: johndoe
   - Email: john@example.com
   - Password: Test@123

2. **Login**
   - Use email or username
   - Complete CAPTCHA

3. **Create tasks**
   - Create multiple tasks with different priorities
   - Set various deadlines

4. **Test drag and drop**
   - Drag tasks between columns
   - Drag to trash bin

5. **Test CRUD operations**
   - Edit task details
   - Move tasks with buttons
   - Delete tasks

## 🔒 Data Storage

Currently uses **localStorage** as a mock backend:
- User data stored in `localStorage.users`
- Task data stored per user in `localStorage.tasks_{userId}`

### To integrate with a real backend:
1. Replace mock functions in `src/services/api.js`
2. Update API endpoints
3. Add authentication token handling
4. Implement proper error handling

## 🚀 Production Build

```bash
npm run build
```

Build files will be in the `dist/` folder.

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## ✨ Key Features Implementation

### Form Validation
- Email format validation
- Password: min 8 chars, 1 uppercase, 1 number, 1 special char
- Future date validation for deadlines
- Required field checks

### Performance Optimizations
- Lazy loading of route components
- React.memo for task cards
- Optimistic UI updates
- Efficient Redux state management

### Accessibility
- Proper semantic HTML
- Keyboard navigation support
- ARIA labels where needed
- Focus states on interactive elements

## 🤝 Contributing

This is a demo project for the ReactJS Intermediate assessment.

## 📄 License

This project is created for educational purposes.

## 🎯 Time Breakdown (30 Hours)

- Registration Module: 4 hours ✅
- Login Module: 4 hours ✅
- Dashboard: 4 hours ✅
- Task Management (Kanban): 16 hours ✅
- Testing & Polish: 2 hours ✅

## 🐛 Known Limitations

- Uses localStorage instead of a real backend
- CAPTCHA is a simple math problem (use react-google-recaptcha in production)
- No social login integration (can be added as bonus)
- No user profile editing
- No task filtering or search

## 🔮 Future Enhancements

- [ ] Integrate with REST API backend
- [ ] Add Google/Facebook social login
- [ ] Task filtering and search
- [ ] Task categories/tags
- [ ] User profile management
- [ ] Task comments and attachments
- [ ] Email notifications
- [ ] Dark mode theme
- [ ] Task duplication
- [ ] Keyboard shortcuts

## 📞 Support

For any issues or questions, please create an issue in the repository.

---

**Built with ❤️ using React, Redux, and modern web technologies**
