'use strict'

const request = require('request')
const urlApi = 'http://localhost:${port}'
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const chatbot = new Telegram.Telegram('1129995687:AAGP4KZaEMecpiJMWdNUuy464XsRDhAY7Lk')

class EventsController extends TelegramBaseController{
    sendMessage(scope, msg){
    	scope.sendMessage(msg)
    }

    allEventsAction(scope){
    	let pathApi = '/allevents'
        let msg = ''
    request.get('${urlApi}${pathApi}',(error, reponse, body) => {
    	msg += JSON.parse(body).map((event)) =>
    `${event.data.toString().replace(/,/g, ' e ')} - ${event.name} - ${event.link}\n`)
      this.sendMessage(scope, msg.replace(/,/g, ''))
    })    
   }

get routes () {
    return{
        'allEvents': 'allEventsAction'
    }
  }
}

chatbot.router
    .when(
        new TextCommand('/allevents','allEvents'), new EventsController()
)