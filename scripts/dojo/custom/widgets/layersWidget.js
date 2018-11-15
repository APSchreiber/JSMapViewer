define([

  // dojo
  "dojo/_base/declare",
  
  // esri
  "esri/layers/ArcGISDynamicMapServiceLayer",
  "esri/layers/CodedValueDomain",
  "esri/layers/Domain",
  "esri/layers/Field",
  "esri/layers/FeatureLayer",
  "esri/layers/GraphicsLayer",
  "esri/layers/ImageParameters",
  
  // custom
  
  ], function (
      declare, ArcGISDynamicMapServiceLayer, CodedValueDomain, Domain, Field, FeatureLayer, GraphicsLayer, ImageParameters
  ) {
   
  return declare(null, {
    constructor: function (manager, config) {     
      
      var layersWidget = this;
      
      /********** initialize **********/
      
      // map layers object
      this.mapLayers = {};
      this.graphicsLayers = {};
      
      //var messageWindow = widgets.messageWindow;
      
      /********** objects **********/
      
      this.layerList = {};
      
      // widget is active by default
      this.active = true;
      
      /********** blocking  **********/
      
      // add a layer list to the content pane
      var layerListHTML = '<div id="layerList"></div>';
      
      // layer panel config object
      this.contentId = "layerList";
      var layersPanel = {
        contentId: layersWidget.contentId,
        title: "Layers",
        content: layerListHTML,
        close: function() {
          layersWidget.toggle(layersWidget.contentId, layersWidget.buttonId);
        }
      };
      
      // populate the panel
      manager.regions.panelRegion.populatePanel(layersPanel);
      
      // hook up a layers button
      this.buttonId = "layersButton";
      var buttonConfig = {
        title: "Layers",
        id: "layersButton",
        imageUrl: "images/icons/layers-24.png",
        onClick: function() {
          layersWidget.toggle(layersWidget.contentId, layersWidget.buttonId);
        }
      }
      
      // hook up a geolocation button
      manager.regions.bannerRegion.addButton(buttonConfig);
      // button is active by default
      manager.regions.bannerRegion.toggleButtonCss(layersWidget.buttonId, true);
      
      /********** methods **********/
      
      this.toggle = function(contentId, buttonId) {
        if (!layersWidget.active) {
          layersWidget.open(contentId, buttonId);
        }
        else {
          layersWidget.close(contentId, buttonId);
        }
      }
      
      this.open = function(contentId, buttonId) {
        layersWidget.active = true;
        manager.regions.panelRegion.retrievePanel(contentId);
        manager.regions.bannerRegion.toggleButtonCss(layersWidget.buttonId, true);
      }
      
      this.close = function(contentId, buttonId) {
        layersWidget.active = false;
        manager.regions.panelRegion.detachPanel(contentId);
        manager.regions.bannerRegion.toggleButtonCss(layersWidget.buttonId);
      }
      
      // load all (service) layers method
      this.load = function(count) {
        var loadLayersLength = config.length;
        var loadCount = count || loadLayersLength;
        var addLayer = config[loadCount - 1];
        var nextLayer = (loadCount > 0 ? loadCount - 1 : null);
        layersWidget.mapLayers[addLayer.reference] = new FeatureLayer(addLayer.url, {
          mode: FeatureLayer[addLayer.mode],
          hasAttachments: addLayer.hasAttachments,
          isEditable: addLayer.isEditable,
          outFields: addLayer.outFields
        });
        addLoadedLayer(addLayer, nextLayer);
      }
      
      // create graphics layer
      this.addGraphicsLayer = function(id) {
         layersWidget.graphicsLayers[id] = new GraphicsLayer({
          id: id
        });
        manager.map.addLayer(layersWidget.graphicsLayers[id]);
      }
      
      // toggle the layer list view
      this.toggleLayerList = function() {
        
      }
  
      /********** internal functions **********/
      
      // add a loaded layer to the map (part of the load all layers routine)
      function addLoadedLayer (layerConfig, nextLayer) {
        var loadedLayer = layersWidget.mapLayers[layerConfig.reference];
        var loadedLayerUrl = loadedLayer._url.path
        
        loadedLayer.on("load", function(r) {
          
          // add the layer to the map
          manager.map.addLayer(loadedLayer);

          // display a message in the window
          //messageWindow.displayMessage("Loading layer: " + loadedLayer.name + "...");
          
          // add checkbox to toggle layer if it is togglable
          if (!layerConfig.excludeFromLayerList) {
            addLayerToggle(loadedLayer, layerConfig)
          }
          // Else hide the layer
          else {
            loadedLayer.hide();
          }
          
          // add scales, if applicable
          if (layerConfig.minScale) {
            loadedLayer.minScale = layerConfig.minScale;
          }
          if (layerConfig.maxScale) {
            loadedLayer.maxScale = layerConfig.maxScale;
          }
          
          // add opacity, if applicable
          if (layerConfig.opacity) {
            loadedLayer.setOpacity(layerConfig.opacity);
          }
          
          // load the next layer
          if (nextLayer) {
            layersWidget.load(nextLayer);
          }
          else {
            // set the panel to layers
            //widgets.panel.activePanel = "layersWidget";
            // clear the message window
            //messageWindow.clear();
          }
        });
      }
      
      // handle layer toggle
      function addLayerToggle(layer, layerConfig) {
        
        var layerName = layer.name;
        var layerId = "layer-" + manager.utilities.removeAllSpaces(layerName);
        
        //set to on/off based on config
        var isChecked = "";
        if (layerConfig.visible) {
          isChecked = "checked";
        }
        else {
          layer.hide();
        }
      
        // add the check to the content pane
        var prependContent = '<input id="' + layerId + '" class="layerSelect" type="checkbox"' + isChecked + '><label class="checkboxtext">' + layerName + '</label><br />'
        
        // MOBILEDEMO
        if (manager.isMobile) {
          var mobileId = layerId + "_mobile";
          prependContent = '<div id="' + mobileId + '" class="layerListItem"><input id="' + layerId + '" class="layerSelect" type="checkbox"' + isChecked + '><label class="checkboxtext">' + layerName + '</label></div><br />' 
          $("#layerList").prepend(prependContent);
          //$("#" + layerId).attr("disabled", true);
          
          $("#" + mobileId).unbind();
          $("#" + mobileId).bind("click", function() {
            checkId = mobileId.substring(0, mobileId.length - 7);
            if ($("#" + checkId).prop("checked")) {
              $("#" + checkId).prop("checked", false);
              layer.hide();
            }
            else {
              $("#" + checkId).prop("checked", true);
              layer.show();
            }
          });
          
          // prevent checkbox from working
          $("#" + layerId).on('click', function(e) {
            e.stopPropagation();
          });
          
        }
        
        // not mobile
        else {
      
          $("#layerList").prepend(prependContent);
          $("#" + layerId).unbind();
          $("#" + layerId).bind("click", function() {
            if ($(this).prop("checked")) {
              layer.show();
            }
            else {
              layer.hide();
            }
          });
          
        }
        
        // MOBILEDEMO

        
      }

 
    }
  });
});





