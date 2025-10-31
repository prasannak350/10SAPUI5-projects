sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    'sap/f/library'
], (Controller, JSONModel, fioriLibrary) => {
    "use strict";

    return Controller.extend("com.sap.project4.controller.Master", {
        onInit() {
            var countriesModel = new JSONModel("../model/data.json"); 
            // we will not be able to see the data immediately. so attached a event which will give the give the data once the request is completed
            countriesModel.attachRequestCompleted(() => {
                // Now data is available here
               countriesModel.getData();
               this.getView().setModel(countriesModel, 'countries');
            });

            this.oRouter = this.getOwnerComponent().getRouter();
        },
        onCountryPress:function(oEvent){
            var country = oEvent.getSource().getBindingContext("countries").getObject().name;
            this.oRouter.navTo("detail", {layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, country: country});

            // var x = this.getView().getParent().getParent();
            // x.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);

            // get the binding context for the countries model
            const oContext = oEvent.getSource().getBindingContext("countries");
            // Get the path for selected item
            const sPath = oContext.getPath();
            // Get the full country object
            const oCountry = oContext.getObject();

            // Access the states inside that country
            const aStates = oCountry.states;

            // bind the right side table to show these states
            const oStatesModel = new JSONModel(aStates);
            // this.getView().setModel(oStatesModel, "selectedStates");

            //set model globally
            this.getOwnerComponent().setModel(oStatesModel, "selectedStates");
        }
    });
});