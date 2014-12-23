angular.module('google-chart-example', ['googlechart'])
.controller("MainCtrl", function ($scope,$http) {
     $scope.persons = [];
    var chart1 = {};
    chart1.type = "AreaChart";
    chart1.displayed = true;

      $http.get('/api/findsavetime').success(function(data){
       
        $scope.persons = data;
          chart1.data = {"cols": [
      {
        "id": "date",
        "label": "Date",
        "type": "string",
        "p": {}
      },
      {
        "id": "1",
        "label": "Wor",
        "type": "number",
        "p": {}
      },
      {
        "id": "2",
        "label": "Patty",
        "type": "number",
        "p": {}
      }
    ],"rows": [
      {
        "c": [
          {
            "v": "22/12/2014"
          },
          {
            "v": searchTime("22/12/2014","Worakrit Soontornthamniti"),
            "f": getTime("22/12/2014","Worakrit Soontornthamniti")
          },
          {
            "v": searchTime("22/12/2014","Pattranit Musikaprayoon"),
            "f": getTime("22/12/2014","Pattranit Musikaprayoon")
          }
        ]
      },
      {
        "c": [
          {
            "v": "23/12/2014"
          },
          {
            "v": searchTime("23/12/2014","Worakrit Soontornthamniti"),
            "f": getTime("23/12/2014","Worakrit Soontornthamniti")
          },
          {
            "v": searchTime("23/12/2014","Pattranit Musikaprayoon"),
            "f": getTime("23/12/2014","Pattranit Musikaprayoon")
          }
        ]
      },
      {
        "c": [
          {
            "v": "24/12/2014"
          },
          {
            "v": searchTime("24/12/2014","Worakrit Soontornthamniti"),
            "f": getTime("24/12/2014","Worakrit Soontornthamniti")          },
          {
            "v": searchTime("24/12/2014","Pattranit Musikaprayoon"),
            "f": getTime("24/12/2014","Pattranit Musikaprayoon")
          }
        ]
      }
    ]};
    function searchTime(date,name){
        for(var i = 0; i < data.length; i++){
            if(data[i].DATE == date && data[i].NAME == name){
                var time = data[i].TIME.HOUR+ (data[i].TIME.MINUTE/60)  ;
                console.log(time);
                return time;
            }
        }
    }
    function getTime(date,name){
        for(var i = 0; i < data.length; i++){
            if(data[i].DATE == date && data[i].NAME == name){
                var time = data[i].TIME.HOUR+":"+data[i].TIME.MINUTE ;
                console.log(time);
                return time;
            }
        }
    }
      });


    chart1.options = {
    "fill": 20,
    "displayExactValues": true,
    "vAxis": {
      "title": "Time",
      "gridlines": {
        "count": 4
      }
    },
    "hAxis": {
      "title": "Date"
    }
  };

    

    chart1.formatters = {};

    $scope.chart = chart1;
   
})

.controller('staticCtrl', function($scope,$http){
  $scope.persons = [];

  $http.get('/api/findsavetime').success(function(data){
    $scope.persons = data;
  })

  console.log($scope.persons);  
});
