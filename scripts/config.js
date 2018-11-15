
// PRODUCTION

var customConfig = {

  // Design and Layout
  appDesign: {
    webPageTitle: "Property Map", // Title displayed in browser tab/bookmarks
    applicationTitle: "Property", // Title displayed on the application/page
    applicationSubtitle: "Map", // Subtitle displayed on the application/page
    logo: "images/flag.png", // Logo displayed in upper-left corner of application
    logoTitle: "Property Map" // Title displayed on hover logo
  },
  
  // Map Settings
  mapSettings: {
   coords: [-82.7803657, 40.0772326], // X Coords, Y Coords
   zoom: 16, // Zoom level x-x
   basemap: "satellite", // Options: "satellite", "streets", "topo"
   basemapSwitcher: true
  },
  
  // Map Capabilities
  mapCapabilities: {
    mapEditable: true
  },
  
  // Time Slider
  timeSlider: {
    timeLayer: "InspectionHistory",
    timeSliderLabel: "Inspection History",
    timeSliderDefinitionQueryField: "Status"
  },
  
  // MAP LAYER CONFIG 
  
  // Map Layers
  layersConfig: [
    {
      reference: "Property",
      url: "",
      mode: "MODE_ONDEMAND",
      hasAttachments: false,
      isEditable: false,
      visible: true,
      popup: false,
      outFields: ["*"],
      maxScale: 0,
      minScale: 10000
    }
  ],
  
  dynamicLayers: [

  ],
  
  // Configure tasks/modules
  tasks: {
    "newServiceRequest": {
      name: "newServiceRequest",
      type: "newServiceRequest",
      layer: "ServiceRequestForm"
    }
  },

  panels: [
    // General Application Panels
    {
      id: "Attributes"
    },
    {
      id: "layers",
      button: true
    },
    {
      id: "settings",
      button: true
    },
    {
      id: "help",
      button: true
    },
    // Widget Panels
    {
      id: "draw",
      button: true
    },
    {
      id: "print",
      button: true
    },
    {
      id: "QueryResultList"
    },
    // Special Task Panels
    {
      id: "ServiceRequestList"
    },
    {
      id: "newServiceRequest",
      button: true
    },
    {
      id: "WorkOrderList",
      button: true
    },
    {
      id: "newInspections"
    },
    {
      id: "newViolations"
    },
    {
      id: "editViolations"
    },
    {
      id: "complaints",
      button: true
    }
  ]
};