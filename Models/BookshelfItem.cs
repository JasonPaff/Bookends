namespace Bookends.Models
{
    public class BookshelfItem
    {
        public int Id { get; set; } = 0;
        public int BookshelfId { get; set; } = 0;
        public int BookId { get; set; } = 0;
    }
}