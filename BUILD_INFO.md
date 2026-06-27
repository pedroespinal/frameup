# FrameUp APK Build Information

## Build Status
🔨 **Android Debug APK Build in Progress**

Started: 2026-06-27
Build Command: `gradlew.bat assembleDebug`
Expected Location: `android/app/build/outputs/apk/debug/app-debug.apk`

## Project Configuration

### Version Info
- **App Version**: 1.0.0
- **Build Tools**: 36.0.0
- **Min SDK**: 24 (Android 7.0)
- **Target SDK**: 34 (Android 14)
- **Runtime Version**: nativeVersion policy

### Package Info
- **Package**: com.pedroespinal.frameup
- **Android Bundle ID**: com.pedroespinal.frameup
- **iOS Bundle ID**: com.pedroespinal.frameup

### Signing
- **Build Type**: Debug APK (auto-signed)
- **Release Type**: Will require manual signing for production

## Features Included in Build

### Photography Tools
- ✅ 19 Scene Library (organized by category)
- ✅ 45+ Camera Profiles
- ✅ Depth of Field Calculator
- ✅ ND Filter Calculator
- ✅ Exposure Triangle Tool
- ✅ Lens Advisor
- ✅ EXIF Reader
- ✅ My Gear Manager

### Technical Features
- ✅ Golden Hour Calculator with GPS
- ✅ Solar Events (7 sun position calculations)
- ✅ Real-time Location Services
- ✅ Favorite Configurations with Notes
- ✅ Search History
- ✅ Theme System (Dark/Light Mode)
- ✅ Multi-language (Spanish/English)
- ✅ Local Storage with AsyncStorage

### Tech Stack
- React Native 0.85.3
- Expo 56.0.8
- TypeScript 6.0.3
- React 19.2.3
- Expo Router 56.2.8
- Firebase SDK 12.14.0

## Build Steps Completed
1. ✅ Project initialization
2. ✅ Code review (TypeScript compilation)
3. ✅ Git repository setup
4. ✅ GitHub push
5. ✅ Firebase configuration
6. ✅ Prebuild (native folders generation)
7. 🔨 Gradle build (in progress...)

## Next Steps After Build

### If build succeeds:
1. APK will be available at: `C:\FrameUp\android\app\build\outputs\apk\debug\app-debug.apk`
2. Transfer APK to testing device via USB or email
3. Enable "Unknown Sources" in device settings
4. Install and test the app

### For Production Release:
1. Generate signing key: `keytool -genkey -v -keystore release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias release`
2. Configure gradle with signing
3. Build release APK: `gradlew.bat assembleRelease`
4. Sign APK with your keystore

## Troubleshooting

### If Gradle build fails:
- Clear cache: `gradlew.bat clean`
- Rebuild: `gradlew.bat assembleDebug --info`
- Check Java version: Must be 11+
- Check Android SDK: API level 34 must be installed

### For EAS Cloud Build (Alternative):
```bash
eas login
eas build --platform android
```

## Testing Device Requirements
- Minimum Android 7.0 (API 24)
- Recommended: Android 10+ (API 29+)
- Camera permission required for some features
- Location permission required for Golden Hour feature

## Contact & Support
- Repository: https://github.com/pedroespinal/frameup
- Owner: pedroespinal
- Email: stonepiedra1976@gmail.com
