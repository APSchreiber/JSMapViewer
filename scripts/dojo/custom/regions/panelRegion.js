define([

  // dojo
  "dojo/_base/declare",
  
  // esri
  
  // custom
  
  ], function (
      declare
  ) {
   
  return declare(null, {
    constructor: function (id, config) {
      
      // reference to self
      var panelRegion = this;
      
      /********** init **********/
      
      this.panels = {};
      
      this.activePanel = null;
      
      this.closeManager = {
        defaultClose: function() {
          if (panelRegion.activePanel.contentId) {
            panelRegion.detachContent(panelRegion.activePanel);
          }
          else {
            alert("No active panel set to close.");
          }
        },
        registeredClose: null
      };
      
      // hide/show
      $("#panelOpen").bind("click", function() {
        $("#panel").css("display", "block");
        $("#panelClose").css("display", "block");
        $("#map_zoom_slider").css("left", "24.5%");
        $("#geolocationButtonAbsolute").css("left", "24.5%");
      });
      $("#panelClose").bind("click", function() {
        $("#panel").css("display", "none");
        $("#panelClose").css("display", "none");
        $("#map_zoom_slider").css("left", ".5%");
        $("#geolocationButtonAbsolute").css("left", ".5%");
      });
      
      /********** blocking **********/
      
      // panel HTML template
      var panelTemplateHTML = "" +
      '<div class="panelControls">' +
        '<div class="panelTitle">' + 
          '<h3 id="panelTitleText" class="panelTitleText"></h3>' +
        '</div>' +
        '<div class="panelClose">' +
          '<img id="panelCloseX" class="panelCloseX clickable" src="images/gcicons/Icons/panel-close.png">' +
        '</div>' +
      '</div>' +
      '<div id="panelContent" class="panelContent"></div>';
      
      // add the panel template to the document
      $("#" + id).html(panelTemplateHTML);
      
      // bind the close manager to the close element
      $("#panelCloseX").bind("click", function() {
        panelRegion.closePanel();
      });
      
      /********** methods **********/
      
      // default panel config object (sample)
      var panelConfigObject = {
        title: "Default Panel Title",
        content: "Panel Content HTML",
        close: function() {
          panelRegion.closeManager.defaultClose();
        }
      }
      
      this.populatePanel = function(panel) {
        // if no config is provided, use the default (debug)
        var panelConfig = panel || panelConfigObject;
        // set the active panel
        panelRegion.activePanel = {};
        panelRegion.activePanel.contentId = panel.contentId;
        panelRegion.activePanel.button = "";
        $("#panelTitleText").html(panelConfig.title);
        $("#panelContent").html(panelConfig.content);
        if (panelConfig.close) {
          panelRegion.closeManager.registeredClose = panelConfig.close;
        }
      }
      
      this.closePanel = function() {
        if (panelRegion.closeManager.registeredClose) {
          panelRegion.closeManager.registeredClose();
        }
        else {
          panelRegion.closeManager.defaultClose();
        }
      }
      
      // detach content area for later use
      this.detachPanel = function(id) {
        var title = $("#panelTitleText").html();
        $("#panelTitleText").empty();
        var content = $("#" + id).detach();
        panelRegion.panels[id] = {};
        panelRegion.panels[id].id = id;
        panelRegion.panels[id].title = title;
        panelRegion.panels[id].content = content;
      }
      
      // retrieve and reattach content
      this.retrievePanel = function(id) {
        var title = panelRegion.panels[id].title;
        var content = panelRegion.panels[id].content;
        $("#panelTitleText").html(title);
        $("#panelContent").html(content);
      }
      
    }
  });
});




