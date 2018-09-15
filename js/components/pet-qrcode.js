Vue.component('pet-qrcode', {
  props: {
    haspet: Boolean,
    haskey: Boolean,
    validkey: Boolean,
  },
  mounted: function () {
    this.showQRcode();
  },
  updated: function () {
    this.showQRcode();
  },
  methods: {
    showQRcode: function () {
      //saveFile("hello.txt","This is the content of my file :)");
      qr = document.getElementById("qrcode");
      if(qr == null) return;
      qr.innerHTML = '';
      var qrcode = new QRCode(qr, {
          text: document.location.href,
          width: 128,
          height: 128,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.L,
          useSVG: true
        });       
    },
  },
  template: `
    <div class="center">
      <!--<button @click="showQRcode" class="icon"><img src="images/qr-code.svg"></button>-->
      <div id="qrtag" v-if="this.haspet && this.haskey && this.validkey">
        <div class="face">
          <div id="qrcode"></div>
        </div>
        <div class="face">
          <img src="images/steem.svg">
        </div>
        <div class="center"><a href={{document.location.href}}>{{document.location.href}}</a></div>
      </div>
      <div v-else-if="this.haspet">
        <div class="alert-box">Please provide the <strong>password to decrypt</strong> the sensitive data</div>
      </div>
    </div>
  `, 
})
