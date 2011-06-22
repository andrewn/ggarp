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
                @info[:title]
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
        end
    end
end