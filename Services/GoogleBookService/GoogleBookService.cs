namespace Bookends.Services.GoogleBookService
{
    public class GoogleBookService : IGoogleBookService
    {
        public async Task<ServiceResponse<string>> GoogleBooksKeywordSearch(string keyword, GoogleSearchOptions options)
        {
            using HttpClient http = new();

            var url = $"https://www.googleapis.com/books/v1/volumes/?q={keyword}";
            var opts1 = $"&maxResults={options.MaxResults}&startIndex={options.StartIndex}";
            var opts2 = $"&orderBy={options.OrderBy}&printType={options.PrintType}";

            var response = new ServiceResponse<string>();
            HttpResponseMessage httpResponse;

            try
            {
                httpResponse = await http.GetAsync($"{url}{opts1}{opts2}");
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Couldn't access Google Books Api.";
                return response;
            }

            response.Data = await httpResponse.Content.ReadAsStringAsync();

            return response;
        }

        public async Task<ServiceResponse<string>> GoogleBooksUrlSearch(string url)
        {
            using HttpClient http = new();

            var response = new ServiceResponse<string>();
            HttpResponseMessage httpResponse;

            try
            {
                httpResponse = await http.GetAsync(url);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Couldn't find matching Google Books page.";
                return response;
            }
 
            response.Data = await httpResponse.Content.ReadAsStringAsync();

            return response;
        }
    }
}