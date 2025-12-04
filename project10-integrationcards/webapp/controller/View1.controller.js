sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/integration/widgets/Card"
], (Controller, JSONModel, Card) => {
    "use strict";

    return Controller.extend("com.sap.project10integrationcards.controller.View1", {
        onInit() {
            var weatherDataModel = new JSONModel("../model/weatherData.json");
            this.getView().setModel(weatherDataModel);
            
            // this code is added because during the initial load, Object card will be selected and no data for that will be displayed. so we have added this to display the data
            // and added attachRequestCompleted function so that it calls the method only after the model data is loaded
            weatherDataModel.attachRequestCompleted(function(){
                this.onSelectingWeatherOption();
            }.bind(this));   // don't forget to bind this which refers to this controller as it is a callback function
        },

        // learnt something new about integration cards - object card, list card, table card and analytical card
        onSelectingWeatherOption: function (oEvent) {
            var configuration;
            var container = this.byId("page");
            var weatherDataModel = JSON.parse(this.getView().getModel().getJSON());
            switch (this.getView().byId("rbg3").getSelectedButton().getText()) {

                // object card
                case "Current Object Card":
                    configuration = {
                        "_version": "1.15.0",
                        "sap.app": {
                            "id": "card.explorer.object.card",
                            "type": "card"
                        },
                        "sap.card": {
                            "type": "Object",
                            "data": {
                                "json": weatherDataModel.current
                            },
                            "header": {
                                "icon": {
                                    "src": ""
                                },
                                "title": "{weather/0/main}",
                                "subTitle": "{weather/0/description}"
                            },
                            "content": {
                                "groups": [
                                    {
                                        "title": "Temperature Details",
                                        "items": [
                                            {
                                                "label": "Temperature",
                                                "value": "{temp}"
                                            },
                                            {
                                                "label": "Feels Like",
                                                "value": "{feels_like}"
                                            }
                                        ]
                                    },
                                    {
                                        "title": "Other",
                                        "items": [
                                            {
                                                "label": "Pressure",
                                                "value": "{pressure}"
                                            },
                                            {
                                                "label": "Humidity:",
                                                "value": "{humidity}"
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                break;

                // table card
                case "Hourly Table Card":
                    configuration={
                        "_version": "1.15.0",
                        "sap.app": {
                            "id": "card.explorer.table.card",
                            "type": "card"
                        },
                        "sap.card":{
                            "type":"Table",
                            "data":{
                                "json":weatherDataModel.hourly
                            },
                            "header":{
                                "title":"Weather Forecast",
                                "subTitle":"Today",
                            },
                            "content":{
                                "row":{
                                    "columns":[{
                                        "title": "Date",
                                        "value":"{dt}",
                                        "identifier":true
                                    },
                                    {
                                        "title": "Temperature",
                                        "value":"{temp}"
                                    },
                                    {
                                        "title": "Humidity",
                                        "value":"{humidity}"
                                    },
                                    {
                                        "title": "Weather",
                                        "value":"{weather/0/description}",
                                        "state": "{infoState}"
                                    }
                                ]
                                }
                            }
                        }
                    }
                break;

                // List Card
                case "Hourly List Card":{
                    configuration={
                        "_version": "1.14.0",
                        "sap.app": {
                            "id": "card.explorer.highlight.list.card",
                            "type": "card"
                        },
                        "sap.card":{
                            "type":"List",
                            "header":{
                                "title" :"Weather data in list"
                            },
                            "content":{
                                "data":{
                                    "json":weatherDataModel.hourly
                                },
                                "item":{
                                    "title": "Date is {dt}",
                                    "description": "Temperature is {temp}",
                                    "highlight": "{infoState}"
                                }
                            }
                        }
                    }
                }
                break;

                // analytical card
                case "Hourly Analytical Card":{
                    configuration={
                        "_version":"1.14.0",
                        "sap.app":{
                            "id":"card.explorer.line.card",
                            "type":"card"
                        },
                        "sap.card":{
                            "type":"Analytical",
                            "header":{
                                "type": "Numeric",
                                "data":{
                                    "json":{
                                        "number": "65.34",
                                        "unit": "K",
                                        "trend": "Down",
                                        "state": "Error",
                                        "target": {
                                            "number": 100,
                                            "unit": "K"
                                        },
                                        "deviation": {
                                            "number": 34.7
                                        },
                                        "details": "Q1, 2018"
                                    }
                                },
                                "title": "Weather data analytical",
                            },
                            "content":{
                                "chartType": "Line",
                                "Legend":{
                                    "visible": true,
                                    "position": "Bottom",
                                    "alignment": "TopLeft"
                                },
                                "plotArea":{
                                    "dataLabel": {
                                        "visible": true
                                    },
                                    "categoryAxisText": {
                                        "visible": false
                                    },
                                    "valueAxisText": {
                                        "visible": true
                                    }
                                },
                                "title": {
                                    "text": "Line chart",
                                    "visible": true,
                                    "alignment": "Left"
                                },
                                "measureAxis": "valueAxis",
                                "dimensionAxis": "categoryAxis",
                                "data": {
                                    "json":  weatherDataModel.hourly
                                    
                                },
                                "dimensions": [
                                    {
                                        "label": "Date",
                                        "value": "{dt}"
                                    }
                                ],
                                "measures": [
                                    {
                                        "label": "Temperature",
                                        "value": "{temp}"
                                    },
                                    {
                                        "label": "Humidity",
                                        "value": "{humidity}"
                                    }
                                ]
                            }
                        }
                    }
                }
                break;
            }
            var myCard = new Card();
            myCard.setManifest(configuration);
            // to remove the already existing card when we select any other radio button
            container.getContent()[0].removeItem(container.getContent()[0].getItems()[2])
            container.getContent()[0].addAggregation("items",myCard)
        }
    });
});