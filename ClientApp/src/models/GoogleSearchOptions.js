export default class GoogleSearchOptions {
    constructor(startIndex = 0, maxResults = 40) {
        this.maxResults = maxResults;
        this.download = "";
        this.filter = "";
        this.langRestrict = "";
        this.orderBy = "relevance";
        this.printType = "books";
        this.showPreorders = false;
        this.startIndex = startIndex;
    }

    // max results to return (1-40)
    setMaxResults(max) {
        // keep max results between 1 and 40
        if (parseInt(max) < 1)
            max = 1;
        else if (parseInt(max) > 40)
            max = 40;

        this.maxResults = parseInt(max);
    }

    // set the download type, epub restricts to only show e-books 
    setDownload(type) {
        if (type.toUpperCase() === "EPUB")
            this.download = "EPUB";
    }

    // filter the search results
    setFilter(filter) {
        if (filter.toLowerCase() === "ebooks")
            this.filter = "ebooks";
        else if (filter.toLowerCase() === "free-ebooks")
            this.filter = "free-ebooks";
        else if (filter.toLowerCase() === "full")
            this.filter = "full";
        else if (filter.toLowerCase() === "paid-ebooks")
            this.filter = "paid-ebooks";
        else if (filter.toLowerCase() === "partial")
            this.filter = "partial";
    }

    // restrict the results to books with the language code
    setLangRestrict(lang) {
        this.langRestrict = lang;
    }

    // sort search results
    setOrderBy(order) {
        if (order.toLowerCase() === "newest")
            this.order = "newest";
        else if (order.toLowerCase() === "relevance")
            this.order = "relevance";
    }

    // restrict search to books or magazines
    setPrintType(type) {
        if (type.toLowerCase() === "all")
            this.type = "all"
        else if (type.toLowerCase() === "books")
            this.type = "books";
        else if (type.toLowerCase() === "magazines")
            this.type = "magazines";
    }

    // show books available for preorder or not
    setShowPreorders(show) {
        if (show)
            this.showPreorders = true;
        else if (!show)
            this.showPreorders = false;
    }
    
    // index of results to start at
    setStartIndex(index) {
        if (index < 0)
            this.startIndex = 0;
        
        this.startIndex = index;
    }
}