class Web
    module Views
        class Site < Mustache
            def title
                "GGARP"
            end
            def about
                {
                    :title => "About",
                    :tagline => @site_data.find{ |item| item[:key] == "about" }[:value],
                    :link => {
                        :url  => "/about",
                        :text => "More information"
                    }
                }
            end 
            def artists
                @artists
            end
            def partners
                @partners
            end
        end
    end
end