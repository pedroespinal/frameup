# 🔨 FrameUp Build Instructions

## Automatic Clean Build Scripts

These scripts automatically:
1. ✅ Remove all old APK files from release folder
2. ✅ Compile fresh release APK
3. ✅ Sign with production certificate (2026-06-27)
4. ✅ Rename with current version from app.json
5. ✅ Keep only the latest APK (no old versions)

---

## 🖥️ Windows (PowerShell)

### Quick Start
```powershell
.\build-clean-apk.ps1
```

### What It Does
- Reads version from `app.json`
- Deletes all old `*.apk` files from `android/app/build/outputs/apk/release/`
- Runs `gradle clean assembleRelease`
- Signs APK with production keystore
- Renames APK to `frameup-v{VERSION}.apk`
- Shows installation instructions

### Example Output
```
════════════════════════════════════════════════════════════
  FrameUp Release Build - Clean Old APKs
════════════════════════════════════════════════════════════

📊 Build Information:
   Version: 1.0.1
   Build Code: 2

🧹 Cleaning old APK files...
   Removing: frameup-v1.0.0.apk
   ✅ Old APKs cleaned

🔨 Compiling fresh release APK...

✅ Build successful!

📦 Generated APK:
   Original name: app-release.apk
   New name: frameup-v1.0.1.apk
   Size: 100 MB
   Location: C:\FrameUp\android\app\build\outputs\apk\release\frameup-v1.0.1.apk

🔐 Signing APK...
✅ APK signed successfully!

════════════════════════════════════════════════════════════
✨ FrameUp v1.0.1 - READY TO INSTALL
════════════════════════════════════════════════════════════

📍 Location:
   C:\FrameUp\android\app\build\outputs\apk\release\frameup-v1.0.1.apk

📱 Install with:
   adb install -r "C:\FrameUp\android\app\build\outputs\apk\release\frameup-v1.0.1.apk"
```

---

## 🐧 Linux / macOS (Bash)

### Quick Start
```bash
chmod +x build-clean-apk.sh
./build-clean-apk.sh
```

### What It Does
- Same as PowerShell version
- Works on Linux and macOS
- Requires `jarsigner` installed (Android Studio JDK)

---

## 📋 Versioning Strategy

Each time you run the build script:

1. **Old APKs are deleted**
   ```
   ❌ frameup-v1.0.0.apk         (deleted if exists)
   ❌ frameup-v1.0.1.apk         (deleted if exists)
   ❌ app-release.apk            (deleted if exists)
   ```

2. **Fresh APK is compiled**
   ```
   ✅ gradlew clean assembleRelease
   ```

3. **New APK is created and signed**
   ```
   ✅ frameup-v{VERSION}.apk (renamed and signed)
   ```

### Example with Version Updates

**Iteration 1:** Build v1.0.0
```
Result: frameup-v1.0.0.apk (100 MB)
```

**Update app.json to v1.0.1, then build again:**
```
Before: frameup-v1.0.0.apk deleted
Build:  Fresh compilation
After:  frameup-v1.0.1.apk (100 MB) - only this APK remains
```

**Update app.json to v1.0.2, then build again:**
```
Before: frameup-v1.0.1.apk deleted
Build:  Fresh compilation
After:  frameup-v1.0.2.apk (100 MB) - only this APK remains
```

---

## 🚀 Usage Workflow

### Step 1: Update Version (if needed)
```json
// app.json
{
  "expo": {
    "version": "1.0.2",
    "android": {
      "versionCode": 3,
      ...
    }
  }
}
```

### Step 2: Run Build Script
```powershell
# Windows
.\build-clean-apk.ps1

# Linux/macOS
./build-clean-apk.sh
```

### Step 3: Install from New APK
```bash
adb install -r "android/app/build/outputs/apk/release/frameup-v1.0.2.apk"
```

### Step 4: Commit Changes
```bash
git add app.json
git commit -m "Bump version to 1.0.2"
git push origin master
```

---

## 🎯 Benefits

✅ **No APK Clutter**
- Only latest version stored locally
- No confusion about which APK is current
- Saves disk space

✅ **Automatic Version Naming**
- Version embedded in filename
- Clear what version you're testing
- Easy to track across builds

✅ **Single Command**
- One script does everything
- No manual steps
- Less error-prone

✅ **Always Clean Build**
- `gradle clean` ensures no stale artifacts
- Reproducible builds
- Reliable releases

---

## 🔐 Requirements

### PowerShell Script
- Windows PowerShell or pwsh 7+
- `gradlew.bat` in android folder
- `jarsigner` from Android Studio (auto-located)
- `frameup.jks` keystore file

### Bash Script
- Bash shell (Linux/macOS)
- `gradlew` in android folder
- `jarsigner` in PATH
- `frameup.jks` keystore file

---

## 📊 Build Properties

The scripts read these from `app.json`:
- `expo.version` - App version (1.0.1, 1.0.2, etc)
- `expo.android.versionCode` - Build code (must increment each release)

Update these BEFORE running the build script:

```json
{
  "expo": {
    "version": "1.0.1",          // ← Increment this
    "android": {
      "versionCode": 2,          // ← Increment this (1 → 2 → 3 → ...)
      ...
    }
  }
}
```

---

## ⚠️ Important Notes

1. **Version Code Must Increment**
   - Each release must have a higher versionCode
   - versionCode must be integer (1, 2, 3, not 1.0, 1.1)
   - Required for Play Store releases

2. **Keystore is Critical**
   - `frameup.jks` must exist
   - Same keystore required for all updates
   - Backup it in a secure location

3. **Clean Builds**
   - Script always runs `gradle clean`
   - Takes longer than incremental builds
   - Ensures reproducible releases

---

## 🎉 Quick Reference

| Task | Command |
|------|---------|
| Build latest version | `.\build-clean-apk.ps1` |
| Check app version | `grep "version" app.json` |
| Install APK | `adb install -r android/app/.../frameup-v*.apk` |
| List old builds | `ls android/app/build/outputs/apk/release/` |

---

**That's it! Run the script, get a clean APK, no old versions cluttering your disk. 🚀**
