//javascript connect with server (index.js)

angular.module("myApp",['btford.socket-io'])
.factory('socketIO',function(socketFactory){
       return socketFactory({
              ioSocket: io.connect("http://localhost:3000")
       });
})

.controller('mainCtrl', function($scope,$http,$window,socketIO){
	$scope.books  = [];
  refreshBooks();

function refreshBooks(){
  	$http.get('api/book').success(function(data){  //call data from database
           $scope.books = data;
  	})
}

    socketIO.on('book:refresh',function(){
               refreshBooks();
      });
    
    $scope.submit = function(){
        $http.post('api/book',{     //keep data in database
          id : $scope.id,
          title : $scope.title,
          price : $scope.price
            
	    })
         .success(function(data){  
             console.log("seccess");
             $window.location.reload();
         })

    };


	
})