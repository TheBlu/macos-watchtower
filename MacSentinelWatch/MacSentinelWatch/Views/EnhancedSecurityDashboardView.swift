
import SwiftUI

struct EnhancedSecurityDashboardView: View {
    @State private var securityFeatures = MockData.getSecurityFeatures()
    @State private var gatekeeperLogs = MockData.getGatekeeperLogs()
    @State private var selectedTab: String = "features"
    @State private var areAllTilesFlipped = false
    
    private var overallStatus: SecurityStatus {
        StatusUtils.calculateOverallStatus(securityFeatures)
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
    
    private var securityStatusIcon: some View {
        Group {
            switch overallStatus {
            case .enabled:
                Image(systemName: "shield.fill")
                    .foregroundColor(.green)
            case .warning:
                Image(systemName: "shield.lefthalf.filled.badge.checkmark")
                    .foregroundColor(.yellow)
            case .disabled:
                Image(systemName: "shield.slash")
                    .foregroundColor(.red)
            case .unknown:
                Image(systemName: "shield")
                    .foregroundColor(.gray)
            }
        }
        .font(.system(size: 24, weight: .medium))
    }
    
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // Security Status Card
                EnhancedStatusCardView(
                    title: "Security Status",
                    status: overallStatus,
                    description: "Summary of your Mac's security features",
                    headerIcon: AnyView(securityStatusIcon),
                    content: {
                        VStack(alignment: .leading, spacing: 12) {
                            HStack {
                                Text(statusMessage)
                                    .font(.system(size: 14, weight: .medium))
                                    .foregroundColor(StatusUtils.getStatusColors(overallStatus))
                                    .fixedSize(horizontal: false, vertical: true)
                                
                                Spacer()
                                
                                Button(action: { 
                                    withAnimation(.easeInOut(duration: 0.6)) {
                                        areAllTilesFlipped.toggle()
                                    }
                                }) {
                                    HStack(spacing: 6) {
                                        Image(systemName: "info.circle")
                                            .font(.system(size: 14))
                                        Text(areAllTilesFlipped ? "Hide Details" : "Show Details")
                                            .font(.system(size: 12, weight: .medium))
                                    }
                                    .padding(.horizontal, 12)
                                    .padding(.vertical, 6)
                                    .background(.ultraThinMaterial)
                                    .cornerRadius(8)
                                }
                                .buttonStyle(PlainButtonStyle())
                            }
                        }
                    }
                )
                
                // Tab buttons
                HStack {
                    Button(action: { selectedTab = "features" }) {
                        Text("Security Features")
                            .font(.system(size: 14, weight: .medium))
                            .padding(.vertical, 8)
                            .padding(.horizontal, 16)
                            .background(selectedTab == "features" ? Color.blue.opacity(0.1) : Color.clear)
                            .foregroundColor(selectedTab == "features" ? .blue : .gray)
                            .cornerRadius(8)
                    }
                    .buttonStyle(PlainButtonStyle())
                    
                    Button(action: { selectedTab = "logs" }) {
                        Text("Activity Logs")
                            .font(.system(size: 14, weight: .medium))
                            .padding(.vertical, 8)
                            .padding(.horizontal, 16)
                            .background(selectedTab == "logs" ? Color.blue.opacity(0.1) : Color.clear)
                            .foregroundColor(selectedTab == "logs" ? .blue : .gray)
                            .cornerRadius(8)
                    }
                    .buttonStyle(PlainButtonStyle())
                    
                    Spacer()
                }
                
                // Tab content
                if selectedTab == "features" {
                    // Security Features Grid
                    LazyVGrid(columns: [
                        GridItem(.flexible(), spacing: 16),
                        GridItem(.flexible(), spacing: 16),
                        GridItem(.flexible(), spacing: 16)
                    ], spacing: 16) {
                        if let feature = getFeatureByName("macOS Updates") {
                            EnhancedSecurityFeatureView(feature: feature, globalFlipped: $areAllTilesFlipped)
                        }
                        
                        if let feature = getFeatureByName("FileVault") {
                            EnhancedSecurityFeatureView(feature: feature, globalFlipped: $areAllTilesFlipped)
                        }
                        
                        if let feature = getFeatureByName("Firewall") {
                            EnhancedSecurityFeatureView(feature: feature, globalFlipped: $areAllTilesFlipped)
                        }
                        
                        if let feature = getFeatureByName("XProtect") {
                            EnhancedSecurityFeatureView(feature: feature, globalFlipped: $areAllTilesFlipped)
                        }
                        
                        if let feature = getFeatureByName("Gatekeeper") {
                            EnhancedSecurityFeatureView(feature: feature, globalFlipped: $areAllTilesFlipped)
                        }
                        
                        if let feature = getFeatureByName("System Integrity Protection") {
                            EnhancedSecurityFeatureView(feature: feature, hideButton: true, globalFlipped: $areAllTilesFlipped)
                        }
                    }
                } else {
                    // Activity Logs
                    ActivityLogsView(logs: gatekeeperLogs)
                }
            }
            .padding(24)
        }
        .background(
            LinearGradient(
                gradient: Gradient(colors: [
                    Color(NSColor.windowBackgroundColor).opacity(0.5),
                    Color(NSColor.windowBackgroundColor).opacity(0.8)
                ]),
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        )
    }
}
