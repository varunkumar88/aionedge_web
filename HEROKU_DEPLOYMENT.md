# AION Edge - Heroku Deployment Guide

This guide will help you deploy your AION Edge website to Heroku.

## Prerequisites

1. **Heroku Account**: Sign up at [heroku.com](https://heroku.com)
2. **Heroku CLI**: Install from [devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
3. **Git**: Make sure Git is installed and configured

## Deployment Steps

### 1. Install Dependencies Locally (Optional)
```bash
npm install
```

### 2. Test Locally
```bash
npm start
```
Visit `http://localhost:3000` to test your site.

### 3. Initialize Git Repository (if not already done)
```bash
git init
git add .
git commit -m "Initial commit for AION Edge website"
```

### 4. Create Heroku App
```bash
heroku create your-app-name
```
Replace `your-app-name` with your desired app name (must be unique).

### 5. Deploy to Heroku
```bash
git push heroku main
```
Or if you're using master branch:
```bash
git push heroku master
```

### 6. Open Your App
```bash
heroku open
```

## File Structure for Heroku

Your project should have these files:
```
aionedge_web/
├── index.html
├── mission-vision.html
├── styles.css
├── script.js
├── package.json
├── server.js
├── Procfile
└── HEROKU_DEPLOYMENT.md
```

## Important Notes

- **Procfile**: Tells Heroku how to start your app
- **server.js**: Express server that serves your static files
- **package.json**: Contains dependencies and start script
- **PORT**: Heroku automatically sets the PORT environment variable

## Custom Domain (Optional)

To add a custom domain:
```bash
heroku domains:add www.yourdomain.com
heroku domains:add yourdomain.com
```

## Environment Variables

If you need environment variables:
```bash
heroku config:set VARIABLE_NAME=value
```

## Logs and Debugging

View logs:
```bash
heroku logs --tail
```

## Scaling

Scale your app:
```bash
heroku ps:scale web=1
```

## Troubleshooting

### Common Issues:

1. **Build Fails**: Check that all dependencies are in `package.json`
2. **App Crashes**: Check logs with `heroku logs --tail`
3. **Static Files Not Loading**: Ensure `server.js` is serving static files correctly

### Useful Commands:

```bash
# Check app status
heroku ps

# Restart app
heroku restart

# Check config vars
heroku config

# Open app in browser
heroku open
```

## Support

For Heroku-specific issues, check:
- [Heroku Dev Center](https://devcenter.heroku.com/)
- [Heroku Support](https://help.heroku.com/)

---

**Your AION Edge website is now live on Heroku! 🚀**
