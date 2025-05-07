
import Foundation

struct LogEntry: Identifiable {
    let id = UUID()
    let timestamp: Date
    let application: String
    let path: String
    let action: String // "allowed" or "blocked"
    let reason: String
}
