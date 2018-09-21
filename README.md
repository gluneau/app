# Pet QR tags powered by Steem

#### Website
https://steempet.github.io/app/

### What are Pet QR tags?
Pet QR tags consist of QR codes linked to a pet profile on the Steem Blockchain, in order to give an extra protection in the case of loss. The current work consists of a website to handle this tags.

#### How it works?
Suppose your dog got lost in the city for some reason. And in the collar, it has a medal with the tag. Someone that finds the dog can scan the QR tag which links to a profile of the pet with all the necessary information to contact you, the owner. Not only contact information but also relevant data such as allergies to some type of food or medication, or vaccines already applied.

Through the SteemPet website, all this data can be stored in the json metadata of the steem account. This is very useful because the owner can update the information at any time and the link remains the same forever, then there is no need to print a new tag.

#### Why Steem Blockchain?
This service is already performed for some companies, like [Pethub](pethub.com), [PetQ](petq.me), [AnimalRescue](https://animalrescue.com/), among others. However, all of them are centralized entities with all control over the issue and activation of tags, and they are not available worldwide, only in specific countries. On the other hand, the Steem Blockchain could be used as a universal tag system for pets: It is a decentralized database, and everyone can create their own tag without the need for activation or charges that increase the costs.

#### New business model
This model of tagging can be expanded worldwide. Everyone around the world could create a local company dedicated to creating steem accounts and issue QR tags to sell in their city. There is no central authority and no type of commission for using the Steem Blockchain.

#### Put my personal data in a public blockchain? No way!
Although the blockchain is public, confidential data such as address, phone, and email are encrypted with a key that is written in the tag. That is, this information will only be visible by scanning the QR tag.

### Technology Stack
- [vue.js](https://vuejs.org): SteemPet Website.
- [steem-js](https://github.com/steemit/steem-js): API to access the blockchain.
- [qrcode.js](https://github.com/davidshimjs/qrcodejs): Used to generate QR codes for tags.
- [aes.js](https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js): Library used for the encryption of sensitive data. 

### JSON format
Inside the account's json metadata a new key "pets" is allocated to store an array of pets. Each pet has this format:
```
pet = {
  public: {      //PUBLIC DATA
    petType: '', //dog, cat, ...
    name: '',
    image: '',   //url of image
    breed: '',
    color: '',
    birthday: '',
  },
  private: {     //PRIVATE DATA - encrypted
    email: '',
    address: '',
    phoneNumber: '',
    notes: '',
  }
}
```
