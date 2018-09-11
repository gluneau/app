Vue.component('pet-navbar',{
  data: function(){
    return {
      inputAccount: '',
      isInputDirty: false,
      isLoading: false,
    }
  },
  computed: {
    listAccounts: function () {
      if (this.isLoading) {
        return '? Fetching new results'
      } else if (this.isInputDirty) {
        return '... Typing'
      } else {
        return '? Done'
      }
    }
  },
  watch:{
    inputAccount: function () {
      this.isInputDirty = true      
      this.autocomplete()
    }
  },
  methods: {
    search: function(){
      history.pushState({index:'search'}, '', 'index.html?p='+this.inputAccount);
      getUser();
    },
    autocomplete: _.debounce(function () {
      this.isLoading = true
      self = this;
      steem.api.lookupAccounts(this.inputAccount, 5, function(err, result) {
        self.isLoading = false;
        self.isInputDirty = false;
        if(!err && result && result.length>0){
          names = result.filter( name => name.indexOf(self.inputAccount)>=0 )
          console.log( names )          
        }else{
          console.log('error');
        }
      })      
    }, 500)
  },  
  template: `
    <div class="navbar">
      <input type="text" @keyup.enter="search" v-model="inputAccount">
      <button @click="search">search</div>      
    </div>
  `,  
})