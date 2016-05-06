var myDiagram ={}
var MAKE = go.GraphObject.make;

function init() {


myDiagram =
  MAKE(go.Diagram, "teste",
    {
      initialContentAlignment: go.Spot.Center, // center Diagram contents
      "undoManager.isEnabled": true // enable Ctrl-Z to undo and Ctrl-Y to redo
    });

    // define a simple Node template
    myDiagram.nodeTemplate =
      MAKE(go.Node, "Auto",
        // the entire node will have a light-blue background
        { background: "#44CCFF" },
        new go.Binding("background"),
        MAKE(go.Shape, "Rectangle",
          {
            fill: "blue"
          },
          new go.Binding("fill", "color")),
        MAKE(go.TextBlock,
          "Default Text",  // the initial value for TextBlock.text
          // some room around the text, a larger font, and a white stroke:
          { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
          // TextBlock.text is data bound to the "name" attribute of the model data
          new go.Binding("font", "font"),
          new go.Binding("text", "name"))
      );

    var model = MAKE(go.TreeModel);
    model.nodeDataArray =
    [ // note that each node data object holds whatever properties it needs;
      // for this app we add the "name" and "source" properties
      { key: "1",  background: "yellow", name: "Don Meow", color: "red", font: "bold 16px sans-serif"},
      { key: "2", parent: "1", name: "Copricat", color: "red"},
      { key: "3", parent: "1", name: "Demeter", color: "red" },
      { key: "4", parent: "3",  name: "Tsc", color: "red" }
    ];


    myDiagram.model = model;

    var inspector = new Inspector('myInspectorDiv', myDiagram,
      {
        // uncomment this line to only inspect the named properties below instead of all properties on each object:
       includesOwnProperties: false,
        properties: {
          // color would be automatically added for nodes, but we want to declare it a color also:
          "color": { show: Inspector.showIfPresent, type: 'color' },

        }
      });
}

function treeLayout(){
  myDiagram.layout = MAKE(go.TreeLayout, // specify a Diagram.layout that arranges trees
                 { angle: 90, layerSpacing: 35 })

}
function circularLayout(){
  myDiagram.layout = MAKE(go.CircularLayout, // specify a Diagram.layout that arranges trees
                 { spacing: 35 })

}
