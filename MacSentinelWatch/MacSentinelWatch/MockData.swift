
import Foundation

class MockData {
    static func getSecurityFeatures() -> [SecurityFeature] {
        return [
            SecurityFeature(
                name: "macOS Updates",
                description: "Keeps your Mac secure by installing the latest security updates",
                status: .enabled,
                setting: "macOS 14.5",
                lastUpdated: Date().addingTimeInterval(-3600 * 24 * 2)
            ),
            SecurityFeature(
                name: "System Integrity Protection",
                description: "Helps prevent malicious software from modifying protected files",
                status: .enabled,
                setting: "Enabled",
                lastUpdated: Date().addingTimeInterval(-3600 * 24 * 7)
            ),
            SecurityFeature(
                name: "FileVault",
                description: "Encrypts your Mac's disk to prevent unauthorized access to your information",
                status: .enabled,
                setting: "Full disk encryption enabled",
                lastUpdated: Date().addingTimeInterval(-3600 * 24 * 14)
            ),
            SecurityFeature(
                name: "XProtect",
                description: "Built-in malware detection and file quarantine system",
                status: .enabled,
                setting: "Version 2099.1",
                lastUpdated: Date().addingTimeInterval(-3600 * 12)
            ),
            SecurityFeature(
                name: "Gatekeeper",
                description: "Ensures only trusted software runs on your Mac",
                status: .enabled,
                setting: "App Store and identified developers",
                lastUpdated: Date().addingTimeInterval(-3600 * 48)
            ),
            SecurityFeature(
                name: "Firewall",
                description: "Controls connections made to your computer from other computers",
                status: .warning,
                setting: "Block all incoming connections: No",
                lastUpdated: Date().addingTimeInterval(-3600 * 36)
            ),
        ]
    }
    
    static func getGatekeeperLogs() -> [LogEntry] {
        return [
            LogEntry(
                timestamp: Date().addingTimeInterval(-60 * 15),
                application: "Visual Studio Code.app",
                path: "/Applications/Visual Studio Code.app/Contents/MacOS/Electron",
                action: "allowed",
                reason: "Developer ID signed"
            ),
            LogEntry(
                timestamp: Date().addingTimeInterval(-60 * 45),
                application: "Chrome.app",
                path: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
                action: "allowed",
                reason: "Developer ID signed"
            ),
            LogEntry(
                timestamp: Date().addingTimeInterval(-3600 * 2),
                application: "Unknown.app",
                path: "/Downloads/UnknownApp.app/Contents/MacOS/UnknownApp",
                action: "blocked",
                reason: "No valid code signature"
            ),
            LogEntry(
                timestamp: Date().addingTimeInterval(-3600 * 12),
                application: "Firefox.app",
                path: "/Applications/Firefox.app/Contents/MacOS/firefox",
                action: "allowed",
                reason: "Developer ID signed"
            ),
            LogEntry(
                timestamp: Date().addingTimeInterval(-3600 * 25),
                application: "SuspiciousApp.app",
                path: "/Downloads/SuspiciousApp.app/Contents/MacOS/SuspiciousApp",
                action: "blocked",
                reason: "Malware detected"
            ),
            LogEntry(
                timestamp: Date().addingTimeInterval(-3600 * 48),
                application: "Safari.app",
                path: "/Applications/Safari.app/Contents/MacOS/Safari",
                action: "allowed",
                reason: "Apple signed"
            ),
        ]
    }
}
