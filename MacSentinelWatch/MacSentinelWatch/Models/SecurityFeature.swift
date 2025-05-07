
import Foundation

enum SecurityStatus: String {
    case enabled
    case disabled
    case warning
    case unknown
    
    var color: Color {
        switch self {
        case .enabled: return Color.green
        case .disabled: return Color.red
        case .warning: return Color.yellow
        case .unknown: return Color.gray
        }
    }
    
    var displayText: String {
        switch self {
        case .enabled: return "Enabled"
        case .disabled: return "Disabled"
        case .warning: return "Warning"
        case .unknown: return "Unknown"
        }
    }
}

struct SecurityFeature: Identifiable {
    let id = UUID()
    let name: String
    let description: String
    let status: SecurityStatus
    let setting: String?
    let lastUpdated: Date
}
