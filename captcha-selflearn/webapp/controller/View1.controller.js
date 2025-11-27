sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("com.sap.captchaselflearn.controller.View1", {
        onInit() {
            var oModel = new sap.ui.model.json.JSONModel({
                captcha: this._createCaptcha()
            });
            this.getView().setModel(oModel);
        },

        // generate random captcha
        // learnt something new about generating random captcha using charAt(gives the character which is at that particular place)
        _createCaptcha: function () {
            var chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
            var captcha = "";
            for (var i = 0; i < 5; i++) {
                captcha += chars.charAt(Math.floor(Math.random() * chars.length));  // Math.random() = returns random value like 0.64 / 0.36
                                                                                    // chars.length = 32
                                                                                    // Math.random() * chars.length = might be 20.48 / 11.52
                                                                                    // Math.floor(Math.random() * chars.length) = 20 / 11
                                                                                    // chars.charAt(Math.floor(Math.random() * chars.length)) --> chars.charAt(20) = 'W' (returns char which is at 20th place)
            }
            return captcha;
        },

        onRefreshCaptcha: function () {
            var newCaptcha = this._createCaptcha();
            this.getView().getModel().setProperty("/captcha", newCaptcha);
            this.byId("captchaInput").setValue("");
        },

        onSubmitCaptcha: function () {
            var modelCaptcha = this.getView().getModel().getProperty("/captcha");
            var userInput = this.byId("captchaInput").getValue();

            if (userInput === modelCaptcha) {
                MessageToast.show("Captcha correct!");
            } else {
                MessageToast.show("Captcha incorrect. Try again!");
            }
        }
    });
});