
import SwiftUI

struct XProtectLogsView: View {
    let logs: [LogEntry]
    
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            // Header
            HStack {
                Text("XProtect Logs")
                    .font(.title2)
                    .fontWeight(.semibold)
                
                Spacer()
                
                Text("\(logs.count) entries")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            .padding(.horizontal)
            
            // Logs List
            ScrollView {
                LazyVStack(spacing: 8) {
                    ForEach(logs, id: \.id) { log in
                        XProtectLogRow(log: log)
                    }
                }
                .padding(.horizontal)
            }
        }
        .padding(.vertical)
        .background(Color(NSColor.windowBackgroundColor))
    }
}

struct XProtectLogRow: View {
    let log: LogEntry
    
    var body: some View {
        HStack {
            // Status indicator
            Circle()
                .fill(statusColor)
                .frame(width: 8, height: 8)
            
            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text(log.message ?? "No message")
                        .font(.system(size: 14, weight: .medium))
                        .foregroundColor(.primary)
                    
                    Spacer()
                    
                    Text(formatDate(log.timestamp))
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                
                if let details = log.details {
                    Text(details)
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .lineLimit(2)
                }
            }
        }
        .padding(12)
        .background(Color(NSColor.controlBackgroundColor))
        .cornerRadius(8)
    }
    
    private var statusColor: Color {
        switch log.level {
        case "error":
            return .red
        case "warning":
            return .yellow
        case "info":
            return .blue
        default:
            return .gray
        }
    }
    
    private func formatDate(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = .short
        formatter.timeStyle = .medium
        return formatter.string(from: date)
    }
}
