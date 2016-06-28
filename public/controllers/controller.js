var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


	var refresh = function (name) {
        name = name||"igal"
	    $http.get('/extendedContactList/contactlist/'+name).success(function (response){
	    	console.log('i got the data i requasted');
	    	$scope.contactlist = response;
	    	$scope.contact = "";
	    });
	};
    refresh();




    $scope.addContact = function (){
    	console.log($scope.contact);
    	$http.post('/contactlist',$scope.contact).success(function (response){
    		console.log(response);
    		refresh();

    	});

    };

    $scope.remove = function (id){
    	console.log(id);
    	$http.delete('/contactlist/'+ id).success(function (response) {
    		console.log(response);
    		refresh();
    	});
    };

    $scope.edit = function (id){
    	console.log(id);
    	$http.get('/contactlist/'+id).success(function (response){
    		$scope.contact = response;
    		//refresh();

    	});
    };

    $scope.update = function (){
    	console.log($scope.contact._id);
    	$http.put('/contactlist/' + $scope.contact._id , $scope.contact).success(function (response){
    		refresh();

    	});

    };

    $scope.deselect = function (){
    	$scope.contact = "";

    };

    $scope.searchUser = function (){
        console.log($scope.user.name);
        console.log($scope.user.email);
        $http.post('/extendedContactList/login',$scope.user).success(function (response){
            if(response){
            console.log(response.name +" and " + response.email+ " and " + response._id);
            //$scope.$apply(function() { $location.path("/index.html"); });
            refresh(response.name);
            }
            else{
                alert("failed");
            }

        });
    };

    $scope.regUser = function (){
            console.log($scope.user.name);
            console.log($scope.user.email);
            $http.post('/extendedContactList/users',$scope.user)
        };


}]); 