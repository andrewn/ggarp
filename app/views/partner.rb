class Web
    module Views
        class Partner < Site
            def title
                "GGARP: #{@current_partner.name}"
            end
            def current_partner
                @current_partner
            end
        end
    end
end