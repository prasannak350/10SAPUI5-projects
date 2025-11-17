sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.sap.smartfilterbar.controller.smartForm", {
        onInit() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("smartForm").attachPatternMatched(this._onRouteMatched, this);
        },
        _onRouteMatched:function(oEvent){
            var CustomerID = oEvent.getParameter('arguments').CustomerID;
            this.getView().bindElement("/Customers('" + CustomerID + "')");
        },
        onNavPress: function(){
            this.getOwnerComponent().getRouter().navTo("RoutesmartFilterBar");
        }
    });
});