using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;

namespace SemataWebApp.Shared
{
    public class Configuration
    {
        public static HttpClient HttpClient;
        public static string WWWRoot { get; set; }
        public static string URL { get; set; }
        public static string ReCaptchaSiteKey { get; set; }
    }
}
