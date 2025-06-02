
import Foundation
import SwiftUI

enum SecurityStatus: String, CaseIterable {
    case enabled = "enabled"
    case disabled = "disabled"
    case warning = "warning"
    case unknown = "unknown"
    
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
    
    init(name: String, description: String, status: SecurityStatus, setting: String? = nil, lastUpdated: Date = Date()) {
        self.name = name
        self.description = description
        self.status = status
        self.setting = setting
        self.lastUpdated = lastUpdated
    }
}
