# Kanban Board - Complete Setup Guide

## 🎯 Quick Start (5 Minutes)

### Option 1: Local Development Setup

1. **Navigate to project directory**
```bash
cd kanban-board
```

2. **Install all dependencies**
```bash
npm install
```
This will install:
- React & React DOM
- Redux Toolkit & React Redux
- React Router
- Formik & Yup
- react-beautiful-dnd
- Axios
- date-fns
- Vite (dev server)

3. **Start the development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

5. **You're ready!** The app should open automatically.

---

## 📋 Detailed Setup Instructions

### Prerequisites Check

Before starting, ensure you have:

```bash
# Check Node.js version (should be 16+)
node --version

# Check npm version
npm --version
```

If you don't have Node.js installed:
- Download from: https://nodejs.org/
- Recommended: LTS version (v18 or v20)

### Step-by-Step Installation

#### Step 1: Extract/Clone Project
```bash
# If you have a zip file
unzip kanban-board.zip
cd kanban-board

# If cloning from git
git clone <repository-url>
cd kanban-board
```

#### Step 2: Install Dependencies

```bash
# Using npm (recommended)
npm install

# OR using yarn
yarn install
```

**What gets installed:**
- **React 18.2.0**: Core library
- **Redux Toolkit**: State management
- **React Router v6**: Navigation
- **Formik + Yup**: Form handling & validation
- **react-beautiful-dnd**: Drag and drop
- **Axios**: HTTP client
- **date-fns**: Date formatting
- **Vite**: Build tool and dev server

Installation should take 2-3 minutes depending on your internet speed.

#### Step 3: Start Development Server

```bash
npm run dev
```

You should see:
```
  VITE v4.4.5  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

#### Step 4: Open Application

- Open your browser
- Navigate to `http://localhost:3000`
- You should see the Login page

---

## 🧪 Testing the Application

### First Time User Journey

1. **Register a New Account**
   - Click "Sign Up" link
   - Fill in the registration form:
     ```
     Name: John Doe
     Username: johndoe
     Email: john@example.com
     Contact: 1234567890 (optional)
     Password: Test@123
     Confirm Password: Test@123
     ```
   - Click "Sign Up"
   - You'll see success message

2. **Login**
   - Enter email or username: `johndoe`
   - Enter password: `Test@123`
   - Complete CAPTCHA (simple math problem)
   - Click "Sign In"

3. **View Dashboard**
   - See your task statistics (all zeros initially)
   - Click "Go to Board"

4. **Create Your First Task**
   - Fill the task form:
     ```
     Task Name: Complete project documentation
     Priority: High
     Deadline: [Select tomorrow's date]
     ```
   - Click "Create Task"
   - Task appears in Backlog column

5. **Move Tasks**
   - Use arrow buttons to move between stages
   - OR drag and drop to any column
   - Drag to trash bin (appears when dragging) to delete

6. **Edit a Task**
   - Click the ✏️ (edit) icon
   - Modify details
   - Click "Save Changes"

7. **Delete a Task**
   - Click the 🗑️ (delete) icon
   - Confirm deletion in modal

---

## 🏗️ Project Architecture

### Component Hierarchy

```
App
├── Router
│   ├── Register (Public Route)
│   ├── Login (Public Route)
│   ├── Dashboard (Private Route)
│   │   └── StatCards
│   └── KanbanBoard (Private Route)
│       ├── TaskForm
│       ├── Board Columns (4)
│       │   └── TaskCards
│       ├── EditTaskModal
│       └── DeleteModal
```

### State Management (Redux)

```javascript
store
├── auth
│   ├── user
│   ├── token
│   ├── isAuthenticated
│   └── loading/error
└── tasks
    ├── items []
    ├── loading
    └── error
```

### Data Flow

```
User Action → Component → Redux Action → API Call
                                             ↓
                                        localStorage
                                             ↓
User sees update ← Component ← Redux State Update
```

---

## 🔧 Configuration

### Vite Configuration (`vite.config.js`)
```javascript
{
  plugins: [react()],
  server: {
    port: 3000  // Change if needed
  }
}
```

