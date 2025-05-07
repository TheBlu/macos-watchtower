
import SwiftUI

struct SecurityFeatureView: View {
    let feature: SecurityFeature
    let hideDescription: Bool
    let hideButton: Bool
    
    init(feature: SecurityFeature, hideDescription: Bool = false, hideButton: Bool = false) {
        self.feature = feature
        self.hideDescription = hideDescription
        self.hideButton = hideButton
    }
    
    private func iconForFeature() -> (name: String, color: Color) {
        switch feature.name {
        case "Firewall":
            return feature.status == .enabled ? 
                ("shield.lefthalf.filled", .green) : 
                ("shield.slash", .red)
        case "macOS Updates":
            if feature.status == .enabled {
                return ("arrow.clockwise.circle.fill", .green)
            } else if feature.status == .warning {
                return ("exclamationmark.arrow.circlepath", .yellow)
            } else if feature.status == .disabled {
                return ("xmark.circle", .red)
            }
        case "FileVault":
            return feature.status == .enabled ?
                ("lock.fill", .green) :
                ("lock.open.fill", .red)
        case "Gatekeeper":
            return feature.status == .enabled ?
                ("checkmark.shield.fill", .green) :
                ("xmark.shield.fill", .red)
        case "System Integrity Protection":
            return feature.status == .enabled ?
                ("internaldrive.fill", .green) :
                ("internaldrive.fill.badge.exclamationmark", .red)
        case "XProtect":
            return feature.status == .enabled ?
                ("laptopcomputer.and.arrow.down", .green) :
                ("laptopcomputer.trianglebadge.exclamationmark", .red)
        default:
            return ("questionmark.circle", .gray)
        }
        
        return ("questionmark.circle", .gray)
    }
    
    private var statusText: String {
        if feature.name == "Firewall" {
            return feature.status == .enabled ? "Protection active" : "Not protecting"
        }
        
        if feature.name == "macOS Updates" {
            switch feature.status {
            case .enabled: return "Up to date"
            case .warning: return "Updates available"
            case .disabled: return "Updates disabled"
            default: return ""
            }
        }
        
        return ""
    }
    
    private var settingLabel: String {
        return feature.name == "macOS Updates" ? "Version:" : "Setting:"
    }
    
    var body: some View {
        StatusCardView(
            title: feature.name,
            status: feature.status,
            description: hideDescription ? "" : feature.description,
            lastUpdated: feature.lastUpdated,
            content: {
                VStack(alignment: .leading, spacing: 4) {
                    if let setting = feature.setting {
                        HStack(spacing: 4) {
                            Text(settingLabel)
                                .font(.system(size: 12, weight: .medium))
                            Text(setting)
                                .font(.system(size: 12))
                        }
                    }
                    
                    if !statusText.isEmpty {
                        HStack(spacing: 4) {
                            let icon = iconForFeature()
                            Image(systemName: icon.name)
                                .foregroundColor(icon.color)
                                .frame(width: 12, height: 12)
                            Text(statusText)
                                .font(.system(size: 12))
                        }
                    }
                }
            },
            footerContent: !hideButton && feature.name != "System Integrity Protection" ?
                AnyView(
                    Button("Open Settings") {
                        openSystemSettings(for: feature.name)
                    }
                    .font(.system(size: 11))
                    .controlSize(.small)
                ) : nil
        )
    }
    
    private func openSystemSettings(for feature: String) {
        var settingsSection = ""
        
        switch feature {
        case "macOS Updates":
            settingsSection = "Software Update"
        case "FileVault", "XProtect", "Gatekeeper":
            settingsSection = "Privacy & Security"
        case "Firewall":
            settingsSection = "Network Firewall"
        default:
            settingsSection = ""
        }
        
        let script = """
        tell application "System Settings"
            activate
            tell application "System Events"
                delay 0.5
                if name of windows of application process "System Settings" contains "System Settings" then
                    tell application process "System Settings"
                        click menu item "\(settingsSection)" of menu 1 of menu bar item "View" of menu bar 1
                    end tell
                end if
            end tell
        end tell
        """
        
        let task = Process()
        task.launchPath = "/usr/bin/osascript"
        task.arguments = ["-e", script]
        
        do {
            try task.run()
        } catch {
            print("Failed to open System Settings: \(error)")
        }
    }
}
