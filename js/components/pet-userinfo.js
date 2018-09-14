Vue.component('pet-userinfo',{
  data: function(){
    return {
      name: ''
    }
  },
  template: `
    <div>
      <div class="user-container">
        <div class="image user" :style="'background-image: url(https://steemitimages.com/u/'+this.name+'/avatar/small);'"></div>
        <div class="user-label">@{{this.name}}</div>
      </div>
    </div>  
  `,
})