/**
 * Created by yannickbenchimol on 31/08/2016.
 */
qcmApp.controller("adminController", function($scope,$http, $timeout) {
    var vm = this;
    vm.newQuestion =
    {
        "label" : "",
        "title": "",
        "choices":
            [
                {
                    "id": 1,
                    "choice": "",
                    "media": {
                        "contentType": "",
                        "data": ""
                    },
                    "value": ""
                },
                {
                    "id": 2,
                    "choice": "",
                    "media": {
                        "contentType": "",
                        "data": ""
                    },
                    "value": ""
                },
                {
                    "id": 3,
                    "choice": "",
                    "media": {
                        "contentType": "",
                        "data": ""
                    },
                    "value": ""
                }
            ]
    };
    //init "bonne réponse" to false
    vm.newQuestion.choices[0].value,
    vm.newQuestion.choices[1].value,
    vm.newQuestion.choices[2].value = false;
    vm.addChoiceModel = [
        {
            name: "choiceOne",
            id: 1
        },
        {
            name: "choiceTwo",
            id: 2
        },
        {
            name: "choiceThree",
            id: 3
        }

    ];

    $scope.$on('$dropletReady', function whenDropletReady() {
        // Directive's interface is ready to be used..
        // .
        vm.interface.allowedExtensions([/.+/]);
    });
    $http.get('/api')
        .success(function (req) {
            vm.questions = req;
            // console.log(vm.questions)
        })
        .error(function (req) {
            console.log('json not find' +  req)
        });

    vm.addQuestion = function () {
        $http.post('/api', vm.newQuestion)
            .success(function (data) {
                vm.newQuestion = data;
                console.log(vm.newQuestion);
            })
            .error(function (data) {
                console.log('erreur  de post');

            });
    };

    // TODO: add choices img download in newQuestion  & db



});
