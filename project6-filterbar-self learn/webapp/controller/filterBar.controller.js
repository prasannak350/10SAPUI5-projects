sap.ui.define([
    "sap/ui/core/mvc/Controller",
], (Controller) => {
    "use strict";

    return Controller.extend("com.sap.project6filterbar.controller.filterBar", {
        onInit() {
        },

        onSearch: function () {
            var oFilterBar = this.byId("filterBar");
            var mParams = oFilterBar.getFilterGroupItems();

            var aFilters = [];

            // Get filter values
            // var sName = this.getView().byId("prodNameInput").getValue();
            var aSelectedProducts = this.byId("productMultiCombo").getSelectedKeys();
            var sCategory = this.getView().byId("categoryCombo").getSelectedKey();
            var aunitTokens = this.getView().byId("UnitsInStockMultiInput").getTokens();
            var aQuantityTokens = this.getView().byId("QuantityPerUnitMultiInput").getTokens();
            var aUnitsRangeTokens = this.getView().byId("UnitsRangeMultiInput").getTokens();

            // if (sName) {
            //     aFilters.push(
            //     new sap.ui.model.Filter("ProductName", sap.ui.model.FilterOperator.Contains, sName)
            //     );
            // }

            //products
            if (aSelectedProducts.length > 0) {
                var aProductFilters = aSelectedProducts.map(function (prodId) {
                    return new sap.ui.model.Filter(
                        "ProductID",
                        sap.ui.model.FilterOperator.EQ,
                        prodId
                    );
                });

                aFilters.push(new sap.ui.model.Filter({
                    filters: aProductFilters,
                    and: false 
                }));
            }

            //category
            if (sCategory) {
                aFilters.push(
                new sap.ui.model.Filter("CategoryID", sap.ui.model.FilterOperator.EQ, sCategory)
                );
            }

            //units
            if (aunitTokens.length > 0) {

                var aUnitFilters = aunitTokens.map(function (oToken) {
                    return new sap.ui.model.Filter(
                        "UnitsInStock",
                        sap.ui.model.FilterOperator.EQ,
                        oToken.getText()
                    );
                });

                // OR filter group
                aFilters.push(new sap.ui.model.Filter({
                    filters: aUnitFilters,
                    and: false
                }));
            }

            //quantity
            if (aQuantityTokens.length > 0) {

                var aQuantityFilters = aQuantityTokens.map(function (oToken) {
                    return new sap.ui.model.Filter(
                        "QuantityPerUnit",
                        sap.ui.model.FilterOperator.EQ,
                        oToken.getText()
                    );
                });

                // OR filter group
                aFilters.push(new sap.ui.model.Filter({
                    filters: aQuantityFilters,
                    and: false
                }));
            }

            // units range
            aUnitsRangeTokens.forEach(t => {
                const oRange = t.data("range");

                aFilters.push(
                    new sap.ui.model.Filter({
                        path: "UnitsInStock",
                        operator: oRange.operation,
                        value1: oRange.value1,
                        value2: oRange.value2
                    })
                );
            });

            // Apply to table binding
            var oTable = this.byId("productTable");
            var oBinding = oTable.getBinding("items");

            oBinding.filter(aFilters);
        },

        // learnt something new - busyindicator will not appear without setTimeout function in this case because browser is busy in creating dialog, set table, bind rows, open dialog
        // with setTimeout --> it tells the broswer to run this function later, after the current JavaScript execution is finished.
        onQuantityValueHelpRequest: function () {
            sap.ui.core.BusyIndicator.show(0);

            setTimeout(function () {
                this.openQuantityValueHelpDialog();
            }.bind(this), 0);
        },


        openQuantityValueHelpDialog: function () {
            var oView = this.getView();

            if (!this._oQuantity) {
                this._oQuantity = sap.ui.xmlfragment(
                    oView.getId(),
                    "com.sap.project6filterbar.view.QuantityValuehelp",
                    this
                );

                oView.addDependent(this._oQuantity);

                
            }

            // Create table
            this._oTable = new sap.ui.table.Table({
                // visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Fixed,
                // visibleRowCount: 17,
                selectionMode: "MultiToggle",
                rows: "{/Products}"
            });

            this._oTable.addColumn(new sap.ui.table.Column({
                label: "Product ID",
                template: new sap.m.Text({ text: "{ProductID}" })
            }));

            this._oTable.addColumn(new sap.ui.table.Column({
                label: "Product Name",
                template: new sap.m.Text({ text: "{ProductName}" })
            }));

            this._oTable.addColumn(new sap.ui.table.Column({
                label: "Quantity Per Unit",
                template: new sap.m.Text({ text: "{QuantityPerUnit}" })
            }));

            this._oQuantity.attachAfterOpen(() => {
                sap.ui.core.BusyIndicator.hide();
            });

            // Always Set the table to the dialog
            this._oQuantity.setTable(this._oTable);

            // IMPORTANT: Pass the model manually
            this._oQuantity.setModel(oView.getModel());

            sap.ui.core.BusyIndicator.hide();

            // open the fragment
            this._oQuantity.open();
        },

        // When user presses OK
        onQuantityOk: function (oEvent) {
            var aTokens = oEvent.getParameter("tokens");
            this.byId("QuantityPerUnitMultiInput").setTokens(aTokens);
            this._oQuantity.close();
        },

        // When user presses Cancel
        onQuantityCancel: function () {
            this._oQuantity.close();
        },

        // When dialog fully closes
        onQuantityClose: function () {
            // this._oQuantity.destroy();
        },

        onClearFilters: function () {
            const oFilterBar = this.byId("filterBar");

            // clear filters
            this._clearFilterBar(oFilterBar);

            // Clear table filters too
            var oTable = this.byId("productTable");
            oTable.getBinding("items").filter([]);

        },

        _clearFilterBar: function(oFilterBar){
            this.getView().byId("productMultiCombo").removeAllSelectedItems();
            this.getView().byId("categoryCombo").setSelectedKey("");
            this.getView().byId("UnitsInStockMultiInput").removeAllTokens();
            this.getView().byId("QuantityPerUnitMultiInput").removeAllTokens();
            this.getView().byId("UnitsRangeMultiInput").removeAllTokens();
        },

        onUnitsRangeValueHelp: function () {
            sap.ui.core.BusyIndicator.show(0);

            setTimeout(function () {
                this.openUnitsRangeValueHelpDialog();
            }.bind(this), 0);
        },

        openUnitsRangeValueHelpDialog: function () {
            const oView = this.getView();

            if (!this._oUnitsRange) {
                this._oUnitsRange = sap.ui.xmlfragment(
                    oView.getId(),
                    "com.sap.project6filterbar.view.UnitsRangeValuehelp",
                    this
                );
                oView.addDependent(this._oUnitsRange);

            }

            // learnt something new - to add ranges in the value help dialogue below code is required
            this._oUnitsRange.setRangeKeyFields([{
				label: "Units In Stock",
				key: "UnitsInStock",
				type: "int"
			}]);

            // Reset internal tokens EVERY TIME
            this._oUnitsRange.setTokens([]);  

            // Pre-fill existing tokens (if user previously selected ranges)
            this._oUnitsRange.setTokens(
                this.byId("UnitsRangeMultiInput").getTokens()
            );

            sap.ui.core.BusyIndicator.hide();

            this._oUnitsRange.open();
        },

        onUnitsRangeOk: function (oEvent) {
            const selectedTokens = oEvent.getParameter("tokens");
            const multiInput = this.byId("UnitsRangeMultiInput");
            const existingTokens = multiInput.getTokens();

        //learnt something new - to stop displaying duplicating selections in the multiinput    
            //  Build a set of “signatures” for existing tokens
            //    A signature uniquely identifies a range:
            //    OPERATION | VALUE1 | VALUE2   (example: "GT|5|" or "BT|10|20")
            const existingRangeSignatures = new Set();

            existingTokens.forEach(token => {
                const rangeData = token.data("range");                        // Contains {operation, value1, value2}
                const signature = `${rangeData.operation}|${rangeData.value1}|${rangeData.value2}`;
                existingRangeSignatures.add(signature);
            });

            //  Add only NEW tokens (skip duplicates)
            selectedTokens.forEach(token => {
                const rangeData = token.data("range");
                const signature = `${rangeData.operation}|${rangeData.value1}|${rangeData.value2}`;

                if (!existingRangeSignatures.has(signature)) {
                    multiInput.addToken(token);                               // Add ONLY if not duplicate
                }
            });

            this._oUnitsRange.close();
        },

        onUnitsRangeCancel: function () {
            this._oUnitsRange.close();
        },



    });
});