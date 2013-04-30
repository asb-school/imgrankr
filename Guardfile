# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'livereload' do
  watch(%r{views/home/.+\.(ejs)$})
  watch(%r{assets/js/.+\.(js)$})
  watch(%r{assets/styles/.+\.(css)$})
  watch(%r{assets/templates/.+\.(html)$})
  watch(%r{views/.+\.(ejs)$})
  watch(%r{app/views/.+\.(erb|haml|slim)$})
  watch(%r{app/helpers/.+\.rb})
  watch(%r{public/.+\.(css|js|html)})
  watch(%r{config/locales/.+\.yml})
  # Rails Assets Pipeline
  watch(%r{(app|vendor)(/assets/\w+/(.+\.(css|js|html))).*}) { |m| "/assets/#{m[3]}" }
end
