# mi133

How to execute the application:
(using the cmd)

step 1: clone this github project.

step 2: install mogodb

step 3: configure mongodb
   inside your mongodbs bin directory (ex: .../Mongodb/Server/3.6/bin) execute "mongod --replSet "rs" "
   
   if this is the first time starting the mongodb, use a seperate cmd inside the mongodb bin directory and execute                
   "mongo" and then 
   "rs.initiate()"
    
step 4: inside the project direcory, use "npm install" to install the dependencies

step 5: starting the application
start the express server using "node Server/server.js"
and start our webpack server using "npm start"
(if the mongodb is not already started, follow the instructions of step 3)

The application should now be available in the browser under "localhost:8080"
