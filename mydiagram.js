var myDiagram ={}
var $ = go.GraphObject.make;

function init() {


myDiagram =
  $(go.Diagram, "teste",
    {
      initialContentAlignment: go.Spot.Center, // center Diagram contents
      "undoManager.isEnabled": true // enable Ctrl-Z to undo and Ctrl-Y to redo
    });

    // define a simple Node template
    myDiagram.nodeTemplate =
      $(go.Node, "Auto",
        // the entire node will have a light-blue background
        { background: "#44CCFF" },
        new go.Binding("background"),
        $(go.Shape, "Rectangle",
          {
            fill: "blue"
          },
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          "Default Text",  // the initial value for TextBlock.text
          // some room around the text, a larger font, and a white stroke:
          { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
          // TextBlock.text is data bound to the "name" attribute of the model data
          new go.Binding("text", "name"))
      );

    var model = $(go.TreeModel);
    model.nodeDataArray =
    [ // note that each node data object holds whatever properties it needs;
      // for this app we add the "name" and "source" properties
      { key: "1",  background: "yellow", name: "Don Meow", color: "red" },
      { key: "2", parent: "1", name: "Copricat", color: "red"},
      { key: "3", parent: "1", name: "Demeter", color: "red" },
      { key: "4", parent: "3", color: "red" }
    ];


    myDiagram.model = model;

    var inspector = new Inspector('myInspectorDiv', myDiagram,
      {
        // uncomment this line to only inspect the named properties below instead of all properties on each object:
        // includesOwnProperties: false,
        properties: {
          // key would be automatically added for nodes, but we want to declare it read-only also:
          "key": { readOnly: true, show: Inspector.showIfPresent },
          // color would be automatically added for nodes, but we want to declare it a color also:
          "color": { show: Inspector.showIfPresent, type: 'color' },
          // Comments and LinkComments are not in any node or link data (yet), so we add them here:
          "Comments": { show: Inspector.showIfNode  },
          "flag": { show: Inspector.showIfNode, type: 'boolean', defaultValue: true  },
          "LinkComments": { show: Inspector.showIfLink },
        }
      });

}

function treeLayout(){
  myDiagram.layout = $(go.TreeLayout, // specify a Diagram.layout that arranges trees
                 { angle: 90, layerSpacing: 35 })

}
function circularLayout(){
  myDiagram.layout = $(go.CircularLayout, // specify a Diagram.layout that arranges trees
                 { spacing: 35 })

}
