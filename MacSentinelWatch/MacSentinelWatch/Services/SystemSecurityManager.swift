import Foundation
import Security
import SystemConfiguration

class SystemSecurityManager: ObservableObject {
    @Published var securityFeatures: [SecurityFeature] = []
    @Published var isLoading = false
    
    private var timer: Timer?
    
    init() {
        refreshSecurityStatus()
        startPeriodicUpdates()
    }
    
    deinit {
        timer?.invalidate()
    }
    
    func refreshSecurityStatus() {
        isLoading = true
        
        DispatchQueue.global(qos: .userInitiated).async { [weak self] in
            let features = self?.checkAllSecurityFeatures() ?? []
            
            DispatchQueue.main.async {
                self?.securityFeatures = features
                self?.isLoading = false
            }
        }
    }
    
    private func startPeriodicUpdates() {
        timer = Timer.scheduledTimer(withTimeInterval: 60.0, repeats: true) { [weak self] _ in
            self?.refreshSecurityStatus()
        }
    }
    
    private func checkAllSecurityFeatures() -> [SecurityFeature] {
        var features: [SecurityFeature] = []
        
        // FileVault Status
        features.append(checkFileVaultStatus())
        
        // Firewall Status
        features.append(checkFirewallStatus())
        
        // Gatekeeper Status
        features.append(checkGatekeeperStatus())
        
        // XProtect Status
        features.append(checkXProtectStatus())
        
        // System Integrity Protection
        features.append(checkSIPStatus())
        
        // macOS Updates
        features.append(checkUpdateStatus())
        
        return features
    }
    
