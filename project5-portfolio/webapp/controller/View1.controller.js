sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("com.sap.project5portfolio.controller.View1", {
        onInit() {
            let oModel = new JSONModel("../model/data.json");
            this.getView().setModel(oModel,"portfolio")
        }
    });
});