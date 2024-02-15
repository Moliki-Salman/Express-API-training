
function home(req, res){
res.send("Hello, Welcome");
}

function users(req, res){
res.send("this is the user page")
}

module.exports = { home, users }