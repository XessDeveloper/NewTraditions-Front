import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { SharedServicesService } from '../../Services/shared/shared-services.service';
import { HelpMethods } from '../../HelpMethods/help-methods';

@Component({
  selector: 'app-terms-and-conditions-modal',
  templateUrl: './terms-and-conditions-modal.component.html',
  styleUrl: './terms-and-conditions-modal.component.scss'
})
export class TermsAndConditionsModalComponent implements OnInit {
  private readonly sharedService = inject(SharedServicesService)

  @Output() onClose = new EventEmitter<boolean>();
  @ViewChild('content') content!: ElementRef
  showModal: boolean = false;
  termsAccept: boolean = false;
  showButtons: boolean = false;

  ngOnInit(): void {
    this.showModal = this.sharedService.getShowModal();
  }

  onScroll = (event: any) => {
    const element = event.target;

    if (element.scrollHeight - element.scrollTop === element.clientHeight) this.showButtons = true;
    else this.showButtons = false;
  }

  termsAccepted = (event: Event) => {
    event.preventDefault();
    this.showModal = false;
    this.onClose.emit(true)
  } 

  cancel = (event: Event) => {
    event.preventDefault();
    this.showModal = false;
    this.onClose.emit(false)
  }
}
