using JwtAuthApi.Models;

using Newtonsoft.Json;
 
namespace JwtAuthApi.Services

{

    public class AuthService

    {

        private List<User> _users;
 
        public AuthService()

        {

            var json = File.ReadAllText("db.json");

            _users = JsonConvert.DeserializeObject<List<User>>(json);

        }
 
        public User? ValidateUser(string email, string password)

        {

            return _users.FirstOrDefault(u => u.email == email && u.pwd == password);

        }

    }

}

 