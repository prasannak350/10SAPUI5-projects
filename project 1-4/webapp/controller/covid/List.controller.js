sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller,JSONModel) => {
    "use strict";

    return Controller.extend("com.sap.project1tiles.controller.covid.List", {

        dataPath : "https://api.rootnet.in/covid19-in/stats/latest",
        onInit() {
            
            var dataModel = new JSONModel(this.dataPath);
            this.getView().setModel(dataModel, "Latest");
        },
       
    });
});