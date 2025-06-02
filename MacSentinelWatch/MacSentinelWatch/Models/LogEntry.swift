
import Foundation

struct LogEntry: Identifiable {
    let id = UUID()
    let timestamp: Date
    let application: String
    let path: String
    let action: String // "allowed" or "blocked"
    let reason: String
    let message: String
    let level: String // "info", "warning", "error"
    let details: String?
    
    init(timestamp: Date, application: String, path: String, action: String, reason: String, message: String = "", level: String = "info", details: String? = nil) {
        self.timestamp = timestamp
        self.application = application
        self.path = path
        self.action = action
        self.reason = reason
        self.message = message.isEmpty ? "\(application) was \(action)" : message
        self.level = level
        self.details = details
    }
}
