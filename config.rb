activate :livereload
activate :autoprefixer

set :markdown_engine, :redcarpet

require 'toolkit'

activate :external_pipeline,
  name: :webpack,
  command: build? ? './node_modules/webpack/bin/webpack.js' : './node_modules/webpack/bin/webpack.js --watch -d --progress --color',
  source: ".tmp/dist",
  latency: 1

# Set custom asset directories.
set :css_dir, "assets/css"
set :js_dir, "assets/js"
set :images_dir, "assets/images"
set :fonts_dir, "assets/fonts"

ignore '/templates/*'


# # # # # #
# @desc Activate and configure blogs
# # # # # #


activate :blog do |b|
  b.sources = "projects/{year}-{month}-{day}-{title}.html"
  b.name = "work"
  b.permalink = "{title}"
  b.layout = "project"
end


# Helper functions, available in templates
helpers do

  def active_link_to(caption, url, options = {})
    if current_page.url == "#{url}/"
      options[:class] = "active"
    elsif current_page.url == "#{url}"
      options[:class] = "active"
    end

    link_to(caption, url, options)
  end

end

activate :directory_indexes

configure :build do
  activate :minify_css
end

activate :deploy do |deploy|
  deploy.deploy_method = :rsync
  deploy.host   = 'root@162.243.103.246'
  deploy.path   = '/var/www/devinhalladay.com/public_html'
  # Set deploy.port to define a port for the deploy server. Defaults to 22.
  deploy.clean = false # removes orphaned files on remote host, default: false
  deploy.flags = '--omit-dir-times -davz'
  deploy.build_before = true
end
