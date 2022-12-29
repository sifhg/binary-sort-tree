class TreeElement {
    constructor(e) {
        this.element = e;
        this.childL = 0;
        this.childR = 0;
        this.parent = 0;
    }
    //get methods
    getValue() {
        return this.element;
    }
    getParent() {
        return this.parent;
    }
    getChildL() {
        return this.childL;
    }
    getChildR() {
        return this.childR;
    }
    getChildren() {
        return {childL: this.getChildL(), childR: this.getChildR()};
    }
    areChildren() {
        return {childL: this.childL!=0, childR: this.childR!=0};
    }
    isParent() {
        return this.parent != 0;
    }
    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
    getValueArray() {
        let pointer = this.clone();
        let outputArray = []
        function decision() {
            if(pointer.areChildren().childL) {
                return "left";
            }
            if(!(pointer.areChildren().childL || pointer.areChildren().childR) && pointer.isParent()) {
                return "up";
            }
            if((!pointer.areChildren().childL && pointer.areChildren().childR) && pointer.isParent()) {
                return "short";
            }
            if(!pointer.areChildren().childL && !pointer.isParent() && pointer.areChildren().childR) {
                return "right";
            }
            console.log("ERROR: We shouldn't get here!")
            return "ERROR";
        }
        while(pointer.areChildren().childL || pointer.areChildren().childR || pointer.isParent()) {
            
            switch(decision()) {
                case "left":
                    pointer = pointer.getChildL();
                    break;
                case "up":
                    outputArray.push(pointer.getValue());
                    outputArray.push(pointer.getParent().getValue());
                    pointer = pointer.getParent();
                    pointer.deleteChildL();
                    if(!pointer.isParent() && !pointer.areChildren().childL && !pointer.areChildren().childR) {
                        return outputArray;
                    }else if(pointer.areChildren().childR && pointer.isParent()) {
                        pointer.getParent().setChildL(pointer.getChildR());
                    }else if(pointer.areChildren().childR) {
                        pointer = pointer.getChildR();
                        pointer.deleteParent();
                        break;
                    }else if(pointer.areChildren().childL || pointer.areChildren().childR || !(pointer.areChildren().childL || pointer.areChildren().childR)) {
                        pointer = pointer.getParent();
                        pointer.deleteChildL();
                    }
                    if(pointer.isParent()) {
                        pointer = pointer.getParent();
                    }
                    break;
                case "short":
                    outputArray.push(pointer.getValue());
                    pointer.getParent().setChildL(pointer.getChildR());
                    pointer = pointer.getParent();
                    break;
                case "right":
                    outputArray.push(pointer.getValue());
                    pointer = pointer.getChildR();
                    pointer.deleteParent();
                    break;
            }
        }
        outputArray.push(pointer.getValue());
        return outputArray;
    }

    //setMethods
    setParent(aParentElement) {
        this.parent = aParentElement;
    }
    setChildL(aChildLElement) {
        this.childL = aChildLElement;
        this.childL.setParent(this);
    }
    setChildR(aChildRValue) {
        this.childR = aChildRValue;
        this.childR.setParent(this);
    }
    createChildL(aChildLValue) {
        this.childL = new TreeElement(aChildLValue);
        this.childL.setParent(this);
    }
    createChildR(aChildRValue) {
        this.childR = new TreeElement(aChildRValue);
        this.childR.setParent(this);
    }
    deleteChildL() {
        this.childL = 0;
    }
    deleteChildR() {
        this.childR = 0;
    }
    deleteParent() {
        this.parent = 0;
    }
}

