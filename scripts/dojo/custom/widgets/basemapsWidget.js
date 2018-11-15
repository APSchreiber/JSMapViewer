define([

  // dojo
  "dojo/_base/declare"
  
  // esri
  
  // custom
  
  ], function (
      declare
  ) {
   
  return declare(null, {
    constructor: function (manager, config) {     
      
      var basemapsWidget = this;
      
      /********** initialize **********/
      
      /********** objects **********/
      
      // widget is not active by default
      this.active = false;
      
      /********** blocking  **********/
      
      // Add basemaps HTML
      var basemapsSwitcherTitle = '<h2 class="basemapSwitcherTitle">Basemaps</h2>';
      var basemapSwitcherDiv = '<div class="basemapSwitcherDiv">';
      var map1 = '<div class="basemapSwitcherImageContainer"><img class="basemapSwitcherImage" id="basemap_satellite" src="images/basemaps/satellite.png"><div class="clear"></div><span class="basemapSwitcherCaption">Satellite</span></div>';
      var map2 = '<div class="basemapSwitcherImageContainer"><img class="basemapSwitcherImage" id="basemap_hybrid" src="images/basemaps/hybrid.png"><div class="clear"></div><span class="basemapSwitcherCaption">Hybrid</span></div>';
      var row1 = '<div class="basemapSwitcherRow">' + map1 + map2 + '</div><div class="clear"></div>';
      var map3 = '<div class="basemapSwitcherImageContainer"><img class="basemapSwitcherImage" id="basemap_streets" src="images/basemaps/streets.png"><div class="clear"></div><span class="basemapSwitcherCaption">Streets</span></div>';
      var map4 = '<div class="basemapSwitcherImageContainer"><img class="basemapSwitcherImage" id="basemap_topo" src="images/basemaps/topo.png"><div class="clear"></div><span class="basemapSwitcherCaption">Topo</span></div>';
      var row2 = '<div class="basemapSwitcherRow">' + map3 + map4 + '</div><div class="clear"></div>';
      var okButton = '<button class="basemapOkButton">OK</button>';
      var basemapsSwitcherClose = '</div>';
      
      basemapsSwitcherHtml = basemapsSwitcherTitle + basemapSwitcherDiv + row1 + row2 + okButton + basemapsSwitcherClose;
      manager.regions.popoutRegion.setContent(basemapsSwitcherHtml);

      // hook up a basemaps button
      this.buttonId = "basemapsButton";
      var butonConfig = {
        title: "Basemaps",
        id: "basemapsButton",
        imageUrl: "images/icons/map-24.png",
        onClick: function() {
          basemapsWidget.toggle(basemapsWidget.contentId, basemapsWidget.buttonId);
        }
      };
      manager.regions.bannerRegion.addButton(butonConfig);
      manager.regions.bannerRegion.toggleButtonCss(basemapsWidget.buttonId, false);
      
      // bind the select basemap buttons
      $("." + "basemapSwitcherImage").bind("click", function() {
        var clickedId = $(this).attr("id");
        var clickedBasemap = clickedId.split("_")[1];
        basemapsWidget.selectBasemap(clickedBasemap);
      });
      
      // bind the ok button
      $("." + "basemapOkButton").bind("click", function() {
        basemapsWidget.toggle();
      });
      
      /********** methods **********/
      
      this.toggle = function(contentId, buttonId) {
        if (!basemapsWidget.active) {
          basemapsWidget.open(contentId, buttonId);
        }
        else {
          basemapsWidget.close(contentId, buttonId);
        }
      }
      
      this.open = function(contentId, buttonId) {
        basemapsWidget.active = true;
        //manager.regions.panelRegion.retrievePanel(contentId);
        manager.regions.bannerRegion.toggleButtonCss(basemapsWidget.buttonId, true);
        manager.regions.popoutRegion.openUp();
      }
      
      this.close = function(contentId, buttonId) {
        basemapsWidget.active = false;
        //manager.regions.panelRegion.detachPanel(contentId);
        manager.regions.bannerRegion.toggleButtonCss(basemapsWidget.buttonId);
        manager.regions.popoutRegion.closeDown();
      }
      
      this.selectBasemap = function(basemap) {
        $(".basemapSwitcherImage").css("border-color", "#555");
        $(".basemapSwitcherImage").css("border-width", "3px");
        $("#basemap_" + basemap).css("border-color", "#197dc8");
        $("#basemap_" + basemap).css("border-width", "3px");
        basemapsWidget.changeBasemap(basemap);
      }
      
      this.changeBasemap = function(basemap) {
        manager.map.setBasemap(basemap);
      }
      
      // close by default
      basemapsWidget.close();
      
    }
  });
});





