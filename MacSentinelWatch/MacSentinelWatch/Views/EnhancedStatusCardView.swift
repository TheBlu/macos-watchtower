import SwiftUI

struct EnhancedStatusCardView<Content: View>: View {
    let title: String
    let status: SecurityStatus
    let description: String
    let lastUpdated: Date?
    let content: Content
    let footerContent: AnyView?
    let headerIcon: AnyView?
    
    init(
        title: String,
        status: SecurityStatus,
        description: String,
        lastUpdated: Date? = nil,
        headerIcon: AnyView? = nil,
        @ViewBuilder content: () -> Content,
        footerContent: AnyView? = nil
    ) {
        self.title = title
        self.status = status
        self.description = description
        self.lastUpdated = lastUpdated
        self.headerIcon = headerIcon
        self.content = content()
        self.footerContent = footerContent
    }
    
    var body: some View {
        VStack(spacing: 0) {
            // Header gradient
            Rectangle()
                .fill(LinearGradient(
                    gradient: Gradient(colors: [Color.white.opacity(0.4), Color.clear]),
                    startPoint: .leading,
                    endPoint: .trailing
                ))
                .frame(height: 1)
            
            // Main content
            VStack(alignment: .leading, spacing: 12) {
                // Title and status row
                HStack {
                    HStack(spacing: 8) {
                        if let icon = headerIcon {
                            icon
                        }
                        
                        Text(title)
                            .font(.system(size: 16, weight: .semibold))
                    }
                    
                    Spacer()
                }
                
                if !description.isEmpty {
                    Text(description)
                        .font(.system(size: 12))
                        .foregroundColor(.secondary)
                }
                
                // Content area
                content
                    .padding(.top, 4)
            }
            .padding(16)
            
            // Footer
            if lastUpdated != nil || footerContent != nil {
                Rectangle()
                    .fill(Color.gray.opacity(0.1))
                    .frame(height: 1)
                
                HStack {
                    if let date = lastUpdated {
                        Text("Last Refresh: \(DateFormatters.formatDate(date))")
                            .font(.system(size: 10))
                            .foregroundColor(.secondary)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background(.ultraThinMaterial)
                            .cornerRadius(6)
                    }

                    Spacer()

                    if let footer = footerContent {
                        footer
                    }
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 12)
                .background(.ultraThinMaterial)
            }
        }
        .background(.ultraThinMaterial)
        .overlay(
            RoundedRectangle(cornerRadius: 16)
                .stroke(Color.white.opacity(0.2), lineWidth: 1)
        )
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .shadow(color: .black.opacity(0.05), radius: 20, x: 0, y: 8)
        .overlay(
            // Top highlight
            RoundedRectangle(cornerRadius: 16)
                .stroke(
                    LinearGradient(
                        gradient: Gradient(colors: [Color.white.opacity(0.4), Color.clear]),
                        startPoint: .top,
                        endPoint: .bottom
                    ),
                    lineWidth: 1
                )
        )
    }
}
