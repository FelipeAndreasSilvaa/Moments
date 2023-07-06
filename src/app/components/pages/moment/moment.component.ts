import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/service/moment.service';
import { MessagesService } from 'src/app/service/messages.service';
import { CommentService } from 'src/app/service/comment.service';

import { Moment } from 'src/app/Moment';
import { Comment } from 'src/app/Comment';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';


import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'




@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.scss']
})
export class MomentComponent implements OnInit{

  moment?: Moment;
  baseApiUrl = "http://localhost:3333/"

  faTimes = faTimes;
  faEdit = faEdit;

  commentForm!: FormGroup

  constructor(private momentService: MomentService,
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router,
    private commentService: CommentService
    ){}

  ngOnInit(): void {
      //id que esta na url
      const id = Number(this.route.snapshot.paramMap.get("id"))
      this.momentService.getMoment(id).subscribe((item) => (this.moment = item.data))

      this.commentForm = new FormGroup({
        text: new FormControl("",[Validators.required]),
        username: new FormControl("",[Validators.required])
      })
  }

  get text(){
    return this.commentForm.get('text')!
  }

  get username(){
    return this.commentForm.get('username')!
  }

  async removeHandler(id: number){
    await this.momentService.removeMoment(id).subscribe()

    this.messageService.add("Momento excluido com sucesso!")

    this.router.navigate(['/'])
  }

  async onSubmit(formDirective: FormGroupDirective){
    if(this.commentForm.invalid){
      return
    }

    const data: Comment = this.commentForm.value

    data.momentId = Number(this.moment!.id)

    await this.commentService.createComment(data).subscribe((comment) => this.moment!.comments?.push(comment.data))

    this.messageService.add("Comentario adicionado!")

    //resetar form
    this.commentForm.reset()
    formDirective.resetForm()
  }

}
