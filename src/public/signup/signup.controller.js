(function(){
    'use strict';

    angular.module('public')
        //.constant('APIBasePath', 'https://coursera-jhu-default-rtdb.firebaseio.com/')
        .controller('SignupController', ['$scope', '$http', 'MenuService',
        function($scope, $http, MenuService)
    {
        $scope.user = {};
        $scope.errorMessage = '';
        $scope.submitForm = function(isValid){
            console.log('in submit form in controller');

            if(isValid){
                const input = $scope.user.menuShortNameFav;
                const match = input.match(/^([a-zA-Z]+)(\d)$/);
                var short_name;
                var menu_num;
                if(match){
                    short_name = match[1];
                    menu_num = match[2];
                } else{
                    throw new Error("The input string does not match the expected format.");
                };
                $scope.errorMessage = 'Valid Message: ' + short_name + " # " + menu_num;
                var url = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/" + short_name + "/menu_items/" + menu_num + ".json";
                console.log(window.location.pathname)
                $scope.fav_img_url = "http://" + window.location.host + "/" + window.location.pathname + "/images/menu/" + short_name + "/" + input + ".jpg";
                console.log(url);
                $scope.menu_num = menu_num;
                $http.get(url)
                    .then(function(response){
                        if(response.status === 200 && response.data){
                            const preferences = {
                                firstName: $scope.user.firstName,
                                lastName: $scope.user.lastName,
                                email: $scope.user.email,
                                phone: $scope.user.phone,
                                fav_title: response.data["name"],
                                fav_description: response.data["description"],
                                fav_img_url: $scope.fav_img_url
                            };
                            MenuService.saveSignupPref(preferences);
                            $scope.responseData = "Your information has been saved.";
                            $scope.errorMessage = '';
                        } else{
                            $scope.errorMessage = 'No such menu item exists.';
                            $scope.responseData = '';
                        };
                    })
                    .catch(function(error){
                        $scope.errorMessage = 'No such menu item exists.';
                        $scope.responseData = '';
                    });
            } else {
                $scope.errorMessage = 'Please fill the form correctly.';
            };
        };
    }]);
})()