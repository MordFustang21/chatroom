var app = angular.module('chatroom');

app.controller('mainCtrl', function ($scope, $mdToast, parseService) {
    //In your controller you'll have a getParseData function and a postData function, but should be placed on $scope.

    //The getParseData function will call the getData method on the parseService object. You'll then save the result of that request to
    //your controllers $scope as messages ($scope.messages)
    var getParseData = function () {
        parseService.getData().then(function (results) {
            $scope.messages = results;
        });
    };

    getParseData();

    //The postData function will take whatever the user typed in (hint: look at the html and see what ng-model correlates to on the input box),
    //pass that text to the postData method on the parseService object which will then post it to the parse backend.
    $scope.postData = function () {
        parseService.postData($scope.message)
            .then(function (result) {
                $scope.message = '';
                $scope.showSimpleToast();
                getParseData();
            });
    };

    $scope.toastPosition = {
        bottom: true,
        top: false,
        left: true,
        right: false
    };

    $scope.getToastPosition = function() {
        return Object.keys($scope.toastPosition)
            .filter(function (pos) {
                return $scope.toastPosition[pos];
            })
            .join(' ');
    };

    $scope.showSimpleToast = function () {
        $mdToast.show(
            $mdToast.simple()
                .content('Message Sent!')
                .position($scope.getToastPosition())
                .hideDelay(5000)
        );
    };

    //uncomment this code when your getParseData function is finished
    //This goes and gets new data every second, which mimicking a chat room experience.
    setInterval(function () {
        getParseData();
    }, 10000)
});
