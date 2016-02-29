module.exports = app => {

    app.directive("chat", ['chatService', function(chatService){
        return {
            restrict: 'E',
            templateUrl: 'directives/chat/template.html',
            replace: true,
            scope: { id: '@', label: '@'},
            link: function($scope, element, attrs){

                $scope.onSendMessage = () => {
                    chatService.addMessage($scope.id, $scope.currentMessage, $scope.label);
                    $scope.currentMessage = '';
                };

                $scope.thread = chatService.getThread();

            }
        };
    }]);

};
