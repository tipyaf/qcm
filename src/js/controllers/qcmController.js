/**
 * Created by yannickbenchimol on 15/09/2016.
 */
qcmApp.controller("qcmController", function($scope, $http) {
    var vm = this;
    vm.nbQuestionInQcm = 5;
    $http.get('/api')
        .success(function (req) {
            vm.userQuestions = req;
            console.log(vm.userQuestions)
        })
        .error(function (req) {
            console.log('json not find' +  req)
        });

    vm.swiper = {};

    vm.nextQuestion = function(){
        vm.swiper.slideNext();
        console.log(vm.swiper.activeIndex)
    };
    vm.prevQuestion = function(){
        vm.swiper.slidePrev();
        console.log(vm.swiper.activeIndex)
};

// vm.swiper.swiperSlideOffset();
    vm.onReadySwiper = function(swiper) {
        console.log('onReadySwiper');
        swiper.on('slideChangeStart', function() {
            console.log('slideChangeStart');
        });
    };


            $scope.$on('finishLoad',function(){
                vm.swiper.update();
                console.log('update sliders');
            })

    // TODO: swiper issue: no slider move before resize window (url response : https://github.com/ksachdeva/angular-swiper )
    // TODO: refresh swiper.activeIndex on slide change without button
});
