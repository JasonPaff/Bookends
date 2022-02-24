namespace Bookends.Models
{
    public class Bookshelf
    {
        public int Id { get; set; } = 0;
        public int UserId { get; set; } = 0;
        public string Name { get; set; } = string.Empty;
        public List<BookshelfItem> Books { get; set; } = new();
    }
}