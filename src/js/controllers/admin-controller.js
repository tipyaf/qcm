/**
 * Created by yannickbenchimol on 31/08/2016.
 */
qcmApp.controller("adminController", function($scope, $http, $location, Upload) {
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

    vm.upload = function (file) {
        Upload.upload({
            url: 'http://localhost:3000/upload',
            data: {file: file, 'username': vm.username}
        })
        // Upload.http({
        //     url: '/api',
        //     headers : {
        //         'Content-Type': file.type
        //     },
        //     data: file
        // })
            .then(function (res) {
            console.log('Success ' + res.config.data.file.name + 'uploaded. Response: ' + res.data);
            console.log(Upload)
        }, function (res) {
            console.log('Error status: ' + res.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
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
            .error(function (err) {
                console.log('erreur  de post', err);

            });
    };

    // TODO: add choices img upload in db
    // TODO: add correction upload in front & db


});
