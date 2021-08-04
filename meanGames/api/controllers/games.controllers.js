const mongoose = require("mongoose");
const Game = mongoose.model("Game");


module.exports.getallgames = function(req,res){

    console.log("getall games");
let count =5;
let offset = 0;

if(require.query && require.query.count){
    count = parseInt(req.query.count, 10);

}

if(req.query && req.query.offset){
    offset = parseInt(req.query.offset, 10);
}

if (isNaN(offset) || isNaN(count)) {
    res.status(400).json({ "message": "Querystring offset " });
    return;
}

Game.find().skip(offset).limit(count).exec()
            .then((game) => res.status(200).json(game) )
            .catch((err)=>returnError(err));
};


module.exports.getOneGame = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).exec()
        .then((game)=>returnGame(game, res))
        .catch((err) => res.status(500).json(err));
  };


  function returnGame(game, res) {
    const response = {
        status: 200,
        message: game
    }
    if (!game) {
        response.status = 404;
        response.message = { "message": "game not found" };
    }

    res.status(response.status).json(response.message);
}


module.exports.addOneGame = function (req, res) {
    
    const newGame = {
        title: req.body.title,
        year: parseInt(req.body.year),
        rate: parseInt(req.body.rate),
        price: parseFloat(req.body.price),
        minPlayers: parseInt(req.body.minPlayers),
        maxPlayers: parseInt(req.body.maxPlayers),
        minAge: parseInt(req.body.minAge),
        designers: [req.body.designers]
          
    };

    Game.create(newGame)
        .then((game) => res.status(201).json(game))
        .catch((err) => res.status(500).json(err));
    
}



module.exports.gamesFullUpdateOne = function (req, res) {
    console.log("gamesFullUpdateOne requiest recieved")
    const gameId = req.params.gameId;
    

    Game.findById(gameId).select("-reviews -publisher").exec()
        .then((game) =>updatingGame(game,req,res))
        .then((game) => res.status(204).json(game))
        .catch((err)=> res.status(500).json(err));
        
};
    function updatingGame(game, req, res){
        if(!game){
            response.status = 404;
            response.message = { statusMessage: "game not found" };
        }
       
        game. title= req.body.title;
        game.year= parseInt(req.body.year);
        game.rate= parseInt(req.body.rate);
        game.price= parseFloat(req.body.price);
        game.minPlayers= parseInt(req.body.minPlayers);
        game.maxPlayers= parseInt(req.body.maxPlayers);
        game.minAge= parseInt(req.body.minAge);
        game.designers= [req.body.designers];

          return game.save()  

            
        

    }



module.exports.gamesPartialUpdateOne = function (req, res) {
    console.log("gamesFullUpdateOne requiest recieved")
    const gameId = req.params.gameId;
    

    Game.findById(gameId).select("-reviews -publisher").exec() 
        .then((game)=>partialUpdate(game, req,res))
        .then((game) => res.status(204).json(game))
        .catch((err) => res.status(500).json(err));
        const response = {
            status: 204,
          
        };

        function partialUpdate(game, req, res){
           
            if (req.body.title) {
                game.title = req.body.title;
            }
            
            if (req.body.price) {
                game.price = parseFloat(req.body.price);
            }
             
            if (req.body.year) {
                game.year = parseInt(req.body.year);
            }

            if (req.body.minPlayers) {
                game.minPlayers = parseInt(req.body.minPlayers);
            }

            if (req.body.maxPlayers) {
                game.maxPlayers = parseInt(req.body.maxPlayers);
            }

            if (req.body.minAge) {
                game.minAge = parseInt(req.body.minAge);
            }

            if (req.body.rate) {
                game.rate = parseInt(req.body.rate);
            }

            if (req.body.designers) {
                game.designers = req.body.designers;
            }


            return game.save()


        }

    
};



module.exports.deleteOneGame = function (req, res) {
  
    const gameId = req.params.gameId;
    Game.findByIdAndDelete(gameId).exec() 
         .then((doc) => deletedGame(game, res))
         .catch((err) => res.status(500).json(err));
}
    function deletedGame(game,res){
      const response = {
        status: 200,
      }
     if (!game) {
       
        response.status = 404;
        response.message =  "Game ID not found" ;
      }
      res.status(response.status).json({message: "Delete successful"});
    }
  

