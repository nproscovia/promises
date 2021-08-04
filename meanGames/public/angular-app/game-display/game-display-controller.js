angular.module("meanGames").controller("GameController", GameController);



function GameController(GamesFactory, $routeParams, $route) {

    const vm = this;
    const gameId = $routeParams.id;
    GamesFactory.getOneGame(gameId).then(getGame);

       function getGame(response){
        vm.game = response.game;

       }
    

    vm.deleteOneGame = function(){
        GamesFactory.deleteOneGame(gameId).then(deletedGame);

    }
            
    function deletedGame(game){
            console.log("deleted game", game);
        
            $route.reload();
    
    }

}