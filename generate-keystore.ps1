# FrameUp Release Keystore Generation Script
# Crea un keystore firmado con la fecha de creación del app (2026-06-27)

$keystoreFile = "frameup.jks"
$keyAlias = "frameup"
$keystorePassword = "FrameUpKeystore2026!Secure"
$keyPassword = "FrameUp2026SecureKey!Release"
$validity = 9125  # 25 años (hasta 2051)

Write-Host "🔐 Generando keystore de producción para FrameUp..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Configuración:" -ForegroundColor Yellow
Write-Host "  • Archivo: $keystoreFile"
Write-Host "  • Alias: $keyAlias"
Write-Host "  • Validez: $validity días (hasta 2051)"
Write-Host "  • Fecha creación: 2026-06-27"
Write-Host ""

# Parámetros para keytool
$dname = "CN=FrameUp Photography App, OU=Photography Tools, O=FrameUp, L=Global, ST=Digital, C=US"

# Generar keystore
Write-Host "Ejecutando keytool..." -ForegroundColor Cyan
keytool -genkey -v -keystore $keystoreFile `
  -keyalg RSA -keysize 2048 `
  -validity $validity `
  -alias $keyAlias `
  -storepass $keystorePassword `
  -keypass $keyPassword `
  -dname $dname

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Keystore generado exitosamente!" -ForegroundColor Green
    Write-Host ""

    # Mostrar información del keystore
    Write-Host "📋 Información del Keystore:" -ForegroundColor Cyan
    keytool -list -v -keystore $keystoreFile -storepass $keystorePassword

    Write-Host ""
    Write-Host "📍 Ubicación: $(Resolve-Path $keystoreFile)" -ForegroundColor Green
    Write-Host "💾 Tamaño: $([math]::Round((Get-Item $keystoreFile).Length / 1KB, 2)) KB" -ForegroundColor Green

    # Guardar contraseñas en archivo seguro (SOLO PARA DESARROLLO)
    Write-Host ""
    Write-Host "⚠️  IMPORTANTE:" -ForegroundColor Red
    Write-Host "  - Guarda estas contraseñas en un lugar seguro"
    Write-Host "  - NUNCA commitees el keystore a version control"
    Write-Host "  - NUNCA compartas las contraseñas"
    Write-Host ""
    Write-Host "Contraseña Keystore: $keystorePassword" -ForegroundColor Yellow
    Write-Host "Contraseña Key: $keyPassword" -ForegroundColor Yellow

} else {
    Write-Host ""
    Write-Host "❌ Error generando keystore" -ForegroundColor Red
    exit 1
}
