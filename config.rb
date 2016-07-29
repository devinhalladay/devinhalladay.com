set :markdown_engine, :redcarpet

# # # # # #
# @desc Assets, autoprefixer, etc configs
# # # # # #

require 'toolkit'    # Require toolkit gem for Sass

activate :sprockets
activate :livereload
activate :autoprefixer do |config|
  config.browsers = ['last 2 versions', '> 10%']
end

# # # # # #
# @desc Activate and configure blogs
# # # # # #

def activate_blog(blog_name, article_layout, article_source: "{year}-{month}-{day}-{title}", blog_permalink: "{title}")
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
      headline_title = "Welcome"
    else
      headline_title = current_page.data.title
    end
  end
  
end

activate :directory_indexes

configure :build do
  activate :minify_css
  activate :minify_javascript
  activate :minify_html
  config[:host] = "http://devinhalladay.com/new/new/new/new/"
end

activate :deploy do |deploy|
  deploy.deploy_method = :rsync
  deploy.host   = '162.243.103.246'
  deploy.user   = 'root'
  deploy.path   = '/var/www/devinhalladay.com/public_html/_site/new/new/new/new'
  # Set deploy.port to define a port for the deploy server. Defaults to 22.
  deploy.clean = true # removes orphaned files on remote host, default: false
  deploy.flags = '--omit-dir-times -davz'
end
