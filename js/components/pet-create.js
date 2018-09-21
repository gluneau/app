Vue.component('pet-create',{
  props: {
    pet_init:{
      type: Object,
      required: false,
      default: EMPTY_PET,        
    },
    key_init:{
      type: String,
      required: false
    }
  },
  data: function(){
    return {
      pet: this.pet_init,
      key: this.key_init,
      validWif: true, /************** MODIFY *********/
    }  
  },  
  methods: {
    save: function () {
      this.key = this.$refs.data.$refs.edit_key.inputData;
      app.key = this.key;
      self = this;
      this.$refs.data.fields.public.forEach(function (field, index) {
        self.pet.public[field[0]] = self.$refs.data.$refs.editor_public[index].inputData;
      });
      
      this.$refs.data.fields.private.forEach(function (field, index) {
        var private_data = self.$refs.data.$refs.editor_private[index].inputData;
        self.pet.private[field[0]] = CryptoJS.AES.encrypt(private_data, self.key).toString();
      });
      
      console.log('Password used in the encryption: '+this.key);
      console.log(this.pet);

      var json_metadata = (app.account.json_metadata && app.account.json_metadata != '') ? JSON.parse(app.account.json_metadata) : {};
      json_metadata.pets = []; //TODO: a user could have several pets
      json_metadata.pets[0] = this.pet;

      console.log(json_metadata);
      steem.broadcast.accountUpdate(this.$refs.wif.inputWif,
        app.account.name,
        app.account.memo_key,
        json_metadata, function (err, result) {
        if (err) {
          console.log("Error saving data:");
          console.log(err);
        } else {
          console.log("Saved!");
          var query = getQuery();
          query.key = app.key;
          setQuery(query);
          //app.$refs.wif.toggleEdit();
          app.getUser();
        }
        console.log(err, result);
      });

      console.log("listo");
    },
  },
  template: `
    <div>
      <pet-wif ref="wif"></pet-wif>
      <div v-if="this.validWif">
        <pet-arraydatainput :pet_init="pet" :key_init="key" ref="data" class="center"></pet-arraydatainput>
        <div class="center">
          <button @click="save">save</div>
        </div>
      </div>
    </div>  
  `
})