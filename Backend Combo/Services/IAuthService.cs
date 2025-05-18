using EquityManagement.Models;
using EquityManagement.Services;

namespace EquityManagement.Services
{
    public interface IAuthService
    {
        User? ValidateUser(string email, string password);
    }
}