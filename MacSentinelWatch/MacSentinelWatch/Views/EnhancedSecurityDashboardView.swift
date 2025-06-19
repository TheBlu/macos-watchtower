import SwiftUI

struct EnhancedSecurityDashboardView: View {
    @StateObject private var systemManager = SystemSecurityManager()
    @State private var gatekeeperLogs = MockData.getGatekeeperLogs()
    @State private var selectedTab: String = "features"
    @State private var areAllTilesFlipped = false
    
    private var overallStatus: SecurityStatus {
        StatusUtils.calculateOverallStatus(systemManager.securityFeatures)
    }
    
    private var statusMessage: String {
        if systemManager.isLoading {
            return "Checking security status..."
        }
        
        if overallStatus == .enabled {
            return "All security features are enabled and up to date."
        } else if overallStatus == .disabled {
            let disabledFeatures = systemManager.securityFeatures
                .filter { $0.status == .disabled }
                .map { $0.name }
                .joined(separator: ", ")
            return "Some security features are disabled: \(disabledFeatures)."
        } else {
            return "Some security features need attention. Check the details below."
        }
    }
    
    private func getFeatureByName(_ name: String) -> SecurityFeature? {
        return systemManager.securityFeatures.first(where: { $0.name == name })
    }
    
    private var securityStatusIcon: some View {
        Group {
            if systemManager.isLoading {
                Image(systemName: "arrow.triangle.2.circlepath")
                    .foregroundColor(.blue)
                    .symbolEffect(.rotate.byLayer, options: .repeat(.continuous))
            } else {
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
        }
        .font(.system(size: 24, weight: .medium))
    }
    
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // Security Status Card
                EnhancedStatusCardView(
                    title: "Security Status",
                    status: systemManager.isLoading ? .unknown : overallStatus,
                    description: "Live status of your Mac's security features",
                    lastUpdated: systemManager.securityFeatures.first?.lastUpdated,
                    headerIcon: AnyView(securityStatusIcon),
                    content: {
                        VStack(alignment: .leading, spacing: 12) {
                            HStack {
                                Text(statusMessage)
                                    .font(.system(size: 14, weight: .medium))
                                    .foregroundColor(systemManager.isLoading ? .secondary : StatusUtils.getStatusColors(overallStatus))
                                    .fixedSize(horizontal: false, vertical: true)
                                
                                Spacer()
                                
                                HStack(spacing: 8) {
                                    Button(action: {
                                        systemManager.refreshSecurityStatus()
                                    }) {
                                        HStack(spacing: 6) {
                                            Image(systemName: "arrow.clockwise")
                                                .font(.system(size: 14))
                                            Text("Refresh")
                                                .font(.system(size: 12, weight: .medium))
                                        }
                                        .padding(.horizontal, 12)
                                        .padding(.vertical, 6)
                                        .background(.ultraThinMaterial)
                                        .cornerRadius(8)
                                    }
                                    .buttonStyle(PlainButtonStyle())
                                    .disabled(systemManager.isLoading)
                                    
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
                    if systemManager.isLoading && systemManager.securityFeatures.isEmpty {
                        // Loading state
                        LazyVGrid(columns: [
                            GridItem(.flexible(), spacing: 16),
                            GridItem(.flexible(), spacing: 16),
                            GridItem(.flexible(), spacing: 16)
                        ], spacing: 16) {
                            ForEach(0..<6, id: \.self) { _ in
                                LoadingSecurityFeatureView()
                            }
                        }
                    } else {
                        // Security Features Grid
                        LazyVGrid(columns: [
                            GridItem(.flexible(), spacing: 16),
                            GridItem(.flexible(), spacing: 16),
                            GridItem(.flexible(), spacing: 16)
                        ], spacing: 16) {
                            if let feature = getFeatureByName("macOS Updates") {
                                EnhancedSecurityFeatureView(
                                    feature: feature, 
                                    globalFlipped: $areAllTilesFlipped,
                                    onSettingsOpen: {
                                        systemManager.openSystemSettings(for: feature.name)
                                    }
                                )
                            }
                            
                            if let feature = getFeatureByName("FileVault") {
                                EnhancedSecurityFeatureView(
                                    feature: feature, 
                                    globalFlipped: $areAllTilesFlipped,
                                    onSettingsOpen: {
                                        systemManager.openSystemSettings(for: feature.name)
                                    }
                                )
                            }
                            
                            if let feature = getFeatureByName("Firewall") {
                                EnhancedSecurityFeatureView(
                                    feature: feature, 
                                    globalFlipped: $areAllTilesFlipped,
                                    onSettingsOpen: {
                                        systemManager.openSystemSettings(for: feature.name)
                                    }
                                )
                            }
                            
                            if let feature = getFeatureByName("XProtect") {
                                EnhancedSecurityFeatureView(
                                    feature: feature, 
                                    globalFlipped: $areAllTilesFlipped,
                                    onSettingsOpen: {
                                        systemManager.openSystemSettings(for: feature.name)
                                    }
                                )
                            }
                            
                            if let feature = getFeatureByName("Gatekeeper") {
                                EnhancedSecurityFeatureView(
                                    feature: feature, 
                                    globalFlipped: $areAllTilesFlipped,
                                    onSettingsOpen: {
                                        systemManager.openSystemSettings(for: feature.name)
                                    }
                                )
                            }
                            
                            if let feature = getFeatureByName("System Integrity Protection") {
                                EnhancedSecurityFeatureView(
                                    feature: feature, 
                                    hideButton: true, 
                                    globalFlipped: $areAllTilesFlipped,
                                    onSettingsOpen: {
                                        systemManager.openSystemSettings(for: feature.name)
                                    }
                                )
                            }
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
        .onAppear {
            if systemManager.securityFeatures.isEmpty {
                systemManager.refreshSecurityStatus()
            }
        }
    }
}

struct LoadingSecurityFeatureView: View {
    var body: some View {
        VStack(spacing: 16) {
            RoundedRectangle(cornerRadius: 16)
                .fill(.ultraThinMaterial)
                .frame(width: 80, height: 80)
                .overlay(
                    Image(systemName: "arrow.triangle.2.circlepath")
                        .foregroundColor(.secondary)
                        .font(.system(size: 24, weight: .medium))
                        .symbolEffect(.rotate.byLayer, options: .repeat(.continuous))
                )
            
            RoundedRectangle(cornerRadius: 8)
                .fill(.ultraThinMaterial)
                .frame(height: 20)
        }
        .frame(height: 200)
        .background(.ultraThinMaterial)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(Color.gray.opacity(0.2), lineWidth: 2)
        )
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .shadow(color: .black.opacity(0.1), radius: 10, x: 0, y: 4)
    }
}
