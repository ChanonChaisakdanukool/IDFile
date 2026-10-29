# IDFile — Shared Element IDs

ต้นฉบับกลาง `element-ids.json`:

```json
{
  "mainApp": {
    "main": ["mainAppPageView", "mainAppPageLoginButton"]
  },
  "authentication": {
    "login": ["loginPageView", "loginPagePhoneTextField", "loginPageLoginButton"]
  }
}
```

## ผู้ดูแล ID Repo

Node.js 22 ขึ้นไป พร้อม npm ไม่มี dependency เพิ่ม

```sh
npm run validate
npm run generate
npm run check
npm test
```

แก้ JSON แล้ว generate และ commit generated/ กับ dist/ ร่วมกัน ผู้ติดตั้ง Library ไม่ต้องรัน Generator
รูปแบบหลักคือ Feature → Page → Array ของ ID โดย Feature/Page ใช้ lowerCamelCase และแต่ละกลุ่มต้องไม่ว่าง ID ต้องไม่ซ้ำทั้งไฟล์แม้อยู่คนละกลุ่ม ใช้ pageName + elementPurpose + elementType และหลีกเลี่ยงคำสงวน

Generator สร้าง namespace ตาม Feature/Page: Swift เป็น nested public struct, Kotlin เป็น nested object (ชื่อกลุ่มขึ้นต้นตัวใหญ่) ส่วน Web/Automation เป็น nested object ตามชื่อ JSON และ freeze ทุกระดับ TypeScript ElementId เป็น union ของค่า ID ปลายทางทั้งหมด

นี่เป็น breaking API change: เปลี่ยน `ElementIds.loginPagePhoneTextField` เป็น `ElementIds.Authentication.Login.loginPagePhoneTextField` สำหรับ Swift/Kotlin หรือ `ElementIds.authentication.login.loginPagePhoneTextField` สำหรับ Web/Automation ค่า string เดิมไม่เปลี่ยน การย้ายกลุ่มเปลี่ยนเส้นทาง API ด้วย ต้องอัปเดต consumer และ pin commit/version ใหม่ ไม่มี flat alias ชื่อกลุ่มห้ามใช้คำสงวน Generator ยังอ่าน flat array เดิมได้ แต่ JSON โปรเจกต์ใช้กลุ่มเป็นหลัก

JSON ไม่รองรับ `//` comment ให้ใช้ชื่อกลุ่มแทน แก้ต้นฉบับแล้วรัน Generate.command (macOS) หรือ Generate.bat (Windows) ทุกครั้ง

## iOS — Swift Package Manager (SPM)

Package.swift ที่ root ประกาศ Product และ Module ชื่อ SharedElementIds ใช้ไฟล์ใน generated/swift เท่านั้น ไม่ Compile Kotlin/Web และไม่ต้องใช้ Node.js ในโปรเจกต์ iOS
รองรับ Swift tools 5.9 ขึ้นไป และ iOS 13 ขึ้นไป

### ติดตั้งจาก Git ใน Xcode

1. Commit และ Push การเพิ่ม Package.swift ไป IDFile Repo ก่อน (Commit เก่ายังไม่มี SPM Manifest)
2. Xcode → File → Add Package Dependencies
3. ใส่ URL https://github.com/ChanonChaisakdanukool/IDFile.git
4. ระหว่างพัฒนาเลือก Branch main หรือเลือก Commit ที่มี Package.swift เมื่อต้องการล็อกเวอร์ชัน หากใช้ Version Rule ต้องสร้างและ Push SemVer Tag ก่อน
5. เพิ่ม Product SharedElementIds ให้ Target/Module ที่ Import จริง

```swift
import SharedElementIds
button.accessibilityIdentifier = ElementIds.MainApp.Main.mainAppPageLoginButton
```

### ใช้จาก Swift Package อื่น

ใน Package.swift ของผู้ใช้ Library เพิ่ม Dependency แล้วผูก Product กับ Target ที่ต้องใช้:

```swift
// ภายใน dependencies ของ Package:
.package(url: "https://github.com/ChanonChaisakdanukool/IDFile.git", branch: "main")
// ภายใน dependencies ของ Target:
.product(name: "SharedElementIds", package: "IDFile")
```

ก่อน release ควรล็อก Commit หรือ Version Tag ตามนโยบายทีม และเก็บ Package.resolved ที่เกี่ยวข้อง
ถ้า Source อยู่ใน Module ย่อย ต้องประกาศ Dependency ที่ Module นั้นด้วย การเพิ่มให้ App Target อย่างเดียวไม่ได้ทำให้ทุก Module Import ได้

### CocoaPods (รองรับควบคู่กับ SPM)

