/**
 * Created by yannickbenchimol on 31/08/2016.
 */
qcmApp.controller("adminController", function($scope,$http, Upload) {
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

    vm.upload = function (file) {
        Upload.upload({
            url: 'upload/url',
            data: {file: file, 'username': vm.username}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
    $http.get('/api')
        .success(function (req) {
            vm.questions = req;
            console.log(vm.questions)
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

    // TODO: add choices img download in db
    // TODO: add correction in front & db


});
