const app = new Vue({
    el: '#app-steempet',
    data: {
      account: {},
      validAccount: false,
      postingPubKey: '',
      editing: false,
      pets: [],
    },
    methods: {
      modifypet: function () {}
    }
  });

function getUser() {
  query = getQuery();
  app.validAccount = false;
  if (query.p) {
    steem.api.getAccounts([query.p], function (err, result) {
      if (err || !result || result.length == 0) {
        console.log(err, result);
      }else{
        console.log(err, result);
        app.account = result[0];
        app.validAccount = true;
        var json_metadata = (app.account.json_metadata && app.account.json_metadata != '') ? JSON.parse(app.account.json_metadata) : {};
        
        app.$refs.wif.checkWif()
        if(json_metadata.pets && json_metadata.pets.length > 0) app.$refs.datapet.pet = json_metadata.pets[0];
        else app.$refs.datapet.pet = {};
        
        if(app.$refs.datapet.pet.image && app.$refs.datapet.pet.image != '') app.$refs.datapet.imageExists = true;
        else app.$refs.datapet.imageExists = false;
      }  
    });
  } else {
    console.log("There is no query");
  }
}

steem.api.setOptions({ url: 'https://api.steemit.com' });
var qrcode = new QRCode("qrcode");
getUser();

