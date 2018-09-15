
const app = new Vue({
    el: '#app-steempet',
    data: {
      account: {name:''},
      validAccount: false,      
      validKey: false,
      hasPet: false,
      hasKey: false,      
      editing: false,
      newPet: false,
      pet: EMPTY_PET,
    },
    mounted: function () {
      steem.api.setOptions({
        url: 'https://api.steemit.com'
      });
      this.getUser();
    },
    methods: {
      toggleEdit: function(){
        this.editing = !this.editing;        
      },    
      toggleNew: function(){
        this.newPet = !this.newPet;
      },
      getUser: function () {
        query = getQuery();
        this.validAccount = false;
        
        if (query.p) {
          steem.api.getAccounts([query.p], function (err, result) {
            if (err || !result || result.length == 0) {
              console.log(err, result);
            } else {
              app.account = result[0];
              app.validAccount = true;
              app.title = "ya respondieron de steem";
              app.tit = true;
              var json_metadata = (app.account.json_metadata && app.account.json_metadata != '') ? JSON.parse(app.account.json_metadata) : {};
              
              if (json_metadata.pets && json_metadata.pets.length > 0) {
                app.hasPet = true;
                console.log('@'+app.account.name + " has pets");
                if (query.key) {
                  app.hasKey = true;
                  try {
                    if (json_metadata.pets[0].private.email)
                      json_metadata.pets[0].private.email = CryptoJS.AES.decrypt(json_metadata.pets[0].private.email, query.key).toString(CryptoJS.enc.Utf8);
                    if (json_metadata.pets[0].private.address)
                      json_metadata.pets[0].private.address = CryptoJS.AES.decrypt(json_metadata.pets[0].private.address, query.key).toString(CryptoJS.enc.Utf8);
                    if (json_metadata.pets[0].private.phoneNumber)
                      json_metadata.pets[0].private.phoneNumber = CryptoJS.AES.decrypt(json_metadata.pets[0].private.phoneNumber, query.key).toString(CryptoJS.enc.Utf8);
                    if (json_metadata.pets[0].private.notes)
                      json_metadata.pets[0].private.notes = CryptoJS.AES.decrypt(json_metadata.pets[0].private.notes, query.key).toString(CryptoJS.enc.Utf8);
                    app.validKey = true;
                    console.log("Successfull decrypt");
                  } catch(e) {
                    console.log("Incorrect key to decrypt the private data");
                    app.validKey = false;
                  }
                }else{
                  console.log("There is no key to decrypt the private data");
                  app.hasKey = false;
                }
                app.pet = json_metadata.pets[0];
                app.editing = false;
              } else {
                console.log('@'+app.account.name + " does not have pets");
                app.hasPet = false;
                app.pet = {public:{}, private:{}};
              }
            }
          });
        } else {
          console.log("There is no query");
        }
      }
    }
  });
