angular.module("myApp",['btford.socket-io'])
.factory('socketIO',function(socketFactory){
  return socketFactory({
    ioSocket: io.connect("http://localhost:3000")
  });

})

.controller('adminCtrl', function($scope,$http){
  $scope.persons = [];

  $http.get('/api/std').success(function(data){
  $scope.persons = data;
  })
})

.controller('DropdownCtrl', function($scope, $log,$http) {
    $scope.std = [];
    $scope.date = new Date();
    $scope.formatDate={};
    refleshBooks();
  
 
  function refleshBooks(){    
    $http.get('/api/findsavetime').success(function(data){
      $scope.std = data;
      console.log(data);
    })}

  $scope.filterDate = function(){
    $scope.formatDate=$scope.date.getDate()+"/"+($scope.date.getMonth()+1)+"/"+$scope.date.getFullYear();
    console.log($scope.formatDate);
    $scope.customFilterDate = function (data) {
        if (data.DATE == $scope.formatDate) {
          return true;
        } 
        else {
          return false;
        }
      };  
    };


    $scope.filterOptions = {
    stores: [
      {name : 'Show All'},
      {name : '5510110604'},
      {name : '5510110245'},
      {name : '5510110331'},
    ]
  };
  //Mapped to the model to filter
  $scope.filterItem = {
    store: $scope.filterOptions.stores[0]
  }
   $scope.customFilter = function (data) {
    if (data.ID == $scope.filterItem.store.name) {
      return true;
    } 

    else if ($scope.filterItem.store.name == 'Show All') {
      return true;
    } 

    else {
      return false;
    }
  };  
  
});