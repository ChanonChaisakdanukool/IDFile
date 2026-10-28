plugins {
    kotlin("jvm") version "2.2.0"
    `maven-publish`
}
// Local namespace; replace with team namespace before release.
group = "local.shared"
version = "0.1.0"
repositories { mavenCentral() }
kotlin {
    jvmToolchain(17)
    sourceSets.main { kotlin.srcDir("../generated/kotlin") }
}
java { withSourcesJar() }
publishing {
    publications {
        create<MavenPublication>("library") {
            from(components["java"])
            artifactId = "element-ids"
        }
    }
    repositories {
        maven {
            name = "localFolder"
            url = uri(layout.buildDirectory.dir("repository"))
        }
    }
}
