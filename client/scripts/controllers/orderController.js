/**
 * Created by aronthomas on 11/16/15.
 */
myApp.controller("OrderController", ['$scope', '$http', function($scope, $http){
    $scope.users = [];
    $scope.activeName = null;
    $scope.startDate = null;
    $scope.endDate = null;
    $scope.orders = [];
    //$scope.addresses = [];

    $scope.getNames = function(){
        $http.get('/address/names').then(function(response){
            console.log('hi from address');
            console.log(response);
            $scope.users = response.data;
        });
    };


    $scope.getData = function(){
        if($scope.activeName && $scope.startDate && $scope.endDate){
            $scope.activeName.startDate=$scope.startDate;
            $scope.activeName.endDate=$scope.endDate;
            console.log($scope.activeName);
            $http.get('/address/order', {params: $scope.activeName}).then(function(response){
                console.log(response);
                $scope.orders = response.data;
            });
        }
    };

    $scope.getNames();
}]);