เลือกใช้ SPM หรือ CocoaPods ตามโปรเจกต์ ทั้งสองทาง compile จาก generated/swift และใช้ module SharedElementIds เดียวกัน ไม่ควรเพิ่ม Library นี้ซ้ำสองช่องทางใน target เดียวกัน

ติดตั้งจาก Git โดยเลือก commit ที่มีไฟล์ generated ล่าสุด:

```ruby
pod 'SharedElementIds', :git => 'https://github.com/ChanonChaisakdanukool/IDFile.git', :branch => 'main'
# สำหรับเวอร์ชันที่แน่นอน เปลี่ยน :branch เป็น :commit => 'COMMIT_SHA'
# หรือ :tag => '0.1.0' เมื่อสร้างและ push tag นั้นแล้ว
```

ติดตั้งจาก local:

```ruby
pod 'SharedElementIds', :path => '/absolute/path/to/IDFile'
```

รัน `pod install` แล้วเปิด .xcworkspace หากโค้ดอยู่ใน Pod ย่อย ให้เพิ่ม `s.dependency 'SharedElementIds'` ใน podspec ของ module นั้นด้วย และประกาศแหล่ง Git ใน Podfile ของแอป ไม่ใช่เพิ่มเฉพาะ App target

```swift
import SharedElementIds
let phoneId = ElementIds.Authentication.Login.loginPagePhoneTextField
```

SPM และ CocoaPods ใช้ API นี้เหมือนกัน ผู้ติดตั้งไม่ต้องรัน Node.js หรือ generate เอง ผู้ดูแล IDFile ต้อง commit generated Swift ให้ตรงกับ JSON ก่อนเผยแพร่ การรองรับ CocoaPods ไม่ได้หมายความว่าเผยแพร่ขึ้น CocoaPods Trunk แล้ว

## Android — Gradle / Maven Local Folder

เป็น Kotlin/JVM JAR ของค่าคงที่ ไม่ใช้ Android SDK และไม่ต้องทำ AAR
namespace local: `local.shared.elementids` และ coordinates `local.shared:element-ids:0.1.0` เปลี่ยนเป็น namespace ของทีมก่อน release

ต้องมี JDK 17 และ Gradle 8.14 (Kotlin plugin 2.2.0) ยังไม่มี Wrapper ให้ใช้ Gradle ที่ติดตั้งไว้:

```sh
cd android
gradle build publishLibraryPublicationToLocalFolderRepository
```

ได้ Maven Repository ใน android/build/repository จากนั้นใน Android project:

```kotlin
// settings.gradle.kts ภายใน dependencyResolutionManagement.repositories
maven { url = uri("/absolute/path/to/IDFile/android/build/repository") }
```

```kotlin
// app/build.gradle.kts ภายใน dependencies
implementation("local.shared:element-ids:0.1.0")
```

```kotlin
import local.shared.elementids.ElementIds
val id = ElementIds.MainApp.Main.mainAppPageLoginButton
```

ต้องเลือกวิธีผูก ID ให้ตรง View/Compose และ Selector ไม่ใช้ ID ภายในแทนข้อความที่ระบบช่วยการเข้าถึงอ่าน

## Web / Automation — npm Local

จาก IDFile:

```sh
npm pack
```

จากโปรเจกต์ Web / Automation:

```sh
npm install /absolute/path/to/IDFile/shared-element-ids-0.1.0.tgz
```

```ts
import { ElementIds, type ElementId } from 'shared-element-ids';
const id: ElementId = ElementIds.mainApp.main.mainAppPageLoginButton;
```

React:

```tsx
<button data-testid={ElementIds.mainApp.main.mainAppPageLoginButton}>เริ่มต้น</button>
```

ESM พร้อม JavaScript และ .d.ts สร้างจาก JSON โดยตรง ไม่ต้องใช้ TypeScript compiler ตอนติดตั้ง private:true ป้องกัน publish Registry โดยไม่ตั้งใจ แต่ยัง pack และติดตั้ง local ได้

## โครงสร้าง

- element-ids.json: ต้นฉบับ
- scripts/ids.mjs: Validate / Generate / Check
- generated/: Swift, Kotlin, TypeScript
- dist/: JavaScript และ .d.ts สำหรับ npm
- Package.swift: Swift Package Manager สำหรับ iOS
- SharedElementIds.podspec: รองรับ CocoaPods ควบคู่กับ SPM
- android/: Gradle build และ Maven publishing แบบ local
- examples/: ตัวอย่างแต่ละฝั่ง
- test/: Generator และ package consistency checks

## เวอร์ชันและขอบเขต

