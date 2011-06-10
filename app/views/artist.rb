class Web
    module Views
        class Artist < Site
            def title
                "GGARP: #{@current_artist.name}"
            end
            def current_artist
                @current_artist
            end
        end
    end
end