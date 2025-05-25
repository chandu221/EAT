using EquityManagement.Models;
using System.Text.Json;

namespace EquityManagement.Services{
 
public interface IExternalApiService
{
    Task<JsonDocument?> GetStockAsync(string symbol);
}
}