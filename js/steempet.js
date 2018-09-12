const app = new Vue({
    el: '#app-steempet',
    data: {
      account: {},
      validAccount: false,
      postingPubKey: '',
      editing: false,
      pets: [],
    },
    mounted: function () {
      steem.api.setOptions({url: 'https://api.steemit.com'});
      this.getUser();
    },
    methods: {
      modifypet: function () {},
      getUser: function () {
        query = getQuery();
        this.validAccount = false;

        if (query.p) {
          steem.api.getAccounts([query.p], function (err, result) {
            if (err || !result || result.length == 0) {
              console.log(err, result);
            } else {
              console.log(err, result);
              app.account = result[0];
              app.validAccount = true;
              var json_metadata = (app.account.json_metadata && app.account.json_metadata != '') ? JSON.parse(app.account.json_metadata) : {};

              if (json_metadata.pets && json_metadata.pets.length > 0) {
                if (query.key) {
                  if (json_metadata.pets[0].email)
                    json_metadata.pets[0].email = CryptoJS.AES.decrypt(json_metadata.pets[0].email, query.key).toString(CryptoJS.enc.Utf8);
                  if (json_metadata.pets[0].address)
                    json_metadata.pets[0].address = CryptoJS.AES.decrypt(json_metadata.pets[0].address, query.key).toString(CryptoJS.enc.Utf8);
                  if (json_metadata.pets[0].phoneNumber)
                    json_metadata.pets[0].phoneNumber = CryptoJS.AES.decrypt(json_metadata.pets[0].phoneNumber, query.key).toString(CryptoJS.enc.Utf8);
                  if (json_metadata.pets[0].notes)
                    json_metadata.pets[0].notes = CryptoJS.AES.decrypt(json_metadata.pets[0].notes, query.key).toString(CryptoJS.enc.Utf8);
                }
                app.$refs.datapet.pet = json_metadata.pets[0];
              } else{
                console.log('refs');
                console.log(app.$refs);
                app.$refs.datapet.pet = {};
              }  

              if (app.$refs.datapet.pet.image && app.$refs.datapet.pet.image != '')
                app.$refs.datapet.imageExists = true;
              else
                app.$refs.datapet.imageExists = false;

              app.$refs.wif.checkWif()
            }
          });
        } else {
          console.log("There is no query");
        }
      }
    }
  });

var qrcode = new QRCode("qrcode");
