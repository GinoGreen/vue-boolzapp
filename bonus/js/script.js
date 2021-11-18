dayjs.extend(window.dayjs_plugin_customParseFormat);

const app = new Vue({
   el: '#app',

   data: {
      contacts: [
         {
            name: 'Simone',
            avatar: '_1',
            visible: true,
            messages: [
               {
                  date: '10/01/2020 15:30:55',
                  message: 'Hai portato a spasso il cane?',
                  status: 'sent'
               },
               {
                  date: '10/01/2020 15:50:00',
                  message: 'Ricordati di dargli da mangiare',
                  status: 'sent'
               },
               {
                  date: '10/01/2020 16:15:22',
                  message: 'Tutto fatto!',
                  status: 'received'
               }
             ],
         },
         {
            name: 'Mauro',
            avatar: '_2',
            visible: true,
            messages: [
               {
                  date: '20/03/2020 16:30:00',
                  message: 'Ciao come stai?',
                  status: 'sent'
               },
               {
                  date: '20/03/2020 16:30:55',
                  message: 'Bene grazie! Stasera ci vediamo?',
                  status: 'received'
               },
               {
                  date: '20/03/2020 16:35:00',
                  message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                  status: 'sent'
               },
               {
                  date: '20/03/2020 16:38:12',
                  message: 'Whatsapp costerà € 0,01 a messaggio invia questo messaggio a 10 persone. Quando si esegue la luce diventerà blu. (Se non lo invii l’agenzia WhatsApp attiverà il costo) se non lo farai l’agenzia ti obbligherà a farlo',
                  status: 'received'
               },
               {
                  date: '20/03/2020 17:30:00',
                  message: 'Mauro.. ancora con queste bufale!? Ma basta!',
                  status: 'sent'
               },
            ],
         },
         {
            name: 'Alberto',
            avatar: '_3',
            visible: true,
            messages: [
               {
                  date: '28/03/2020 10:10:40',
                  message: 'La Marianna va in campagna',
                  status: 'received'
               },
               {
                  date: '28/03/2020 10:20:10',
                  message: 'Sicuro di non aver sbagliato chat?',
                  status: 'sent'
               },
               {
                  date: '28/03/2020 16:15:22',
                  message: 'Ah scusa!',
                  status: 'received'
               },
               {
                  date: '28/03/2020 18:11:02',
                  message: 'Questo è incredibile! Inoltra questo messaggio a 10 persone entro 3 minuti e non accadrà niente! Mio cugino ha provato tre volte e ha sempre funzionato. Funziona veramente! Fallo girare! Le persone devono saperlo!',
                  status: 'sent'
               }
            ],
         },
         {
            name: 'Gianluca',
            avatar: '_4',
            visible: true,
            messages: [
               {
                  date: '10/01/2020 15:30:55',
                  message: 'Lo sai che ha aperto una nuova pizzeria?',
                  status: 'sent'
               },
               {
                  date: '10/01/2020 15:50:00',
                  message: 'Si, ma preferirei andare al cinema',
                  status: 'received'
               },
               {
                  date: '10/01/2020 15:52:30',
                  message: "Comunque sull'esercitazione dell'altro giorno ho utilizzato display: inline-cock. Funzionava benissimo!",
                  status: 'received'
               },
               {
                  date: '10/01/2020 15:52:50',
                  message: 'Come scusa?',
                  status: 'sent'
               },
               {
                  date: '10/01/2020 16:32:11',
                  message: 'Scusami, intendevo display: inline-block;',
                  status: 'received'
               }
            ],
         },
      ],
      counter: 0,
      lastMsgPreview: '',
      msgToSend: '',
      stringSearch: '',
      showOptions: -1
   },
   methods: {
      onClickContact(i) {
         this.counter = i;
      },
      getLastMsgPreview(contact) {
         if (contact.messages.length > 0) {
            let messagePreview = '';
            //recupero l'ultimo messaggio del contatto di index
            const message = contact.messages[contact.messages.length - 1].message;
   
            if (message.length < 14 ) {
               messagePreview = message;
            } else {
               messagePreview = message.substring(0, 14) + "...";
            }
   
            return messagePreview;
         }
      },

      sendMsg() {
         if (this.msgToSend.trim() !== '') {
            
            const fullMsg = {
               date: this.getTime(),
               message: this.msgToSend,
               status: 'sent'
            };
            
            this.pushMessage(fullMsg);
   
            this.msgToSend = '';
         } /*else {
            console.log('Scrivi qualcosa');
         }*/
         
      },
      
      getLastDate() {
         if (this.contacts[this.counter].messages.length > 0) {

            const lastDate = this.contacts[this.counter].messages[this.contacts[this.counter].messages.length - 1].date;

            return lastDate;

         }
         
      },

      getLastDateChatList(contact) {
         if (contact.messages.length > 0) {
            
            const lastDateChatList = contact.messages[contact.messages.length - 1].date
   
            return lastDateChatList;
         }
      },

      receiveMsg() {
         // console.log('ricevuto');
         setTimeout( () => {

            const fullMsg = {
               date: this.getTime(),
               message: "D'accordo",
               status: 'received'
            };

            this.pushMessage(fullMsg);

         }, 1000);
      },

      getTime() {
            
            return dayjs().format("DD/MM/YYYY HH:mm:ss");
      },

      pushMessage(item) {
         this.contacts[this.counter].messages.push(item);
      },

      searchContact() {
         // console.log('key pressed');
         this.contacts.forEach(contact => {

            const name = contact.name.toLowerCase();
            const str = this.stringSearch.toLowerCase();

            if (!name.includes(str)) {
               contact.visible = false;
            }
            if (str === '') {
               contact.visible = true;
            }
         });
         
      },

      showOptionsList(i) {
         if (this.showOptions === -1) {
            this.showOptions = i;
         } else {
            this.showOptions = -1;
         }
      },

      deleteMsg(i) {
         this.contacts[this.counter].messages.splice(i, 1);
      }
   }
});