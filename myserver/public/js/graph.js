angular.module('google-chart-example', ['googlechart'])
.controller("MainCtrl", function ($scope,$http) {
    var persons = [];
    $http.get('/api/time').success(function(data){
        persons = data;

    })

    
    var chart1 = {};
    chart1.type = "AreaChart";
    chart1.displayed = true;
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
      },
      {
        "id": "3",
        "label": "Not",
        "type": "number",
        "p": {}
      }
    ],"rows": [
      {
        "c": [
          {
            "v": "24/11/2577"
          },
          {
            "v": 7
          },
          {
            "v": 8
          },
          {
            "v": 9
          }
        ]
      },
      {
        "c": [
          {
            "v": "25/11/2577"
          },
          {
            "v": 10
          },
          {
            "v": 9
          },
          {
            "v": 11
          }
        ]
      },
      {
        "c": [
          {
            "v": "26/11/2577"
          },
          {
            "v": 9
          },
          {
            "v": 10
          },
          {
            "v": 12
          }
        ]
      }
    ]};

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

    function searchTime(date,name){
        for(var i = 0; i < persons.length; i++){
            if(persons[i].date == date && persons[i].name == name){
                console.log(persons[i].time);
                return persons[i].time;
            }
        }
    }

    chart1.formatters = {};

    $scope.chart = chart1;
   
})

.controller('staticCtrl', function($scope,$http){
  $scope.persons = [];

  $http.get('/api/time').success(function(data){
    $scope.persons = data;
  })
});
