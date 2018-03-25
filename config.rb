activate :livereload
activate :autoprefixer

set :markdown_engine, :redcarpet

require 'toolkit'

activate :external_pipeline,
  name: :webpack,
  command: build? ? './node_modules/webpack/bin/webpack.js --bail' : './node_modules/webpack/bin/webpack.js --watch -d --progress --color',
  source: ".tmp/dist",
  latency: 1

# Set custom asset directories.
set :css_dir, "assets/css"
set :js_dir, "assets/js"
set :images_dir, "assets/images"
set :fonts_dir, "assets/fonts"


# # # # # #
# @desc Activate and configure blogs
# # # # # #

def activate_blog(blog_name, article_layout, article_source: "{year}-{month}-{day}-{title}.html", blog_permalink: "{title}")
  activate :blog do |b|
    b.sources = article_source
    b.name = blog_name
    b.prefix = blog_name
    b.permalink = blog_permalink
    b.layout = article_layout
  end
end

# Activate and configure blogs
activate_blog("journal", "article")
activate_blog("work", "work")


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

  def header_title
    if is_blog_article?
      headline_title = current_article.blog_data.options[:name]
    elsif current_page.url == "/"
      headline_title = "Design For Becoming"
    else
      headline_title = current_page.data.title
    end
  end

end

activate :directory_indexes

configure :build do
  # "Ignore" JS so webpack has full control.
  ignore { |path| path =~ /\/(.*)\.js$/ && $1 != 'site' }

  activate :minify_css
  activate :minify_javascript
end

activate :deploy do |deploy|
  deploy.deploy_method = :rsync
  deploy.host   = 'root@162.243.103.246'
  deploy.path   = '/var/www/devinhalladay.com/public_html'
  # Set deploy.port to define a port for the deploy server. Defaults to 22.
  deploy.clean = true # removes orphaned files on remote host, default: false
  deploy.flags = '--omit-dir-times -davz'
end
