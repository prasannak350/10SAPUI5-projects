// learnt something new about using laodash library for generating captcha
sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/Input",
    "sap/m/Label",
    "sap/m/Button",
    "com/sap/project8captcha/model/loadash" // using third party library to perform various array operations
], (Control, Input, Label, Button, loadash) => {
    "use strict";

    return Control.extend("com.sap.project8captcha.control.Captcha", {
        metadata: {
            properties: {
                heading: { type: "string" },
                value: { type: "string" },
            },
            aggregations: {
                _label: {
                    type: "sap.m.Label",
                    multiple: false,
                    visibility: "hidden",
                },
                _input: {
                    type: "sap.m.Input",
                    multiple: false,
                    visibility: "hidden",
                },
                _refresh: {
                    type: "sap.m.Button",
                    multiple: true,    // we can add two buttons under this aggregation if we give multiple as true
                    visibility: "hidden",
                },
                _submit: {
                    type: "sap.m.Button",
                    multiple: false,
                    visibility: "hidden",
                },
            },
            events: {
                valid: {
                    parameters: {
                        value: { type: "string" },
                    },
                },
            },
        },
        init: function () {
            this.setAggregation("_input", new Input({value: "", placeholder:"Enter the Captcha here"}).addStyleClass("sapUiSmallMargin"));
            this.setAggregation("_label", new Label({text: this.getValue()}).addStyleClass("sapUiSmallMargin"));
            this.addAggregation("_refresh", new Button({type: "Accept", text: "Refresh", press: this._onRefresh.bind(this),}).addStyleClass("sapUiSmallMargin"));
            this.addAggregation("_refresh", new Button({type: "Accept", text: "RefreshMultiple Btn", press: this._onRefresh.bind(this),}).addStyleClass("sapUiSmallMargin"));
            this.setAggregation("_submit", new Button({type: "Reject", text: "Submit", press: this._onSubmit.bind(this),}).addStyleClass("sapUiSmallMargin"));
        },
        getValue: function () {
            // loading the sampleSize function from loadash library under global scope using _(underscore)
            // returns any random 5 characters from the below mentioned alphanumeric values everytime we click on refresh
            let sValue = _.sampleSize(
            [
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
            ],
            5
            ).join("");
            this.setProperty("value", sValue, true);
            return sValue;
        },
        _onRefresh: function(){
            let sValue = this.getValue();
            this.getAggregation("_label").setText(sValue);
        },
        _onSubmit: function(){
            if (this.getAggregation("_input").getValue() == this.getProperty("value")) {
                this.fireEvent("valid",{value:this.getProperty("value")});
            } 
            else {
                alert("mis-match");
            }
        },

        // to render the controls
        renderer: function (oRm, oControl) {
            oRm.openStart("div", oControl);
            oRm.class("captacha");
            oRm.openEnd();
            oRm.write(`<div>${oControl.getHeading()}</div>`);    // to get the heading that is given in the view
            oRm.renderControl(oControl.getAggregation("_label"));
            oRm.renderControl(oControl.getAggregation("_input"));
            oRm.renderControl(oControl.getAggregation("_refresh")[0]);
            oRm.renderControl(oControl.getAggregation("_refresh")[1]);
            oRm.renderControl(oControl.getAggregation("_submit"));
            oRm.close("div");
        },
    });
});