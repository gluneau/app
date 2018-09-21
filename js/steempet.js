/** 
 *  Vue instance
 */
const app = new Vue({
    el: '#app-steempet',
    data: {
      account: {
        name: ''
      },
      validAccount: false,
      validKey: false,
      hasPet: false,
      hasKey: false,
      editing: false,
      newPet: false,
      pet: EMPTY_PET,
      key: '',
    },
    mounted: function () {
      steem.api.setOptions({
        url: 'https://api.steemit.com'
      });
      this.getUser();
    },
    methods: {
      toggleEdit: function () {
        this.editing = !this.editing;
      },
      toggleNew: function () {
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
              var json_metadata = (app.account.json_metadata && app.account.json_metadata != '') ? JSON.parse(app.account.json_metadata) : {};

              // Consult if there are pets in json_metadata
              if (json_metadata.pets && json_metadata.pets.length > 0) {
                app.hasPet = true;
                console.log('@' + app.account.name + " has pets");
                if (query.key) {
                  app.hasKey = true;
                  app.key = query.key;
                  
                  // Decrypt sensitive data
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
                  } catch (e) {
                    console.log("Incorrect key to decrypt the private data");
                    app.validKey = false;
                  }
                } else {
                  console.log("There is no key to decrypt the private data");
                  app.hasKey = false;
                  app.key = steem.formatter.createSuggestedPassword().substring(0,10);
                }
                app.pet = json_metadata.pets[0];
                app.editing = false;
              } else {
                console.log('@' + app.account.name + " does not have pets");
                app.hasPet = false;
                app.pet = {
                  public: {},
                  private: {}
                };
              }
            }
          });
        } else {
          console.log("There is no query");
        }
      }
    },
    template: `
      <div>
      <pet-navbar></pet-navbar>
      <pet-userinfo :name="this.account.name" :valid="this.validAccount"></pet-userinfo>
      <div class="container">
        <div v-if="hasPet">
          <div class="right">
            <button @click="toggleEdit" class="icon"><img src="images/round-create-24px.svg"></button>
          </div>
          <div v-if="editing">
            <pet-create :pet_init="this.pet" :key_init="this.key"></pet-create>
          </div>
          <div v-else>
            <pet-arraydata :pet="this.pet"></pet-arraydata>                
            <pet-qrcode :haspet="this.hasPet" :haskey="this.hasKey" :validkey="this.validKey"></pet-qrcode>
          </div>
        </div>
        <div v-else>
          <div class="center">
            <div class="text-huge">Oops!</div>
            <div class="text-big">@{{this.account.name}} does not have pets</div>
            <div>Click below to add one</div>
          </div>
          <div class="center">
            <button @click="toggleNew" class="icon"><img src="images/round-add-24px.svg"></button>
          </div>
          <div v-if="newPet">
            <pet-create :pet_init="this.pet" :key_init="this.key"></pet-create>
          </div>
        </div>
      </div>
      <footer>
        <div class="vcenter">SteemPet by <a href="https://steemit.com/@jga">@jga</a></div>
      </footer>
      </div>
    `,
  });
