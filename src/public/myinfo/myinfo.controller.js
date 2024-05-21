(function(){
    angular.module('public')
        .controller('MyInfoController', ['$scope', '$http', 'MenuService', function($scope, $http, MenuService){
        $scope.myinfoPrefs = MenuService.getSignupPrefs();
        if($scope.myinfoPrefs === undefined || $scope.myinfoPrefs === null){
            $scope.showprefs = false;
        }else{
            $scope.showprefs = true;
        };
    }]);
})();