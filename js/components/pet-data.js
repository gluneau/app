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
  data: function () {
    return {
      fields: [
        ['petType', 'Pet Type'],
        ['name', 'Name'],
        ['image', 'Image URL'],
        ['breed', 'Breed'],
        ['color', 'Color'],
        ['birthday', 'Birthday'],
        ['email', 'Email'],
        ['address', 'Address'],
        ['phoneNumber', 'Phone number'],
        ['notes', 'Notes'],
      ],
      pet: {
        petType: '',
        name: '',
        image: '',
        breed: '',
        color: '',
        birthday: '',
        email: '',
        address: '',
        phonenumber: '',
        notes: '',
      },
      imageExists: false,
    }
  },
  mounted: function(){
    getUser()
  },
  template: `
    <div>
      <div v-if="imageExists" class="image" :style="'background-image: url('+pet.image+');'">      
      </div>
      <div class="array-data">
        <div v-for="(item,key,index) in pet">
          <pet-data :title="fields[index][1]" :data="item"></pet-data>
        </div>      
      </div>
    </div>
  `, 
})


Vue.component('pet-datainput', {
  props: ['title'],
  data: function () {
    return {
      inputData: '',
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
  data: function () {
    return {
      fields: [
        ['petType', 'Pet Type'],
        ['name', 'Name'],
        ['image', 'Image URL'],
        ['breed', 'Breed'],
        ['color', 'Color'],
        ['birthday', 'Birthday'],
        ['email', 'Email'],
        ['address', 'Address'],
        ['phoneNumber', 'Phone number'],
        ['notes', 'Notes'],
      ],
    }
  },
  methods: {
    save: function () {
      var pet = {};
      this.fields.forEach(function (field, index) {
        pet[field[0]] = app.$refs.arrayinput.$refs.editor[index].inputData;
      });
      console.log(pet);

      var json_metadata = (app.account.json_metadata && app.account.json_metadata != '') ? JSON.parse(app.account.json_metadata) : {};
      json_metadata.pets = [];
      json_metadata.pets[0] = pet;

      console.log(json_metadata);
      steem.broadcast.accountUpdate(app.$refs.wif.inputWif,
        app.account.name,
        app.account.memo_key,
        json_metadata, function (err, result) {
        if (err) {
          console.log("Error broadcasting");
        } else {
          console.log("Saved!");
          app.$refs.wif.toggleEdit();
          getUser();
        }
        console.log(err, result);
      });

      console.log("listo");
    },
  },
  template: `
    <div>      
      <div v-for="(field,key,index) in fields">
        <pet-datainput ref="editor" 
          :title="field[1]">
        </pet-datainput>
      </div>
      <button @click="save">save</div>
    </div>
  `, 
})
