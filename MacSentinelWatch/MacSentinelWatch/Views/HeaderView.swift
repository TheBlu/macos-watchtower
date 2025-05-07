
import SwiftUI

struct HeaderView: View {
    var body: some View {
        HStack {
            // App logo
            Image(systemName: "shield.checkerboard")
                .resizable()
                .frame(width: 24, height: 24)
                .foregroundColor(.blue)
            
            Text("Watchtower")
                .font(.system(size: 18, weight: .bold))
            
            Spacer()
            
            // Menu button
            Menu {
                Button("Settings") {
                    // Open settings
                }
                Button("Check for Updates") {
                    // Check for updates
                }
                Divider()
                Button("Quit") {
                    NSApplication.shared.terminate(nil)
                }
            } label: {
                Image(systemName: "ellipsis.circle")
                    .resizable()
                    .frame(width: 20, height: 20)
                    .foregroundColor(.gray)
            }
            .menuStyle(BorderlessButtonMenuStyle())
        }
        .padding()
        .background(Color(NSColor.windowBackgroundColor))
    }
}
