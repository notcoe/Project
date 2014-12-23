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


.controller('adminCtrl', function($scope,$http,socketIO){
  
  $scope.persons = [];
  $scope.selectedModel = {};
  refreshPersons();

  function refreshPersons(){
    $http.get('api/std').success(function(data){  //call data from database
           $scope.persons = data;
    })
  }


  socketIO.on('std:refresh',function(){
           refreshPersons();
      });

  $scope.submit = function(){
        
        $http.post('api/std',{     //keep data in database
          rfid : $scope.rfid,
          id : $scope.id,
          name : $scope.name         
        })

         .success(function(data){  
             console.log("seccess");
         })

 };

 $scope.idSearch = "";
 $scope.personInstance = {};
 $scope.person_searchAll = [];
 $scope.ID_search = {};

  $scope.ID_searching = function (){

    $http.post('/api/getByID',$scope.ID_search).success(function(data){
      $scope.person_searchAll = data;     
      console.log(data);
    })
  }

$scope.edit = function(){
    $http.post('/api/edit', $scope.selectedModel).success(function(data){
      $scope.selectedModel = {};
    });
  }

})