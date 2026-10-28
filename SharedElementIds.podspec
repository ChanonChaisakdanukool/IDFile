Pod::Spec.new do |s|
  s.name = 'SharedElementIds'
  s.version = '0.1.0'
  s.summary = 'Shared element ID constants for iOS.'
  # Git installation requires a matching release tag.
  s.homepage = 'https://github.com/ChanonChaisakdanukool/IDFile'
  s.author = 'Internal Development Team'
  s.license = { :type => 'Proprietary', :file => 'LICENSE' }
  s.source = { :git => 'https://github.com/ChanonChaisakdanukool/IDFile.git', :tag => s.version.to_s }
  s.ios.deployment_target = '13.0'
  s.swift_versions = ['5.0']
  s.source_files = 'generated/swift/**/*.swift'
  s.module_name = 'SharedElementIds'
end
