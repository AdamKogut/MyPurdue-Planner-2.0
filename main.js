(function(){
    var config = {
        apiKey: "AIzaSyACQ09Ye9rZSZ7-50X5jZdtZKr8uKLsoQk",
        authDomain: "hello-world-e96ef.firebaseapp.com",
        databaseURL: "https://hello-world-e96ef.firebaseio.com",
        storageBucket: "hello-world-e96ef.appspot.com",
        messagingSenderId: "4015367255"
    };
    
    var app = angular.module("myPurduePlanner", ["firebase"]);
    app.config(function() {
        firebase.initializeApp(config);
    });
    
    app.controller("AuthenticationController", ["$scope", "$firebaseAuth", "$firebaseArray", "$firebaseObject", "$window", function($scope, $firebaseAuth, $firebaseArray, $firebaseObject, $window){
        $scope.authenticated = false;
        $window.loading_screen = $window.pleaseWait({
            logo: "logo.png",
            backgroundColor: '#FFFFFF',
            loadingHtml: '<p class = "loading-message">Please wait for all classes to load.</p><div class="sk-three-bounce"><div class="sk-child sk-bounce1"></div><div class="sk-child sk-bounce2"></div><div class="sk-child sk-bounce3"></div></div>'
        });
    
        $scope.auth = $firebaseAuth();
        this.init = function(){
          $scope.auth.$onAuthStateChanged(
            function(user) {
              if (user) {
                $scope.email = user.email;
                $scope.authenticated = true;
                var subjectsRef = firebase.database().ref().child("Courses");
                $scope.courseObject = $firebaseArray(subjectsRef);
                $scope.tab = "semester1";
                $scope.workspace = [];
                $scope.semester1 = [];
                $scope.semester2 = [];
                $scope.semester3 = [];
                $scope.semester4 = [];
                $scope.semester5 = [];
                $scope.semester6 = [];
                $scope.semester7 = [];
                $scope.semester8 = [];
                $scope.s1Credits = 0;
                $scope.s2Credits = 0;
                $scope.s3Credits = 0;
                $scope.s4Credits = 0;
                $scope.s5Credits = 0;
                $scope.s6Credits = 0;
                $scope.s7Credits = 0;
                $scope.s8Credits = 0;
                $scope.totalCredits = 0;
                
                $scope.userRef = firebase.database().ref().child("Users").child(user.uid);
                $scope.user = $firebaseObject($scope.userRef);
                $scope.user.$loaded().then(function(){
                    if ($scope.user){
                        console.log($scope.user);
                        if ($scope.user.workspace){
                            $scope.workspace = $scope.user.workspace;
                        }
                        if ($scope.user.semester1){
                            $scope.semester1 = $scope.user.semester1;
                        }
                        if ($scope.user.semester2){
                            $scope.semester2 = $scope.user.semester2;
                        }
                        if ($scope.user.semester3){
                            $scope.semester3 = $scope.user.semester3;
                        }
                        if ($scope.user.semester4){
                            $scope.semester4 = $scope.user.semester4;
                        }
                        if ($scope.user.semester5){
                            $scope.semester5 = $scope.user.semester5;
                        }
                        if ($scope.user.semester6){
                            $scope.semester6 = $scope.user.semester6;
                        }
                        if ($scope.user.semester7){
                            $scope.semester7 = $scope.user.semester7;
                        }
                        if ($scope.user.semester8){
                            $scope.semester8 = $scope.user.semester8;
                        }
                        if ($scope.s1Credits){
                            $scope.s1Credits = $scope.user.s1Credits;
                        }
                        if ($scope.s2Credits){
                            $scope.s2Credits = $scope.user.s2Credits;
                        }
                        if ($scope.s3Credits){
                            $scope.s3Credits = $scope.user.s3Credits;
                        }
                        if ($scope.s4Credits){
                            $scope.s4Credits = $scope.user.s4Credits;
                        }
                        if ($scope.s5Credits){
                            $scope.s5Credits = $scope.user.s5Credits;
                        }
                        if ($scope.s6Credits){
                            $scope.s6Credits = $scope.user.s6Credits;
                        }
                        if ($scope.s7Credits){
                            $scope.s7Credits = $scope.user.s7Credits;
                        }
                        if ($scope.s8Credits){
                            $scope.s8Credits = $scope.user.s8Credits;
                        }
                        if ($scope.totalCredits){
                            $scope.totalCredits = $scope.user.totalCredits;
                        }
                    } else {
                        $scope.userRef.update({
                           "workspace" : $scope.workspace,
                           "semester1" : $scope.semester1,
                           "semester2" : $scope.semester2,
                           "semester3" : $scope.semester3,
                           "semester4" : $scope.semester4,
                           "semester5" : $scope.semester5,
                           "semester6" : $scope.semester6,
                           "semester7" : $scope.semester7,
                           "semester8" : $scope.semester8,
                           "s1Credits" : $scope.s1Credits,
                           "s2Credits" : $scope.s2Credits,
                           "s3Credits" : $scope.s3Credits,
                           "s4Credits" : $scope.s4Credits,
                           "s5Credits" : $scope.s5Credits,
                           "s6Credits" : $scope.s6Credits,
                           "s7Credits" : $scope.s7Credits,
                           "s8Credits" : $scope.s8Credits,
                           "totalCredits" : $scope.totalCredits
                        });
                    }
                });
                
                
                $scope.courseObject.$loaded().then(function(){
                   $scope.user.$loaded().then(function(){
                      $window.loading_screen.finish(); 
                   }); 
                });
                
              } else {
                $scope.authenticated = false;
                $window.location.replace("signInPage.html");
              }
            }
          );
        }
    
        this.logout = function(){
          $scope.auth.$signOut();
        }
    }]);
    
    app.controller("coursePopulator", ["$scope", "$firebaseArray", function($scope, $firebaseArray){
        $scope.$watch("authenticated", function(){
            if ($scope.authenticated){
                
                $scope.workspaceIncludes = function(course){
                    for (var i = 0; i < $scope.workspace.length; i++){
                        if ($scope.workspace[i].CourseId == course.CourseId && $scope.workspace[i].Number == course.Number){
                            return true;
                        }
                    }  
                    return false;
                }
                
                $scope.user.$loaded().then(function(){
                    $scope.$watch("workspace", function(){
                        $scope.userRef.update({
                           "workspace" : angular.copy($scope.workspace),
                           "semester1" : angular.copy($scope.semester1),
                           "semester2" : angular.copy($scope.semester2),
                           "semester3" : angular.copy($scope.semester3),
                           "semester4" : angular.copy($scope.semester4),
                           "semester5" : angular.copy($scope.semester5),
                           "semester6" : angular.copy($scope.semester6),
                           "semester7" : angular.copy($scope.semester7),
                           "semester8" : angular.copy($scope.semester8),
                           "s1Credits" : angular.copy($scope.s1Credits),
                           "s2Credits" : angular.copy($scope.s2Credits),
                           "s3Credits" : angular.copy($scope.s3Credits),
                           "s4Credits" : angular.copy($scope.s4Credits),
                           "s5Credits" : $scope.s5Credits,
                           "s6Credits" : $scope.s6Credits,
                           "s7Credits" : $scope.s7Credits,
                           "s8Credits" : $scope.s8Credits,
                           "totalCredits" : $scope.totalCredits
                        });
                    }, true);
                });
                
                var workspaceIndexOf = function(course){
                    console.log(course);
                    for (var i = 0; i < $scope.workspace.length; i++){
                        if ($scope.workspace[i].courseId == course.courseId && $scope.workspace[i].Number == course.Number){
                            return i;
                        }
                    }
                    return -1;
                }
                
                $scope.addCoursetoWorkspace = function(course){
                    if (workspaceIndexOf(course) != -1){
                        $scope.workspace.splice(workspaceIndexOf(course), 1);
                    } else {
                        $scope.workspace.push(course);
                    }
                }
                
                var semesterIndexOf = function(semester, course){
                    for (var i = 0; i < semester.length; i++){
                        if (semester[i].CourseId == course.CourseId && semester[i].Number == course.Number){
                            return i;
                        }
                    }
                    return -1;
                }
                
                $scope.transferToWorkspace = function(course){
                    $scope.workspace.push(course);
                    if ($scope.tab == ("semester1")){
                        $scope.s1Credits -= course.CreditHours;
                        $scope.semester1.splice(semesterIndexOf($scope.semester1, course), 1);
                    }
                    if ($scope.tab == ("semester2")){
                        $scope.s2Credits -= course.CreditHours;
                        $scope.semester2.splice(semesterIndexOf($scope.semester2, course), 1);
                    }
                    if ($scope.tab == ("semester3")){
                        $scope.s3Credits -= course.CreditHours;
                        $scope.semester3.splice(semesterIndexOf($scope.semester3, course), 1);
                    }
                    if ($scope.tab == ("semester4")){
                        $scope.s4Credits -= course.CreditHours;
                        $scope.semester4.splice(semesterIndexOf($scope.semester4, course), 1);
                    }
                    if ($scope.tab == ("semester5")){
                        $scope.s5Credits -= course.CreditHours;
                        $scope.semester5.splice(semesterIndexOf($scope.semester5, course), 1);
                    }
                    if ($scope.tab == ("semester6")){
                        $scope.s6Credits -= course.CreditHours;
                        $scope.semester6.splice(semesterIndexOf($scope.semester6, course), 1);
                    }
                    if ($scope.tab == ("semester7")){
                        $scope.s7Credits -= course.CreditHours;
                        $scope.semester7.splice(semesterIndexOf($scope.semester7, course), 1);
                    }
                    if ($scope.tab == ("semester8")){
                        $scope.s8Credits -= course.CreditHours;
                        $scope.semester8.splice(semesterIndexOf($scope.semester8, course), 1);
                    }
                    $scope.totalCredits -= course.CreditHours;
                }
                
                $scope.transferCourse = function(course){
                    console.log(course);
                    if ($scope.tab == ("semester1")){
                        $scope.semester1.push(course);
                        $scope.s1Credits += course.CreditHours;
                    }
                    if ($scope.tab == ("semester2")){
                        $scope.semester2.push(course);
                        $scope.s2Credits += course.CreditHours;
                    }
                    if ($scope.tab == ("semester3")){
                        $scope.semester3.push(course);
                        $scope.s3Credits += course.CreditHours;
                    }
                    if ($scope.tab == ("semester4")){
                        $scope.semester4.push(course);
                        $scope.s4Credits += course.CreditHours;
                    }
                    if ($scope.tab == ("semester5")){
                        $scope.semester5.push(course);
                        $scope.s5Credits += course.CreditHours;
                    }
                    if ($scope.tab == ("semester6")){
                        $scope.semester6.push(course);
                        $scope.s6Credits += course.CreditHours;
                    }
                    if ($scope.tab == ("semester7")){
                        $scope.semester7.push(course);
                        $scope.s7Credits += course.CreditHours;
                    }
                    if ($scope.tab == ("semester8")){
                        $scope.semester8.push(course);
                        $scope.s8Credits += course.CreditHours;
                    }
                    $scope.totalCredits += course.CreditHours;
                    $scope.addCoursetoWorkspace(course);
                }
            }
        });
    }]);
    
    
    
})();

