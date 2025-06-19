
import SwiftUI

struct EnhancedSecurityFeatureView: View {
    let feature: SecurityFeature
    let hideDescription: Bool
    let hideButton: Bool
    @State private var isFlipped = false
    @Binding var globalFlipped: Bool
    
    init(feature: SecurityFeature, hideDescription: Bool = false, hideButton: Bool = false, globalFlipped: Binding<Bool> = .constant(false)) {
        self.feature = feature
        self.hideDescription = hideDescription
        self.hideButton = hideButton
        self._globalFlipped = globalFlipped
    }
    
    private var icon: (name: String, color: Color) {
        SecurityFeatureIcon.getIcon(for: feature.name, status: feature.status)
    }
    
    private var statusText: String {
        SecurityFeatureIcon.getStatusText(for: feature)
    }
    
    private var settingLabel: String {
        return feature.name == "macOS Updates" ? "Version:" : "Setting:"
    }
    
    var body: some View {
        ZStack {
            // Front of card
            VStack(spacing: 0) {
                // Header and content
                VStack(spacing: 16) {
                    // Info button
                    HStack {
                        Spacer()
                        Button(action: { withAnimation(.easeInOut(duration: 0.6)) { isFlipped.toggle() } }) {
                            Image(systemName: "info.circle")
                                .foregroundColor(.secondary)
                                .font(.system(size: 16))
                        }
                        .buttonStyle(PlainButtonStyle())
                    }
                    
                    // Icon
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
                }
                .padding(.horizontal, 16)
                .padding(.top, 16)
                .padding(.bottom, 8)
                
                Spacer()
            }
            .opacity(isFlipped ? 0 : 1)
            .rotation3DEffect(.degrees(isFlipped ? 90 : 0), axis: (x: 0, y: 1, z: 0))
            
            // Back of card
            VStack(alignment: .leading, spacing: 12) {
                // Header with back button
                HStack {
                    Text(feature.name)
                        .font(.system(size: 16, weight: .semibold))
                    
                    Spacer()
                    
                    Button(action: { withAnimation(.easeInOut(duration: 0.6)) { isFlipped.toggle() } }) {
                        Image(systemName: "info.circle.fill")
                            .foregroundColor(.blue)
                            .font(.system(size: 16))
                    }
                    .buttonStyle(PlainButtonStyle())
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
                        Text(feature.name == "macOS Updates" ? "Version" : "Current Setting")
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
            .padding(16)
            .opacity(isFlipped ? 1 : 0)
            .rotation3DEffect(.degrees(isFlipped ? 0 : -90), axis: (x: 0, y: 1, z: 0))
        }
        .frame(height: 200)
        .background(.ultraThinMaterial)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(StatusUtils.getStatusBorderColors(feature.status), lineWidth: 2)
        )
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .shadow(color: .black.opacity(0.1), radius: 10, x: 0, y: 4)
        .onChange(of: globalFlipped) { _, newValue in
            withAnimation(.easeInOut(duration: 0.6)) {
                isFlipped = newValue
            }
        }
    }
}
