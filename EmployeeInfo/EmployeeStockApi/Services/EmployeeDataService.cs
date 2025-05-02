using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using EmployeeStockApi.Models;




namespace EmployeeStockApi.Services
{
    public class EmployeeDataService
    {
                private List<Employee> _employees;
        
        public EmployeeDataService()
        {
            // In a real application, this would come from a database
            string jsonData = @"[{
                ""emp_id"": ""67890"",
                ""name"": ""Jane Smith"",
                ""email"": ""janesmith@example.com"",
                ""pwd"": ""securepass123"",
                ""taxes"": {
                    ""federal_tax_rate"": 18,
                    ""state_tax_rate"": 6,
                    ""local_tax_rate"": 3
                },
                ""awards"": [
                    {
                        ""type"": ""rsu"",
                        ""symbols"": [
                            {
                                ""symbol"": ""SCHW"",
                                ""award_price"": 80.19,
                                ""granted"": 75,
                                ""grant_date"": ""2023-03-15""
                            }
                        ]
                    },
                    {
                        ""type"": ""esop"",
                        ""symbols"": [
                            {
                                ""symbol"": ""SCHW"",
                                ""award_price"": 80.19,
                                ""discounted_price"": 20,
                                ""granted"": 50,
                                ""grant_date"": ""2023-02-20"",
                                ""exercisable"": 20
                            }
                        ]
                    }
                ]
            },
            {
                ""emp_id"": ""11223"",
                ""name"": ""Alex Johnson"",
                ""email"": ""alexjohnson@example.com"",
                ""pwd"": ""mypassword321"",
                ""taxes"": {
                    ""federal_tax_rate"": 22,
                    ""state_tax_rate"": 4,
                    ""local_tax_rate"": 1
                },
                ""awards"": [
                    {
                        ""type"": ""rsu"",
                        ""symbols"": [
                            {
                                ""symbol"": ""SCHW"",
                                ""award_price"": 80.19,
                                ""granted"": 40,
                                ""grant_date"": ""2023-08-01""
                            }
                        ]
                    },
                    {
                        ""type"": ""esop"",
                        ""symbols"": [
                            {
                                ""symbol"": ""SCHW"",
                                ""award_price"": 80.19,
                                ""discounted_price"": 20,
                                ""granted"": 60,
                                ""grant_date"": ""2023-11-05"",
                                ""exercisable"": 15
                            }
                        ]
                    }
                ]
            }]";

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
            };

            _employees = JsonSerializer.Deserialize<List<Employee>>(jsonData, options) ?? new List<Employee>();
        }

        public Employee? GetEmployeeByEmail(string email)
        {
            return _employees.FirstOrDefault(e => e.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
        }

        public Employee? ValidateCredentials(string email, string password)
        {
            return _employees.FirstOrDefault(e => 
                e.Email.Equals(email, StringComparison.OrdinalIgnoreCase) && 
                e.Pwd == password);
        }
    }
}



