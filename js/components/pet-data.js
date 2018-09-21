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
        <div v-for="(item,key,index) in pet.public">
          <pet-data :title="fields[key]" :data="item"></pet-data>
        </div>
        <div v-for="(item,key,index) in pet.private">
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
      default: EMPTY_PET,        
    },
    key_init:{
      type: String,
      required: false
    }
  },
  data: function () {
    return {
      fields:{
        public: [
          ['petType','Pet Type'],
          ['name','Name'],
          ['image','Image URL'],
          ['breed','Breed'],
          ['color','Color'],
          ['birthday','Birthday'],
        ],
        private: [
          ['email','Email'],
          ['address','Address'],
          ['phoneNumber','Phone number'],
          ['notes','Notes'],
        ],
      },
      pet: this.pet_init,
      key: this.key_init,
    }    
  },
  computed: {
    /*imageExists: function(){
      console.log("computed");
      return (this.pet.public.image && this.pet.public.image != '');
    }*/
  },
  template: `
    <div>
      <!--<div v-if="imageExists" class="image pet" :style="'background-image: url('+pet_public.image+');'">-->
      <!--</div>-->
      <div class="array-datainput">
        <div class="info">
          <div class="title">Public data</div>
        </div>
        <div v-for="(field,key,index) in fields.public">
          <pet-datainput ref="editor_public" 
            :title="field[1]" :data="pet.public[field[0]]">
          </pet-datainput>
        </div>
        <div class="info">
          <div class="title">Private data</div>
          <div>The following data will be encrypted, meaning that it will only be visible by scanning the QR Tag.</div>
        </div>
        <div v-for="(field,key,index) in fields.private">
          <pet-datainput ref="editor_private" 
            :title="field[1]" :data="pet.private[field[0]]">
          </pet-datainput>
        </div>
        <div class="info">
          <div class="title">Password</div>
          <div>Set the key to encrypt the private data.</div>
        </div>
        <pet-datainput ref="edit_key" title="Key" :data="key"></pet-datainput>
      </div>
    </div>  
  `, 
})
