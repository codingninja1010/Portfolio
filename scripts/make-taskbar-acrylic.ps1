# Sets Acrylic taskbar (Desktop) and Opaque when a window is maximized using TranslucentTB.
# Also enables Windows' built-in transparency effects.
# Usage: Right-click this file and choose "Run with PowerShell".

$ErrorActionPreference = 'SilentlyContinue'

Write-Host "Enabling Windows transparency effects..." -ForegroundColor Cyan
$personalize = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize'
New-Item -Path $personalize -Force | Out-Null
Set-ItemProperty -Path $personalize -Name EnableTransparency -Type DWord -Value 1 -Force | Out-Null

function Restart-Explorer {
  Write-Host "Restarting Explorer to apply system transparency..." -ForegroundColor Yellow
  Start-Sleep -Milliseconds 300
  Stop-Process -Name explorer -Force -ErrorAction SilentlyContinue
  Start-Process explorer.exe
}

# Try installing TranslucentTB from Microsoft Store via winget
$pkgId = 'TranslucentTB.TranslucentTB'
$storeUri = 'ms-windows-store://pdp/?productid=9PF4KZ2VN4W9'

if (Get-Command winget -ErrorAction SilentlyContinue) {
  Write-Host "Installing/ensuring TranslucentTB is present..." -ForegroundColor Cyan
  winget install --id $pkgId -e --accept-package-agreements --accept-source-agreements | Out-Null
} else {
  Write-Host "winget not found. Opening Microsoft Store page; install TranslucentTB, then re-run this script." -ForegroundColor Yellow
  Start-Process $storeUri
  return
}

# Launch TranslucentTB (Store app) to ensure LocalState exists
Write-Host "Launching TranslucentTB..." -ForegroundColor Cyan
$startApp = Get-StartApps | Where-Object { $_.Name -like 'TranslucentTB*' } | Select-Object -First 1
if (-not $startApp) {
  Write-Host "Could not find TranslucentTB StartApp. If you just installed it, wait a few seconds and re-run this script." -ForegroundColor Red
  return
}
Start-Process "shell:AppsFolder\$($startApp.AppID)"
Start-Sleep -Seconds 3

# Locate settings file path
$pkg = Get-AppxPackage -Name *TranslucentTB* | Select-Object -First 1
if (-not $pkg) {
  Write-Host "TranslucentTB package not found. Please open it once from Start and re-run the script." -ForegroundColor Red
  return
}

$settingsDir = Join-Path $env:LOCALAPPDATA "Packages\$($pkg.PackageFamilyName)\LocalState"
New-Item -Path $settingsDir -ItemType Directory -Force | Out-Null
$settingsPath = Join-Path $settingsDir 'settings.json'

# Build settings (per official schema)
$settingsObj = @{
  desktop_appearance = @{
    accent    = 'acrylic'  # Fluent blur/glass
    show_line = $false
  }
  maximized_window_appearance = @{
    enabled   = $true
    accent    = 'opaque'   # readable when maximized
    show_line = $false
  }
}

$settingsJson = $settingsObj | ConvertTo-Json -Depth 6
$settingsJson | Out-File -FilePath $settingsPath -Encoding utf8 -Force
Write-Host "Wrote settings to: $settingsPath" -ForegroundColor Green

# Restart TranslucentTB to apply
Write-Host "Applying settings..." -ForegroundColor Cyan
Get-Process | Where-Object { $_.ProcessName -like 'TranslucentTB*' } | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Milliseconds 500
Start-Process "shell:AppsFolder\$($startApp.AppID)"

# Optional: restart Explorer once to make sure system transparency is active
Restart-Explorer

Write-Host "`nDone! Tips:" -ForegroundColor Green
Write-Host "  • Right-click the TranslucentTB tray icon → check 'Open at boot' to autostart."
Write-Host "  • To tweak tint: tray icon → Color. Pick a dark tint with low alpha for a glassy dark look."
Write-Host "  • Re-run this script anytime to restore your preferred profile."
