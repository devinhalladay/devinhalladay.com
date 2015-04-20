###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# activate :blog do |blog|
#   blog.permalink = ":category/:title.html"
#   blog.sources = "posts/:category/*.html"
# end

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  blog.name   = "journal"
  blog.prefix = "journal"

  # Matcher for blog source files
  # blog.sources = "journal/:year-:month-:day-:title.html"

  # Dist articles
  blog.permalink = ":title.html"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length    = 250
  # blog.taglink           = "tags/{tag}.html"
  # blog.year_link         = "{year}.html"
  # blog.month_link        = "{year}/{month}.html"
  # blog.day_link          = "{year}/{month}/{day}.html"
  # blog.default_extension = ".markdown"

  # Layout and Template
  # blog.layout            = "post"
  # blog.tag_template      = blog.prefix + "/tag.html"
  # blog.calendar_template = blog.prefix + "/calendar.html"

  # Enable pagination
  # blog.paginate = true
  # blog.per_page = 3
  # blog.page_link = "page/{num}"
end

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  blog.name   = "projects"
  blog.prefix = "projects"

  # Matcher for blog source files
  blog.sources = ":year-:month-:day-:title.html"

  # Dist articles
  blog.permalink = ":title.html"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length    = 250
  # blog.taglink           = "tags/{tag}.html"
  # blog.year_link         = "{year}.html"
  # blog.month_link        = "{year}/{month}.html"
  # blog.day_link          = "{year}/{month}/{day}.html"
  # blog.default_extension = ".markdown"

  # Layout and Template
  # blog.layout            = "post"
  # blog.tag_template      = blog.prefix + "/tag.html"
  # blog.calendar_template = blog.prefix + "/calendar.html"

  # Enable pagination
  # blog.paginate = true
  # blog.per_page = 3
  # blog.page_link = "page/{num}"
end

# activate :blog_editor do |editor|
#   # Where to place the editor UI.
#   editor.mount_at = "/editor"
#   editor.use_minified_assets = false
# end

activate :directory_indexes


# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (https://middlemanapp.com/advanced/dynamic_pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Methods defined in the helpers block are available in templates
helpers do
  def posts_by_weight
    blog('projects').articles.select do |article|
      article.data.weight
    end.sort_by { |article| article.data.weight }
  end

  def reading_time(input)
    words_per_minute = 180

    words = input.split.size
    minutes = (words/words_per_minute).floor
    minutes_label = ' minute'
    minutes > 0 ? "About a #{minutes} #{minutes_label}" : 'A less than 1 minute'
  end
end

set :css_dir, 'assets/css'

set :js_dir, 'assets/js'

set :images_dir, 'assets/images'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
