define([

  // dojo
  "dojo/_base/declare",
  
  // esri
  
  // custom
  "regions/bannerRegion",
  "regions/panelRegion",
  "regions/popoutRegion",
  "utils/graphicsUtils",
  "utils/utilities"
  
  ], function (
      declare, BannerRegion, PanelRegion, PopoutRegion, GraphicsUtils, Utilities
  ) {
   
  return declare(null, {
    constructor: function(config) {
     
      // reference to self
      var appManager = this;
      
      /********** initialize **********/
      console.log("Initializing application manager...");
      
      // init utilities
      this.utils = {};
      this.utilities = new Utilities();
      
      appManager.utils.graphicsUtils = new GraphicsUtils();
      
      // init regions
      this.regions = {};
      if (config.regions.bannerRegion) {
        appManager.regions.bannerRegion = new BannerRegion(config.regions.bannerRegion.id, config.regions.bannerRegion.config);
      }
      if (config.regions.panelRegion) {
        appManager.regions.panelRegion = new PanelRegion(config.regions.panelRegion.id, config.regions.panelRegion.config);
      }
      if (config.regions.popoutRegion) {
        appManager.regions.popoutRegion = new PopoutRegion(config.regions.popoutRegion.id, config.regions.popoutRegion.config);
      }
 
      /********** handle widgets **********/
      
      // register a widget
      this.registerWidget = function() {
        alert("Registering widget...");
      }
      
      console.log("Application manager ready.");

      
    }
  });
});




