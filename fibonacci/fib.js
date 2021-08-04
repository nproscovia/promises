const fibonaci = function(num){
    if(num <= 0)
        return 0;
    if(num <=2)
        return 1;
    return fibonaci(num-1) + fibonaci(num-2);
};

   const fibPromise= function(num){
   return new Promise((resolve, reject)=>{
       console.log("start function");
       if(num>0){
           resolve(fibonaci(num));
       }else{
           reject("number is not fibonaci");
       }
       console.log("end function");
   });
   }
   
   console.log("start");
   fibPromise(10).then(response =>{
       console.log(response);
   }).catch(err =>{
       console.log(err);
   });
   
   console.log("End");