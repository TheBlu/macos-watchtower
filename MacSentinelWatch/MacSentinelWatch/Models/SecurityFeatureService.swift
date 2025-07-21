import Foundation

enum SecurityFeatureError: Error {
    case commandFailed(String)
    case outputParseFailed
}

class SecurityFeatureService {
    
    static func loadGatekeeperFeature() -> Result<SecurityFeature, SecurityFeatureError> {
        let output = runShellCommand("/usr/sbin/spctl --status")
        if output.lowercased().contains("error") {
            return .failure(.commandFailed(output))
        }
        let isDisabled = output.contains("disabled")
        let status: SecurityStatus = isDisabled ? .disabled : .enabled
        let setting = isDisabled ? "Anywhere" : "App Store and identified developers"
        
        return .success(SecurityFeature(
            name: "Gatekeeper",
            description: "Ensures that only trusted software runs on your Mac by checking developer signatures.",
            status: status,
            setting: setting
        ))
    }

    static func loadXProtectFeature() -> Result<SecurityFeature, SecurityFeatureError> {
        let output = runShellCommand("defaults read /Library/Apple/System/Library/CoreServices/XProtect.bundle/Contents/Info.plist CFBundleShortVersionString").trimmingCharacters(in: .whitespacesAndNewlines)
        if output.lowercased().contains("error") {
            return .failure(.commandFailed(output))
        }
        return .success(SecurityFeature(
            name: "XProtect",
            description: "Built-in antivirus that automatically scans for malware and updates definitions.",
            status: .enabled,
            setting: "Definition Version \(output)"
        ))
    }

    static func loadSIPFeature() -> Result<SecurityFeature, SecurityFeatureError> {
        let output = runShellCommand("/usr/bin/csrutil status")
        if output.lowercased().contains("error") {
            return .failure(.commandFailed(output))
        }
        let isEnabled = output.contains("enabled")
        let status: SecurityStatus = isEnabled ? .enabled : .disabled
        let setting = isEnabled ? "Enabled" : "Disabled"
        
        return .success(SecurityFeature(
            name: "System Integrity Protection",
            description: "Protects system files and processes from unauthorized modifications.",
            status: status,
            setting: setting
        ))
    }

    static func loadFirewallFeature() -> Result<SecurityFeature, SecurityFeatureError> {
        let output = runShellCommand("/usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate")
        if output.lowercased().contains("error") {
            return .failure(.commandFailed(output))
        }
        let isEnabled = output.contains("enabled")
        let status: SecurityStatus = isEnabled ? .enabled : .disabled
        let setting = isEnabled ? "Enabled" : "Disabled"

        return .success(SecurityFeature(
            name: "Firewall",
            description: "Blocks unauthorized incoming network connections.",
            status: status,
            setting: setting
        ))
    }

    static func loadAllFeatures() -> [Result<SecurityFeature, SecurityFeatureError>] {
        return [
            loadGatekeeperFeature(),
            loadXProtectFeature(),
            loadSIPFeature(),
            loadFirewallFeature()
        ]
    }

    private static func runShellCommand(_ command: String) -> String {
        let task = Process()
        let pipe = Pipe()

        task.standardOutput = pipe
        task.standardError = pipe
        task.arguments = ["-c", command]
        task.executableURL = URL(fileURLWithPath: "/bin/zsh")

        do {
            try task.run()
        } catch {
            return "Error: \(error.localizedDescription)"
        }

        let data = pipe.fileHandleForReading.readDataToEndOfFile()
        return String(decoding: data, as: UTF8.self)
    }
}
