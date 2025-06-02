
import Foundation

struct MockData {
    static func getSecurityFeatures() -> [SecurityFeature] {
        return [
            SecurityFeature(
                name: "macOS Updates",
                status: .enabled,
                description: "Your system is up to date with the latest security patches.",
                lastChecked: Date()
            ),
            SecurityFeature(
                name: "System Integrity Protection",
                status: .enabled,
                description: "SIP protects critical system files and processes.",
                lastChecked: Date()
            ),
            SecurityFeature(
                name: "FileVault",
                status: .enabled,
                description: "Full disk encryption is active and protecting your data.",
                lastChecked: Date()
            ),
            SecurityFeature(
                name: "XProtect",
                status: .enabled,
                description: "Built-in malware protection is active and up to date.",
                lastChecked: Date()
            ),
            SecurityFeature(
                name: "Gatekeeper",
                status: .enabled,
                description: "App notarization and code signing verification is active.",
                lastChecked: Date()
            ),
            SecurityFeature(
                name: "Firewall",
                status: .disabled,
                description: "Network firewall is currently disabled.",
                lastChecked: Date()
            )
        ]
    }
    
    static func getGatekeeperLogs() -> [LogEntry] {
        let calendar = Calendar.current
        let now = Date()
        
        return [
            LogEntry(
                id: UUID(),
                timestamp: calendar.date(byAdding: .minute, value: -5, to: now) ?? now,
                level: "info",
                source: "Gatekeeper",
                message: "Application verified successfully",
                details: "MyApp.app - Developer ID: Apple Development"
            ),
            LogEntry(
                id: UUID(),
                timestamp: calendar.date(byAdding: .hour, value: -2, to: now) ?? now,
                level: "warning",
                source: "Gatekeeper",
                message: "Unsigned application blocked",
                details: "Unknown-App.dmg - No valid signature found"
            ),
            LogEntry(
                id: UUID(),
                timestamp: calendar.date(byAdding: .hour, value: -4, to: now) ?? now,
                level: "info",
                source: "Gatekeeper",
                message: "Notarization check completed",
                details: "Safari.app - Apple notarized application"
            )
        ]
    }
    
    static func getXProtectLogs() -> [LogEntry] {
        let calendar = Calendar.current
        let now = Date()
        
        return [
            LogEntry(
                id: UUID(),
                timestamp: calendar.date(byAdding: .minute, value: -10, to: now) ?? now,
                level: "info",
                source: "XProtect",
                message: "Malware definitions updated",
                details: "Version 2156 - 1,247 new signatures added"
            ),
            LogEntry(
                id: UUID(),
                timestamp: calendar.date(byAdding: .hour, value: -1, to: now) ?? now,
                level: "warning",
                source: "XProtect",
                message: "Suspicious file quarantined",
                details: "file.suspicious - Moved to quarantine folder"
            ),
            LogEntry(
                id: UUID(),
                timestamp: calendar.date(byAdding: .hour, value: -3, to: now) ?? now,
                level: "info",
                source: "XProtect",
                message: "System scan completed",
                details: "No threats detected - 245,678 files scanned"
            ),
            LogEntry(
                id: UUID(),
                timestamp: calendar.date(byAdding: .day, value: -1, to: now) ?? now,
                level: "error",
                source: "XProtect",
                message: "Malware detected and removed",
                details: "Trojan.Generic.12345 - File deleted successfully"
            )
        ]
    }
}
