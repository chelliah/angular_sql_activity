/**
 * Created by aronthomas on 11/16/15.
 */
myApp.controller("AddressController", ['$scope', '$http', function($scope, $http){
    $scope.users = [];
    $scope.activeName = null;
    $scope.addresses = [];

    $scope.getNames = function(){
        $http.get('/address/names').then(function(response){
            console.log('hi from address');
            console.log(response);
            $scope.users = response.data;
        });
    };


    $scope.getData = function(){
        console.log($scope.activeName);
        $http.get('/address/addresses', {params: $scope.activeName}).then(function(response){
           console.log(response);
            $scope.addresses = response.data;
        });
    };

    $scope.getNames();
}]);