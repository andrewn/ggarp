class Web
    module Views
        class Home < Site
            def title
                "Homepage"
            end
            
            def ogurl
                "http://ggarp.com"
            end
            
            def ogtype
                "website"
            end
            
        end
    end
end