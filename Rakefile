##################################################
# Require gems.
##################################################
require "yaml"
require "fileutils"
require "tmpdir"
require "rubygems"
require "bundler/setup"
require "highline/import"
# require "httparty"

# Get and parse the date
DATE = Time.now.strftime("%Y-%m-%d")

##################################################
# Write a new post draft.
##################################################

desc 'Create a new post draft.'
task :post do
  # Define post variables by prompting.
  title       = ask "Enter the title: "
  post_text   = ask "Enter any initial text (like an idea or thought) here if you have it ready: "
  slug_var    = HighLine.agree("Do you want a custom slug for this post? (y/n)")
  if slug_var == true
    slug_text   = ask "Okay, what should the slug be?"
    slug        = "#{slug_text.downcase.gsub(/[^\w|']+/, '-')}"
    slug_dashed = "#{slug.gsub(/[^a-zA-Z0-9\-]/, "")}"
    slug_fixed  = "#{slug_dashed.gsub(/\-$/, '')}"
  else
    slug        = "#{title.downcase.gsub(/[^\w|']+/, '-')}"
    slug_dashed = "#{slug.gsub(/[^a-zA-Z0-9\-]/, "")}"
    slug_fixed  = "#{slug_dashed.gsub(/\-$/, '')}"
  end

  # Define the draft's filename.
  file = File.join(
    File.dirname(__FILE__),
    'journal',
    "#{DATE}-#{slug_fixed}.md"
  )

  # Create the draft file in the location defined above
  # and insert the content defined in the post variables.
  File.open(file, "w") do |f|
    f << <<-EOS.gsub(/^    /, '')
    ---
    title: \"#{title}\"
    published: \"false\"
    ---
    #{post_text}
    EOS
  end
end

##################################################
# Write a new project.
##################################################

desc "Create a new project."
task :project do
  # Define project variables by prompting
  title       = ask "Enter the title: "
  description   = ask "Enter the project description here: "
  intro = ask "Enter project intro here: "
  scope = ask "Enter project scopes here, separated by commas: "
  weight = ask "Enter a number for the post's weight: "
  color = ask "Enter a post color: "
  post_class = ask "Enter a post class: "
  cover_image = ask "Enter a path to the post cover image here: "
  scope_array = scope.split(",")
  post_text = ask "Enter post text, if you have any ready: "
  slug_var    = HighLine.agree("Do you want a custom slug for this post? (y/n)")
  if slug_var == true
    slug_text   = ask "Okay, what should the slug be?"
    slug        = "#{slug_text.downcase.gsub(/[^\w|']+/, '-')}"
    slug_dashed = "#{slug.gsub(/[^a-zA-Z0-9\-]/, "")}"
    slug_fixed  = "#{slug_dashed.gsub(/\-$/, '')}"
  else
    slug        = "#{title.downcase.gsub(/[^\w|']+/, '-')}"
    slug_dashed = "#{slug.gsub(/[^a-zA-Z0-9\-]/, "")}"
    slug_fixed  = "#{slug_dashed.gsub(/\-$/, '')}"
  end

  # Define the draft's filename.
  file = File.join(
    File.dirname(__FILE__),
    'source/projects',
    "#{DATE}-#{slug_fixed}.md.erb"
  )

  # Create the draft file in the location defined above
  # and insert the content defined in the post variables.
  File.open(file, "w") do |f|
    f << <<-EOS.gsub(/^    /, '')
    ---
    title: \"#{title}\"
    cover_image: \"#{cover_image}\"
    class: \"page__project page__project-#{post_class}\"
    color: \"#{color}\"
    weight: \"#{weight}\"

    description: \"#{description}\"

    intro: \"#{intro}\"

    scope:
      - #{
        scope_array.join("\n  - ")
      }
    ---
    #{post_text}
    EOS
  end
end

##################################################
# Publish a draft.
##################################################

desc "Move a post from _drafts to _posts and prepend the date to the filename."
task :publish do
  POSTS = "/_posts"

  # Define the extension for the final post file.
  extension = "md"

  # Assign a number to each post.
  files = Dir["_drafts/*.#{extension}"]
  files.each_with_index do |file, index|
    puts "#{index + 1}: #{file}".sub("_drafts/", "")
  end
  print "> "
  number = $stdin.gets

  # If the post's number is entered, move that post to the _posts folder
  # and append a proper post date to the file.
  if number =~ /\D/
    filename = files[number.to_i - 1].sub("_drafts/", "")
    FileUtils.mv("_drafts/#{filename}", "_posts/#{DATE}-#{filename}")
    puts "#{filename} was moved to '_posts'."
  else
    puts "Please choose a draft by the assigned number."
  end
end

##################################################
# Notify the internet about new content
##################################################

desc 'Notify pingomatic about new posts'
task :pingomatic do
  begin
    require 'xmlrpc/client'
    puts '* Pinging ping-o-matic'
    XMLRPC::Client.new('rpc.pingomatic.com', '/').call('weblogUpdates.extendedPing', 'swiftfordesigners.net' , 'http://swiftfordesigners.net', 'http://swiftfordesigners.net/rss.xml')
  rescue LoadError
    puts '! Could not ping ping-o-matic, because XMLRPC::Client could not be found.'
  end
end

desc 'Notify Google of the new sitemap'
task :sitemapgoogle do
  begin
    require 'net/http'
    require 'uri'
    puts '* Pinging Google about our sitemap'
    Net::HTTP.get('www.google.com', '/webmasters/tools/ping?sitemap=' + URI.escape('http://swiftfordesigners.net/sitemap.xml'))
  rescue LoadError
    puts '! Could not ping Google about our sitemap, because Net::HTTP or URI could not be found.'
  end
end

desc 'Notify Bing of the new sitemap'
task :sitemapbing do
  begin
    require 'net/http'
    require 'uri'
    puts '* Pinging Bing about our sitemap'
    Net::HTTP.get('www.bing.com', '/webmaster/ping.aspx?siteMap=' + URI.escape('http://swiftfordesigners.net/sitemap.xml'))
  rescue LoadError
    puts '! Could not ping Bing about our sitemap, because Net::HTTP or URI could not be found.'
  end
end

desc "Notify various services about new content"
  task :ping => [:pingomatic, :sitemapgoogle, :sitemapbing] do
end

##################################################
# Deploy tasks
##################################################

GITHUB_REPONAME = "devinhalladay.com"

desc "Generate blog files"
task :generate do
  Jekyll::Site.new(Jekyll.configuration({
    "source"      => ".",
    "destination" => "_site"
  })).process
end

desc "Generate and publish blog to master"
task :deploy => [:generate] do
  # Run the :generate task.

  # Create a new tmp dir
  Dir.mktmpdir do |tmp|
     # Copy the contents of the new _site directory into the tmp dir.
    cp_r "_site/.", tmp

    # Move into the tmp dir.
    pwd = Dir.pwd
    Dir.chdir tmp

    # Init a new Git repo in the tmp dir.
    # system "git init"
    system "scp -r * root@162.243.103.246:/var/www/devinhalladay.com/public_html/_site"
    # Check all files into Git.
    # system "git add ."
    # Commit all files with the current time and date as the commit message.
    message = "Site updated at #{Time.now.utc}"
    # system "git commit -m #{message.inspect}"
    # Add our repo as the origin remote.
    # system "git remote add origin root@162.243.103.246:/var/www/devinhalladay.com"
    # Force push all files to our master branch.
    # system "git push --set-upstream origin master --force"

    Dir.chdir pwd
  end
end
