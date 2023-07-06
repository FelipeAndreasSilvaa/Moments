import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/service/moment.service';

import { Moment } from 'src/app/Moment';

import {faSearch} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  AllMoments: Moment[] = [];
  moments: Moment[] = [];
  baseApiUrl = "http://localhost:3333/"
  faSearch = faSearch;
  searchTerm: string = ''
  //to do search

  constructor(private momentService: MomentService){}
//mostrar os momentos na pagina de home
  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR')
      })
      this.AllMoments = data
      this.moments = data
    })
  }

  search(e: Event): void{
    const target = e.target as HTMLInputElement
    const value = target.value

    this.moments = this.AllMoments.filter(moment => {
     return moment.title.toLowerCase().includes(value)
    })
  }

}
