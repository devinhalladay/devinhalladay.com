###
# Top-level site configuration
###

activate :directory_indexes


###
# Assets, autoprefixer, and Compass configs
###

set :css_dir, 'assets/css'
set :js_dir, 'assets/js'
set :images_dir, 'assets/images'

compass_config do |config|
  config.output_style = :compact
end

activate :autoprefixer do |config|
  config.browsers = ['last 2 versions', '> 10%']
end

###
# Build Configuration
###

configure :build do
  activate :minify_css
  activate :minify_javascript
  activate :asset_hash
end

###
# Blog and page setup sitemap config
###


# Setup sitemap
set :url_root, 'http://devinhalladay.com'
activate :search_engine_sitemap

set :partials_dir, 'partials'

# Journal
activate :blog do |blog|
  blog.name   = "journal"
  blog.prefix = "journal"

  blog.permalink = ":title.html"

  blog.layout            = "article"
end

# Projects
activate :blog do |blog|
  blog.name   = "projects"
  blog.prefix = "projects"

  blog.permalink = ":title.html"

  blog.layout            = "project"
end

# Dedications
activate :blog do |blog|
  blog.name   = "dedicated"
  blog.prefix = "dedicated"

  blog.permalink = "to/:title.html"

  blog.layout            = "article"
end

###
# Helpers
###

# Methods defined in the helpers block are available in templates
helpers do
  def posts_by_weight
    blog('projects').articles.select do |article|
      article.data.weight
    end.sort_by { |article| article.data.weight }
  end

  def link_to_page name, url
    path = request.path
    current = path =~ Regexp.new('^' + url[1..-1] + '.*\.html')

    if path == 'index.html' and name == 'about'
      current = true
    end

    class_name = current ? ' class="current"' : ''

    "<li><a#{class_name} href=\"#{url}\">#{name}</a></li>"
  end

  def reading_time(input)
    words_per_minute = 180

    words = input.split.size
    minutes = (words/words_per_minute).floor
    minutes_label = ' minute'
    minutes > 0 ? "About a #{minutes} #{minutes_label}" : 'Less than a 1 minute'
  end

  def method_name

  end

  def active_link_to(caption, url, options = {})
    if current_page.url == "#{url}/"
      options[:class] = "current"
    end

    link_to(caption, url, options)
  end

  def is_blog_article?
    !current_article.nil?
  end

  def lazy_image(link)
    tag(:img, :'data-layzr' => link)
  end

  require 'redcarpet'

  def markdownify(str)
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, tables: true)
    markdown.render(str.to_s)
  end

end

activate :deploy do |deploy|
  deploy.method = :rsync
  deploy.host   = '162.243.103.246'
  deploy.path   = '/var/www/devinhalladay.com/public_html/_site'
  # Optional Settings
  deploy.user  = 'root' # no default
  # deploy.port  = 5309 # ssh port, default: 22
  deploy.clean = true # remove orphaned files on remote host, default: false
  # deploy.flags = '-rltgoDvzO --no-p --del' # add custom flags, default: -avz
end

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end
