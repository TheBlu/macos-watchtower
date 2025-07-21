import SwiftUI

struct SecurityDashboardView: View {
    @ObservedObject private var viewModel = SecurityViewModel()
    @State private var selectedTab: String = "features"
    
    private func getFeatureByName(_ name: String) -> SecurityFeature? {
        return viewModel.features.first(where: { $0.name == name })
    }
    
    var body: some View {
        VStack(spacing: 16) {
            // Security Status Card
            StatusCardView(
                title: "Security Status",
                status: viewModel.features.allSatisfy { $0.status == .enabled } ? .enabled :
                        viewModel.features.contains { $0.status == .disabled } ? .disabled : .warning,
                description: "Summary of your Mac's security features",
                content: {
                    Text(viewModel.features.allSatisfy { $0.status == .enabled } ? "All security features are enabled and up to date." :
                         viewModel.features.contains { $0.status == .disabled } ?
                         "Some security features are disabled: \(viewModel.features.filter { $0.status == .disabled }.map { $0.name }.joined(separator: ", "))." :
                         "Some security features need attention. Check the details below.")
                        .font(.system(size: 14))
                        .foregroundColor(
                            viewModel.features.allSatisfy { $0.status == .enabled } ? .green :
                            viewModel.features.contains { $0.status == .disabled } ? .red : .yellow
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
                if !viewModel.errors.isEmpty {
                    ForEach(viewModel.errors, id: \.self) { error in
                        Text("⚠️ \(error)")
                            .foregroundColor(.red)
                            .padding()
                    }
                }

                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 16) {
                    ForEach(viewModel.features) { feature in
                        SecurityFeatureView(feature: feature, hideButton: feature.name == "System Integrity Protection")
                    }
                }
            } else {
                // Activity Logs
                ActivityLogsView(logs: viewModel.gatekeeperLogs)
            }
        }
        .padding()
        .background(Color(NSColor.windowBackgroundColor))
        .onAppear { viewModel.loadFeatures() }
    }
}
