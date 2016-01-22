---
layout: false
---
xml.instruct!
xml.feed "xmlns" => "http://www.w3.org/2005/Atom" do
  xml.title "Devin Halladay"
  xml.subtitle "Projects"
  xml.id "http://devinhalladay.com/projects"
  xml.link "href" => "http://devinhalladay.com/projects"
  xml.link "href" => "http://devinhalladay.com/projects/feed.xml", "rel" => "self"
  xml.updated blog('projects').articles.first.date.to_time.iso8601
  xml.author { xml.name "Devin Halladay" }

  blog('projects').articles[0..5].each do |article|
    xml.entry do
      entry_url = "http://devinhalladay.com#{article.url}"

      xml.title article.title
      xml.link "rel" => "alternate", "href" => entry_url
      xml.id entry_url
      xml.published article.date.to_time.iso8601
      xml.updated article.date.to_time.iso8601
      xml.author { xml.name "Devin Halladay" }
      xml.summary article.summary, "type" => "html"
      xml.content article.body, "type" => "html"
    end
  end
end
