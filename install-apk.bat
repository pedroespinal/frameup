@echo off
REM FrameUp APK Installer Script
REM Automatically builds and installs the APK to a connected Android device

echo.
echo =========================================
echo   FrameUp APK Builder & Installer
echo =========================================
echo.

REM Check if Android device is connected
adb devices | findstr /R "device$" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: No Android device found!
    echo Please connect your Android device via USB and enable USB debugging.
    echo.
    echo Steps:
    echo   1. Connect device via USB cable
    echo   2. Open Settings ^> Developer Options
    echo   3. Enable "USB Debugging"
    echo   4. Run this script again
    pause
    exit /b 1
)

echo ✓ Android device detected

REM Check if APK already built
if exist "android\app\build\outputs\apk\debug\app-debug.apk" (
    echo ✓ APK found (previously built)
    goto :INSTALL
)

REM Build APK
echo.
echo Building APK...
echo.

cd android
call gradlew.bat assembleDebug
cd ..

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo ✓ APK built successfully

:INSTALL
echo.
echo Installing APK to device...
echo.

adb install -r "android\app\build\outputs\apk\debug\app-debug.apk"

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Installation failed!
    pause
    exit /b 1
)

echo.
echo ✓ Installation successful!
echo.
echo Launching app...
adb shell am start -n com.pedroespinal.frameup/.MainActivity

echo.
echo =========================================
echo   FrameUp installed successfully!
echo =========================================
echo.
pause
