---
description: Build macOS executable for iResume
---

# Build macOS Executable

This workflow builds a macOS executable (.dmg and .zip) for the iResume application.

**Important Notes:**
- Building from Windows will create **unsigned** macOS builds
- These builds will work but show security warnings to macOS users
- For signed builds, you need to build on macOS with an Apple Developer certificate
- The build will create both Intel (x64) and Apple Silicon (arm64) versions

## Steps

1. Ensure all dependencies are installed
```bash
npm install
```

// turbo
2. Build the macOS executable
```bash
npm run build:mac
```

The build output will be in the `dist` folder:
- `iResume-{version}.dmg` - DMG installer for macOS
- `iResume-{version}-mac.zip` - Zipped app bundle
- Both Intel (x64) and ARM64 (Apple Silicon) versions will be created

## Testing

Since you're building from Windows, you won't be able to test the macOS build locally. You'll need to:
1. Transfer the .dmg or .zip file to a Mac
2. On macOS, right-click the app and select "Open" to bypass Gatekeeper warnings
3. Test the application functionality

## For Production Builds

For production releases with proper code signing:
1. Build on macOS with Xcode installed
2. Get an Apple Developer certificate ($99/year)
3. Configure code signing in package.json:
   - Set `hardenedRuntime: true`
   - Set `gatekeeperAssess: true`
   - Add your certificate info
4. Notarize the app with Apple
