using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EquityManagement.Models;


namespace EquityManagement.Services
{
    public interface IVestingServices
    {
        Task<IEnumerable<VestingScheduleItem>> GetVestingScheduleAsync(string empId, string awardType);
    }
}