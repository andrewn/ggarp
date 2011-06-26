class Web
    module Views
        class Home < Layout
            def title
                "Gulbenkian Galapagos Artists Residency Programme"
            end
            
            def ogurl
                "http://ggarp.com"
            end
            
            def ogtype
                "website"
            end

            def show_navigation?
                false
            end            
        end
    end
end