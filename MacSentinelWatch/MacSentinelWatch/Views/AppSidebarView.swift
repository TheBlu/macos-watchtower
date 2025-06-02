
import SwiftUI

struct AppSidebarView: View {
    @Binding var selectedTab: String
    
    let menuItems = [
        MenuItem(title: "Security Dashboard", icon: "shield", id: "security"),
        MenuItem(title: "Gatekeeper Logs", icon: "doc.text", id: "gatekeeper"),
        MenuItem(title: "XProtect Logs", icon: "eye", id: "xprotect")
    ]
    
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Group Label
            Text("Protection")
                .font(.system(size: 12, weight: .medium))
                .foregroundColor(.secondary)
                .padding(.horizontal, 16)
                .padding(.top, 16)
                .padding(.bottom, 8)
            
            // Menu Items
            VStack(spacing: 2) {
                ForEach(menuItems, id: \.id) { item in
                    Button(action: {
                        selectedTab = item.id
                    }) {
                        HStack(spacing: 12) {
                            Image(systemName: item.icon)
                                .frame(width: 16, height: 16)
                                .foregroundColor(selectedTab == item.id ? .blue : .secondary)
                            
                            Text(item.title)
                                .font(.system(size: 14, weight: .medium))
                                .foregroundColor(selectedTab == item.id ? .blue : .primary)
                            
                            Spacer()
                        }
                        .padding(.horizontal, 16)
                        .padding(.vertical, 8)
                        .background(
                            selectedTab == item.id ? 
                            Color.blue.opacity(0.1) : Color.clear
                        )
                        .cornerRadius(6)
                    }
                    .buttonStyle(PlainButtonStyle())
                    .padding(.horizontal, 8)
                }
            }
            
            Spacer()
        }
        .frame(width: 250)
        .background(Color(NSColor.controlBackgroundColor))
    }
}

struct MenuItem {
    let title: String
    let icon: String
    let id: String
}

struct AppSidebarView_Previews: PreviewProvider {
    static var previews: some View {
        AppSidebarView(selectedTab: .constant("security"))
    }
}
