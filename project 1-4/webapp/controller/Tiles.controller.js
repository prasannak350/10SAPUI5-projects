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

            if(oRoute.substring(0,4) == 'EXT-'){
                let selItem = JSON.parse(this.getView().getModel("tiles").getJSON()).find(item => {if (item.route == oRoute){ return item;}} );
                // WE WILL SEE THE PROJECT 4 POLLUTION TRACKER WHEN WE CLICK ON 4TH TILE - learnt something new here
                // when we click on the pollution tracker tile, we are running the pollution tracker app by giving the host url in tiles.json file. host url might change
                sap.m.URLHelper.redirect(selItem.url);

                // sap.m.URLHelper.triggerSms("+91123456789");
                }
            else {
                this.getOwnerComponent().getRouter().navTo(oRoute);
            }
        }
    });
});