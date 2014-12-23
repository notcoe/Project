angular.module("myApp",['btford.socket-io'])
.factory('socketIO',function(socketFactory){
  return socketFactory({
    ioSocket: io.connect("http://localhost:3000")
  });

})
.controller('mainCtrl', function($scope,$http,socketIO){
	 $scope.books = [];
  $scope.bookInstance = {};
  $scope.std = [];

  refleshBooks();

function refleshBooks(){    
  	$http.get('/api/savetime').success(function(data){
  		$scope.std = data;
      console.log(data);
  	})
}
  $scope.save =function(){
    $http.post('/api/book',$scope.bookInstance).success(function(data){
      $scope.books.push(data);
      $scope.bookInstance={};
    });
  }

  socketIO.on('book:reflesh',function(){
    refleshBooks();
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
    $http.get('/api/savetime').success(function(data){
      $scope.std = data;
      console.log(data);
    })}

  $scope.filterDate = function(){
    $scope.formatDate=$scope.date.getDate()+"/"+($scope.date.getMonth()+1)+"/"+$scope.date.getFullYear();
    console.log($scope.formatDate);
    $scope.customFilterDate = function (data) {
        if (data.date == $scope.formatDate) {
          return true;
        } 
        else {
          return false;
        }
      };  
    };


    $scope.filterOptions = {
    stores: [
      {id : 2, name : 'Show All'},
      {id : 3, name : 'War'},
      {id : 4, name : 'Patty'},
      {id : 5, name : 'Not'},
    ]
  };
  //Mapped to the model to filter
  $scope.filterItem = {
    store: $scope.filterOptions.stores[0]
  }
   $scope.customFilter = function (data) {
    if (data.name == $scope.filterItem.store.name) {
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