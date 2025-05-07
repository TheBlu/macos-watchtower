
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
            VStack(alignment: .leading, spacing: 8) {
                // Title and status row
                HStack {
                    Text(title)
                        .font(.system(size: 14, weight: .medium))
                    
                    Spacer()
                    
                    HStack(spacing: 4) {
                        Circle()
                            .fill(status.color)
                            .frame(width: 8, height: 8)
                        
                        Text(status.displayText)
                            .font(.system(size: 12, weight: .medium))
                            .foregroundColor(.secondary)
                    }
                }
                
                if !description.isEmpty {
                    Text(description)
                        .font(.system(size: 12))
                        .foregroundColor(.secondary)
                }
                
                // Content area
                content
                    .padding(.top, 2)
                
                Spacer()
            }
            .padding([.horizontal, .top], 12)
            .padding(.bottom, 4)
            
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
                    
                    if let footer = footerContent {
                        footer
                    }
                }
                .padding(.horizontal, 12)
                .padding(.vertical, 6)
            }
        }
        .background(Color(NSColor.controlBackgroundColor))
        .clipShape(RoundedRectangle(cornerRadius: 8))
        .overlay(
            RoundedRectangle(cornerRadius: 8)
                .stroke(Color.gray.opacity(0.2), lineWidth: 1)
        )
        .frame(height: 170)
    }
}
