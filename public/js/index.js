// local storage
var storage = window.localStorage;
storage.setItem(dbUser, req.dbUser);       
console.log(req.dbUser);
console.log( storage.getItem( dbUser ));