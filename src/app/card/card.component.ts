import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() fullName: string;
  @Input() Index: number;
  @Input() address: Object;
  @Input()  uid  : number;
  @Output() editButton = new EventEmitter<number>();
  @Output() detailButton = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  Edit(Index){
    this.editButton.emit(Index);
  }
  detailsOf(uid){
    this.detailButton.emit(uid);
  }
}
