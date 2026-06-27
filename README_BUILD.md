# FrameUp - Android Build & Deployment

## 🚀 Quick Start

### Auto-Install Script (Windows)
```bash
# Simply double-click this file
install-apk.bat
```

The script will:
1. ✅ Detect connected Android device
2. ✅ Build the APK (if not already built)
3. ✅ Install on device
4. ✅ Launch the app

### Manual Installation

#### Step 1: Build APK
```bash
cd android
./gradlew.bat assembleDebug
```

The APK will be generated at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

#### Step 2: Install on Device
```bash
# Plug in your Android device via USB
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

#### Step 3: Launch
```bash
adb shell am start -n com.pedroespinal.frameup/.MainActivity
```

## 📋 Prerequisites

### Windows Setup
1. **Android SDK** (in `C:\Users\[YOU]\AppData\Local\Android\Sdk`)
2. **Java JDK 11+** (check: `java -version`)
3. **ADB** (Android Debug Bridge - included with SDK)
4. **USB Driver** (for your device - usually auto-installed)

### Device Setup
1. Connect via USB cable
2. Enable USB Debugging:
   - Settings → Developer Options → USB Debugging
3. Allow USB debugging from this computer (tap OK on device)

## 📊 Build Files Generated

After build completion, you'll have:

```
FrameUp/
├── android/
│   ├── app/
│   │   └── build/
│   │       └── outputs/
│   │           └── apk/
│   │               └── debug/
│   │                   └── app-debug.apk          ← This is what you want!
│   │               └── release/                    ← For production
│   ├── gradlew.bat                                ← Gradle wrapper
│   └── build.gradle
├── package.json
├── app.json
└── tsconfig.json
```

## 🔧 Build Configuration

### Current Configuration
- **API Level**: 24 (Android 7.0) - 34 (Android 14)
- **Package Name**: `com.pedroespinal.frameup`
- **Version**: 1.0.0
- **Build Type**: Debug APK (unsigned)

### APK Specifications
- **Size**: ~45-65 MB (depends on dependencies)
- **Minimum Android**: 7.0 (API 24)
- **Target Android**: 14 (API 34)
- **Architecture**: ARM64 + ARMv7 (universal)

## 🎯 Build Variants

### Debug APK (Development)
```bash
./gradlew.bat assembleDebug
# Output: app-debug.apk
# Signing: Auto-signed with debug key
# Use: Testing on devices
```

### Release APK (Production) 
```bash
# First, create a signing key:
keytool -genkey -v -keystore release-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias release

# Then build:
./gradlew.bat assembleRelease
# Output: app-release.apk
# Use: Production submission to Play Store
```

## 📦 Gradle Tasks Reference

```bash
# Clean previous builds
./gradlew.bat clean

# Build debug APK
./gradlew.bat assembleDebug

# Build and install to device
./gradlew.bat installDebug

# Build release APK
./gradlew.bat assembleRelease

# Run tests (if configured)
./gradlew.bat test

# View build info
./gradlew.bat tasks
```

## 🐛 Troubleshooting Build Issues

### Issue: "No SDK found"
```
Error: ANDROID_HOME not set or SDK not found
```
**Solution:**
```powershell
# Set in PowerShell:
$env:ANDROID_HOME = "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk"

# Or in Command Prompt:
set ANDROID_HOME=C:\Users\[YOUR_USERNAME]\AppData\Local\Android\Sdk
```

### Issue: "Gradle daemon stopped"
```bash
# Clear gradle cache
./gradlew.bat clean

# Rebuild
./gradlew.bat assembleDebug
```

### Issue: "Java not found"
```
Java compiler not found
```
**Solution:**
1. Download Java JDK 11+ from oracle.com
2. Install to `C:\Program Files\Java\`
3. Add to PATH in Environment Variables

### Issue: "Device not found" for ADB
```bash
# Check connected devices
adb devices

# If device shows "unauthorized":
# - Check device notification (tap OK to allow USB debugging)
# - Run: adb kill-server && adb devices
```

### Issue: "Install failed. Package conflicts"
```bash
# Uninstall previous version first
adb uninstall com.pedroespinal.frameup

# Then install
adb install -r app-debug.apk
```

## 🚀 GitHub Actions CI/CD (Optional)

You can set up GitHub Actions to automatically build APKs:

```yaml
name: Build APK
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          java-version: '11'
      - run: cd android && ./gradlew assembleDebug
      - uses: actions/upload-artifact@v3
        with:
          name: APK
          path: android/app/build/outputs/apk/debug/app-debug.apk
```

## 📱 Play Store Submission

For Google Play Store submission, you'll need:

1. **Signed Release APK** (not debug)
2. **Keystore File** (keep safe - you'll need it for future updates)
3. **Google Play Developer Account** ($25 one-time fee)
4. **App Screenshots** (5+ per device type)
5. **App Description** & **Privacy Policy**
6. **Versioning Strategy**

## 📊 Monitoring Build Performance

To see detailed build info:
```bash
./gradlew.bat assembleDebug --profile

# Or with more verbosity:
./gradlew.bat assembleDebug --info --debug
```

This generates a build report in `android/build/reports/profile/`

## 🔐 Security Notes

- Debug APK has auto-signed debug key (for development only)
- Release APK requires your personal signing key
- Never commit signing keys to version control
- Add `release-key.jks` to `.gitignore`

## 📞 Support

If build fails:
1. Check [Expo docs](https://docs.expo.dev/build/setup/)
2. Check [Gradle troubleshooting](https://docs.gradle.org/current/userguide/troubleshooting.html)
3. Check [Android build docs](https://developer.android.com/build)
4. Report issue: https://github.com/pedroespinal/frameup/issues

---

**Happy building! 🎉**
