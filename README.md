# 🏨 Booking Cabins App

A modern, full-stack web application built with Supabase, Next.js. This project showcases some of the essential Web DEV functionalities including reservations management (CRUD) by leveraging Next's ecosystem, secure authentication (Next Auth)

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🛠️ Technologies Used

- **NEXT.js**
- **REACT.js**
- **TailwindCSS**
- **next-auth**
- **react-day-picker**

### Database & Hosting

- **Supabase**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/speculateDev/wild-oasis-client.git
cd wild-oasis-client
```

### Install Dependencies

```bash
npm install
```

## 🔧 Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Database Configuration
SUPABASE_URL=
SUPABASE_KEY=

# Auth Configuration
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

# URL
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

## 🎯 Usage

### Development Mode

```bash
npm run dev
```

### Production Build

```bash
npm run prod
```
