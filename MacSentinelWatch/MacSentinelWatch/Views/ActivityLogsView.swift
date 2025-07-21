import SwiftUI

struct ActivityLogsView: View {
    let logs: [LogEntry]
    @State private var filterAction: String = "all"
    
    var filteredLogs: [LogEntry] {
        return logs.filter { log in
            filterAction == "all" ? true : log.action == filterAction
        }
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Header with title and filter buttons
            HStack {
                Text("Gatekeeper Activity Logs")
                    .font(.headline)
                
                Spacer()
                
                HStack(spacing: 8) {
                    FilterButton(title: "All", isSelected: filterAction == "all") {
                        filterAction = "all"
                    }
                    
                    FilterButton(title: "Allowed", isSelected: filterAction == "allowed") {
                        filterAction = "allowed"
                    }
                    
                    FilterButton(title: "Blocked", isSelected: filterAction == "blocked") {
                        filterAction = "blocked"
                    }
                }
            }
            .padding()
            
            Divider()
            
            // Table Headers
            HStack {
                Text("Time")
                    .frame(maxWidth: .infinity, alignment: .leading)
                Text("Application")
                    .frame(maxWidth: .infinity, alignment: .leading)
                Text("Path")
                    .frame(maxWidth: .infinity, alignment: .leading)
                Text("Action")
                    .frame(maxWidth: .infinity, alignment: .leading)
                Text("Reason")
                    .frame(maxWidth: .infinity, alignment: .leading)
            }
            .font(.system(size: 12, weight: .medium))
            .padding(.horizontal)
            .padding(.vertical, 8)
            .background(Color(NSColor.controlBackgroundColor))
            
            Divider()
            
            // Table content
            if filteredLogs.isEmpty {
                Text("No logs found matching your filter")
                    .foregroundColor(.secondary)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .padding()
            } else {
                ScrollView {
                    LazyVStack(alignment: .leading, spacing: 0) {
                        ForEach(filteredLogs) { log in
                            LogEntryRow(log: log)
                            
                            if log.id != filteredLogs.last?.id {
                                Divider()
                            }
                        }
                    }
                }
            }
        }
        .background(Color(NSColor.windowBackgroundColor))
        .clipShape(RoundedRectangle(cornerRadius: 8))
        .overlay(
            RoundedRectangle(cornerRadius: 8)
                .stroke(Color.gray.opacity(0.2), lineWidth: 1)
        )
    }
}

struct LogEntryRow: View {
    let log: LogEntry
    
    private func formatDate(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = .short
        formatter.timeStyle = .short
        return formatter.string(from: date)
    }
    
    var body: some View {
        HStack(alignment: .top) {
            Text(formatDate(log.timestamp))
                .frame(maxWidth: .infinity, alignment: .leading)
            Text(log.application)
                .frame(maxWidth: .infinity, alignment: .leading)
            Text(log.path)
                .lineLimit(1)
                .truncationMode(.middle)
                .frame(maxWidth: .infinity, alignment: .leading)
            HStack {
                Text(log.action)
                    .padding(.horizontal, 6)
                    .padding(.vertical, 2)
                    .background(log.action == "allowed" ? Color.green.opacity(0.1) : Color.red.opacity(0.1))
                    .foregroundColor(log.action == "allowed" ? .green : .red)
                    .cornerRadius(10)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            Text(log.reason)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .font(.system(size: 12))
        .padding(.horizontal)
        .padding(.vertical, 8)
        .background(Color.clear)
    }
}

struct FilterButton: View {
    let title: String
    let isSelected: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: 12))
                .padding(.horizontal, 12)
                .padding(.vertical, 4)
                .background(isSelected ? 
                            (title == "Allowed" ? Color.green.opacity(0.1) : 
                             title == "Blocked" ? Color.red.opacity(0.1) : 
                             Color.blue.opacity(0.1)) : 
                            Color.gray.opacity(0.1))
                .foregroundColor(isSelected ? 
                                (title == "Allowed" ? Color.green : 
                                 title == "Blocked" ? Color.red : 
                                 Color.blue) : 
                                Color.gray)
                .cornerRadius(12)
        }
        .buttonStyle(PlainButtonStyle())
    }
}
