Vue.component('pet-wif',{
  data: function(){
    return {
      showWifForm: false,
      inputWif: '',      
      isValid: false,
      isInputDirty: false,
      isLoading: false,
      showAlert: false,
    }
  },
  computed: {
    checkingWif: function () {
      if (this.isLoading) {
        return 'checking wif'
      } else if (this.isInputDirty) {
        return 'typing...'
      } else {
        return 'Done'
      }
    }
  },
  watch:{
    inputWif: function () {
      this.isInputDirty = true      
      this.checkWif()
    }
  },
  methods: {
    toggleEdit: function(){
      this.showWifForm = !this.showWifForm
      if(!this.showWifForm) app.editing = false
      this.checkWif()
    },
    checkWif: _.debounce(function () {
      this.isLoading = true
      var pubWifOwner = app.account.owner.key_auths[0][0];
      var pubWifActive = app.account.active.key_auths[0][0];
      var pubWifPosting = app.account.posting.key_auths[0][0];
      var privWif = this.inputWif;
      
      var isSeedKey = false;
      var isOwnerKey = false;
      var isActiveKey = false;
      var isPostingKey = false;
      var keyCandidate = '';
      try{
        if(privWif.length == 51){
          isOwnerKey   = steem.auth.wifIsValid(privWif, app.account.owner  .key_auths[0][0] );
          isActiveKey  = steem.auth.wifIsValid(privWif, app.account.active .key_auths[0][0] );
          isPostingKey = steem.auth.wifIsValid(privWif, app.account.posting.key_auths[0][0] );
        }
        keyCandidate = steem.auth.getPrivateKeys(app.account.name, privWif, ['active']);
        isSeedKey = (keyCandidate.activePubkey == app.account.active.key_auths[0][0]);
      }catch(e){ 
        console.log(e);
      }
      if(isOwnerKey)   console.log('Owner Key!');
      if(isActiveKey)  console.log('Active Key!');
      if(isPostingKey) console.log('Posting Key!');
      if(isSeedKey){ 
        console.log('Seed Key!');
        this.inputWif = keyCandidate.active;
      }  
      
      this.isValid = isOwnerKey || isActiveKey;// || isPostingKey;
      this.isLoading = false
      this.isInputDirty = false
      if(this.isValid){
        this.showAlert = false
        if(this.showWifForm) app.editing = true
      }
    }, 500),
    checkWif2: function(){
      this.checkWif()
      this.showAlert = !this.isValid
    }
  },
  template: `
    <div class="wif">
      <button @click="toggleEdit">Edit</button>
      <div v-if="this.showWifForm">
        <input type="password" @keyup.enter="checkWif2" v-model="inputWif" placeholder="Posting key">
        <button @click="checkWif2">check</button>
        <div class="valid">{{this.isValid}}</div>
        <div v-if="this.showAlert" class="alert-box">The key is incorrect. Please insert the active o owner key</div>        
      </div>
      <div v-else>
        <p> no hay nada para editar</p>
      </div>
    </div>
  `,
})