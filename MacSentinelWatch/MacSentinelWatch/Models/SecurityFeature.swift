enum SecurityStatus: String {
    case enabled
    case disabled
    case warning
    case unknown
}

struct SecurityFeature: Identifiable {
    let id: UUID
    let name: String
    let description: String
    let status: SecurityStatus
    let setting: String?
    let lastUpdated: Date

    init(
        name: String,
        description: String,
        status: SecurityStatus,
        setting: String? = nil,
        lastUpdated: Date = Date()
    ) {
        self.id = UUID()
        self.name = name
        self.description = description
        self.status = status
        self.setting = setting
        self.lastUpdated = lastUpdated
    }
}

import Foundation
import Combine

class SecurityViewModel: ObservableObject {
    @Published var features: [SecurityFeature] = []
    @Published var gatekeeperLogs: [LogEntry] = []
    @Published var errors: [String] = []

    func loadFeatures() {
        let results = SecurityFeatureService.loadAllFeatures()

        self.features = results.map { result in
            switch result {
            case .success(let feature):
                return feature
            case .failure(let error):
                let errorMessage: String
                switch error {
                case .commandFailed(let output):
                    errorMessage = "Command failed: \(output)"
                case .outputParseFailed:
                    errorMessage = "Failed to parse output."
                }
                errors.append(errorMessage)
                return SecurityFeature(
                    name: "Unavailable Feature",
                    description: errorMessage,
                    status: .unknown,
                    setting: nil
                )
            }
        }
    }
}
