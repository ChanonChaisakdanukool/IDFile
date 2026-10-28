// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "SharedElementIds",
    platforms: [.iOS(.v13)],
    products: [
        .library(name: "SharedElementIds", targets: ["SharedElementIds"])
    ],
    targets: [
        .target(
            name: "SharedElementIds",
            path: "generated/swift"
        )
    ]
)