### Package Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## 🎨 Customization

### Change Colors

Edit `src/styles/App.css`:
```css
:root {
  --primary: #6C63FF;      /* Main purple */
  --secondary: #FF6584;    /* Pink accent */
  --success: #00D9A5;      /* Green */
  --warning: #FFB800;      /* Yellow */
  --danger: #FF5252;       /* Red */
}
```

### Change Fonts

Edit `index.html`:
```html
<!-- Replace these Google Fonts links -->
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
```

### Change Port

Edit `vite.config.js`:
```javascript
server: {
  port: 3001  // Your preferred port
}
```

---

## 🚀 Production Deployment

### Build for Production

```bash
npm run build
```

Output folder: `dist/`

### Deploy to Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login and deploy:
```bash
netlify login
netlify deploy --prod
```

3. Choose `dist` as publish directory

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel --prod
```

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
"homepage": "https://yourusername.github.io/kanban-board",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Deploy:
```bash
npm run deploy
```

---

## 🐛 Troubleshooting

### Issue: npm install fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Port 3000 already in use

**Solution 1:** Kill the process using port 3000
```bash
# On Mac/Linux
lsof -ti:3000 | xargs kill -9

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Solution 2:** Change port in `vite.config.js`

### Issue: Module not found errors

**Solution:**
```bash
# Ensure all dependencies are installed
npm install

# If specific module missing
npm install <module-name>
```

### Issue: Page is blank

**Check:**
1. Console for errors (F12 → Console)
2. Network tab for failed requests
3. Ensure dev server is running

### Issue: localStorage not persisting

**Check:**
1. Browser privacy settings
2. Incognito mode (localStorage is cleared)
3. Browser storage quota

---

## 📊 Performance Tips

### Development
- Keep dev server running for hot reload
- Use React DevTools browser extension
- Use Redux DevTools for state debugging

### Production
- Run `npm run build` to create optimized bundle
- Enable gzip compression on server
- Use CDN for static assets
- Implement code splitting for larger apps

---

## 🔐 Backend Integration

To connect with a real backend API:

### Step 1: Update API Configuration

Edit `src/services/api.js`:
```javascript
// Replace mock URL with your backend
const API_URL = 'https://your-backend-api.com/api';
```

### Step 2: Implement Real API Calls

Replace mock functions in `authAPI` and `taskAPI` with actual HTTP calls:

```javascript
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response;
  },
  
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response;
  },
};
```

### Step 3: Handle JWT Tokens

Update interceptor in `api.js` to use JWT from backend.

---

## 📚 Additional Resources

- React Documentation: https://react.dev/
- Redux Toolkit: https://redux-toolkit.js.org/
- React Router: https://reactrouter.com/
- Formik: https://formik.org/
- React Beautiful DnD: https://github.com/atlassian/react-beautiful-dnd

---

## ✅ Verification Checklist

After setup, verify:
- [ ] Development server starts without errors
- [ ] Can register a new user
- [ ] Can login with registered user
- [ ] Dashboard displays correctly
- [ ] Can create tasks
- [ ] Can drag and drop tasks
- [ ] Can edit tasks
- [ ] Can delete tasks
- [ ] Responsive on mobile (test with browser dev tools)

---

## 💡 Tips for Development

1. **Use React DevTools**: Install browser extension for debugging
2. **Use Redux DevTools**: Monitor state changes
3. **Hot Reload**: Changes reflect instantly (no need to refresh)
4. **Console Logging**: Check browser console for errors
5. **Network Tab**: Monitor API calls (even though they're localStorage)

---

## 🎓 Learning Resources

If you want to understand the code better:
- Each component is documented with comments
- Redux slices show clear state management
- API service shows async patterns
- Validators demonstrate Yup schema validation
- CSS shows modern design techniques

---

**Need Help?**
- Check the main README.md for feature documentation
- Review component code for implementation details
- Check browser console for error messages
- Ensure all dependencies are installed correctly

---

**Happy Coding! 🚀**
