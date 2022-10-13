using AddressBook.API.Data;
using AddressBook.API.Models;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;

namespace AddressBook.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactsController : Controller
    {
        private readonly AddressBookDbContext _addressBookDbContext;

        public ContactsController(AddressBookDbContext addressBookDbContext)
        {
            _addressBookDbContext = addressBookDbContext;
        }
        
    
    [HttpGet]
            
        public async Task<IActionResult> GetAllContacts()
        {
           var contacts = await _addressBookDbContext.Contacts.ToListAsync();

            return Ok(contacts);
        }
      
       
        [HttpPost]
        public async Task<IActionResult> AddContact([FromBody] Contact contactRequest)
        {
            
            var contact = await _addressBookDbContext.Contacts.FirstOrDefaultAsync(x => x.Phone == contactRequest.Phone);
            if (contact == null)
            {
                contactRequest.Id = Guid.NewGuid();
                await _addressBookDbContext.Contacts.AddAsync(contactRequest);
                await _addressBookDbContext.SaveChangesAsync();

                return Ok(contactRequest);
            }
            else {
                return NotFound();
            }

        }

        [HttpGet]
        [Route("{id:Guid}")]

        public async Task<IActionResult> GetContact([FromRoute] Guid id)
        {
          var contact = await _addressBookDbContext.Contacts.FirstOrDefaultAsync(x => x.Id == id);


            if(contact == null)
            {
                return NotFound();
            }
            return Ok(contact);
            
        }
        
        [HttpPut]
        [Route("{id:Guid}")]

        public async Task<IActionResult> UpdateContact([FromRoute] Guid id, Contact updateContactRequest)
        {
            var contact = await _addressBookDbContext.Contacts.FindAsync(id);
            var contact1 = await _addressBookDbContext.Contacts.FirstOrDefaultAsync(x => x.Phone == updateContactRequest.Phone);


            if (contact1 == null && contact != null) {
                contact.FirstName = updateContactRequest.FirstName;
                contact.LastName = updateContactRequest.LastName;
                contact.Address = updateContactRequest.Address;
                contact.Phone = updateContactRequest.Phone;

                await _addressBookDbContext.SaveChangesAsync();

                return Ok(contact);
            }
            else
            {
                return NotFound();
            }
 
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        
        public async Task<IActionResult> DeleteContact([FromRoute] Guid id)
        {
            var contact = await _addressBookDbContext.Contacts.FindAsync(id);

            if (contact == null)
            {
                return NotFound();
            }
            _addressBookDbContext.Contacts.Remove(contact);
            await _addressBookDbContext.SaveChangesAsync();

            return Ok(contact);
        }


    }
}
