angular.module("meanGames").controller("GamesController", GamesController);

function GamesController(GamesFactory) {
    const vm = this;
    vm.title = "MEAN Games";
    GamesFactory.getAllGames().then(outputGame);

    function outputGame(response){  
        vm.games = response;
    }   



    // the below function addGame is from the form game-list.html:
   vm.addGame=function(){


    //new game from the form
    const newGame={
        //vm.newGameTitle,.this is what is in the ng-model of the form
        title:vm.newGameTitle,
        price:vm.newGamePrice,
        rate:vm.newGameRating,
        year:vm.newGameYear,
        minPlayers:vm.newGameMinPlayers,
        maxPlayers:vm.newGameMaxPlayers,
        minAge:vm.newGameMinAge,
        designers:vm.newGameDesigner
    };

    if(vm.gameForm.$valid){
        //calling back end to add the game hence call the factory
        GamesFactory.addOneGame(newGame)
        .then((game) => res.status(201).json(game))
        .catch((err) => res.status(500).json(err));
    }
    }
}