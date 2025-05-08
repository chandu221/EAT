using EquiHubBackend.Models;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Globalization; 
using System.Threading.Tasks;
using System.Linq;
namespace EquiHubBackend.Utils
{
    public static class DataLoader
    {
        public static List<Employee> LoadEmployees(string path)
        {
            var json = File.ReadAllText(path);
            var root = JObject.Parse(json);
            // assumes root object has "employees": [ ... ]
            return root["employees"]!
                   .ToObject<List<Employee>>()!;
        }
    }
}