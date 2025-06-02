
import Foundation

class MockData {
    static func getSecurityFeatures() -> [SecurityFeature] {
        return [
            SecurityFeature(
                name: "macOS Updates",
                description: "Keep your system up to date with the latest security patches",
                status: .warning,
                setting: "macOS Sonoma 14.1.2",
                lastUpdated: Calendar.current.date(byAdding: .day, value: -2, to: Date()) ?? Date()
            ),
            SecurityFeature(
                name: "System Integrity Protection",
                description: "Protects critical system files from modification",
                status: .enabled,
                setting: "Enabled",
                lastUpdated: Date()
            ),
            SecurityFeature(
                name: "FileVault",
                description: "Full-disk encryption to protect your data",
                status: .enabled,
                setting: "256-bit AES encryption",
                lastUpdated: Calendar.current.date(byAdding: .hour, value: -6, to: Date()) ?? Date()
            ),
            SecurityFeature(
                name: "XProtect",
                description: "Built-in antimalware protection",
                status: .enabled,
                setting: "Version 2169",
                lastUpdated: Calendar.current.date(byAdding: .hour, value: -1, to: Date()) ?? Date()
            ),
            SecurityFeature(
                name: "Gatekeeper",
                description: "Verifies downloaded applications before they run",
                status: .enabled,
                setting: "App Store and identified developers",
                lastUpdated: Date()
            ),
            SecurityFeature(
                name: "Firewall",
                description: "Blocks unauthorized network connections",
                status: .disabled,
                setting: "Disabled",
                lastUpdated: Calendar.current.date(byAdding: .day, value: -7, to: Date()) ?? Date()
            )
        ]
    }
    
    static func getGatekeeperLogs() -> [LogEntry] {
        let now = Date()
        return [
            LogEntry(
                timestamp: Calendar.current.date(byAdding: .minute, value: -15, to: now) ?? now,
                application: "Discord",
                path: "/Applications/Discord.app",
                action: "allowed",
                reason: "Signed by identified developer",
                message: "Application launched successfully",
                level: "info"
            ),
            LogEntry(
                timestamp: Calendar.current.date(byAdding: .hour, value: -2, to: now) ?? now,
                application: "Unknown App",
                path: "/Users/user/Downloads/suspicious-app.app",
                action: "blocked",
                reason: "Not signed by identified developer",
                message: "Application blocked from launching",
                level: "warning"
            ),
            LogEntry(
                timestamp: Calendar.current.date(byAdding: .hour, value: -4, to: now) ?? now,
                application: "VS Code",
                path: "/Applications/Visual Studio Code.app",
                action: "allowed",
                reason: "Signed by Microsoft Corporation",
                message: "Application launched successfully",
                level: "info"
            ),
            LogEntry(
                timestamp: Calendar.current.date(byAdding: .day, value: -1, to: now) ?? now,
                application: "Malicious Script",
                path: "/tmp/malware.sh",
                action: "blocked",
                reason: "Detected as potential malware",
                message: "Script execution prevented",
                level: "error"
            )
        ]
    }
    
    static func getXProtectLogs() -> [LogEntry] {
        let now = Date()
        return [
            LogEntry(
                timestamp: Calendar.current.date(byAdding: .minute, value: -30, to: now) ?? now,
                application: "XProtect",
                path: "/System/Library/CoreServices/XProtect.bundle",
                action: "allowed",
                reason: "System scan completed",
                message: "Daily system scan completed successfully",
                level: "info",
                details: "Scanned 45,231 files, no threats detected"
            ),
            LogEntry(
                timestamp: Calendar.current.date(byAdding: .hour, value: -3, to: now) ?? now,
                application: "XProtect",
                path: "/Users/user/Downloads/infected-file.zip",
                action: "blocked",
                reason: "Contains known malware signature",
                message: "Malware detected and quarantined",
                level: "error",
                details: "Threat: OSX.Trojan.Generic, File moved to quarantine"
            ),
            LogEntry(
                timestamp: Calendar.current.date(byAdding: .hour, value: -6, to: now) ?? now,
                application: "XProtect",
                path: "/System/Library/CoreServices/XProtect.bundle",
                action: "allowed",
                reason: "Definition update completed",
                message: "XProtect definitions updated to version 2169",
                level: "info",
                details: "Updated virus definitions and malware signatures"
            )
        ]
    }
}
