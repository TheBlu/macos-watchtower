import SwiftUI

struct ContentView: View {
    @State private var selectedTab: String = "security"
    
    var body: some View {
        NavigationSplitView {
            AppSidebarView(selectedTab: $selectedTab)
        } detail: {
            Group {
                switch selectedTab {
                case "security":
                    EnhancedSecurityDashboardView()
                case "gatekeeper":
                    ActivityLogsView(logs: MockData.getGatekeeperLogs())
                case "xprotect":
                    XProtectLogsView(logs: MockData.getXProtectLogs())
                default:
                    EnhancedSecurityDashboardView()
                }
            }
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
        .frame(minWidth: 1200, minHeight: 800)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
