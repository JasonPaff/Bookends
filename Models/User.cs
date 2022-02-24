namespace Bookends.Models
{
    public class User
    {
        public int Id { get; set; } = 0;
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public string Email { get; set; } = string.Empty;
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; }
    }
}