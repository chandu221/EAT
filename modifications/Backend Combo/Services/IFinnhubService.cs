// Services/IFinnhubService.cs
using EquityManagement.Models;

namespace EquityManagement.Services
{
    public interface IFinnhubService
    {
        Task<StockQuote> GetStockQuoteAsync(string symbol);
    }
}