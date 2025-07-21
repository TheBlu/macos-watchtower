import SwiftUI

struct StatusCardView<Content: View>: View {
    let title: String
    let status: SecurityStatus
    let description: String
    let lastUpdated: Date?
    let content: Content
    let footerContent: AnyView?
    
    init(
        title: String,
        status: SecurityStatus,
        description: String,
        lastUpdated: Date? = nil,
        @ViewBuilder content: () -> Content,
        footerContent: AnyView? = nil
    ) {
        self.title = title
        self.status = status
        self.description = description
        self.lastUpdated = lastUpdated
        self.content = content()
        self.footerContent = footerContent
    }
    
    private func formatDate(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = .short
        formatter.timeStyle = .short
        // Removing seconds by using .short time style
        return formatter.string(from: date)
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Header and content
            VStack(spacing: 8) {
                Spacer()
                content
                Text(title)
                    .font(.system(size: 14, weight: .semibold))
                    .multilineTextAlignment(.center)
                Spacer()
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            
            // Footer with last updated and buttons
            if lastUpdated != nil || footerContent != nil {
                Divider()
                
                HStack(alignment: .center) {
                    if let date = lastUpdated {
                        Text("Last updated: \(formatDate(date))")
                            .font(.system(size: 11))
                            .foregroundColor(.secondary)
                    }
                    
                    Spacer()
                    
                    if footerContent != nil {
                        // Removed gearshape icon from here as per instructions
                        EmptyView()
                    }
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 6)
            }
        }
        .frame(maxWidth: .infinity)
        .background(Color(NSColor.controlBackgroundColor))
        .clipShape(RoundedRectangle(cornerRadius: 8))
        .overlay(
            RoundedRectangle(cornerRadius: 8)
                .stroke(Color.gray.opacity(0.2), lineWidth: 1)
        )
        .overlay(alignment: .topTrailing) {
            Image(systemName: "info.circle")
                .font(.system(size: 12, weight: .regular))
                .foregroundColor(.secondary)
                .frame(width: 20, height: 20) // Explicit frame for consistent positioning
                .padding(.top, 8)
                .padding(.trailing, 8)
        }
        .frame(height: 170)
    }
}
