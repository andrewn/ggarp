# encoding: utf-8
class Web
    module Views
        class ArtistViewModel < ProfileViewModel
            def thumb
                "/artist/assets/#{name_as_url}_140.jpg"
            end
        end
    end
end