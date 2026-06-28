#!/bin/bash

# ============================================================
# FrameUp Release Build - Clean Old APKs
# ============================================================
# - Removes all old APK files from release folder
# - Compiles fresh release APK
# - Signs with production certificate
# - Names with current version from app.json
# ============================================================

set -e

echo "============================================================"
echo "  FrameUp Release Build - Clean Old APKs"
echo "============================================================"
echo ""

# Get current version from app.json
VERSION=$(grep '"version"' app.json | head -1 | sed 's/.*"version": "\([^"]*\)".*/\1/')
BUILD_CODE=$(grep '"versionCode"' app.json | grep android -A 5 | sed 's/.*"versionCode": \([0-9]*\).*/\1/')

echo "📊 Build Information:"
echo "   Version: $VERSION"
echo "   Build Code: $BUILD_CODE"
echo ""

# Clean old APKs
RELEASE_DIR="android/app/build/outputs/apk/release"
if [ -d "$RELEASE_DIR" ]; then
    if ls "$RELEASE_DIR"/*.apk 1> /dev/null 2>&1; then
        echo "🧹 Cleaning old APK files..."
        for apk in "$RELEASE_DIR"/*.apk; do
            if [ -f "$apk" ]; then
                echo "   Removing: $(basename "$apk")"
                rm "$apk"
            fi
        done
        echo "   ✅ Old APKs cleaned"
        echo ""
    fi
fi

# Compile fresh release APK
echo "🔨 Compiling fresh release APK..."
echo ""

cd android

# Clean and build
./gradlew clean assembleRelease --no-daemon

# Check if build succeeded
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""

    # Find the generated APK
    if [ -f "$RELEASE_DIR/app-release.apk" ]; then
        # Get file size
        APK_SIZE=$(ls -lh "$RELEASE_DIR/app-release.apk" | awk '{print $5}')

        # Rename to include version
        NEW_APK_NAME="frameup-v$VERSION.apk"
        NEW_APK_PATH="$RELEASE_DIR/$NEW_APK_NAME"

        echo "📦 Generated APK:"
        echo "   Original name: app-release.apk"
        echo "   New name: $NEW_APK_NAME"
        echo "   Size: $APK_SIZE"
        echo "   Location: $NEW_APK_PATH"
        echo ""

        # Rename
        mv "$RELEASE_DIR/app-release.apk" "$NEW_APK_PATH"

        # Sign with jarsigner
        echo "🔐 Signing APK..."
        JARSIGNER="/c/Program Files/Android/Android Studio/jbr/bin/jarsigner.exe"

        "$JARSIGNER" \
            -verbose \
            -sigalg SHA384withRSA \
            -digestalg SHA-256 \
            -keystore ../frameup.jks \
            -storepass "FrameUpKeystore2026!Secure" \
            -keypass "FrameUp2026SecureKey!Release" \
            "$NEW_APK_PATH" \
            "frameup" 2>&1 | tail -5

        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ APK signed successfully!"
            echo ""
            echo "============================================================"
            echo "✨ FrameUp v$VERSION - READY TO INSTALL"
            echo "============================================================"
            echo ""
            echo "📍 Location:"
            echo "   $(pwd -W)/$NEW_APK_PATH"
            echo ""
            echo "📱 Install with:"
            echo "   adb install -r \"$(pwd -W)/$NEW_APK_PATH\""
            echo ""
        else
            echo ""
            echo "❌ Signing failed!"
            exit 1
        fi
    else
        echo "❌ APK file not found after build!"
        exit 1
    fi
else
    echo ""
    echo "❌ Build failed!"
    exit 1
fi

cd ..
