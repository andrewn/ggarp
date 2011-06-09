require 'open-uri'
require 'hpricot'

class Web
    module Models
        class ContentStore
            @cache_time_in_mins
            def initialize(cache_time=0)
                @cache_time_in_mins = cache_time
            end
            def fetch(worksheet_number)
                id = "0AkLT_gf8YIWCdEhsdm93X2RPMjFjY3ZOd0dOZEkzQ1E"
                url = "http://spreadsheets.google.com/feeds/list/#{id}"
                full_url = "#{url}/#{worksheet_number}/public/values"

                puts "CACHE #{@cache_time_in_mins.minutes}"
                CACHE.fetch(full_url, :expires_in => @cache_time_in_mins.minutes) do
                    puts "FETCHING #{full_url}"
                    ENV["http_proxy"] = nil
                    doc = Hpricot::XML(open(full_url).read)
                    hash = {}
                    hash[:title] = doc.at('//title').inner_html
                    hash[:row] = (doc/'//entry').map do |e|
                      result = {}
                      e.children.
                        select { |c| !c.kind_of? Hpricot::Text }.
                        each { |c| result[$1.to_sym] = c.inner_html if c.name =~ /gsx:(\w+)/ }
                      result
                    end
                    #doc = Hpricot::XML(open("#{url}/2/public/values").read)
                    #(doc/'//entry').each do |e|
                    #  property = e.at('gsx:property').inner_html.downcase.to_sym
                    #  value = e.at('gsx:value').inner_html
                    #  playlist[property] = value
                    #end
                    hash
                  end
            end
        end
    end
end