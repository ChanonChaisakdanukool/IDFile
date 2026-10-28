Pod::Spec.new do |s|
  s.name = 'SharedElementIds'
  s.version = '0.1.0'
  s.summary = 'Shared element ID constants for iOS.'
  # Replace placeholder metadata before remote release. Local :path ignores source.
  s.homepage = 'https://example.invalid/shared-element-ids'
  s.author = 'Internal Development Team'
  s.license = { :type => 'Proprietary', :file => 'LICENSE' }
  s.source = { :git => 'https://example.invalid/shared-element-ids.git', :tag => s.version.to_s }
  s.ios.deployment_target = '13.0'
  s.swift_versions = ['5.0']
  s.source_files = 'generated/swift/**/*.swift'
  s.module_name = 'SharedElementIds'
end
