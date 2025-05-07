
import SwiftUI

struct SecurityDashboardView: View {
    @State private var securityFeatures = MockData.getSecurityFeatures()
    @State private var gatekeeperLogs = MockData.getGatekeeperLogs()
    @State private var selectedTab: String = "features"
    
    private var overallStatus: SecurityStatus {
        if securityFeatures.allSatisfy({ $0.status == .enabled }) {
            return .enabled
        } else if securityFeatures.contains(where: { $0.status == .disabled }) {
            return .disabled
        } else {
            return .warning
        }
    }
    
    private var statusMessage: String {
        if overallStatus == .enabled {
            return "All security features are enabled and up to date."
        } else if overallStatus == .disabled {
            let disabledFeatures = securityFeatures
                .filter { $0.status == .disabled }
                .map { $0.name }
                .joined(separator: ", ")
            return "Some security features are disabled: \(disabledFeatures)."
        } else {
            return "Some security features need attention. Check the details below."
        }
    }
    
    private func getFeatureByName(_ name: String) -> SecurityFeature? {
        return securityFeatures.first(where: { $0.name == name })
    }
    
    var body: some View {
        VStack(spacing: 16) {
            // Security Status Card
            StatusCardView(
                title: "Security Status",
                status: overallStatus,
                description: "Summary of your Mac's security features",
                content: {
                    Text(statusMessage)
                        .font(.system(size: 14))
                        .foregroundColor(
                            overallStatus == .enabled ? .green :
                            overallStatus == .disabled ? .red : .yellow
                        )
                }
            )
            
            // Tab buttons
            HStack {
                Button(action: { selectedTab = "features" }) {
                    Text("Security Features")
                        .font(.system(size: 14, weight: .medium))
                        .padding(.vertical, 8)
                        .padding(.horizontal, 12)
                        .background(selectedTab == "features" ? Color.blue.opacity(0.1) : Color.clear)
                        .foregroundColor(selectedTab == "features" ? .blue : .gray)
                        .cornerRadius(4)
                }
                
                Button(action: { selectedTab = "logs" }) {
                    Text("Activity Logs")
                        .font(.system(size: 14, weight: .medium))
                        .padding(.vertical, 8)
                        .padding(.horizontal, 12)
                        .background(selectedTab == "logs" ? Color.blue.opacity(0.1) : Color.clear)
                        .foregroundColor(selectedTab == "logs" ? .blue : .gray)
                        .cornerRadius(4)
                }
                
                Spacer()
            }
            
            // Tab content
            if selectedTab == "features" {
                // Security Features Grid
                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 16) {
                    if let feature = getFeatureByName("macOS Updates") {
                        SecurityFeatureView(feature: feature)
                    }
                    
                    if let feature = getFeatureByName("System Integrity Protection") {
                        SecurityFeatureView(feature: feature, hideButton: true)
                    }
                    
                    if let feature = getFeatureByName("FileVault") {
                        SecurityFeatureView(feature: feature)
                    }
                    
                    if let feature = getFeatureByName("XProtect") {
                        SecurityFeatureView(feature: feature)
                    }
                    
                    if let feature = getFeatureByName("Gatekeeper") {
                        SecurityFeatureView(feature: feature)
                    }
                    
                    if let feature = getFeatureByName("Firewall") {
                        SecurityFeatureView(feature: feature)
                    }
                }
            } else {
                // Activity Logs
                ActivityLogsView(logs: gatekeeperLogs)
            }
        }
        .padding()
        .background(Color(NSColor.windowBackgroundColor))
    }
}
