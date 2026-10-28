// settings.gradle.kts -> dependencyResolutionManagement.repositories:
// maven { url = uri("/absolute/path/to/IDFile/android/build/repository") }
// app/build.gradle.kts:
dependencies {
    implementation("local.shared:element-ids:0.1.0")
}
