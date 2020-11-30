const { data } = require("jquery");
var mongojs = require("mongojs")

//var _database = mongojs('localhost:27017/dodge', ['account'])
var _database = mongojs("mongodb+srv://testUser:testPassword@cluster0.euqmf.mongodb.net/<dodge>?retryWrites=true&w=majority", ['account'])

Database = {}

Database.correctPass = function(data,callback){
	_database.account.findOne({username:data.Usr,password:data.Pas},function(err,res){
        if (err) throw err
        if(res)
			callback(true)
		else
			callback(false)
	});
}

Database.takenUser = function(data, callback){
    _database.account.findOne({username:data.Usr},function(err,res){
        if (err) throw err
        if(res)
			callback(true)
		else
			callback(false)
	});
}

Database.addUser = function(data, callback) {
	_database.account.insert({username:data.Usr,password:data.Pas},function(err){
        if (err) throw err
        callback()
	})
	_database.wins.insert({username:data.Usr,wins:0})
}

Database.deleteUser = function(data, callback) {
    _database.account.remove({username:data.Usr, password:data.Pas}, function(err, res){
		if (err) throw err
		if (res)
			callback(true)
		else
			callback(false)
		})
	_database.wins.remove({username:data.Usr})
}

Database.updateWins = function(data, callback) {
	_database.wins.findOne({username:data}, function(err, res){
		_database.wins.update({username:data}, { $set: {wins: res.wins+1} }, {upsert:true},callback())
	})

}

Database.getWins = function(data, callback) {
	_database.wins.findOne({username:data}, function(err, res){
		callback(res.wins)
	})
}