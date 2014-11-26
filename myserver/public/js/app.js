angular.module("myApp",['btford.socket-io'])
.factory('socketIO',function(socketFactory){
  return socketFactory({
    ioSocket: io.connect("http://localhost:3000")
  });

})
.controller('mainCtrl', function($scope,$http,socketIO){
	$scope.books = [];
  $scope.bookInstance = {};
  $scope.std = {};

  refleshBooks();

function refleshBooks(){    
  	$http.get('/api/show').success(function(data){
  		$scope.std = data;
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
});