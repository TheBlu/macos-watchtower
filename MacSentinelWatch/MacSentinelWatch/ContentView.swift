
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
                    SecurityDashboardView()
                case "gatekeeper":
                    ActivityLogsView(logs: MockData.getGatekeeperLogs())
                case "xprotect":
                    XProtectLogsView(logs: MockData.getXProtectLogs())
                default:
                    SecurityDashboardView()
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(Color(NSColor.windowBackgroundColor))
        }
        .frame(minWidth: 1000, minHeight: 700)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
