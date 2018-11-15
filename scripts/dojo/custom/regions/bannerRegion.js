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
      var bannerRegion = this;
      
      /********** init **********/
      
      var bannerElement = $("#" + id);
      if (!bannerElement.length) {
        console.log("Error: banner id '" + id + "' does not exist in the dom.");
      }
      
      var title = "Default Title";
      var subtitle = "Default Subtitle";
      if (config) {
        if (config.title) {
          title = config.title;
          subtitle = config.subtitle;
        }
        if (config.icon) {
          icon = config.icon;
        }
      }
      
      /********** blocking **********/
      
      // banner HTML template
      
      var bannerHTML = "" +
      '<img id="bannerIcon" src="' + icon + '" />' +
      '<div id="bannerTitleBlock">' +
        '<h1 id="bannerTitleText">' + title + '</h1>' +
        '<h2 id="bannerSubtitleText">' + subtitle + '</h2>' +
      '</div>' +
      '<div id="bannerButtons">' +
      '</div>';
      
      // add the banner template to the document
      $("#" + id).html(bannerHTML);
      
      // hide/show
      $("#bannerOpen").bind("click", function() {
        $("#banner").css("display", "block");
        $("#bannerClose").css("display", "block");
        $("#panel").css("top", "50px");
        $("#panel").css("height", "calc(100% - 50px)");
        $("#panelOpen").css("top", "50px");
        $("#panelClose").css("top", "50px");
        $("#map_zoom_slider").css("top", "134px");
        $("#geolocationButtonAbsolute").css("top", "94px");
        
      });
      $("#bannerClose").bind("click", function() {
        $("#banner").css("display", "none");
        $("#bannerClose").css("display", "none");
        $("#panel").css("top", "0");
        $("#panel").css("height", "100%");
        $("#panelOpen").css("top", "-1px");
        $("#panelClose").css("top", "-1px");
        $("#map_zoom_slider").css("top", "84px");
        $("#geolocationButtonAbsolute").css("top", "44px");
      });


      
      /********** buttons **********/
      
      // default button config object (sample)
      var buttonConfigObject = {
        title: "Default Button",
        id: "defaultButton",
        imageUrl: "images/icons/no-icon-24.png",
        onClick: function() {
          alert("Default button clicked...");
        }
      }
      
      // add a new button to the banner/toolbar using a button config object
      this.addButton = function(button, offBannerId) {
        // if no config is provided, use the default (debug)
        var buttonConfig = button || buttonConfigObject;
        // if the button is to be bound to an existing element rather than the banner
        // button HTML template
        var buttonHTML = "";
        if (offBannerId) {
          buttonHTML += '<img src="' + buttonConfig.imageUrl + '" class="offBannerButton clickable" title="' + buttonConfig.title + '" id="' + buttonConfig.id + '">';
          $("#" + offBannerId).html(buttonHTML);
        }
        else {
          buttonHTML += '<img src="' + buttonConfig.imageUrl + '" class="bannerButton clickable" title="' + buttonConfig.title + '" id="' + buttonConfig.id + '">';
          $("#" + "bannerButtons").append(buttonHTML);
        }
        $("#" + buttonConfig.id).unbind();
        $("#" + buttonConfig.id).bind("click", function() {
          buttonConfig.onClick();
        });
       
      }
      
      this.toggleButton = function(id) {
        $("#" + id).css("background-color", "black");
      }
      
      // toggle css for a button
      this.toggleButtonCss = function(id, on, onColor, offColor) {
        var onC = onColor ||"#e9f6ff";
        var offC = offColor ||"transparent";
        if (on) {
          $("#" + id).css("background-color", onC);
          $("#" + id).css("border-color", "#197dc8");
        }
        else {
          $("#" + id).css("background-color", offC);
          $("#" + id).css("border-color", "#bbb");
        }
      }
      
    }
  });
});




