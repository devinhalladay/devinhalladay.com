##################################################
# Require gems.
##################################################
require "yaml"
require "fileutils"
require "tmpdir"
require "rubygems"
require "bundler/setup"
require "jekyll"
require "highline/import"
require "httparty"

##################################################
# Create a new contributor identity and page.
##################################################

# Create your contributor pages.
desc 'create a contributor'
task :add_me do
  # Define contributor variables by prompting.
  firstname = ask "Enter your first name: "
  nickname  = "#{firstname.downcase}"
  lastname  = ask "Enter your last name: "
  slug      = "#{firstname.downcase}-#{lastname.downcase}"
  site      = ask "Enter your website's domain name (no http): "
  twitter   = ask "Enter your Twitter handle: "
  github    = ask "Enter your GitHub username: "
  dribbble  = ask "Enter your Dribbble username: "

  # Define the avatar filename.
  avatar = File.join(
    File.dirname(__FILE__),
    'images/contributors',
    "#{nickname}.jpg"
  )

  # Download the contributor's Twitter avatar into the file defined above.
  File.open(avatar, "wb") do |f|
    f.write HTTParty.get("https://twitter.com/api/users/profile_image/#{twitter}?size=original").parsed_response
  end

  # Define the contributors index file location.
  file = File.join(
    File.dirname(__FILE__),
    '_data',
    "contributors.yml"
  )

  # Add all contributor information to the contributors index defined above.
  open(file, 'a') do |f|
    f << <<-EOS.gsub(/^    /, '')

    #{nickname}:
      name: #{firstname.capitalize} #{lastname.capitalize}
      slug: #{slug}
      website: http://#{site}/
      twitter: #{twitter}
      github: #{github}
      dribbble: #{dribbble}
      avatar: /images/contributors/#{nickname}.jpg
    EOS
  end

  # Create the contributor's page directory.
  Dir.mkdir "contributors/#{slug}"

  # Define the contributor page's index.md loca†ion.
  index_file = File.join(
    File.dirname(__FILE__),
    "contributors/#{slug}",
    "index.md"
  )

  # Define the contributor's bio by prompting.
  contributor_bio = ask "Enter a short author bio here: "

  # Add contributor metadata and bio to their index page.
  open(index_file, 'w') do |f|
    f << <<-EOS.gsub(/^    /, '')
    ---
    layout: contributor
    title: #{firstname.capitalize} #{lastname.capitalize}
    author: #{nickname}
    ---
    #{contributor_bio}
    EOS
  end

  # Yay! You're ready to contribute to Swift for Designers.
  puts "Contributor profile created!"
  puts "You can now contribute to the site with your author nickname (#{nickname})."
end

##################################################
# Add a new resource.
##################################################

desc 'Add a new resource entry to the resources datafile.'
task :resource do
  # Define resource variables by prompting.
  title       = ask "Enter the resource's tite: "
  description = ask "Enter a short description of the resource: "
  link        = ask "Enter the link to the resource: "

  file = File.join(
    File.dirname(__FILE__),
    '_data',
    'resources.yml'
  )

  open(file, 'a') do |f|
    f << <<-EOS.gsub(/^    /, '')

    - title: "#{title}"
      description: "#{description}"
      link: "#{link}"
    EOS
  end
end

# Get and parse the date
DATE = Time.now.strftime("%Y-%m-%d")

##################################################
# Write a new post draft.
##################################################

desc 'Create a new post draft.'
task :post do
  # Define post variables by prompting.
  title       = ask "Enter the title: "
  category    = ask "List the category this post will fall under (one only): "
  author      = ask "What is your first name? "
  post_text   = ask "Enter any initial text (like an idea or thought) here if you have it ready. It will be added to the beginning of your post: "
  share_text  = ask "What text should be shared when people Tweet this post? Please keep it under 100 characters. "
  slug        = "#{title.downcase.gsub(/[^\w|']+/, '-')}"
  slug_dashed = "#{slug.gsub(/[^a-zA-Z0-9\-]/, "")}"
  slug_fixed  = "#{slug_dashed.gsub(/\-$/, '')}"

  # Define the draft's filename.
  file = File.join(
    File.dirname(__FILE__),
    '_drafts',
    "#{slug_fixed}.md"
  )

  # Create the draft file in the location defined above
  # and insert the content defined in the post variables.
  File.open(file, "w") do |f|
    f << <<-EOS.gsub(/^    /, '')
    ---
    layout: post
    title: \"#{title}\"
    category: \"#{category}\"
    share_text: \"#{share_text}\"
    author: #{author.downcase}
    tags: #{author}
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
    filename = files[number.to_i - 1].sub("#{DRAFTS}/", "")
    FileUtils.mv("#{DRAFTS}/#{filename}", "#{POSTS}/#{DATE}-#{filename}")
    puts "#{filename} was moved to '#{POSTS}'."
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
    system "git init"
    # Check all files into Git.
    system "git add ."
    # Commit all files with the current time and date as the commit message.
    message = "Site updated at #{Time.now.utc}"
    system "git commit -m #{message.inspect}"
    # Add our repo as the origin remote.
    system "git remote add origin ssh://root@162.243.103.246/var/www/devinhalladay.com/public_html/.git"
    # Force push all files to our master branch.
    system "git push origin master --force"

    Dir.chdir pwd
  end
end
