# encoding: utf-8
class Web
    module Views
        class MediaViewModel
            # {
            #   :credit=>"Joe Blogs", :title=>"Test title", 
            #   :parent=>"Dorothy Cross", :width=>"640", 
            #   :url=>"/artist/photos/dorothy_cross/1_640.jpg", :height=>"360"
            # }
            def initialize(info)
                @info = info
            end
            def media_id
                @info[:id]
            end
            def title
                markdown @info[:title]
            end
            def credit
                @info[:credit]
            end
            def url
                @info[:url]
            end
            def thumb_url
                url.gsub(/(\.)/, "_thumb.")
            end
            def parent
                @info[:parent]
            end
            def width
                @info[:width]
            end
            def height
                @info[:height]
            end

            private
            def markdown(text)
              matches = /\*(.*)\*/.match(text)
              if matches and matches.length > 1
                return text.gsub(matches[0], "<em>#{matches[1]}</em>")
            else
                return text
            end
            end
        end
    end
end