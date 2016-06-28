activate :autoprefixer

set :markdown_engine, :redcarpet

# Bring blog activation into a function to save typing and space
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
activate_blog("journal", "layout")
activate_blog("work", "layout")
# activate_blog("dedicated", "to/{title}.html", "layout")

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

configure :development do
  activate :livereload
end

configure :build do
  activate :minify_css
  activate :minify_javascript
end
