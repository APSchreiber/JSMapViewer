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
      var popoutRegion = this;
      
      this.setContent = function(html) {
        $("#" + id).html(html);
      }
      
      this.openUp = function() {
        $("#" + id).fadeIn();
      }
      
      this.closeDown = function() {
        $("#" + id).fadeOut();
      }
      
    }
  });
});




