# 📸 **FrameUp** - The Photographer's Technical Guide

> Your pocket technical assistant for perfect camera settings in any photographic scenario.

[![Release](https://img.shields.io/badge/Release-v1.0.0-blue?style=flat-square)](https://github.com/pedroespinal/frameup/releases/tag/v1.0.0)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-React%20Native%20%2F%20Expo-blue?style=flat-square)](https://expo.dev)
[![Type Safety](https://img.shields.io/badge/TypeScript-Strict%20Mode-blue?style=flat-square)](tsconfig.json)

---

## 🎯 What is FrameUp?

FrameUp is a comprehensive mobile application designed for photographers to instantly access optimal camera settings for any photographic scenario. Whether you're a student learning photography, a professional seeking quick references, or an enthusiast exploring new camera systems, FrameUp has you covered.

### The Problem It Solves
- 📸 Overwhelmed by camera settings for different scenarios?
- 🤔 Can't remember the right aperture for portraits or depth of field calculations?
- 🌅 Need accurate Golden Hour times for your location?
- 📷 Want quick access to technical photography formulas and calculations?

### The Solution
FrameUp combines:
- **19 Photography Scenes** with expert-recommended camera settings
- **45+ Camera Profiles** with sensor-specific optimization
- **7 Technical Tools** for calculations and reference
- **Real-time GPS** for Golden Hour calculations
- **Favorites System** to save your proven settings

---

## ✨ Features

### 📚 Photography Scene Library (19 Scenes)
```
Night Photography          Landscape              Portrait
├─ Astrophotography      ├─ Golden Hour         ├─ Studio Portrait
├─ Moon Landscape        ├─ Blue Hour           ├─ Natural Light
├─ Urban Night           └─ Waterfalls          └─ Golden Hour
└─ Light Trails

Action/Sports           Events                 Macro/Close-up
├─ Fast Action          ├─ Weddings            ├─ Macro Photography
└─ Water Sports         └─ Concerts            └─ Insect Photography

Street/Architecture
├─ Street Photography
├─ Architecture
└─ Night Cityscape
```

Each scene includes:
- ✅ Optimal camera settings (aperture, speed, ISO, white balance, focus mode, etc.)
- ✅ Professional tips from experienced photographers
- ✅ Important warnings and considerations
- ✅ Sensor-specific optimization (Full Frame, APS-C, M43, Medium Format)

### 📷 Camera Database (45+ Models)
Professional camera support including:
- **Canon**: R5, R3, R6, 5D Mark IV, 6D Mark II, and more
- **Nikon**: Z9, Z8, D850, D780, D750, and more
- **Sony**: A1, A7R V, A7 IV, A6700, and more
- **Panasonic**, **Fujifilm**, **Leica**, **Hasselblad**, and more

### 🔧 Technical Tools (7 Total)

1. **Exposure Triangle Calculator**
   - Relationships between aperture, shutter speed, and ISO
   - Visual representation of trade-offs

2. **Depth of Field (DOF) Calculator**
   - Hyperfocal distance calculations
   - Near and far focus point analysis
   - Sensor-specific measurements

3. **ND Filter Calculator**
   - Long exposure time calculations
   - Multiple filter combinations
   - Light stop reductions

4. **Lens Advisor**
   - Field of view calculations
   - Crop factor adjustments
   - Equivalent focal length calculations

5. **EXIF Reader**
   - Extract metadata from photos
   - Review shooting settings
   - Analyze what worked

6. **My Gear Manager**
   - Inventory of your cameras and lenses
   - Quick settings access
   - Sensor specifications

7. **ND Timer**
   - Long exposure countdown
   - Exposure time tracking
   - Filter timing assistance

### 🌅 Golden Hour Calculator
- **Real-time GPS Location** - Automatic location detection
- **7 Daily Solar Events**:
  - Nautical Dawn (Blue Hour morning)
  - Golden Hour (morning)
  - Solar Noon
  - Golden Hour (afternoon/evening)
  - Sunset
  - Dusk (Blue Hour evening)
  - Astronomical Night
- **7-Day Forecast** - Plan your shoots in advance
- **Accurate Calculations** - Based on exact location and date

### 💾 Favorites & Personal Library
- **Save Configurations** - Store camera + scene combinations that work for you
- **Personal Notes** - Add up to 500 characters of notes per favorite
- **Quick Access** - Instantly recall your proven settings
- **Export Options** - Share as text or image

### 🎨 Theme & Localization
- **Dark Mode** (default) - Professional dark theme optimized for night photography
- **Light Mode** - High-contrast light theme
- **Spanish** (Español) - Complete Spanish translation
- **English** - Full English support
- **Ready for**: Portuguese, French, German, Japanese

---

## 🚀 Quick Start

### Installation

#### Android
1. Download `app-release.apk` from [GitHub Releases](https://github.com/pedroespinal/frameup/releases)
2. Enable "Installation from Unknown Sources" in device settings
3. Open the APK file and tap "Install"
4. Launch FrameUp and grant location permission for Golden Hour feature

#### iOS (Coming Soon)
iOS version will be available in the next release.

### First Launch
1. **Welcome Screen** - Introduction to FrameUp features
2. **Camera Selection** - Choose your camera from 45+ models (optional)
3. **Explore Scenes** - Browse photography scenarios
4. **Start Using** - Search for scenes or use tools

---

## 💡 Use Cases

### For Students
- Learn optimal settings for each photography type
- Understand technical concepts with visual explanations
- Save settings that work for your camera

### For Professionals  
- Quick reference during shoots
- Camera comparison for equipment decisions
- Real-time Golden Hour timing
- Settings validation for different scenarios

### For Enthusiasts
- Explore new photography genres
- Discover technical photography calculations
- Expand equipment knowledge
- Develop consistent photography style

---

## 🛠️ Technology Stack

```
Frontend:
├─ React Native 0.85.3          # Cross-platform mobile
├─ TypeScript 6.0.3              # Type safety
├─ React 19.2.3                  # Component framework
└─ Expo 56.0.8                   # Development framework

Navigation:
└─ Expo Router 56.2.8             # File-based routing

State Management:
└─ React Context API              # Global state

Storage:
├─ AsyncStorage                   # Local persistence
└─ React Native File System       # File operations

APIs & Services:
├─ Expo Location                  # GPS services
├─ Firebase 12.14.0               # Backend ready
└─ SunCalc 1.9.0                  # Solar calculations

Tools:
└─ Expo Symbols                   # Icon system
```

### Platform Support
- **Android**: 7.0 (API 24) - 14 (API 34+)
- **iOS**: 13.0+ (upcoming)
- **Web**: Via Expo Web (experimental)

---

## 📊 Release Information

### v1.0.0 - Initial Release
**Release Date**: 2026-06-27

**Included**:
- 19 photography scenes
- 45+ camera profiles
- 7 technical tools
- Golden Hour calculator with GPS
- Favorites system
- Multi-language support (ES/EN)
- Professional dark/light themes

**Known Limitations**:
- Firebase integration requires configuration
- Community features available for future release
- iOS version coming soon

**Security**:
- ✅ Signed with production RSA-2048 certificate
- ✅ Certificate date: 2026-06-27 (immutable)
- ✅ Valid until 2051-06-21 (25 years)
- ✅ Code minified and obfuscated
- ✅ No tracking or analytics in v1.0.0

---

## 📖 Documentation

- **[INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)** - Step-by-step installation and testing
- **[SECURITY_INFO.md](SECURITY_INFO.md)** - Certificate details and security information
- **[RELEASE_NOTES.md](RELEASE_NOTES.md)** - Feature descriptions and updates
- **[README_BUILD.md](README_BUILD.md)** - Build configuration and compilation
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete project overview

---

## 🤝 Contributing

FrameUp is currently a single-developer project. Future versions may accept contributions.

To report issues or suggest features:
1. [Open an issue on GitHub](https://github.com/pedroespinal/frameup/issues)
2. Email: stonepiedra1976@gmail.com

---

## 📋 Requirements

### Minimum
- Android 7.0 (API 24)
- 100 MB free storage
- Internet connection (for initial data load)

### Recommended  
- Android 10+ (API 29+)
- 200+ MB free storage
- GPS-capable device
- Camera app for reference

### Permissions
- **Location** (optional) - For Golden Hour GPS calculations
- **Camera** (optional) - For future photo capture features
- **Storage** (optional) - For exporting configurations

---

## 🔒 Privacy & Security

### Data Storage
- **All data stored locally** - No cloud upload in v1.0.0
- **No tracking** - No analytics or user tracking
- **No ads** - Completely ad-free
- **Open settings** - View what's stored in settings

### What's Stored Locally
- Search history
- Favorite configurations
- Theme preference
- Language selection
- Gear profile

### What's NOT Stored
- Personal photos
- Camera serial numbers
- Purchase history
- Location history (GPS used only for real-time calculations)

---

## 🎓 Learning Resources

### Inside the App
- **User Guide** - Complete feature walkthrough
- **Professional Tips** - Expert photography advice
- **Scenario Explanations** - Why each setting matters
- **Tool Descriptions** - How to use each calculator

### External Resources
- [Photography Basics](https://en.wikipedia.org/wiki/Photography)
- [Exposure Triangle](https://www.fredmiranda.com/article-85-exposure-triangle)
- [Depth of Field](https://www.dpreview.com/learn/Article/135/Depth-of-Field)
- [Golden Hour Photography](https://www.adobe.com/creativecloud/photography/discover/golden-hour-photography)

---

## 📸 Screenshots

*Coming in future release*

---

## 🎯 Roadmap

### v1.1 (Planned)
- Community photo sharing
- Advanced EXIF editing
- Cloud backup (optional)
- Custom camera profiles

### v1.2 (Planned)
- iOS app launch
- Web version
- Apple Watch support
- Offline mode enhancement

### v2.0 (Future)
- AI scene detection
- Real-time photo analysis
- Social features
- Professional tools expansion

---

## 📞 Support

### Getting Help
1. Check [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) for common issues
2. Review feature descriptions in the app
3. Contact via email: stonepiedra1976@gmail.com
4. [Open an issue on GitHub](https://github.com/pedroespinal/frameup/issues)

### Common Questions

**Q: Is my data secure?**
A: Yes! All data is stored locally on your device. No information is sent to any server in v1.0.0.

**Q: Can I use this offline?**
A: Yes! The app works offline. GPS/Golden Hour features require internet for initial location fetch.

**Q: Why do you need location permission?**
A: Location is only used for the Golden Hour calculator to provide accurate sunset/sunrise times for your exact location.

**Q: Can I export my settings?**
A: Yes! You can export any configuration as text or image and share it with others.

---

## 📄 License

FrameUp © 2026 Pedro Espinal. All rights reserved.

**Terms**: Proprietary application. See [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [React Native](https://reactnative.dev) and [Expo](https://expo.dev)
- Photography education from professional photographers
- Camera database from manufacturer specifications
- Solar calculations from [SunCalc](https://github.com/mourner/suncalc)

---

## 📊 Stats

```
LOC:                ~15,000 lines of code
TypeScript Files:   40+ component files
Data Objects:       1,000+ camera/lens combinations
Photography Scenes: 19 (with full settings)
Supported Cameras:  45+ professional models
Technical Tools:    7 comprehensive calculators
Supported Languages: 2 (English, Spanish)
Target SDK:         API 34 (latest)
Min SDK:            API 24 (Android 7.0)
```

---

## 🎉 Ready to Use!

FrameUp v1.0.0 is production-ready and fully functional.

**[Download Now](https://github.com/pedroespinal/frameup/releases) → [Install Guide](INSTALLATION_GUIDE.md) → [Start Using](README.md)**

**Happy Shooting! 📸**

---

**Made with ❤️ for photographers everywhere**

GitHub: https://github.com/pedroespinal/frameup  
Email: stonepiedra1976@gmail.com  
Website: Coming soon

Last Updated: 2026-06-27
