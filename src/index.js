const http = require("http");
const solve = require("./solver");

//create a server object:
http
  .createServer(function(req, res) {
    const solution = solve(5, 8);
    res.write(solution.toString()); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
