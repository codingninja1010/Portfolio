# Sets a stylish, practical taskbar theme via TranslucentTB:
#   • Desktop: Acrylic with a subtle dark tint (modern glass look)
#   • Maximized window: Opaque with a slightly darker tint (clear & readable)
# Also enables Windows' built-in transparency effects.
# Usage: Right-click this file and choose "Run with PowerShell".

# --- Easy customization ---
# Choose accents: 'acrylic' | 'clear' | 'blur' | 'opaque' | 'normal'
$DesktopAccent   = 'acrylic'
$MaximizedAccent = 'opaque'

# Colors support alpha. Format: #RRGGBBAA  (last two chars = opacity)
# Examples: '#0f172a80' ~ slate-900 at 50% opacity; '#0b1020cc' ~ deep blue at ~80% opacity
$DesktopColor    = '#0f172a80'
$MaximizedColor  = '#0b1020cc'

# Visual tweaks
$ShowLine        = $false    # hide thin top line on Win11
$BlurRadius      = 30        # 0-750 (primarily affects 'blur'; acrylic manages its own blur but value is safe)

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
    accent      = $DesktopAccent
    color       = $DesktopColor
    show_line   = $ShowLine
    blur_radius = $BlurRadius
  }
  maximized_window_appearance = @{
    enabled     = $true
    accent      = $MaximizedAccent
    color       = $MaximizedColor
    show_line   = $ShowLine
    blur_radius = $BlurRadius
  }
  # Optional: keep overlays clean and readable
  start_opened_appearance = @{
    enabled   = $true
    accent    = 'opaque'
    color     = $MaximizedColor
    show_line = $ShowLine
  }
  search_opened_appearance = @{
    enabled   = $true
    accent    = 'opaque'
    color     = $MaximizedColor
    show_line = $ShowLine
  }
  task_view_opened_appearance = @{
    enabled   = $true
    accent    = 'opaque'
    color     = $MaximizedColor
    show_line = $ShowLine
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
