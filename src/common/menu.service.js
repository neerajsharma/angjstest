(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  var preferences = null;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };
    
  service.saveSignupPref = function(newPreferences){
      preferences = newPreferences;
      console.log('save preferences: ', preferences);
  };

  service.getSignupPrefs = function(){
      console.log('get preferences: ', preferences);
      return preferences;
  };
  


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };

}



})();
