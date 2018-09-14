Vue.component('pet-data', {
  props: ['title', 'data'],
  template: `
    <div class="row">
      <div class="title">{{title}}</div>
      <div class="info">{{data}}</div>      
    </div>
  `, 
})

Vue.component('pet-arraydata',{
  props: {
    pet: Object,
  },
  data: function () {
    return {
      fields: {
        petType: 'Pet Type',
        name: 'Name',
        image: 'Image URL',
        breed: 'Breed',
        color: 'Color',
        birthday: 'Birthday',
        email: 'Email',
        address: 'Address',
        phoneNumber: 'Phone number',
        notes: 'Notes',
      },
      pet_public: this.pet.public,
      pet_private: this.pet.private,
    }
  },
  watch: {
    pet: function(newVal, oldVal){
      this.pet_public = this.pet.public;
      this.pet_private = this.pet.private;
    }
  },
  computed: {
    imageExists: function(){
      return (this.pet.public.image && this.pet.public.image != '');
    }
  },
  template: `
    <div>
      <div v-if="imageExists" class="image pet" :style="'background-image: url('+pet_public.image+');'">
      </div>
      <div class="array-data">
        <div v-for="(item,key,index) in pet_public">
          <pet-data :title="fields[key]" :data="item"></pet-data>
        </div>
        <div v-for="(item,key,index) in pet_private">
          <pet-data :title="fields[key]" :data="item"></pet-data>
        </div>
      </div>
    </div>
  `, 
})


Vue.component('pet-datainput', {
  props: {
    title: String,
    data: {
      type: String,
      required: false,
      default: ''
    },
  },  
  data: function () {
    return {
      inputData: this.data,
    }
  },
  template: `
    <div class="row">
      <div class="title">{{title}}</div>
      <input type="text" class="info" v-model="inputData">      
    </div>
  `, 
})

Vue.component('pet-arraydatainput', {
  props: {
    pet_init:{
      type: Object,
      required: false,
      default:{
        public:{
          petType: '',
          name: '',
          image: '',
          breed: '',
          color: '',
          birthday: '',
        },
        private:{
          email: '',
          address: '',
          phoneNumber: '',
          notes: '',
        },
      }
    },
  },
  data: function () {
    return {
      fields_public: [
        ['petType','Pet Type'],
        ['name','Name'],
        ['image','Image URL'],
        ['breed','Breed'],
        ['color','Color'],
        ['birthday','Birthday'],
        ],
      fields_private: [
        ['email','Email'],
        ['address','Address'],
        ['phoneNumber','Phone number'],
        ['notes','Notes'],
       ],
      pet: this.pet_init,
    }    
  },
  computed: {
    /*imageExists: function(){
      console.log("computed");
      return (this.pet.public.image && this.pet.public.image != '');
    }*/
  },
  methods: {
    save: function () {
      this.fields_public.forEach(function (field, index) {
        this.pet.public[field[0]] = this.$refs.editor_public[index].inputData;
      });
      
      var password = steem.formatter.createSuggestedPassword().substring(0,10);
      
      this.fields_private.forEach(function (field, index) {
        var private_data = this.$refs.editor_private[index].inputData;
        this.pet.private[field[0]] = CryptoJS.AES.encrypt(private_data, password).toString();
      });
      
      console.log('Password used in the encryption: '+password);
      console.log(this.pet);

      var json_metadata = (app.account.json_metadata && app.account.json_metadata != '') ? JSON.parse(app.account.json_metadata) : {};
      json_metadata.pets = []; //TODO: a user could have several pets
      json_metadata.pets[0] = this.pet;

      console.log(json_metadata);
      steem.broadcast.accountUpdate(app.$refs.wif.inputWif,
        app.account.name,
        app.account.memo_key,
        json_metadata, function (err, result) {
        if (err) {
          console.log("Error broadcasting");
        } else {
          console.log("Saved!");
          var query = getQuery();
          query.key = password;
          setQuery(query);
          app.$refs.wif.toggleEdit();
          app.getUser();
        }
        console.log(err, result);
      });

      console.log("listo");
    },
  },
  template: `
    <div>
      <!--<div v-if="imageExists" class="image pet" :style="'background-image: url('+pet_public.image+');'">-->
      <!--</div>-->
      <div class="array-datainput">      
        <div v-for="(field,key,index) in fields_public">
          <pet-datainput ref="editor_public" 
            :title="field[1]" :data="pet.public[field[0]]">
          </pet-datainput>
        </div>
        <div class="info">
          <div class="title">Private data</div>
          <div>The following data will be encrypted, meaning that it will only be visible by scanning the QR Tag.</div>
        </div>
        <div v-for="(field,key,index) in fields_private">
          <pet-datainput ref="editor_private" 
            :title="field[1]" :data="pet.private[field[0]]">
          </pet-datainput>
        </div>
        <button @click="save">save</div>
      </div>
    </div>  
  `, 
})