    private func checkFileVaultStatus() -> SecurityFeature {
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
            
            let isEnabled = output.contains("FileVault is On")
            
            return SecurityFeature(
                name: "FileVault",
                description: "Full-disk encryption protects your data if your Mac is lost or stolen. When FileVault is enabled, your data is encrypted and can only be accessed with your login password.",
                status: isEnabled ? .enabled : .disabled,
                setting: isEnabled ? "Encryption Enabled" : "Encryption Disabled",
                lastUpdated: Date()
            )
        } catch {
            return SecurityFeature(
                name: "FileVault",
                description: "Full-disk encryption protects your data if your Mac is lost or stolen.",
                status: .unknown,
                setting: "Status Unknown",
                lastUpdated: Date()
            )
        }
    }
    
    private func checkFirewallStatus() -> SecurityFeature {
        let task = Process()
        task.launchPath = "/usr/libexec/ApplicationFirewall/socketfilterfw"
        task.arguments = ["--getglobalstate"]
        
        let pipe = Pipe()
        task.standardOutput = pipe
        task.standardError = pipe
        
        do {
            try task.run()
            task.waitUntilExit()
            
            let data = pipe.fileHandleForReading.readDataToEndOfFile()
            let output = String(data: data, encoding: .utf8) ?? ""
            
            let isEnabled = output.contains("enabled")
            
            return SecurityFeature(
                name: "Firewall",
                description: "Application firewall helps protect your Mac by controlling connections made by applications, services, and daemons to the network.",
                status: isEnabled ? .enabled : .disabled,
                setting: isEnabled ? "Firewall Enabled" : "Firewall Disabled",
                lastUpdated: Date()
            )
        } catch {
            return SecurityFeature(
                name: "Firewall",
                description: "Application firewall helps protect your Mac by controlling network connections.",
                status: .unknown,
                setting: "Status Unknown",
                lastUpdated: Date()
            )
        }
    }
    
    private func checkGatekeeperStatus() -> SecurityFeature {
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
            
            let isEnabled = output.contains("assessments enabled")
            
            return SecurityFeature(
                name: "Gatekeeper",
                description: "Gatekeeper helps protect your Mac by checking that applications you download and install are from identified developers or the App Store.",
                status: isEnabled ? .enabled : .disabled,
                setting: isEnabled ? "Assessments Enabled" : "Assessments Disabled",
                lastUpdated: Date()
            )
        } catch {
            return SecurityFeature(
                name: "Gatekeeper",
                description: "Gatekeeper helps protect your Mac by checking downloaded applications.",
                status: .unknown,
                setting: "Status Unknown",
                lastUpdated: Date()
            )
        }
    }
    
    private func checkXProtectStatus() -> SecurityFeature {
        let xprotectPath = "/System/Library/CoreServices/XProtect.bundle"
        let fileManager = FileManager.default
        
        if fileManager.fileExists(atPath: xprotectPath) {
            // Check XProtect version
            let task = Process()
            task.launchPath = "/usr/bin/defaults"
            task.arguments = ["read", "/System/Library/CoreServices/XProtect.bundle/Contents/Info.plist", "CFBundleShortVersionString"]
            
            let pipe = Pipe()
            task.standardOutput = pipe
            task.standardError = pipe
            
            do {
                try task.run()
                task.waitUntilExit()
                
                let data = pipe.fileHandleForReading.readDataToEndOfFile()
                let version = String(data: data, encoding: .utf8)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? "Unknown"
                
                return SecurityFeature(
                    name: "XProtect",
                    description: "XProtect is Apple's built-in antimalware technology that automatically scans applications for known malicious content.",
                    status: .enabled,
                    setting: "Version \(version)",
                    lastUpdated: Date()
                )
            } catch {
                return SecurityFeature(
                    name: "XProtect",
                    description: "XProtect is Apple's built-in antimalware technology.",
                    status: .enabled,
                    setting: "Active",
                    lastUpdated: Date()
                )
            }
        } else {
            return SecurityFeature(
                name: "XProtect",
                description: "XProtect is Apple's built-in antimalware technology.",
                status: .disabled,
                setting: "Not Found",
                lastUpdated: Date()
            )
        }
    }
    
    private func checkSIPStatus() -> SecurityFeature {
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
            
            let isEnabled = output.contains("enabled")
            
            return SecurityFeature(
                name: "System Integrity Protection",
                description: "System Integrity Protection helps protect your Mac by preventing potentially malicious software from modifying protected files and folders.",
                status: isEnabled ? .enabled : .disabled,
                setting: isEnabled ? "SIP Enabled" : "SIP Disabled",
                lastUpdated: Date()
            )
        } catch {
            return SecurityFeature(
                name: "System Integrity Protection",
                description: "System Integrity Protection helps protect your Mac from malicious software.",
                status: .unknown,
                setting: "Status Unknown",
                lastUpdated: Date()
            )
        }
    }
    
    private func checkUpdateStatus() -> SecurityFeature {
        let task = Process()
        task.launchPath = "/usr/sbin/softwareupdate"
        task.arguments = ["--list"]
        
        let pipe = Pipe()
        task.standardOutput = pipe
        task.standardError = pipe
        
        do {
            try task.run()
            task.waitUntilExit()
            
            let data = pipe.fileHandleForReading.readDataToEndOfFile()
            let output = String(data: data, encoding: .utf8) ?? ""
            
            if output.contains("No new software available") {
                return SecurityFeature(
                    name: "macOS Updates",
                    description: "Keep your Mac up to date with the latest security updates and system improvements from Apple.",
                    status: .enabled,
                    setting: "Up to Date",
                    lastUpdated: Date()
                )
            } else if output.contains("Software Update found") {
                return SecurityFeature(
                    name: "macOS Updates",
                    description: "Keep your Mac up to date with the latest security updates and system improvements from Apple.",
                    status: .warning,
                    setting: "Updates Available",
                    lastUpdated: Date()
                )
            } else {
                return SecurityFeature(
                    name: "macOS Updates",
                    description: "Keep your Mac up to date with the latest security updates and system improvements from Apple.",
                    status: .unknown,
                    setting: "Check Failed",
                    lastUpdated: Date()
                )
            }
        } catch {
            return SecurityFeature(
                name: "macOS Updates",
                description: "Keep your Mac up to date with the latest security updates and system improvements from Apple.",
                status: .unknown,
                setting: "Status Unknown",
                lastUpdated: Date()
            )
        }
    }
    
    func openSystemSettings(for feature: String) {
        let url: String
        
        switch feature {
        case "FileVault":
            url = "x-apple.systempreferences:com.apple.preference.security?Privacy_FileVault"
        case "Firewall":
            url = "x-apple.systempreferences:com.apple.preference.security?Firewall"
        case "macOS Updates":
            url = "x-apple.systempreferences:com.apple.preferences.softwareupdate"
        case "System Integrity Protection":
            // SIP can't be changed from System Settings, show Security & Privacy instead
            url = "x-apple.systempreferences:com.apple.preference.security"
        default:
            url = "x-apple.systempreferences:com.apple.preference.security"
        }
        
        if let settingsURL = URL(string: url) {
            NSWorkspace.shared.open(settingsURL)
            print("Opening System Settings: \(feature)")
        }
    }
}
