namespace Bookends.Services.GoogleBookService
{
    public interface IGoogleBookService
    {
        public Task<ServiceResponse<string>> GoogleBooksKeywordSearch(string keyword, GoogleSearchOptions options);
        public Task<ServiceResponse<string>> GoogleBooksUrlSearch(string keyword);
    }
}