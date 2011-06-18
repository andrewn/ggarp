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
        end
    end
end