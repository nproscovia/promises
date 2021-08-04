
//RegisterController is the same as what is used in the app.js for the registration link.
angular.module("meanGames").controller("RegisterController", registerController);

function registerController(){
   
    const vm = this;
    //this function is from the form line 13.
    vm.register = function () {
        if(!vm.username || !vm.password || !vm.passwordRepeat || !vm.name) {
            vm.err = "Please fill all the fields"
        } else {
            if(vm.password !== vm.passwordRepeat) {
                vm.err = "the passwords must match"
                //if passwords match, then register.
            } else {
                const newUser = {
                    username: vm.username,
                    password: vm.password,
                    name: vm.name
                }
               
                UsersDataFactory.register(newUser)
                                .then(success)
                                .catch(failure);
                
            }
        }
        
    }

    function success(){
        vm.success = "registartion successful"
    }

    function failure(){
        console.log("failure registration")
    }
}