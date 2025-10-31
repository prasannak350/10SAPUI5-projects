sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    'sap/f/library'
], (Controller, JSONModel, fioriLibrary) => {
    "use strict";

    return Controller.extend("com.sap.project4.controller.Detail", {
        onInit() {
            var oOwnerComponent = this.getOwnerComponent();

            this.oRouter = oOwnerComponent.getRouter();

            // this.oRouter.getRoute("master").attachPatternMatched(this._onSelectingCountry, this);
            this.oRouter.getRoute("detail").attachPatternMatched(this._onSelectingCountry, this);
        },

        _onSelectingCountry: function (oEvent) {
            const oModel = this.getOwnerComponent().getModel("selectedStates");
            this.getView().setModel(oModel, "selectedStates");

			this._country = oEvent.getParameter("arguments").country || this._country || "0";
		},
		onStatePress:function(oEvent){
			var state = oEvent.getSource().getBindingContext("selectedStates").getObject().name;
			this.oRouter.navTo("city", {layout: fioriLibrary.LayoutType.ThreeColumnsMidExpanded, state: state, country: this._country});

            // get the binding context for the state model
            const oContext = oEvent.getSource().getBindingContext("selectedStates");
            // Get the path for selected item
            const sPath = oContext.getPath();
            // Get the full state object
            const oCountry = oContext.getObject();

            // Access the cities inside that state
            const aCities = oCountry.districts;

            // bind the right side table to show these cities
            const oCitiesModel = new JSONModel(aCities);

            //set model globally
            this.getOwnerComponent().setModel(oCitiesModel, "selectedCities");
		},

		onExit: function () {
			this.oRouter.getRoute("master").detachPatternMatched(this._onSelectingCountry, this);
			this.oRouter.getRoute("detail").detachPatternMatched(this._onSelectingCountry, this);
		}
    });
});