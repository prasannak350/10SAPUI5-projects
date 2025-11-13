/*global QUnit*/

sap.ui.define([
	"com/sap/project6filterbar/controller/filterBar.controller"
], function (Controller) {
	"use strict";

	QUnit.module("filterBar Controller");

	QUnit.test("I should test the filterBar controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
