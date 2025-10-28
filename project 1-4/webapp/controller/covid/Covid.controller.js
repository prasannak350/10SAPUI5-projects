sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/viz/ui5/api/env/Format',
    'sap/viz/ui5/format/ChartFormatter',
], (Controller,JSONModel, Format, ChartFormatter) => {
    "use strict";

    return Controller.extend("com.sap.project1tiles.controller.covid.Covid", {
        // to come out of covid folder 2 dots and to also come out of controller folder, 2 more dots
        dataPath : "../../model/data.json",

        // real time data
        // dataPath : "https://api.rootnet.in/covid19-in/stats/history",
        oVizFrame : null,
        onInit() {
            Format.numericFormatter(ChartFormatter.getInstance());
            var formatPattern = ChartFormatter.DefaultPattern;
    

            var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
            oVizFrame.setVizProperties({
                plotArea: {
                    dataLabel: {
                        formatString:formatPattern.SHORTFLOAT_MFD2,
                        visible: true
                    }
                },
                valueAxis: {
                    label: {
                        formatString: formatPattern.SHORTFLOAT
                    },
                    title: {
                        visible: true
                    }
                },
                categoryAxis: {
                    title: {
                        visible: false
                    }
                },
                title: {
                    visible: true,
                    text: 'Covid Cases History'
                }
            });
            var dataModel = new JSONModel(this.dataPath);
            oVizFrame.setModel(dataModel);

            var oPopOver = this.getView().byId("idPopOver");
            oPopOver.connect(oVizFrame.getVizUid());
            oPopOver.setFormatString(formatPattern.STANDARDFLOAT);
        },

        onPressList : function(){
            this.getOwnerComponent().getRouter().navTo("second-list");
        },
        onPressGraph: function(){
            this.getOwnerComponent().getRouter().navTo("second-pie");
        }
       
    });
});