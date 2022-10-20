sap.ui.define([
  "./BaseController"
], function (BaseController) {
  "use strict";

  return BaseController.extend("com.davide.myapp.controller.Main", {
    sayHello: function() {
      var oRouter = this.getOwnerComponent().getRouter();
      oRouter.navTo("list");
    }
  });

});
