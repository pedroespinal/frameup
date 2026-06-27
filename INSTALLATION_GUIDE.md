# FrameUp Installation & Testing Guide

## 📱 Installing the APK on Your Android Device

### Step 1: Transfer APK to Device

**Option A: Via USB Cable**
1. Connect Android device to computer via USB cable
2. Navigate to: `C:\FrameUp\android\app\build\outputs\apk\debug\`
3. Find file: `app-debug.apk`
4. Drag and drop to device's Downloads folder

**Option B: Via Email**
1. Email the APK file to yourself
2. Download on device
3. Open file manager and locate the APK

**Option C: Via Cloud**
1. Upload APK to Google Drive, Dropbox, or similar
2. Download on device through cloud app

### Step 2: Enable Installation from Unknown Sources

1. Open **Settings** on device
2. Go to **Security** (or **Applications** for some devices)
3. Enable **"Unknown Sources"** or **"Install unknown apps"**
4. Select **File Manager** and allow installation

### Step 3: Install the APK

1. Open **File Manager** on device
2. Navigate to where you downloaded/transferred the APK
3. Tap the APK file (`app-debug.apk`)
4. Tap **"Install"** on the permission prompt
5. Wait for installation to complete
6. Tap **"Open"** to launch app

### Step 4: Grant Required Permissions

When first launching FrameUp:
- ✅ **Location Permission** - Required for Golden Hour Calculator
  - Tap "Allow" or "Allow only while using the app"
  - The app uses GPS for accurate solar calculations

- ✅ **Camera Permission** (optional but recommended)
  - Required for future in-app camera features

- ✅ **Storage Permission** (optional)
  - Allows saving exported configurations

## 🧪 Testing Checklist

### Navigation & Basics
- [ ] App launches without crashing
- [ ] Bottom tab navigation works (Search, Scenes, Tools, Favorites, About)
- [ ] Tap each tab and verify content loads
- [ ] Back button works on nested screens
- [ ] Settings icon accessible from tabs

### Search Feature
- [ ] Home screen displays suggested searches
- [ ] Type in search box (e.g., "night photography")
- [ ] Results appear for matching scenes
- [ ] Tap on search suggestion fills search box
- [ ] Clear button (X) clears search
- [ ] Search history appears when search is empty
- [ ] Can clear all search history

### Scenes Library
- [ ] All 19 scenes display in library
- [ ] Filter by category works (Noche, Paisaje, Retrato, etc.)
- [ ] Scene cards show correct emoji and difficulty level
- [ ] Tap scene opens detail view

### Scene Settings Screen
- [ ] Select camera from dropdown
- [ ] Camera list shows 45+ models organized by brand
- [ ] Sensor type badge displays correctly
- [ ] Camera settings load for selected camera
- [ ] Save/Bookmark button works
- [ ] Compare button allows selecting second camera
- [ ] Export button shares settings (as text or image)

### Camera Settings Display
- [ ] All 9 settings display:
  - Aperture
  - Shutter Speed
  - ISO
  - White Balance
  - Focus Mode
  - Metering
  - Drive Mode
  - Stabilization
  - File Format
- [ ] Tap each setting to expand and read explanation
- [ ] Tips section shows pro tips (if available)
- [ ] Warnings section shows cautions (if available)

### Favorites Feature
- [ ] Bookmark a camera + scene combination
- [ ] Favorited item appears in Favorites tab
- [ ] Can add personal notes to favorites
- [ ] Delete button removes from favorites
- [ ] Notes persist after app restart

### Golden Hour Calculator
- [ ] Screen requests location permission
- [ ] Shows current location
- [ ] Refresh button updates location
- [ ] Displays 7 solar events with times
- [ ] Shows 7-day forecast
- [ ] Next upcoming event is highlighted
- [ ] Countdown timer shows time until next event

### Tools Section
Verify each tool loads and basic functionality:
- [ ] **Triangle** - Exposure triangle displays
- [ ] **DOF** - Depth of field calculator works
- [ ] **ND Timer** - Timer functionality works
- [ ] **ND Calculator** - Filter calculations display
- [ ] **Lens** - Lens information displays
- [ ] **Lens Settings** - My lens list accessible
- [ ] **My Gear** - Gear inventory functional
- [ ] **EXIF** - Can select and view image EXIF data

### Theme & Settings
- [ ] Settings icon accessible
- [ ] Can toggle dark/light mode
- [ ] Theme changes persist after app restart
- [ ] Language toggle works (ES/EN)
- [ ] Text properly translates in both languages
- [ ] About screen shows version info

### Performance & Stability
- [ ] App doesn't freeze or crash during navigation
- [ ] Transitions between screens are smooth
- [ ] Scrolling lists is responsive
- [ ] No missing images or text
- [ ] All buttons are clickable and responsive
- [ ] No memory leaks (app remains responsive after 10+ minutes)

### Text & Localization
- [ ] All UI text is visible and readable
- [ ] Spanish text displays correctly (if selected)
- [ ] English text displays correctly (if selected)
- [ ] Icons display properly
- [ ] Long text doesn't overflow containers

## 📊 Performance Benchmarks

**Target Performance Metrics:**
- App launch time: < 3 seconds
- Scene search results: < 500ms
- Settings screen load: < 1 second
- Golden Hour location fetch: < 5 seconds
- Smooth scrolling: 60 FPS

## 🐛 Reporting Issues

If you find bugs or crashes:

1. **Note the error:** Screenshot or write down error message
2. **Record steps:** How to reproduce the issue
3. **Provide device info:**
   - Android version
   - Device model
   - App version (shown in About)
4. **Report on GitHub:** https://github.com/pedroespinal/frameup/issues
5. **Or email:** stonepiedra1976@gmail.com

### Example Bug Report Format:
```
Title: App crashes when selecting camera

Device: Samsung Galaxy S21, Android 13
Reproduction steps:
1. Launch app
2. Tap "Scenes" tab
3. Select any scene (e.g., "Vía Láctea")
4. Tap on camera dropdown
5. Scroll and select a camera
6. App crashes

Expected: Scene settings should load
Actual: App closes with error

Error message: [paste if available]
```

## ✅ Sign-Off Checklist

After testing, verify:
- [ ] All navigation works
- [ ] All features launch without crashing
- [ ] Permissions function correctly
- [ ] Data persists after app restart
- [ ] Performance is acceptable
- [ ] UI looks polished and professional
- [ ] All text is properly localized

## 🎯 Success Criteria

The app is ready for release when:
✅ Zero crashes during 1-hour usage
✅ All core features are functional
✅ Navigation is smooth and intuitive
✅ Performance meets benchmarks
✅ UI looks professional

---

**Questions?** Contact: stonepiedra1976@gmail.com
