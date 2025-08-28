# Firebase Deployment Guide

Your React portfolio is now configured to deploy to your existing Firebase project: `portfolio-f1146`

## Prerequisites

1. Install Firebase CLI globally (if not already installed):

   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

## Deployment Steps

### First Time Setup

1. Initialize Firebase in your project (already done):
   ```bash
   firebase init hosting
   ```

### Deploy to Firebase Hosting

1. **Build and deploy everything:**

   ```bash
   npm run deploy
   ```

2. **Deploy only hosting (faster):**

   ```bash
   npm run deploy:hosting
   ```

3. **Manual deployment:**
   ```bash
   npm run build
   firebase deploy
   ```

## Your Firebase Project Details

- **Project ID:** portfolio-f1146
- **Hosting Site:** portfolio-f1146
- **App ID:** 1:1048585418281:web:bfeb869535011742dc4e38

## Configuration Files Created

- `firebase.json` - Firebase hosting configuration
- `.firebaserc` - Project association
- `src/firebase.ts` - Firebase SDK initialization

## Available Firebase Services

The following Firebase services are initialized and ready to use:

- **Authentication** (`auth`) - User authentication
- **Firestore** (`db`) - NoSQL database
- **Storage** (`storage`) - File storage
- **Realtime Database** (`realtimeDb`) - Real-time data sync

## Usage Example

```typescript
import { auth, db, storage } from "./firebase";

// Use Firebase services in your components
```

## Troubleshooting

1. **If you get permission errors:**

   - Make sure you're logged in: `firebase login`
   - Verify you have access to the project: `firebase projects:list`

2. **If build fails:**

   - Check for TypeScript errors: `npm run lint`
   - Ensure all dependencies are installed: `npm install`

3. **If deployment fails:**
   - Check your internet connection
   - Verify Firebase project exists and you have access
   - Try: `firebase logout` then `firebase login`

## Next Steps

1. Deploy your application: `npm run deploy`
2. Your site will be available at: https://portfolio-f1146.web.app
3. You can also set up a custom domain in the Firebase Console
