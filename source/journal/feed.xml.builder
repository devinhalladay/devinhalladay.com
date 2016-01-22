---
layout: false
---
xml.instruct!
xml.feed "xmlns" => "http://www.w3.org/2005/Atom" do
  xml.title "Devin Halladay"
  xml.subtitle "Journal"
  xml.id "http://devinhalladay.com/journal"
  xml.link "href" => "http://devinhalladay.com/journal"
  xml.link "href" => "http://devinhalladay.com/journal/feed.xml", "rel" => "self"
  xml.updated blog('journal').articles.first.date.to_time.iso8601
  xml.author { xml.name "Devin Halladay" }

  blog('journal').articles[0..5].each do |article|
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
