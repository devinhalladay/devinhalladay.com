require 'typogruby'

module Jekyll
  module Converters
    class Markdown < Jekyll::Converter
      def convert(content)
        setup
        return Typogruby.improve(RDiscount.new(content).to_html)
      end
    end
  end
end