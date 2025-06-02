
# Watchtower

A native macOS application for monitoring and managing security features of your Mac.

## Features

- Dashboard showing overall security status
- Individual security feature cards showing detailed status
- System Integrity Protection status
- Firewall status
- FileVault encryption status
- XProtect and Gatekeeper status
- macOS update status
- Activity logs for security events

## Requirements

- macOS 14.0 or later
- Xcode 15.0 or later

## Building the App

1. Open the `Watchtower.xcodeproj` file in Xcode
2. Select your development team in the Signing & Capabilities tab
3. Build and run the app

## Implementation Details

This app is built using SwiftUI and follows modern macOS app design guidelines. It demonstrates:

- Native SwiftUI interface
- Status indicators with system colors
- Integration with macOS system settings
- Tab-based interface
- Filtering capabilities for logs
- Direct AppleScript integration to open System Settings panels

## Screenshots

(Screenshots would be included here in a real README)
