# encoding: utf-8
class Web
    module Views
        class ArtistViewModel
            attr_accessor :is_selected, :media
            @media = []
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
                @info[:name].gsub(' ', '_').downcase.gsub('é','e')
            end
            def highlight
                return if @info[:highlight].empty?
                { :text => @info[:highlight] }
            end
            def current_artist_media
                nil
                # { :thumb => }
            end
            def has_event?
                not (@info[:exhibitiondate].empty? and @info[:exhibitiondate].empty?)
            end
            def event
                return nil unless has_event?

                { 
                    :type => nil, 
                    :date => @info[:exhibitiondate], 
                    :venue => @info[:exhibitiondescription]
                }
            end
            def bio
                @info[:bio]
            end
            def with?
                not with.empty?
            end
            def with
                @info[:with]
            end
            def links
                return unless @info[:linkurl] and @info[:linktext]
                {
                    :url  => @info[:linkurl],
                    :text => @info[:linktext],
                }
            end
            def thumb
                "/artist/assets/#{name_as_url}_140.jpg"
            end
            def media_thumbnails
                media unless media.length < 2
            end
        end
    end
end