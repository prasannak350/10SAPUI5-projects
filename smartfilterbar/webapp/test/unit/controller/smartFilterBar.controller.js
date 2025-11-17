/*global QUnit*/

sap.ui.define([
	"com/sap/smartfilterbar/controller/smartFilterBar.controller"
], function (Controller) {
	"use strict";

	QUnit.module("smartFilterBar Controller");

	QUnit.test("I should test the smartFilterBar controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
