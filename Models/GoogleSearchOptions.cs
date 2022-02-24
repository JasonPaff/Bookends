namespace Bookends.Models
{
    public class GoogleSearchOptions
    {
        public int MaxResults { get; set; } = 40;
        public string Filter { get; set; } = string.Empty;
        public string Download { get; set; } = string.Empty;
        public string LangRestrict { get; set; } = string.Empty;
        public string OrderBy { get; set; } = string.Empty;
        public string PrintType { get; set; } = string.Empty;
        public string Projection { get; set; } = string.Empty;
        public bool ShowPreorders { get; set; } = false;
        public int StartIndex { get; set; } = 0;
    }
}