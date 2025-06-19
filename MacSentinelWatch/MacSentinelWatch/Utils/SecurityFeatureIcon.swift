
import SwiftUI

struct SecurityFeatureIcon {
    static func getIcon(for featureName: String, status: SecurityStatus) -> (name: String, color: Color) {
        switch featureName {
        case "Firewall":
            return status == .enabled ? 
                ("shield.lefthalf.filled", StatusUtils.getStatusColors(status)) : 
                ("shield.slash", StatusUtils.getStatusColors(status))
        case "macOS Updates":
            if status == .enabled {
                return ("arrow.clockwise.circle.fill", StatusUtils.getStatusColors(status))
            } else if status == .warning {
                return ("exclamationmark.arrow.circlepath", StatusUtils.getStatusColors(status))
            } else {
                return ("xmark.circle", StatusUtils.getStatusColors(status))
            }
        case "FileVault":
            return status == .enabled ?
                ("lock.fill", StatusUtils.getStatusColors(status)) :
                ("lock.open.fill", StatusUtils.getStatusColors(status))
        case "Gatekeeper":
            return status == .enabled ?
                ("checkmark.shield.fill", StatusUtils.getStatusColors(status)) :
                ("xmark.shield.fill", StatusUtils.getStatusColors(status))
        case "System Integrity Protection":
            return status == .enabled ?
                ("internaldrive.fill", StatusUtils.getStatusColors(status)) :
                ("internaldrive.fill.badge.exclamationmark", StatusUtils.getStatusColors(status))
        case "XProtect":
            return status == .enabled ?
                ("laptopcomputer.and.arrow.down", StatusUtils.getStatusColors(status)) :
                ("laptopcomputer.trianglebadge.exclamationmark", StatusUtils.getStatusColors(status))
        default:
            return ("questionmark.circle", StatusUtils.getStatusColors(.unknown))
        }
    }
    
    static func getStatusText(for feature: SecurityFeature) -> String {
        switch feature.name {
        case "Firewall":
            return feature.status == .enabled ? "Protection active" : "Not protecting"
        case "macOS Updates":
            switch feature.status {
            case .enabled: return "Up to date"
            case .warning: return "Updates available"
            case .disabled: return "Updates disabled"
            default: return ""
            }
        default:
            return ""
        }
    }
}
