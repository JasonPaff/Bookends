namespace Bookends.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : ControllerBase
    {
        private readonly IGoogleBookService _googleBookService;

        public BookController(IGoogleBookService googleBookService)
        {
            _googleBookService = googleBookService;
        }
        
        [HttpPost("{keyword}")]
        public async Task<ActionResult<ServiceResponse<string>>> GetBooks(string keyword, GoogleSearchOptions options)
        {
            var result = await _googleBookService.GoogleBooksKeywordSearch(keyword, options);
            return Ok(result.Data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<string>>> GetBookData(string id)
        {
            const string baseUrl = "https://www.googleapis.com/books/v1/volumes/";
            var url = $"{baseUrl}{id}";

            var result = await _googleBookService.GoogleBooksUrlSearch(url);
            return Ok(result.Data);
        }
        

    }
}