
import { ContactsService } from './../../../services/contacts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contactDetails: Contact = {
    id: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: 0
  };
  
  constructor(private route:ActivatedRoute, private contactService: ContactsService, private router:Router, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if(id) {
          this.contactService.getContact(id)
          .subscribe({
            next: (response) => {
              this.contactDetails = response;
            }
          })
        }
      }
    });
  }
  updateContact() {
    this.contactService.updateContact(this.contactDetails.id, this.contactDetails)
    .subscribe({
      next: (response) => {
        this.toastrService.success("Your contact has been successfully updated")
        this.router.navigate(['contacts']);
      }
    });
  }

}
