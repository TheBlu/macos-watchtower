import SwiftUI

enum FeatureName {
    static let gatekeeper = "Gatekeeper"
    static let macOSUpdates = "macOS Updates"
}

struct EnhancedSecurityFeatureView: View {
    let feature: SecurityFeature
    let hideDescription: Bool
    let hideButton: Bool
    @State private var isFlipped = false
    @Binding var globalFlipped: Bool
    let onSettingsOpen: (() -> Void)?
    
    init(
        feature: SecurityFeature,
        hideDescription: Bool = false,
        hideButton: Bool = false,
        globalFlipped: Binding<Bool> = .constant(false),
        onSettingsOpen: (() -> Void)? = nil
    ) {
        self.feature = feature
        self.hideDescription = hideDescription
        self.hideButton = hideButton
        self._globalFlipped = globalFlipped
        self.onSettingsOpen = onSettingsOpen
    }
    
    private var icon: (name: String, color: Color) {
        SecurityFeatureIcon.getIcon(for: feature.name, status: feature.status)
    }
    
    private var statusText: String {
        SecurityFeatureIcon.getStatusText(for: feature)
    }
    
    private var settingLabel: String {
        switch feature.name {
        case FeatureName.macOSUpdates:
            return "Version"
        case FeatureName.gatekeeper:
            return "Gatekeeper Setting"
        default:
            return "Current Setting"
        }
    }
    
    private func infoButton(filled: Bool) -> some View {
        Button(action: { withAnimation(.easeInOut(duration: 0.6)) { isFlipped.toggle() } }) {
            Image(systemName: filled ? "info.circle.fill" : "info.circle")
                .foregroundColor(filled ? .blue : .secondary)
                .font(.system(size: 16))
        }
        .buttonStyle(PlainButtonStyle())
        .padding(12)
        .help("Show details")
    }
    
    var body: some View {
        ZStack {
            // Front of card
            VStack {
                Spacer()
                VStack(spacing: 12) {
                    ZStack {
                        RoundedRectangle(cornerRadius: 16)
                            .fill(.ultraThinMaterial)
                            .overlay(
                                RoundedRectangle(cornerRadius: 16)
                                    .stroke(Color.white.opacity(0.2), lineWidth: 1)
                            )
                            .frame(width: 80, height: 80)
                        
                        Image(systemName: icon.name)
                            .foregroundColor(icon.color)
                            .font(.system(size: 32, weight: .medium))
                    }
                    
                    Text(feature.name)
                        .font(.system(size: 16, weight: .semibold))
                        .multilineTextAlignment(.center)
                }
                .frame(maxWidth: .infinity)
                Spacer()
            }
            .opacity(isFlipped ? 0 : 1)
            .rotation3DEffect(.degrees(isFlipped ? 89.9 : 0), axis: (x: 0, y: 1, z: 0))
            
            // Back of card
            VStack(alignment: .leading, spacing: 12) {
                // Header with back button
                HStack {
                    Text(feature.name)
                        .font(.system(size: 16, weight: .semibold))
                    
                    Spacer()
                }
                
                // Description
                VStack(alignment: .leading, spacing: 8) {
                    Text("Description")
                        .font(.system(size: 12, weight: .bold))
                        .foregroundColor(.secondary)
                    
                    Text(feature.description)
                        .font(.system(size: 12))
                        .fixedSize(horizontal: false, vertical: true)
                }
                
                // Setting
                if let setting = feature.setting {
                    VStack(alignment: .leading, spacing: 8) {
                        Text(settingLabel)
                            .font(.system(size: 12, weight: .bold))
                            .foregroundColor(.secondary)

                        Text(setting)
                            .font(.system(size: 12, design: .monospaced))
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background(Color(NSColor.controlBackgroundColor))
                            .cornerRadius(6)
                    }
                }
                
                Spacer()
                
                // Footer with last updated
                VStack(spacing: 8) {
                    // Last updated
                    HStack {
                        Text("Last Updated:")
                            .font(.system(size: 10, weight: .medium))
                            .foregroundColor(.secondary)
                        
                        HStack(spacing: 4) {
                            Image(systemName: "arrow.clockwise")
                                .font(.system(size: 8))
                                .foregroundColor(.secondary)
                            
                            Text(DateFormatters.formatDate(feature.lastUpdated))
                                .font(.system(size: 10))
                                .foregroundColor(.secondary)
                        }
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(.ultraThinMaterial)
                        .cornerRadius(4)
                        
                        Spacer()
                    }
                }
            }
            .padding(16)
            .opacity(isFlipped ? 1 : 0)
            .rotation3DEffect(.degrees(isFlipped ? 0 : -89.9), axis: (x: 0, y: 1, z: 0))
        }
        .frame(height: 200)
        .background(.ultraThinMaterial)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(StatusUtils.getStatusBorderColors(feature.status), lineWidth: 2)
        )
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .overlay(alignment: .topTrailing) {
            infoButton(filled: isFlipped)
        }
        .overlay(alignment: .bottomTrailing) {
            if isFlipped && !hideButton && feature.name != FeatureName.gatekeeper && feature.name != "System Integrity Protection" && feature.name != "XProtect" {
                Button(action: {
                    onSettingsOpen?()
                }) {
                    Image(systemName: "gear")
                        .foregroundColor(.blue)
                        .font(.system(size: 16))
                }
                .buttonStyle(PlainButtonStyle())
                .padding(12)
                .help("Open Settings")
            }
        }
        .shadow(color: .black.opacity(0.1), radius: 10, x: 0, y: 4)
        .onChange(of: globalFlipped) { _, newValue in
            withAnimation(.easeInOut(duration: 0.6)) {
                isFlipped = newValue
            }
        }
    }
}
