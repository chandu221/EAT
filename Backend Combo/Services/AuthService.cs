using EquityManagement.Models;
using EquityManagement.Services;

using Newtonsoft.Json;
 
namespace EquityManagement.Services

{

    public class AuthService:IAuthService

    {

        private List<User> _users;
 
        public AuthService()

        {

            var json = File.ReadAllText(Path.Combine("Data", "db.json"));

            _users = JsonConvert.DeserializeObject<List<User>>(json);

        }
 
        public User? ValidateUser(string email, string password)

        {

            return _users.FirstOrDefault(u => u.email == email && u.pwd == password);

        }

    }

}

 