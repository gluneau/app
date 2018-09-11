Vue.component('pet-qrcode',{
  data:function(){
    return {
    
    }
  },
  methods: {
    showQRcode: function(){
      qrcode.makeCode(document.location.href);
    },
  },
  template: `
    <div>
      <button @click="showQRcode">Show QR code</button>
      <div id="qrcode"></div>      
    </div>
  `,
})
