# FrameUp - Changelog

## [1.0.1] - 2026-06-27

### 🎯 Major Changes

#### ✨ New Professional Photography-Themed Icons
- **Redesigned app icon** with camera lens and aperture blade design
- **Color scheme**: Golden amber (#F5A623) on dark navy (#0A0A0F)
- **Adaptive icons** for Android with foreground/background separation
- **Monochrome icon** for accessibility and different themes
- **Splash screen icon** optimized for all screen sizes

#### 🐛 Bug Fixes
- **Fixed "App not installed" error** - Root cause: missing/invalid icon assets
- **Cleaned gradle build** - Complete rebuild with proper asset configuration
- **Updated Android manifest** - Proper permission declarations
- **Verified app.json configuration** - All settings aligned with gradle

#### 🔧 Technical Improvements
- **Icon asset pipeline** - New SVG-to-PNG conversion process
- **Build optimization** - Clean gradle compilation eliminates stale artifacts
- **Asset management** - Organized icon assets for multiple screen densities
- **Android adaptive icons** - Full support for modern Android versions

### 📦 What's New

#### Icons Added
```
✅ assets/images/icon.svg                    (1024x1024) - Main icon
✅ assets/images/android-icon-foreground.svg (1024x1024) - Adaptive foreground
✅ assets/images/android-icon-background.svg (1024x1024) - Adaptive background
✅ assets/images/android-icon-monochrome.svg (1024x1024) - Monochrome variant
✅ assets/images/splash-icon.png             (1080x1080) - Splash screen
```

#### Version Numbers Updated
- **app.json version**: 1.0.0 → 1.0.1
- **Android versionCode**: 1 → 2
- **iOS buildNumber**: 2 → 3

#### Scripts Added
- `create-photo-icons.js` - Professional icon SVG generation
- `convert-icons.js` - SVG to PNG conversion utility

### 📋 Comparison: v1.0.0 → v1.0.1

| Aspect | v1.0.0 | v1.0.1 |
|--------|--------|--------|
| Icons | Basic/Generic | Professional Photography-Themed |
| Installability | "App not installed" error | ✅ Fixed |
| Icon Design | Generic camera | Lens with aperture blades |
| Color Scheme | Generic | Golden amber + Dark navy |
| Adaptive Icons | Not optimized | Fully optimized |
| Build Quality | Standard | Clean rebuilt |

### 🔐 Security & Signing

Same as v1.0.0:
- ✅ Algorithm: SHA384withRSA
- ✅ Key: RSA 2048-bit
- ✅ Certificate date: 2026-06-27 (immutable)
- ✅ Valid until: 2051-06-21 (25 years)

### 📊 Technical Specs

```
Version:        1.0.1
Build:          2 (Android versionCode)
Release Date:   2026-06-27
APK Size:       100 MB
Min SDK:        24 (Android 7.0)
Target SDK:     34 (Android 14)
Architecture:   ARM64 + ARMv7
Signature:      SHA384withRSA (RSA-2048)
```

### 📱 Compatibility

- ✅ Android 7.0+ (API 24-34+)
- ✅ All screen sizes and densities
- ✅ Adaptive icons (Android 8.0+)
- ✅ Dark and light themes
- ✅ Accessibility features

### 🎯 Installation

```bash
# Via ADB
adb install -r frameup-v1.0.1.apk

# Manual installation
1. Copy frameup-v1.0.1.apk to device
2. Enable "Unknown Sources"
3. Open and install APK
```

### 🔄 Upgrade Notes

- ✅ Can upgrade directly from v1.0.0
- ✅ No data loss during upgrade
- ✅ Previous settings/favorites preserved
- ✅ Better icon appearance on all devices

### 🙏 Credits

Professional icon design inspired by:
- Photography lens aesthetics
- Camera aperture mechanisms
- Industry-standard UI patterns
- Golden hour lighting concepts

---

## [1.0.0] - 2026-06-27

### 🎉 Initial Release

- Complete photography reference app
- 19 photography scenes with expert settings
- 45+ camera profiles (Canon, Nikon, Sony, etc.)
- 7 technical photography tools
- Real-time Golden Hour calculator with GPS
- Favorites system with personal notes
- 100% bilingual (Spanish & English)
- Dark/Light theme support
- Professional UI with smooth animations
- Production-grade TypeScript code (0 errors)
- Properly signed APK with 25-year certificate

---

## Version Strategy

### Versioning Scheme
- **MAJOR.MINOR.PATCH** (semantic versioning)
- **MAJOR**: Significant app restructure or new features
- **MINOR**: New features or major improvements
- **PATCH**: Bug fixes, icon updates, UI refinements

### Future Versions
- **v1.0.2+**: Bug fixes and minor updates
- **v1.1.0**: Community features, cloud backup
- **v1.2.0**: iOS version, web version
- **v2.0.0**: AI detection, real-time analysis

---

**Last Updated**: 2026-06-27  
**Repository**: https://github.com/pedroespinal/frameup  
**Contact**: stonepiedra1976@gmail.com
