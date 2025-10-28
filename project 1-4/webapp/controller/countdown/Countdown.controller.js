sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller,JSONModel) => {
    "use strict";

    return Controller.extend("com.sap.project1tiles.controller.countdown.Countdown", {
        onInit() {
            this.timer ={
                "days":0,
                "hours":0,
                "minutes":0,
                "seconds":0
            }
            var myTilesModel = new JSONModel(this.timer);
            this.getView().setModel(myTilesModel,"timer");
            setInterval(this.calculateTime.bind(this),1000);
            // this.calculateTime();
        },
        calculateTime: function(oRoute){
            var techedDate = new Date("Dec 8 2020");
            var currentDate = new Date();
            var diff = currentDate.getTime() - techedDate.getTime(); // this gives the difference in milliseconds
            this.timer.days = Math.floor(diff / ( 1000 * 60 * 60 * 24 ));
            this.timer.hours = Math.floor((diff % ( 1000 * 60 * 60 * 24 )) / ( 1000 * 60 * 60 ));
            this.timer.minutes = Math.floor((diff % ( 1000 * 60 * 60 ))/ ( 1000 * 60  ) );
            this.timer.seconds = Math.floor((diff % ( 1000 * 60  ))/ ( 1000  ) );
            this.getView().getModel("timer").setData(this.timer);
        }
    });
});