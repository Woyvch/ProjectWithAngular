using Microsoft.AspNetCore.Identity;

namespace ProjectWithAngular.Models
{
    // inherits from the IdentityUser class
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
