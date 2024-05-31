using System;
using System.Text.Json;

namespace Backend.Utils
{
    public class JsonConverter
    {
        public static T ConvertJsonToObject<T>(string jsonString)
        {
            try
            {
                T obj = JsonSerializer.Deserialize<T>(jsonString);
                return obj;
            }
            catch (JsonException ex)
            {
                Console.WriteLine($"Error deserializing JSON: {ex.Message}");
                return default;
            }
        }
    }

}


