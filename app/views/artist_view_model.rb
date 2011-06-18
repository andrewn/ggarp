class Web
    module Views
        class ArtistViewModel
            attr_accessor :is_selected
            def initialize(info, is_selected = false)
                @info = info
                @is_selected = is_selected
            end
            def is_selected
                @is_selected
            end
            def name
                @info[:name]
            end
            def name_as_url
                @info[:name].gsub(' ', '_').downcase
            end
            def highlight
                @info[:highlight]
            end
            def current_artist_media
                nil
                # { :thumb => }
            end
            def event
                nil
                # { :type => , :date => , :venue =>}
            end
            def bio
                @info[:bio]
            end
            def links
                return unless @info[:linkurl] and @info[:linktext]
                {
                    :url  => @info[:linkurl],
                    :text => @info[:linktext],
                }
            end
        end
    end
end