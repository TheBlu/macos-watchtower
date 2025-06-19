
import Foundation

struct DateFormatters {
    static func formatDate(_ date: Date) -> String {
        let now = Date()
        let diffInMinutes = Int(now.timeIntervalSince(date) / 60)
        
        if diffInMinutes < 1 {
            return "Just now"
        }
        
        if diffInMinutes < 60 {
            return "\(diffInMinutes)m ago"
        }
        
        let diffInHours = diffInMinutes / 60
        if diffInHours < 24 {
            return "\(diffInHours)h ago"
        }
        
        let diffInDays = diffInHours / 24
        if diffInDays < 7 {
            return "\(diffInDays)d ago"
        }
        
        let formatter = DateFormatter()
        formatter.dateStyle = .short
        formatter.timeStyle = .short
        return formatter.string(from: date)
    }
}
