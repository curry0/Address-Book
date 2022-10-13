import { ContactsService } from './../../../services/contacts.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  addContactRequest: Contact = {
    id: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: 0
  }

  
  
  constructor(private contactService: ContactsService, private router: Router, private toastrService: ToastrService) { }

  ngOnInit(): void {
    
  }

  addContact() {
    this.contactService.addContact(this.addContactRequest)
    .subscribe({
      next: (contact) => {
        this.toastrService.success("Successfully added contact " + this.addContactRequest.firstName);
        this.router.navigate(['contacts']);
      },
    })
  }

}
