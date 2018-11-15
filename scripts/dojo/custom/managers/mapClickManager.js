define([

  // dojo
  "dojo/_base/declare",
  
  // esri
  
  // custom
  
  ], function (
      declare
  ) {
   
  return declare(null, {
    constructor: function(manager, config) {
     
      // reference to self
      var mapClickManager = this;
      
      /********** initialize **********/
      
      console.log(manager);
      
      // create a click highlight layer
      var clickedGraphicsLayer = "click_graphics_layer";
      manager.layersWidget.addGraphicsLayer(clickedGraphicsLayer);

      /********** methods **********/
      
      this.init = function() {
        manager.map.on("click", function(evt) {
          // graphic click
          if (evt.graphic) {
            var clickedGraphic = evt.graphic;
            // highlight the clicked graphic
            //manager.utils.graphicsUtils.highlightGraphic(clickedGraphic, manager.layersWidget.graphicsLayers[clickedGraphicsLayer]);
            // close the layer list (if open) TODO - Write a method that closes other/all panels (or caches them)
            //manager.layersWidget.close(manager.layersWidget.contentId, manager.layersWidget.buttonId);
            
            console.log("CLICKED GRAPHIC: ");
            console.log(evt.graphic);
            
            //alert();
            
            // generate a popup
            var clickedLayerName = evt.graphic._layer.name;
            var attributes = evt.graphic.attributes;
            
            // get some fields
            var fieldContent = "";
            var useFields = [];
            var howManyFields = 4;
            var ignoreFields = ["OBJECTID", "Shape", "Shape.STArea()", "Shape.STLength()", "GlobalID"]
            var fields = evt.graphic._layer.fields;
            for (var i=0; i < fields.length; i++) {
              var field = fields[i];
              var fieldName = field.name;
              if (ignoreFields.indexOf(fieldName) == -1) {
                useFields.push(fieldName);
              }
            }
            for (var i=0; i < howManyFields; i++) {
              var field = useFields[i];
              var fieldValue = attributes[field];
              if (field) {
                fieldContent += '<strong>' + field + "</strong>: " + fieldValue + '<br>';
              }
            }
            
            // Populate the info window
            manager.map.infoWindow.setTitle(clickedLayerName);
            manager.map.infoWindow.setContent(fieldContent);
            manager.map.infoWindow.show(evt.screenPoint, manager.map.getInfoWindowAnchor(evt.screenPoint));
          
          }
          
          else {
            manager.map.infoWindow.hide();
          }
          
        });
      }
      
      /********** internal functions **********/
      
      
      
    }
  });
});




