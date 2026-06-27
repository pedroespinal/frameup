# Sign APK with production keystore using jarsigner
# This script signs the unsigned release APK with the production certificate

$apkPath = "android/app/build/outputs/apk/release/app-release.apk"
$unsignedApk = "android/app/build/outputs/apk/release/app-release-unsigned.apk"
$keystoreFile = "frameup.jks"
$keyAlias = "frameup"
$keystorePassword = "FrameUpKeystore2026!Secure"
$keyPassword = "FrameUp2026SecureKey!Release"

$KEYTOOL = "C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe"
$JARSIGNER = "C:\Program Files\Android\Android Studio\jbr\bin\jarsigner.exe"

Write-Host "=== FrameUp APK Signing ===" -ForegroundColor Cyan
Write-Host ""

# Check if unsigned APK exists
if ((Test-Path $apkPath) -and (Test-Path $unsignedApk)) {
    Write-Host "Multiple APK versions found - using unsigned version"
    $inputApk = $unsignedApk
} elseif (Test-Path $apkPath) {
    Write-Host "Release APK found: $apkPath"
    $inputApk = $apkPath
} else {
    Write-Host "ERROR: Release APK not found!" -ForegroundColor Red
    exit 1
}

Write-Host "Signing APK..." -ForegroundColor Yellow

# Sign the APK
& $JARSIGNER -verbose `
  -sigalg SHA384withRSA `
  -digestalg SHA-256 `
  -keystore $keystoreFile `
  -storepass $keystorePassword `
  -keypass $keyPassword `
  $inputApk `
  $keyAlias

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "SUCCESS: APK signed!" -ForegroundColor Green
    Write-Host ""

    # Verify signature
    Write-Host "Verifying signature..." -ForegroundColor Cyan
    & $JARSIGNER -verify -verbose $inputApk

    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "SUCCESS: Signature verified!" -ForegroundColor Green

        # Display certificate info
        Write-Host ""
        Write-Host "Certificate Information:" -ForegroundColor Cyan
        & $KEYTOOL -list -v -keystore $keystoreFile -storepass $keystorePassword | grep -A 20 "Owner:"

        # File info
        $file = Get-Item $inputApk
        Write-Host ""
        Write-Host "File: $($file.Name)" -ForegroundColor Green
        Write-Host "Size: $([math]::Round($file.Length / 1MB, 2)) MB" -ForegroundColor Green
        Write-Host "Path: $($file.FullName)" -ForegroundColor Green

    } else {
        Write-Host "ERROR: Signature verification failed!" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "ERROR: APK signing failed!" -ForegroundColor Red
    exit 1
}
