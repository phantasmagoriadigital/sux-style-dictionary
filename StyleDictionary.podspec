
Pod::Spec.new do |s|
  s.name             = 'StyleDictionary'
  s.version          = '0.1.0'
  s.summary          = 'Substrate Design System — Style Dictionary'
  s.description      = <<-DESC
  Substrate Design System — Style Dictionary.
                       DESC
  s.homepage         = 'homepage'
  s.license          = { :type => 'Apache-2.0', :file => 'LICENSE' }
  s.author           = { 'Mike Kamminga' => 'mike@phantasmagoria.in' }
  s.source           = { :git => '', :tag => s.version.to_s }
  s.platform = :ios
  s.source_files = 'ios/Classes/**/*.{h,m}'
  s.public_header_files = 'ios/Classes/**/*.h'
  s.resource_bundles = {
    'StyleDictionary' => ['assets/**/*']
  }
  s.frameworks = 'UIKit', 'QuartzCore'
end
