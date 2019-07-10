import * as SRD from "storm-react-diagrams";
import {SimplePortFactory} from "./NodeModels/SimplePortFactory";
import {CircleStartPortModel} from "./NodeModels/StartNode/CircleStartPortModel";
import {CircleStartNodeFactory} from "./NodeModels/StartNode/CircleStartNodeFactory";
import {CircleStartNodeModel} from "./NodeModels/StartNode/CircleStartNodeModel";
import {CircleEndPortModel} from "./NodeModels/EndNode/CircleEndPortModel";
import {CircleEndNodeFactory} from "./NodeModels/EndNode/CircleEndNodeFactory";
import {CircleEndNodeModel} from "./NodeModels/EndNode/CircleEndNodeModel";

export class Application {

    activeModel: SRD.DiagramModel;
    diagramEngine: SRD.DiagramEngine;

    constructor() {
        this.diagramEngine = new SRD.DiagramEngine();
        this.diagramEngine.installDefaultFactories();

        this.diagramEngine.registerPortFactory(new SimplePortFactory("start", config => new CircleStartPortModel()));
        this.diagramEngine.registerPortFactory(new SimplePortFactory("end", config => new CircleEndPortModel()));

        this.diagramEngine.registerNodeFactory(new CircleStartNodeFactory());
        this.diagramEngine.registerNodeFactory(new CircleEndNodeFactory());

        this.newModel();
    }

    newModel() {
        this.activeModel = new SRD.DiagramModel();
        this.diagramEngine.setDiagramModel(this.activeModel);

        let start = new CircleStartNodeModel();
        start.addOutPort("Out");
        start.setPosition(150, 150);

        let end = new CircleEndNodeModel();
        end.addOutPort("In");
        end.setPosition(150, 300);

        this.activeModel.addAll(start, end);
    }

    getActiveDiagram(): SRD.DiagramModel {
        return this.activeModel;
    }

    getDiagramEngine(): SRD.DiagramEngine {
        return this.diagramEngine;
    }
}
