using AddressBook.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.API.Data
{
    public class AddressBookDbContext : DbContext
    {
        public AddressBookDbContext(DbContextOptions options) : base(options)
        {
        }

        //To access the table and communicate with that
        public DbSet<Contact> Contacts { get; set; }

        
    }
}
