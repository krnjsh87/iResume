---
description: Build Windows executable for iResume
---

# Build Windows Executable

This workflow guides you through building the iResume application into Windows executable files (.exe).

## Prerequisites

Before building, ensure:
1. All dependencies are installed (`npm install`)
2. The application runs correctly (`npm start`)
3. All changes are saved

## Build Steps

### 1. Clean previous build (optional)
If you want to clean old builds:
```bash
Remove-Item -Path "dist" -Recurse -Force -ErrorAction SilentlyContinue
```

### 2. Run the build command
// turbo
```bash
npm run build
```

This will create:
- **iResume Setup 1.0.0.exe** - Installer version (recommended for distribution)
- **iResume 1.0.0.exe** - Portable version (no installation needed)

Build time: ~2-5 minutes depending on your system

### 3. Verify build output
Check that the files were created:
```bash
Get-ChildItem -Path "dist" -Filter "*.exe"
```

### 4. Test the executables
- Test the installer: `.\dist\iResume Setup 1.0.0.exe`
- Test portable version: `.\dist\iResume 1.0.0.exe`

## Output Location

All build artifacts are in: `dist/`

## Build Configuration

The build is configured in `package.json` under the `"build"` section:
- **App ID**: com.quanaun.iresume
- **Product Name**: iResume
- **Targets**: NSIS installer (x64) + Portable (x64)
- **Icon**: src/renderer/assets/icons/app-icon.png

## Troubleshooting

### Build fails with icon error
- Ensure the icon file exists at: `src/renderer/assets/icons/app-icon.png`
- electron-builder will auto-convert PNG to ICO format

### Build takes too long
- Close unnecessary applications to free up system resources
- Ensure antivirus isn't scanning the build directory

### "Cannot find module" errors
- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules` and run `npm install` again

## Customization

### Change version number
Edit `package.json`:
```json
"version": "1.0.0"
```

### Change app name
Edit `package.json`:
```json
"productName": "iResume"
```

### Add digital signature
Add to `package.json` under `"win"`:
```json
"certificateFile": "path/to/certificate.pfx",
"certificatePassword": "password"
```

## Distribution

After building:
1. Test both .exe files thoroughly
2. Upload to your distribution platform
3. Provide clear instructions (installer vs portable)
4. Include system requirements (Windows 10/11, x64)
