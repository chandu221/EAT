using ExternalApiMock.Models;
 
namespace ExternalApiMock.Services;
 
public interface IExternalApiService
{
    Task<QuoteResponse?> GetQuoteAsync(string symbol);
}