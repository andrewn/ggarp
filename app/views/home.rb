# encoding: utf-8
class Web
    module Views
        class Home < Layout
            def title
                "Gulbenkian Galápagos Artists Residency Programme"
            end
            
            def ogurl
                "http://www.artistsvisitgalapagos.com"
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