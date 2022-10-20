sap.ui.define([
    'sap/m/MessageToast',
    "./BaseController",
    'sap/ui/core/Fragment',
    'sap/ui/model/json/JSONModel'

], function (MessageToast, BaseController, Fragment, JSONModel) {
    "use strict";

    return BaseController.extend("com.davide.myapp.controller.List", {
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("list").attachPatternMatched(this.onRouteMatched, this); // Get routed view from router and send to onRouteMatched() fn
        },
        onRouteMatched: function (oEvent) {
        },
        handlePopoverPress: function (oEvent) {
            var oRow = oEvent.getSource(),
                oView = this.getView();
            var oItem = oRow.getBindingContext("car").getObject();
            var oData = new JSONModel(oItem);
            sap.ui.getCore().selectedRow = oRow;

            this.getView().setModel(oData, "detail")
            // create popover
            if (!this._pPopover) {
                this._pPopover = Fragment.load({
                    id: oView.getId(),
                    name: "com.davide.myapp.view.fragment.Popover",
                    controller: this
                }).then(function (oPopover) {
                    oView.addDependent(oPopover);
                    return oPopover;
                });
            }
            this._pPopover.then(function (oPopover) {
                oPopover.openBy(oRow);
            });
        },

        scelta1: function () {
            this.byId("myPopover").close();
            MessageToast.show("Hai scelto questa macchina");
            sap.ui.getCore().selectedRow.removeStyleClass("red");
            sap.ui.getCore().selectedRow.addStyleClass("green");
        },
        scelta2: function () {
            this.byId("myPopover").close();
            MessageToast.show("Non hai scelto questa macchina");
            sap.ui.getCore().selectedRow.removeStyleClass("green")
            sap.ui.getCore().selectedRow.addStyleClass("red");
        }
    });
});