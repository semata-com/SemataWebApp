using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace SemataWebApp.Shared
{
    public class ActionResponse
    {
        public bool Success { get; private set; }
        public string Message { get; private set; }
        public ActionResponse(bool success, string message)
        {
            Success = success;
            Message = message;
        }
    }
    public class ActionRequest
    {
        public async static Task<ActionResponse> Post(HttpClient httpClient
                                                      , string wwwroot
                                                      , string url
                                                      , string action
                                                      , Dictionary<string, string> parameters)
        {
            ActionResponse actionResponse;
            try
            {
                parameters["Action Id"] = action;
                var requestContent = new FormUrlEncodedContent(parameters);
                var response = await httpClient.PostAsync(wwwroot + url, requestContent);
                var responseText = await response.Content.ReadAsStringAsync();
                var responseFields = responseText.Split('\n', 2);
                actionResponse = new ActionResponse(responseFields[0] == "0" ? false : true, responseFields[1]);
            }
            catch (System.Exception exception)
            {
                actionResponse = new ActionResponse(false, exception.Message);
            }
            return actionResponse;
        }
    }
}
