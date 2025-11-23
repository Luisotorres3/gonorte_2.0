# Gonorte 2.0 - Fitness Training Platform

A modern, responsive fitness training platform built with React, TypeScript, Vite, and Firebase. This application provides comprehensive tools for fitness trainers to manage clients, training plans, and track progress.

## 🚀 Features

- **Multi-role Authentication**: Support for Admin, Coach, and Client roles
- **Internationalization**: Full i18n support for English, Spanish, and French
- **Dark/Light Mode**: Seamless theme switching with persistent preferences
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Real-time Data**: Firebase Firestore for real-time data synchronization
- **Secure Storage**: Firebase Storage for secure file uploads
- **Training Management**: Complete training plan and history tracking
- **Analytics Dashboard**: Coach analytics and client progress tracking

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account and project

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/Luisotorres3/gonorte_2.0.git
cd gonorte_2.0
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

   - Copy `.env.example` to `.env`
   - Add your Firebase configuration values

4. Start the development server:

```bash
npm run dev
```

## 📁 Project Structure

```
gonorte_2.0/
├── public/              # Static assets
│   ├── locales/        # Translation files (en, es, fr)
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/            # Utility scripts
├── src/
│   ├── assets/         # Images and media files
│   ├── components/     # React components
│   │   ├── catalog/    # Catalog components
│   │   ├── landing/    # Landing page sections
│   │   ├── layout/     # Layout components (Navbar, Footer)
│   │   ├── motion/     # Animation wrappers
│   │   ├── ui/         # Reusable UI components
│   │   └── utils/      # Component utilities
│   ├── constants/      # App-wide constants
│   ├── contexts/       # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── firebase/       # Firebase configuration
│   ├── hooks/          # Custom React hooks
│   ├── i18n/           # Internationalization config
│   ├── pages/          # Page components
│   │   ├── Admin/      # Admin dashboard pages
│   │   ├── Client/     # Client dashboard pages
│   │   ├── Coach/      # Coach dashboard pages
│   │   └── Public/     # Public pages
│   ├── router/         # Route configuration
│   ├── styles/         # Global styles
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx
│   └── main.tsx
├── .env.example        # Environment variables template
├── .gitignore
├── eslint.config.js    # ESLint configuration
├── package.json
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 🎨 Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Routing**: React Router v7
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Internationalization**: i18next
- **Icons**: React Icons
- **Linting**: ESLint

## 🌍 Internationalization

The app supports three languages:

- English (en)
- Spanish (es) - Default
- French (fr)

Translation files are located in `public/locales/`.

## 🔐 User Roles

1. **Admin**: Full system access, user management, settings
2. **Coach**: Client management, training plans, analytics
3. **Client**: Personal dashboard, training plans, progress tracking

## 🚀 Deployment

The project is configured for deployment to GitHub Pages:

```bash
npm run deploy
```

For other hosting platforms, build the project and deploy the `dist` folder:

```bash
npm run build
```

## 📝 Environment Variables

Required environment variables (see `.env.example`):

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👤 Author

Luis Torres (@Luisotorres3)

## 🙏 Acknowledgments

- Firebase for backend services
- Tailwind CSS for styling utilities
- Framer Motion for animations
- React Router for routing
- i18next for internationalization
