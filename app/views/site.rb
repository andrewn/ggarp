class Web
    module Views
        class Site < Mustache
            def title
                "GGARP"
            end
            def artists
                @artists
            end
        end
    end
end