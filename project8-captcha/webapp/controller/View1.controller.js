sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.sap.project8captcha.controller.View1", {
        onInit() {
        },
        onValid:function(oEvent){
            // alert(`Valid Captcha ${oEvent.getParameter("value")}`)
            alert("Valid Captcha" + " " + oEvent.getParameter("value"))
        }
    });
});