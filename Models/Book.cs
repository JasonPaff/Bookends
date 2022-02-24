namespace Bookends.Models
{
    public class Book
    {
        public int Id { get; set; } = 0;
        public List<Author> Authors { get; set; } = new();
        public string AuthorString { get; set; } = string.Empty;
        public int AverageRating { get; set; } = 0;
        public List<Category> Categories { get; set; } = new();
        public string CategoriesString { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Etag { get; set; } = string.Empty;
        public string ImageLink { get; set; } = string.Empty;
        public string Language { get; set; } = string.Empty;
        public int PageCount { get; set; } = 0;
        public string PrintType { get; set; } = string.Empty;
        public string Publisher { get; set; } = string.Empty;
        public string PublishedDate { get; set; } = string.Empty;
        public int RatingsCount { get; set; } = 0;
        public string SelfLinkId { get; set; } = string.Empty;
        public string Subtitle { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
    }
}