# encoding: utf-8
class Web
    module Views
        class PartnerViewModel < ProfileViewModel
            def name
                @info[:name]
            end
            def name_as_url
                @info[:name].gsub(' ', '_').downcase.gsub('á','a')
            end
            def description
                @info[:description]
            end
            def quote
                @info[:quote]
            end
            def type
                @info[:type]
            end
            def venue?
                type == "venue"
            end
            def location?
                not @info[:location].empty?
            end
            def location
                @info[:location]
            end
            def logo
                "/partner/assets/#{name_as_url}_300.jpg"
            end
        end
    end
end