# CPSC473-Assignment7



1. Download and Navigate to the directory where server.js and package.json is present (Files in this repo)
2. Open terminal and type following command
`npm install`
3. Once all the dependencies are downloaded. In the same terminal type following command
	`node server.js` or  `nodemon server.js`
4. Open another Terminal. Now download and Install MongoDB from https://www.mongodb.org/
5. Once installed in the same terminal type following commands
`mkdir -p ./mongodb/data`
and then `./mongodb/bin/mongod --dbpath=$HOME/mongodb/data`
[The path is relative to your machine specific folders]
6. By this step you should have

node server.js or  nodemon server.js running is first Terminal.
mongodb running in another Terminal.

7. Open any browser visit http://localhost:3000/links  You should see something like below

	[ ]
8. Let us post Data. This is can be done either by using Postman (https://www.getpostman.com/) or using cURL.

Either follow steps 9 and 10 or 11 and 12.

9. Using cURL. 
	If you are using Linux then just type following command 
		 `curl --silent --request POST  --header 'Content-Type: application/json' --data '{ "title" : "Google US", "link" : "https://www.google.com/" }' 'http://localhost:3000/links' | python -m json.tool`

[Now you can post multiple entries; just replace "Google US"  with title of your choice and replace "https://www.google.com/" with link of your choice. Remember to include quotes.]

Hit enter each time you post.

10. Visit the browser [http://localhost:3000/links] you should see the data that was posted via cURL.  You will not see _id and __v because they are hidden. [_id and _v are parameters supplied by default from Mongo]



11. Using Postman. 
	Once you have downloaded Postman. Open Postman. Now you will see “Enter request URL” replace that with http://localhost:3000/links
	From the drop down menu select POST 
	Below that you can see Authorization, Headers, Body and others.
	Select Body.
		The select raw  then JSON (application/json) from dropdown menu at the far right (written in orange text color)
	Post the following code in the text box
		{ "title" : "Google US",
"link" : "https://www.google.com" }

[Note- please discard spaces and tabs if any!]

**Hit Send [The blue button on far right]**

12. Visit the browser [http://localhost:3000/links] you should see the data that was posted via cURL.  You will not see _id and __v because they are hidden. [_id and _v are parameters supplied by default from Mongo]

**[Counter for clicks in set to zero by default even if not include in post request.]**

13. Now that we have the links.
	Visit  http://localhost:3000/click/Google US [you will be redirected to google.com]

14. Click on back arrow in the browser. You will now see the counter of clicks incremented by 4 of the link only. Rest other are still set to zero.


[Alternatively to check whether the entries are present in db or not 
open a Terminal type mongo
You should see a mongo shell. Type 
`show dbs` then
`use mydb` then
`db.links.find()`]

 

