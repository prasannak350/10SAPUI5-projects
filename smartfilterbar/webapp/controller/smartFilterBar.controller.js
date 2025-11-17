sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.sap.smartfilterbar.controller.smartFilterBar", {
        onInit() {
        },
        handleSelectionChange: function(oEvent){
            var oContext = oEvent.getParameter('listItem').getBindingContext().getObject();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("smartForm",{
                CustomerID: oContext.CustomerID
            })
        }
    });
});