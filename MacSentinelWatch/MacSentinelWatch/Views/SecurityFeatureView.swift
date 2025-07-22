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
                ("network.firewall", .green) :
                ("network.firewall", .red)
        case "macOS Updates":
            if feature.status == .enabled {
                return ("laptopcomputer.and.arrow.down", .green)
            } else if feature.status == .warning {
                return ("laptopcomputer.trianglebadge.exclamationmark", .yellow)
            } else if feature.status == .disabled {
                return ("laptopcomputer.trianglebadge.exclamationmark", .red)
            }
        case "FileVault":
            return feature.status == .enabled ?
                ("internaldrive.fill.badge.checkmark", .green) :
                ("internaldrive.fill.badge.exclamationmark", .red)
        case "Gatekeeper":
            return feature.status == .enabled ?
                ("internaldrive.fill.badge.checkmark", .green) :
                ("internaldrive.fill.badge.exclamationmark", .red)
        case "System Integrity Protection":
            return feature.status == .enabled ?
                ("internaldrive.fill.badge.checkmark", .green) :
                ("internaldrive.fill.badge.exclamationmark", .red)
        case "XProtect":
            return feature.status == .enabled ?
                ("ladybug.fill", .green) :
                ("ladybug.fill", .red)
        default:
            return ("questionmark.circle.fill", .gray)
        }
        
        return ("questionmark.circle.fill", .gray)
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
                VStack(spacing: 8) {
                    let icon = iconForFeature()
                    
                    // Icon container with fixed dimensions
                    ZStack {
                        Image(systemName: icon.name)
                            .resizable()
                            .scaledToFit()
                            .frame(width: 36, height: 36)
                            .foregroundColor(icon.color)
                            .fontWeight(.medium)
                    }
                    .frame(width: 60, height: 60) // Fixed container size for all icons
                    
                    // Text with fixed dimensions
                    Text(feature.name)
                        .font(.system(size: 13, weight: .semibold))
                        .multilineTextAlignment(.center)
                        .lineLimit(2)
                        .frame(height: 32) // Fixed height instead of minHeight
                        .frame(maxWidth: .infinity)
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .center)
            },
            footerContent: nil
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
