set :markdown_engine, :redcarpet

# Bring blog activation into a function to save typing and space
def activate_blog(blog_name, *blog_permalink, article_layout)
  activate :blog do |b|
    b.name = blog_name
    b.prefix = blog_name
    if defined? blog_permalink
      b.permalink = blog_permalink
    else
      b.permalink = ":title.html"
    end
    b.layout = article_layout
  end
end

# Activate and configure blogs
activate_blog("journal", "layout")
activate_blog("projects", "layout")
activate_blog("dedicated", "to/:title.html", "layout")

# Helper functions, available in templates
helpers do
  def active_link_to(caption, url, options = {})
    if current_page.url == "#{url}/"
      options[:class] = "active"
    end
    link_to(caption, url, options)
  end
end

configure :development do
  activate :livereload
  activate :directory_indexes
  activate :autoprefixer
end

configure :build do
  activate :minify_css
  activate :minify_javascript
end
