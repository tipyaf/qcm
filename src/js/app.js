/**
 * Created by yannickbenchimol on 31/08/2016.
 */
var qcmApp = angular.module("qcmApp", ['ui.router', 'ngFileUpload']);

qcmApp.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/qcm");
    //
    // Now set up the states
    $stateProvider
        .state('admin', {
            url: "/admin",
            templateUrl: "views/admin.html",
            controller: "adminController",
            controllerAs: "vm"
        })
    $stateProvider
        .state('qcm', {
            url: "/qcm",
            templateUrl: "views/qcm.html",
            controller: "qcmController",
            controllerAs: "vm"
        })

});