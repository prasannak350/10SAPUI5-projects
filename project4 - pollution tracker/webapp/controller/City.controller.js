sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    'sap/f/library'
], (Controller, JSONModel, fioriLibrary) => {
    "use strict";

    return Controller.extend("com.sap.project4.controller.City", {
        onInit() {
            var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();
            // this.oRouter.getRoute("master").attachPatternMatched(this._onSelectingState, this);
			// this.oRouter.getRoute("detail").attachPatternMatched(this._onSelectingState, this);
			this.oRouter.getRoute("city").attachPatternMatched(this._onSelectingState, this);
        },

        _onSelectingState: function (oEvent) {
            const oModel = this.getOwnerComponent().getModel("selectedCities");
            this.getView().setModel(oModel, "selectedCities");
		},

		onExit: function () {
			this.oRouter.getRoute("master").detachPatternMatched(this._onSelectingState, this);
			this.oRouter.getRoute("detail").detachPatternMatched(this._onSelectingState, this);
            this.oRouter.getRoute("city").detachPatternMatched(this._onSelectingState, this);
		}
    });
});