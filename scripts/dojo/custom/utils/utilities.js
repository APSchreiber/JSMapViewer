define(["dojo/_base/declare"], function (declare) {
  return declare(null, {
    constructor: function (panelId, config) {

      var utils = this;
      
      // remove duplicate spaces in string (leave one space) 
      this.removeSpaces = function(str) {
        return str.replace(/\s+/g,' ').trim();
      }
      
      // remove all spaces from string
      this.removeAllSpaces = function(str) {
        return str.replace(/\s+/g,'').trim();
      }
      
      // strip a field that uses dots
      this.stripFieldName = function(str, seperator) {
        var sep = seperator || ".";
        var splitString = str.split(sep);
        var index = splitString.length - 1;
        return splitString[index];
      }

      /********* projections and transformations **********/
      
      // get coordinates
      this.toCoords = function(geom) {
        var newGeom = esri.geometry.webMercatorToGeographic(geom);
        if (geom.type == "polygon" || geom.type == "line") {
          var point = (newGeom.rings[0][0]);
          return([point[0], point[1]]);
        }
        else {
          return([newGeom.x, newGeom.y]);
        }
      }
      
      // coords, handling projections
      this.transformCoords = function(graphic) {
        if (graphic.geometry.y < 90) {
          return [graphic.geometry.x, graphic.geometry.y];
        }
        else {
          return utils.toCoords(graphic.geometry)
        }
      }
      
      
      
    }
  });
});