# Deploy Ali to Vercel

## Option 1: GitHub + Vercel (Recommended)

1. **Push to GitHub:**
```bash
cd ali_app
git init
git add .
git commit -m "Ali Mental Health App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ali-app.git
git push -u origin main
```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repo
   - Click "Deploy"

3. **Done!** You'll get a URL like: `ali-app.vercel.app`

## Option 2: Vercel CLI

```bash
npm i -g vercel
cd ali_app
vercel
```

## Current Files for Deployment:
- `index.html` - Main app
- `vercel.json` - Vercel config
- `package.json` - Dependencies
- `ARCHITECTURE.md` - Documentation
- `backend/` - Node.js API (optional)
```

## To update:
```bash
git add .
git commit -m "Update"
git push
```

Vercel auto-deploys on every push!
