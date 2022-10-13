import { ContactsService } from './../../../services/contacts.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts: Contact[] =  [];
  key:string = 'firstName';
  p: number = 1;
  firstName: any;

  constructor(private contactService: ContactsService, private router:Router, private toastrService: ToastrService) { }

  ngOnInit(): void {

    this.contactService.getAllContacts()
    .subscribe({
      next: (contacts) => {
        this.contacts = contacts;
      },
    });
    



  }
    deleteContact(id:string) {
      this.contactService.deleteContact(id)
      .subscribe({
        next: (response) => {
          this.toastrService.success("You have deleted your contact");
          this.ngOnInit();
        }
      })
   }
  search() {
    if(this.firstName == "") {
      this.ngOnInit();
    }
    else {
      this.contacts = this.contacts.filter(res => {
        return res.firstName.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase());
      });
    }
  }

}
