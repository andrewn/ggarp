class Web
    module Views
        class PartnerViewModel
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
            def description
                @info[:description]
            end
            def quote
                @info[:quote]
            end
            def logo
                @info[:logo]
            end
            def logo
                "/partner/assets/#{name_as_url}_300.jpg"
            end
        end
    end
end