require 'rubygems'
require 'sinatra/base'
require 'json'

class Web < Sinatra::Base

    # Templating
    require 'mustache/sinatra'
    register Mustache::Sinatra
    set :mustache, {
      :views     => 'app/views',
      :templates => 'app/templates'
    }

    require './app/views/site'
    require './app/views/artist_view_model'
    require './app/views/home'
    require './app/views/artist'
    require './app/views/partner'
    require './app/views/partner_view_model'
    require './app/model/content_store'

    # Caching
    require 'active_support/cache'
    require 'active_support/cache/dalli_store'

    configure do
      if ENV['cache'] == 'dalli'
        CACHE = ActiveSupport::Cache::DalliStore.new
      else
        CACHE = ActiveSupport::Cache::MemoryStore.new
      end
    end

    # Enable static files (js, css)
    set :static, true
    set :public, 'static'

    # How long to cache data for
    set :cache_time, 2

    # Development
    require "sinatra/reloader" if development?
    configure :development do | config |
      puts "in development"
      #enable :logging
      register Sinatra::Reloader
      config.also_reload "app/model/*.rb"
      config.also_reload "app/views/*.rb"

      set :cache_time, 0
    end

    before do
        @site_data     = Web::Models::ContentStore.new(settings.cache_time).fetch(1)[:row]
        @artists_data  = Web::Models::ContentStore.new(settings.cache_time).fetch(2)[:row]
        @partners_data = Web::Models::ContentStore.new(settings.cache_time).fetch(3)[:row]
        @media_data    = Web::Models::ContentStore.new(settings.cache_time).fetch(4)[:row]

        @artists = @artists_data.map do |artist|
            artist_model = Web::Views::ArtistViewModel.new(artist)
            #if @current_artist and @artist_url == artist_model.name_as_url

            artist_model.media = @media_data.find_all do |media_item|
                artist_model.name == media_item[:parent]
            end
            p artist_model
            artist_model
        end
        
        @partners = @partners_data.map do |partner|
            partner_model = Web::Views::PartnerViewModel.new(partner)
            #if @current_partner and @partner_url == partner_model.name_as_url
            partner_model
        end
    end

    # Routes
    get '/up' do
        "UP"
    end

    get '/' do
        mustache :home, :layout => false
    end

    get '/artist/:name' do |name|
        @current_artist = @artists.find {|a| a.name_as_url == name }
        halt 404 if @current_artist.nil?
        @current_artist.is_selected = true
        mustache :artist, :layout => false
    end

    get '/partner/:name' do |name|
        @current_partner = @partners.find {|a| a.name_as_url == name }
        halt 404 if @current_partner.nil?
        @current_partner.is_selected = true
        mustache :partner, :layout => false
    end

    get '/about/:name' do |name|
    end

    get '/data/:type' do |type|
        return @site.to_json       if type == "site"   
        return @artists.to_json    if type == "artists"
        return @partners.to_json   if type == "partners"
    end
end