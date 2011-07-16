# encoding: utf-8
class Web
    module Views
        class Layout < Mustache
            def logo
              "Galápagos Gulbenkian Artists' Residency Programme"
            end
            def title
                "Galápagos Gulbenkian Artists' Residency Programme"
            end
            def show_navigation?
              true
            end
            def about
                {
                    :title => "About",
                    :tagline => @site_data.find{ |item| item[:key] == "strapline" }[:value],
                    :more    => format(@site_data.find{ |item| item[:key] == "about" }[:value])
                }
            end 
            def artists
                @artists
            end
            def partners
                @partners
            end
            def venues
              @venues
            end
            def has_published_venues?
              @published_venue = @venues.find { |venue| venue.published? }
              !@published_venue.nil?
            end

            def copyright
              "&copy; Galápagos Conservation Trust 2011"
            end

            private 
            def format(text, html_options={}, options={})
              text = text ? text.to_str : ''
              text = text.dup if text.frozen?
              start_tag = "<p>" #tag('p', html_options, true)
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