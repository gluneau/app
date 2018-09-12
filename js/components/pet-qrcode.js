Vue.component('pet-qrcode',{
  data:function(){
    return {
    
    }
  },
  methods: {
    showQRcode: function(){
      qrcode.makeCode(document.location.href);
      saveFile("hello.txt","This is the content of my file :)");
    },
  },
  template: `
    <div class="center">
      <button @click="showQRcode" class="icon"><img src="images/qr-code.svg"></button>
      <div id="qrcode" class="qrcode"></div>      
    </div>
  `,
})
