#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Build FrameUp Release APK and clean old versions

.DESCRIPTION
    - Removes all old APK files from release folder
    - Compiles fresh release APK
    - Signs with production certificate
    - Names with current version from app.json

.EXAMPLE
    .\build-clean-apk.ps1
#>

param(
    [switch]$NoClean = $false
)

$ErrorActionPreference = "Stop"

Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  FrameUp Release Build - Clean Old APKs" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Get current version from app.json
$appJson = Get-Content "app.json" | ConvertFrom-Json
$VERSION = $appJson.expo.version
$VERSIONCODE = $appJson.expo.android.versioncode

Write-Host "📊 Build Information:" -ForegroundColor Green
Write-Host "   Version: $VERSION"
Write-Host "   Build Code: $VERSIONCODE"
Write-Host ""

# Clean old APKs
$releaseDir = "android\app\build\outputs\apk\release"
if (Test-Path $releaseDir) {
    $oldApks = Get-ChildItem "$releaseDir\*.apk" -ErrorAction SilentlyContinue

    if ($oldApks -and -not $NoClean) {
        Write-Host "🧹 Cleaning old APK files..." -ForegroundColor Yellow
        foreach ($apk in $oldApks) {
            Write-Host "   Removing: $($apk.Name)" -ForegroundColor Yellow
            Remove-Item $apk.FullName -Force
        }
        Write-Host "   ✅ Old APKs cleaned" -ForegroundColor Green
        Write-Host ""
    }
}

# Compile fresh release APK
Write-Host "🔨 Compiling fresh release APK..." -ForegroundColor Cyan
Write-Host ""

cd "android"

# Clean and build
$buildOutput = & ".\gradlew.bat" clean assembleRelease --no-daemon 2>&1

# Check if build succeeded
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host ""

    # Find the generated APK
    $generatedApk = Get-Item "$releaseDir\app-release.apk" -ErrorAction SilentlyContinue

    if ($generatedApk) {
        $apkSize = [math]::Round($generatedApk.Length / 1MB, 2)

        # Rename to include version
        $newApkName = "frameup-v$VERSION.apk"
        $newApkPath = Join-Path $releaseDir $newApkName

        Write-Host "📦 Generated APK:" -ForegroundColor Green
        Write-Host "   Original name: $($generatedApk.Name)"
        Write-Host "   New name: $newApkName"
        Write-Host "   Size: $apkSize MB"
        Write-Host "   Location: $newApkPath"
        Write-Host ""

        # Rename
        Rename-Item $generatedApk.FullName $newApkPath -Force

        # Sign with jarsigner
        Write-Host "🔐 Signing APK..." -ForegroundColor Cyan
        $JARSIGNER = "C:\Program Files\Android\Android Studio\jbr\bin\jarsigner.exe"

        & $JARSIGNER `
            -verbose `
            -sigalg SHA384withRSA `
            -digestalg SHA-256 `
            -keystore ..\frameup.jks `
            -storepass "FrameUpKeystore2026!Secure" `
            -keypass "FrameUp2026SecureKey!Release" `
            "$newApkPath" `
            "frameup" 2>&1 | Select-Object -Last 5

        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✅ APK signed successfully!" -ForegroundColor Green
            Write-Host ""
            Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
            Write-Host "✨ FrameUp v$VERSION - READY TO INSTALL" -ForegroundColor Green
            Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
            Write-Host ""
            Write-Host "📍 Location:" -ForegroundColor Green
            Write-Host "   $newApkPath"
            Write-Host ""
            Write-Host "📱 Install with:" -ForegroundColor Green
            Write-Host "   adb install -r `"$newApkPath`""
            Write-Host ""
        } else {
            Write-Host "❌ Signing failed!" -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "❌ APK file not found after build!" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Last output lines:" -ForegroundColor Yellow
    $buildOutput | Select-Object -Last 20 | ForEach-Object { Write-Host "   $_" }
    exit 1
}

cd ".."
