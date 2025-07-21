import SwiftUI

struct ContentView: View {
    @State private var selectedTab: String = "security"
    @State private var isLoading = true
    
    var body: some View {
        NavigationSplitView {
            AppSidebarView(selectedTab: $selectedTab)
        } detail: {
            if isLoading {
                ProgressView("Loading...")
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            } else {
                (
                    {
                        switch selectedTab {
                        case "security":
                            return AnyView(EnhancedSecurityDashboardView())
                        case "gatekeeper":
                            return AnyView(ActivityLogsView(logs: MockData.getGatekeeperLogs()))
                        case "xprotect":
                            return AnyView(XProtectLogsView(logs: MockData.getXProtectLogs()))
                        default:
                            return AnyView(EnhancedSecurityDashboardView())
                        }
                    }()
                )
                .frame(maxWidth: .infinity, maxHeight: .infinity)
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
        .frame(minWidth: 1200, minHeight: 800)
        .onAppear {
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                isLoading = false
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
