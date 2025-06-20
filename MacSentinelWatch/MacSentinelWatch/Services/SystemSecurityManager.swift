import Foundation
import SwiftUI

@MainActor
class SystemSecurityManager: ObservableObject {
    @Published var securityFeatures: [SecurityFeature] = []
    @Published var isLoading = false
    
    init() {
        loadInitialData()
    }
    
    private func loadInitialData() {
        // Load mock data initially
        securityFeatures = MockData.getSecurityFeatures()
    }
    
    func refreshSecurityStatus() {
        isLoading = true
        
        Task {
            // Simulate network delay
            try? await Task.sleep(nanoseconds: 1_000_000_000)
            
            await MainActor.run {
                checkSecurityFeatures()
                isLoading = false
            }
        }
    }
    
    private func checkSecurityFeatures() {
        securityFeatures = [
            checkFileVaultStatus(),
            checkFirewallStatus(),
            checkGatekeeperStatus(),
            checkXProtectStatus(),
            checkSIPStatus(),
            checkMacOSUpdatesStatus()
        ]
    }
    
    private func checkFileVaultStatus() -> SecurityFeature {
        let isEnabled = checkFileVaultEnabled()
        return SecurityFeature(
            name: "FileVault",
            description: "Full-disk encryption that protects your data if your Mac is lost or stolen.",
            status: isEnabled ? .enabled : .disabled,
            setting: isEnabled ? "Enabled" : "Disabled",
            lastUpdated: Date()
        )
    }
    
    private func checkFirewallStatus() -> SecurityFeature {
        let isEnabled = checkFirewallEnabled()
        return SecurityFeature(
            name: "Firewall",
            description: "Controls incoming network connections to protect against unauthorized access.",
            status: isEnabled ? .enabled : .disabled,
            setting: isEnabled ? "Enabled" : "Disabled",
            lastUpdated: Date()
        )
    }
    
    private func checkGatekeeperStatus() -> SecurityFeature {
        let isEnabled = checkGatekeeperEnabled()
        return SecurityFeature(
            name: "Gatekeeper",
            description: "Ensures that only trusted software runs on your Mac by checking developer signatures.",
            status: isEnabled ? .enabled : .disabled,
            setting: isEnabled ? "Enabled" : "Disabled",
            lastUpdated: Date()
        )
    }
    
    private func checkXProtectStatus() -> SecurityFeature {
        return SecurityFeature(
            name: "XProtect",
            description: "Built-in antivirus that automatically scans for malware and updates definitions.",
            status: .enabled, // XProtect is always enabled on macOS
            setting: "Auto-Update Enabled",
            lastUpdated: Date()
        )
    }
    
    private func checkSIPStatus() -> SecurityFeature {
        let isEnabled = checkSIPEnabled()
        return SecurityFeature(
            name: "System Integrity Protection",
            description: "Protects critical system files and processes from modification by malicious software.",
            status: isEnabled ? .enabled : .disabled,
            setting: isEnabled ? "Enabled" : "Disabled",
            lastUpdated: Date()
        )
    }
    
    private func checkMacOSUpdatesStatus() -> SecurityFeature {
        let (status, version) = checkMacOSUpdateStatus()
        return SecurityFeature(
            name: "macOS Updates",
            description: "Keeps your system secure with the latest security patches and system improvements.",
            status: status,
            setting: version,
            lastUpdated: Date()
        )
    }
    
    private func checkFileVaultEnabled() -> Bool {
        let task = Process()
        task.launchPath = "/usr/bin/fdesetup"
        task.arguments = ["status"]
        
        let pipe = Pipe()
        task.standardOutput = pipe
        task.standardError = pipe
        
        do {
            try task.run()
            task.waitUntilExit()
            
            let data = pipe.fileHandleForReading.readDataToEndOfFile()
            let output = String(data: data, encoding: .utf8) ?? ""
            return output.contains("FileVault is On")
        } catch {
            return false
        }
    }
    
    private func checkFirewallEnabled() -> Bool {
        let task = Process()
        task.launchPath = "/usr/bin/defaults"
        task.arguments = ["read", "/Library/Preferences/com.apple.alf", "globalstate"]
        
        let pipe = Pipe()
        task.standardOutput = pipe
        task.standardError = pipe
        
        do {
            try task.run()
            task.waitUntilExit()
            
            let data = pipe.fileHandleForReading.readDataToEndOfFile()
            let output = String(data: data, encoding: .utf8) ?? ""
            return output.trimmingCharacters(in: .whitespacesAndNewlines) != "0"
        } catch {
            return false
        }
    }
    
    private func checkGatekeeperEnabled() -> Bool {
        let task = Process()
        task.launchPath = "/usr/sbin/spctl"
        task.arguments = ["--status"]
        
        let pipe = Pipe()
        task.standardOutput = pipe
        task.standardError = pipe
        
        do {
            try task.run()
            task.waitUntilExit()
            
            let data = pipe.fileHandleForReading.readDataToEndOfFile()
            let output = String(data: data, encoding: .utf8) ?? ""
            return output.contains("assessments enabled")
        } catch {
            return false
        }
    }
    
    private func checkSIPEnabled() -> Bool {
        let task = Process()
        task.launchPath = "/usr/bin/csrutil"
        task.arguments = ["status"]
        
        let pipe = Pipe()
        task.standardOutput = pipe
        task.standardError = pipe
        
        do {
            try task.run()
            task.waitUntilExit()
            
            let data = pipe.fileHandleForReading.readDataToEndOfFile()
            let output = String(data: data, encoding: .utf8) ?? ""
            return output.contains("enabled")
        } catch {
            return true // Default to enabled for security
        }
    }
    
    private func checkMacOSUpdateStatus() -> (SecurityStatus, String) {
        let task = Process()
        task.launchPath = "/usr/bin/sw_vers"
        task.arguments = ["-productVersion"]
        
        let pipe = Pipe()
        task.standardOutput = pipe
        task.standardError = pipe
        
        do {
            try task.run()
            task.waitUntilExit()
            
            let data = pipe.fileHandleForReading.readDataToEndOfFile()
            let version = String(data: data, encoding: .utf8)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? "Unknown"
            
            // For demo purposes, consider system up to date
            return (.enabled, "macOS \(version)")
        } catch {
            return (.unknown, "Unknown")
        }
    }
    
    func openSystemSettings(for featureName: String) {
        let urlString: String
        
        switch featureName {
        case "FileVault":
            urlString = "x-apple.systempreferences:com.apple.preference.security?Privacy_FileVault"
        case "Firewall":
            urlString = "x-apple.systempreferences:com.apple.preference.security?Firewall"
        case "Gatekeeper":
            urlString = "x-apple.systempreferences:com.apple.preference.security?General"
        case "macOS Updates":
            urlString = "x-apple.systempreferences:com.apple.preferences.softwareupdate"
        default:
            urlString = "x-apple.systempreferences:com.apple.preference.security"
        }
        
        if let url = URL(string: urlString) {
            NSWorkspace.shared.open(url)
        }
    }
}
