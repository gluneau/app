Vue.component('pet-userinfo',{
  props: {
    name: String,
    valid: Boolean
  },
  template: `
    <div v-if="valid">
      <div class="user-container">
        <div class="image user" :style="'background-image: url(https://steemitimages.com/u/'+name+'/avatar/small);'"></div>
        <div class="user-label">@{{this.name}}</div>
      </div>
    </div>  
  `,
})