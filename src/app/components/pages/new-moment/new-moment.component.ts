import { MomentService } from 'src/app/service/moment.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Moment } from 'src/app/Moment';

import { MessagesService } from 'src/app/service/messages.service';
@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.scss']
})
export class NewMomentComponent {
  btnText = "Compartilhar!"

  constructor(
     private momentService: MomentService,
     private messagesSevices: MessagesService,
     private router: Router
     ) {}

  createHandle(moment: Moment){
    const formData = new FormData()

    formData.append('title', moment.title)
    formData.append('description', moment.description)

    if(moment.image){
      formData.append('image', moment.image)
    }

    //to do

    //enviar para o service
    this.momentService.createMoment(formData).subscribe();

    //exibir msg
    this.messagesSevices.add('Momento adicionado com sucesso!')


    //redirect
    this.router.navigate(['/'])
  }

}
