define([

  // dojo
  "dojo/_base/declare",
  
  // esri
  "esri/Color",
  "esri/graphic",
  "esri/geometry/Point",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol", 
  "esri/renderers/SimpleRenderer",
  "esri/tasks/GeometryService",
  
  // custom
  "utils/utilities"
  
  ], function (
      declare, Color, Graphic, Point, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, SimpleRenderer, GeometryService, Utilities
  ) {
   
  return declare(null, {
    constructor: function () {
    
      // reference to self
      var graphicsUtils = this;
    
      // init imports
      var utils = new Utilities();
    
      /********** **********/
    
      // make and return a point graphic
      this.makePointGraphic = function(coords, sr, config) {
        
        // if a graphic is passed in instead of coords
        if (coords.geometry) {
          var graphic = coords;
          if (coords.geometry.type == "point") {
            var coords = utils.transformCoords(graphic);
          }
        }        
        
        // default config object
        var options = {
          shape: "circle",
          //size: 32,
          size: 24,
          color: [0, 195, 255, 1]
          //color: [0, 195, 255, 0.55]
        };
        
        // define a location marker object
        var locationMarkerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 12, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 100, 255, 0.5]), 8), new Color([0, 100, 255, 0.9]));
        
        if (config) {
          options = config;
        }
        // create the point
        var pointGraphic = new Graphic(
          new Point(coords[0], coords[1], sr),
          //new SimpleMarkerSymbol(options.shape, options.size, null, new Color(options.color)),
          locationMarkerSymbol,
          ""
        )
        return pointGraphic;
      }
      
      // highlight a graphic (map feature)
      this.highlightGraphic = function(graphic, highlightLayer) {
        highlightLayer.clear();
        var geometry = graphic.geometry;
        var geometryType = geometry.type;
        if (geometryType == "point") {
          var graphic = graphicsUtils.makePointGraphic(graphic);
          highlightLayer.add(graphic);
        }

      }

    }
  });
});