0.1.0 ต้องแก้ package.json, SharedElementIds.podspec และ android/build.gradle.kts ร่วมกันเมื่อ release มี test ตรวจว่าเลขตรงกัน
ยังไม่มี Git remote, Registry หรือ CI workflow ต้องกำหนด URL, namespace, license และสิทธิ์ของทีมก่อน remote release ค่าเวอร์ชันไม่ได้รับประกัน compatibility กับ Build
Generated constants ไม่ได้ผูก ID ให้ UI อัตโนมัติ และไม่ได้ทำให้ Flow/Hierarchy ของทุก Platform เหมือนกัน

## Repository และผู้ใช้งานร่วมกัน

IDFile จะเป็น Git Repository แยกของตัวเอง ไม่อยู่ภายใน Automation Repo และไม่ผูกกับแอปใดแอปหนึ่ง Remote: https://github.com/ChanonChaisakdanukool/IDFile.git ส่วน Automation Repo ยังไม่ได้สร้าง

ผู้ใช้งาน Library มีทั้ง iOS App, Android App, Web / Mini App และ Automation โดย Automation TypeScript ติดตั้ง npm package เดียวกับ Web และอ้างอิง ElementIds โดยตรง ห้ามคัดลอก ID ไปดูแลเป็นรายการอีกชุดใน Automation

```text
ID Repository (element-ids.json)
  ├─ Swift Package Manager → iOS App
  ├─ Gradle/Maven → Android App
  └─ npm → Web / Mini App และ Automation Repo
```

เมื่อสร้าง Automation Repo ให้ติดตั้ง local tarball ในช่วงพัฒนา:

```sh
npm install --save-dev /absolute/path/to/IDFile/shared-element-ids-0.1.0.tgz
```

```ts
import { ElementIds, type ElementId } from 'shared-element-ids';
const targetId: ElementId = ElementIds.mainApp.main.mainAppPageLoginButton;
```

Automation เป็นผู้รับ Library จึงไม่ต้องรัน Generator และไม่ต้องอ่านไฟล์จาก path ของ ID Repo ตอนรันทดสอบ ให้ layer สำหรับ Selector ของ Automation แปลง ID เป็น locator ตาม Platform จริง

เมื่อมี Git Repo แล้ว สามารถติดตั้ง npm ผ่าน Git URL ที่เข้าถึงได้และล็อก Tag/Commit หรือเปลี่ยนไปใช้ Private npm Registry ตามที่ทีมเลือก SPM ใช้ Git Branch/Commit/Version Tag ส่วน Android ต้อง Build และเผยแพร่ Maven artifact ก่อน (Git Repo อย่างเดียวไม่กลายเป็น Maven Repository อัตโนมัติ)

แต่ละ Consumer ต้องล็อกเวอร์ชัน/Commit ที่เลือกและเก็บ lockfile ที่เกี่ยวข้อง ไม่อัปเดตเป็นเวอร์ชันล่าสุดโดยอัตโนมัติ การตรวจว่า ID Contract เข้ากันได้กับ Build ยังเป็นงานที่จะออกแบบร่วมกับ Automation ภายหลัง


## Generate ด้วยการดับเบิลคลิก

หลังแก้และบันทึก element-ids.json:

- Windows: ดับเบิลคลิก Generate.bat
- Mac: ดับเบิลคลิก Generate.command

ต้องติดตั้ง Node.js 22 ขึ้นไปและให้คำสั่ง node อยู่ใน PATH ก่อน ไม่ต้องติดตั้ง npm dependency
ตัว Launcher ย้ายไปทำงานในโฟลเดอร์ IDFile อัตโนมัติ รัน Generate แล้ว Check และค้างหน้าต่างให้ดูผล กด Enter/ปุ่มใดก็ได้ตามข้อความเพื่อปิด
ไฟล์ผลลัพธ์ถูกเขียนทับตาม JSON แต่ไม่มีการ Commit, Push หรือ Publish อัตโนมัติ
Windows .bat ต้องเปิดบน Windows ส่วน Mac ใช้ .command แทน หากย้ายผ่านช่องทางที่ทำให้ executable permission หาย ให้รัน chmod +x Generate.command ในโฟลเดอร์ IDFile หนึ่งครั้ง

Mac Launcher จะค้นหา Node ใน PATH ก่อน หากไม่พบจะลอง runtime ที่มากับ Codex ใน ~/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node และตรวจว่ารุ่น 22 ขึ้นไป ตำแหน่งนี้เป็นทางสำรองสำหรับเครื่องที่มี Codex; เครื่อง Dev อื่นติดตั้ง Node.js ตามปกติได้


## Git Repository

- Remote: https://github.com/ChanonChaisakdanukool/IDFile.git
- Local checkout ปัจจุบัน: /Users/chanoncha/IDFile
- ติดตั้ง SPM จาก Git ได้หลัง Push Package.swift แล้ว; Version Rule ต้องมี SemVer Tag ก่อน
- npm สามารถใช้ Git URL พร้อม Commit/Tag หลัง Push; Android ยังต้อง Build Maven artifact
