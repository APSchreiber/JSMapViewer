/************  Application  **********/
(function() {
	require({
		parseOnLoad: true
	});

	dojo.require("esri.dijit.editing.Editor-all");

	require([
		"esri/arcgis/utils",
		"esri/map",
		"esri/Color",
		"esri/config",
		"esri/dijit/Basemap",
		"esri/dijit/BasemapGallery",
		"esri/dijit/BasemapLayer",
		"esri/dijit/Print",
		"esri/dijit/editing/AttachmentEditor",
		"esri/dijit/editing/Editor",
		"esri/dijit/Geocoder",

		"esri/geometry/webMercatorUtils",
		"esri/graphic",
		"esri/InfoTemplate",

		"esri/tasks/GeometryService",
		"esri/tasks/PrintParameters",
		"esri/tasks/PrintTask",
		"esri/tasks/PrintTemplate",
		"esri/tasks/query",
		"esri/tasks/QueryTask",
		"esri/TimeExtent", 
		"esri/dijit/TimeSlider",
		"esri/units",
		
		"dojo/_base/array",
		"dojo/_base/connect",
		"dojo/dom",
		"dojo/dom-construct",
		"dojo/i18n!esri/nls/jsapi",
		"dojo/keys",
		"dojo/on",
		"dojo/query",
		"dojo/parser",
    
    // custom
    "managers/appManager",
    "managers/mapClickManager",
    "regions/bannerRegion",
    "regions/popoutRegion",
    "widgets/basemapsWidget",
    "widgets/layersWidget",
    "widgets/locatorWidget",
		
		// Arguments not included in callback
		"dijit/layout/BorderContainer",
		"dijit/layout/ContentPane",
		"dijit/form/TextBox",
		"dijit/TitlePane",
		"dojo/domReady!"
		
		], function(
				arcgisUtils, Map, Color, esriConfig, Basemap, BasemapGallery, BasemapLayer, Print, AttachmentEditor, Editor, Geocoder, webMercatorUtils, Graphic, InfoTemplate,
        GeometryService, PrintParameters, PrintTask, PrintTemplate, Query, QueryTask, 
        TimeExtent, TimeSlider, Units, arrayUtils, connect, dom, domConstruct, i18n, keys, on, query, parser,
        // custom
        AppManager, MapClickManager, BannerRegion, PopoutRegion, BasemapsWidget, LayersWidget, LocatorWidget
        //buttonClickHandler, mapClickHandler, templateManager, attachmentWidget, bannerWidget, layerManagerWidget, messagesWidget, panelWidget, LocationUtils, Utilities
				) {
          
        // Disclaimer
        var disclaimerText = "This product is for informational purposes and may not have been prepared for or be suitable for legal, engineering, or surveying purposes. It does not represent an on-the-ground survey and represents only the approximate relative location of property boundaries."
        alert(disclaimerText);
        
        // CORS
        //esriConfig.defaults.io.corsEnabledServers.push("https://");
        
        // Parse Config
        var layersConfig = customConfig.layersConfig;
        var appDesignConfig = customConfig.appDesign;
        var mapSettings = customConfig.mapSettings;
        
        /********** Initialize **********/
        
        /********** Mobile Detection **********/
        var isMobile = false;
        
        // First, test by browser user agent
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          isMobile = true;
        }
        
        // Next, check screen size
        var width = $(window).width();
        //alert(width);
        var height = $(window).height();
        //alert(height);
             
        // Executing Both width() and height()   
        //document.getElementById('widthID').innerHTML=width; 
        //document.getElementById('heightID').innerHTML=height; 
       
        // Do a custom code here
        if (width < 1000) {
          isMobile = true;
        }
      
        if (isMobile) {
          var link = document.createElement("link");
          link.href = "styles/mobile.css";
          link.type = type = "text/css";
          link.type = "text/css";
          link.rel = "stylesheet";
          link.media = "all";
          document.getElementsByTagName("head")[0].appendChild(link);
        }
       
        // this could be placed in a config file
        var config = {};
        
        // set the web page title
        $("#" + "appConfig-webPageTitle").html(appDesignConfig.webPageTitle);
        
        // add a regions config
        config.regions = {
          bannerRegion: {
            id: "banner",
            config: {
              title: appDesignConfig.applicationTitle,
              subtitle: appDesignConfig.applicationSubtitle,
              icon: "images/icons/globe-24.png"
            }
          },
          panelRegion: {
            id: "panel",
            config: {
              
            }
          },
          popoutRegion: {
            id: "popout",
            config: {
              
            }
          }
        };
        
        // create an application manager
        var appManager = new AppManager(config);
        if (isMobile) {
            appManager.isMobile = true;
        }
       
        /********** Map **********/
         
        // Create the map
        appManager.map = new Map("map", {
          center: mapSettings.coords,
          zoom: mapSettings.zoom,
          basemap: mapSettings.basemap
        });
        appManager.map.on("load", function(){
            // MOBILEDEMO
            if (appManager.isMobile) { 
              $("#map_zoom_slider").css("left", ".5%");
            }
        });
        
        /********** Layers **********/
        
        // add a layers config
        config.layers = customConfig.layersConfig;
        
        if (config.layers) {
          appManager.layersWidget = new LayersWidget(appManager, config.layers);
          // load the layers
          appManager.layersWidget.load();
        }
        
        /********** Basemaps **********/
        
        if (mapSettings.basemapSwitcher) {
          appManager.basemapsWidget = new BasemapsWidget(appManager);
        }
        
        /********** Locator **********/
        
        // add a locator config
        config.locator = {
          // enable geocoding
          geocoding: {
            addressLocatorUrl: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
            buttonIcon: "images/icons/address-search-24.png"
          },
          // enable geolocation
          geolocation: {
            buttonIcon: "images/icons/geolocate-24.png",
            buttonDomId: "geolocationButtonAbsolute", // if this line is used, the button will be hooked to an existing element, based on the logic in the locatorWidget
            graphicsLayer: "locate_graphics_layer"
          }
        };
        
        // create a locator
        if (config.locator) {
          // add location utils to the app manager
          appManager.locatorWidget = new LocatorWidget(appManager, config.locator);
        }
        
        
        /********** Handle Map Clicks **********/
        appManager.mapClickManager = new MapClickManager(appManager, config);
        appManager.mapClickManager.init();
        
        // MOBILEDEMO
        if (appManager.isMobile) {
          $("#panel").css("display", "none");
          $("#panelClose").css("display", "none");
          $("#map_zoom_slider").css("left", ".5%");
          $("#geolocationButtonAbsolute").css("left", ".5%");
        }

    });
    

    
}).call(this);