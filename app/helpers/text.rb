class Web
  module Helpers
    class Text
      def self.format(text, html_options={}, options={})
        text = text ? text.to_str : ''
        text = text.dup if text.frozen?
        start_tag = tag('p', html_options, true)
        text.gsub!(/\r\n?/, "\n")                    # \r\n and \r -> \n
        text.gsub!(/\n\n+/, "</p>\n\n#{start_tag}")  # 2+ newline  -> paragraph
        text.gsub!(/([^\n]\n)(?=[^\n])/, '\1<br />') # 1 newline   -> br
        text.insert 0, start_tag
        text.concat("</p>")
        text
      end
    end
  end
end