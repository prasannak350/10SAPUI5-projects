sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller,JSONModel) => {
    "use strict";

    return Controller.extend("com.sap.project1tiles.controller.Tiles", {
        onInit() {
            var myTilesModel = new JSONModel("../model/tiles.json");
            this.getView().setModel(myTilesModel,"tiles");
        },
        onPress: function(oRoute){
            // alert(oRoute + " " + "tile is pressed");

            this.getOwnerComponent().getRouter().navTo(oRoute);
        }
    });
});