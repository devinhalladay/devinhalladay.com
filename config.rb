activate :livereload
activate :directory_indexes
activate :autoprefixer

set :markdown_engine, :redcarpet

# Bring blog activation into a function to save typing and space

def foo(fruit: 'apple', cut: "sliced", topping: "ice cream")
  [fruit, cut, topping]
end

def activate_blog(blog_name, article_layout, *article_source, *blog_permalink)
  activate :blog do |b|
    if defined? article_source
      b.sources = article_source
    else
      b.sources = "#{blog_name}/{year}-{month}-{day}-{title}"
    end

    b.name = blog_name
    b.prefix = blog_name

    if defined? blog_permalink
      b.permalink = blog_permalink
    else
      b.permalink = "{title}.html"
    end

    b.layout = article_layout
  end
end

# Activate and configure blogs
activate_blog("journal", "layout")
# activate_blog("projects", "layout")
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

configure :build do
  activate :minify_css
  activate :minify_javascript
end
