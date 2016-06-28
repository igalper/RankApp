var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);
var bodyParser = require('body-parser');
var db2 = mongojs('extendedContactList',['users']);




app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());



app.get('/extendedContactList/contactlist/:name',function (req,res){
	var name2 = req.params.name
	console.log('I resived a GET requast and '+name2);
	db2.users.find({name: name2},function (err,docs){
		console.log(docs);
		res.json(docs.contactlist);

	});

});

app.post('/contactlist', function (req,res){
	console.log(req.body);
	db.contactlist.insert(req.body, function (err,doc){
		res.json(doc);

	});
});

app.post('/extendedContactList/login', function (req,res){
	console.log(req.body.email);
	db2.users.findOne({name: req.body.name},function (err,doc){
		//console.log(res);
		res.json(doc);
	});
});

app.post('/extendedContactList/users', function (req,res){
	console.log("register->")
	console.log(req.body.email);
	db2.users.insert(req.body, function (err,doc){
		res.json(doc);
		});
	});
	//console.log(myResult);
	//res.json(myResult);

app.delete('/contactlist/:id',function (req,res){
	var id = req.params.id
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)},function (err,doc){
		res.json(doc);
	});

});

app.get('/contactlist/:id',function (req,res){
	var id = req.params.id
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)},function (err,doc){
		res.json(doc);
	});

});

app.put('/contactlist/:id',function (req,res){
	var id = req.params.id
	console.log(req.body.name);
	db.contactlist.findAndModify({
		query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name , email: req.body.email , number: req.body.number}},
		new: true},function (err,doc){
		res.json(doc);
	
	});

});

app.listen(3000);
console.log('the server running on port 3000' );