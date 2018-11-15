define([

  // dojo
  "dojo/_base/declare",
  
  // esri
  "esri/geometry/Point",
  "esri/tasks/GeometryService",
  "esri/tasks/locator"
  
  // custom
  
  ], function (
      declare, Point, GeometryService, Locator
  ) {
   
  return declare(null, {
    constructor: function(manager, config) {
    
      // reference to self
      var locatorWidget = this;
      
      /********** address location **********/
      
      // set the address locator URL or use default
      var defaultLocatorServiceUrl = "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";
      var locatorServiceUrl = config.addressLocatorUrl || defaultLocatorServiceUrl;
     
      this.addressLocator = new Locator(locatorServiceUrl);
      
      /********** geolocation **********/
      
      this.watchid = null;
      
      // init geolocation 
      this.buttonId = "geolocationButton";
      if (config.geolocation) {
        // create a geolocation graphics layer
        if (config.geolocation.graphicsLayer) {
          manager.layersWidget.addGraphicsLayer(config.geolocation.graphicsLayer);
        }
        else {
          console.log("Warning: no geolocate graphics layer defined.");
        }
        this.geolocating = false;
        var buttonIcon = config.geolocation.buttonIcon || "images/icons/no-icon-24.png";
        // geolocation button config object
        var buttonConfig = {
          title: "Geolocation",
          id: locatorWidget.buttonId,
          imageUrl: buttonIcon,
          activeImageUrl: "images/icons/geolocate-active-24.png",
          onClick: function() {
            locatorWidget.geolocate();
          }
        }
        // hook up a geolocation button
        manager.regions.bannerRegion.addButton(buttonConfig, "geolocationButtonAbsolute");
      }

      // geolocation methods
      
      // toggle geolocation process
      this.geolocate = function() {
        if (locatorWidget.geolocating) {
          locatorWidget.geolocating = false;
          locatorWidget.clearGeolocation();
          manager.regions.bannerRegion.toggleButtonCss(locatorWidget.buttonId, false, null, "#fff");
          $("#" + buttonConfig.id).attr("src", buttonConfig.imageUrl);
        }
        else {
          locatorWidget.geolocating = true;
          locatorWidget.initLocation();
          manager.regions.bannerRegion.toggleButtonCss(locatorWidget.buttonId, true, null, "#fff");
          $("#" + buttonConfig.id).attr("src", buttonConfig.activeImageUrl);
        }
      }
      
      // initialize geolocation services
      this.initLocation = function(){
        if (navigator.geolocation){
          locatorWidget.watchId = navigator.geolocation.watchPosition(locatorWidget.zoomToLocation, locatorWidget.locationError);
          console.log(navigator.geolocation);
        }
      }
      
      // clear geolocation
      this.clearGeolocation = function() {
        if (navigator.geolocation) {
          console.log(locatorWidget.watchId);
          navigator.geolocation.clearWatch(locatorWidget.watchId);
          manager.layersWidget.graphicsLayers[config.geolocation.graphicsLayer].clear();
        }
      }   
      
      // location error handler
      this.locationError = function(error) {
        switch(error.code){
          case error.PERMISSION_DENIED: 
            alert("Location not provided");
            break;
          case error.POSITION_UNAVAILABLE: 
            alert("Current location not available");
            break;
          case error.TIMEOUT: 
            alert("Timeout");
            break;
          default: alert("unknown error");
            break;
        }
      }

      /********** navigate to locations on map **********/
      
      this.zoomToLocation = function(location, zoom) {
        var zoomLevel = zoom || 18;
        var pt = new Point(location.coords.longitude, location.coords.latitude);
        console.log(pt);
        var ptGraphic = manager.utils.graphicsUtils.makePointGraphic([pt.x, pt.y], manager.map.SpatialReference);
        manager.layersWidget.graphicsLayers[config.geolocation.graphicsLayer].clear();
        manager.layersWidget.graphicsLayers[config.geolocation.graphicsLayer].add(ptGraphic);
        manager.map.centerAndZoom(pt, zoomLevel);
      }


    }
  });
});

/* DOCUMENTATION

  CONSTRUCTOR:  new locatorWidget(config)
  PARAMS:       config(object)
  
  config = {
    addressLocatorUrl: "url to locator service" (string, optional/default)
  }

  
*/

