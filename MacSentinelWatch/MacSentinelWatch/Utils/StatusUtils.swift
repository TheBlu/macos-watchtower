
import SwiftUI

struct StatusUtils {
    static func getStatusColors(_ status: SecurityStatus) -> Color {
        switch status {
        case .enabled:
            return Color.green
        case .warning:
            return Color.yellow
        case .disabled:
            return Color.red
        case .unknown:
            return Color.gray
        }
    }
    
    static func getStatusBorderColors(_ status: SecurityStatus) -> Color {
        switch status {
        case .enabled:
            return Color.green.opacity(0.4)
        case .warning:
            return Color.yellow.opacity(0.4)
        case .disabled:
            return Color.red.opacity(0.4)
        case .unknown:
            return Color.gray.opacity(0.4)
        }
    }
    
    static func calculateOverallStatus(_ features: [SecurityFeature]) -> SecurityStatus {
        if features.allSatisfy({ $0.status == .enabled }) {
            return .enabled
        } else if features.contains(where: { $0.status == .disabled }) {
            return .disabled
        } else {
            return .warning
        }
    }
    
    static func getStatusDisplayText(_ status: SecurityStatus) -> String {
        switch status {
        case .enabled:
            return "Fully Protected"
        case .disabled:
            return "Critical"
        case .warning:
            return "Needs Attention"
        case .unknown:
            return "Unknown"
        }
    }
}
