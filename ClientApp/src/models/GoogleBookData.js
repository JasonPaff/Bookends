import {googleBookUrlSearch} from "../utils/googleSearchUtils";

export default class GoogleBookData {
    constructor(bookData) {
        this.authors = [];
        this.authorsString = "";
        this.averageRating = 0;
        this.categories = [];
        this.categoriesString = "";
        this.description = "";
        this.etag = "";
        this.imageLink = "https://i.imgur.com/Jb48Ac4.png";
        this.language = "";
        this.pageCount = 0;
        this.printType = "";
        this.publishedDate = "0-0-0000";
        this.publisher = "";
        this.ratingsCount = 0;
        this.selfLinkId = "";
        this.subtitle = "";
        this.title = "";

        if (bookData)
            this.parseBookData(bookData).catch(console.error);
    }

    async parseBookData(bookData) {
        if (bookData === undefined) return;

        if (bookData.etag) this.etag = bookData.etag;

        if (bookData.volumeInfo === undefined) return;

        if (bookData.volumeInfo.averageRating) this.averageRating = bookData.volumeInfo.averageRating;
        if (bookData.volumeInfo.description) this.description = bookData.volumeInfo.description;
        if (bookData.volumeInfo.language) this.language = bookData.volumeInfo.language;
        if (bookData.volumeInfo.pageCount) this.pageCount = bookData.volumeInfo.pageCount;
        if (bookData.volumeInfo.printType) this.printType = bookData.volumeInfo.printType;
        if (bookData.volumeInfo.publishedDate) this.publishedDate = bookData.volumeInfo.publishedDate;
        if (bookData.volumeInfo.publisher) this.publisher = bookData.volumeInfo.publisher;
        if (bookData.volumeInfo.ratingsCount) this.ratingsCount = bookData.volumeInfo.ratingsCount;
        if (bookData.volumeInfo.subtitle) this.subtitle = bookData.volumeInfo.subtitle;
        if (bookData.volumeInfo.title) this.title = bookData.volumeInfo.title;

        if (bookData.volumeInfo.imageLinks) {
            if (bookData.volumeInfo.imageLinks.thumbnail)
                this.imageLink = bookData.volumeInfo.imageLinks.thumbnail;
        }

        if (bookData.authors) {
            this.authors = [];
            this.authorsString = "";
            for (let c = 0; c < bookData.authors.length; c++) {
                this.authors.push(bookData.authors[c]);
                this.authorsString += (bookData.authors[c] + "\n");
            }
        }

        if (bookData.categories) {
            this.categories = [];
            this.categoriesString = "";
            for (let c = 0; c < bookData.categories.length; c++) {
                this.categories.push(bookData.categories[c]);
                this.categoriesString += (bookData.categories[c] + "\n");
            }
        }

        if (bookData.id) {
            this.selfLinkId = bookData.id;

            const advancedBookData = await googleBookUrlSearch(this.selfLinkId);

            if (advancedBookData === undefined) return;

            if (advancedBookData.volumeInfo === undefined) return;

            if (advancedBookData.volumeInfo.title) this.title = advancedBookData.volumeInfo.title;
            if (advancedBookData.volumeInfo.publisher) this.publisher = advancedBookData.volumeInfo.publisher;
            if (advancedBookData.volumeInfo.publishedDate) this.publishedDate = advancedBookData.volumeInfo.publishedDate;
            if (advancedBookData.volumeInfo.description) this.description = advancedBookData.volumeInfo.description;
            if (advancedBookData.volumeInfo.pageCount) this.pageCount = advancedBookData.volumeInfo.pageCount;

            if (advancedBookData.volumeInfo.imageLinks) {
                if (advancedBookData.volumeInfo.imageLinks.thumbnail)
                    this.imageLink = advancedBookData.volumeInfo.imageLinks.thumbnail;
            }

            if (advancedBookData.volumeInfo.authors) {
                this.authors = [];
                this.authorsString = "";
                for (let c = 0; c < advancedBookData.volumeInfo.authors.length; c++) {
                    this.authors.push(advancedBookData.volumeInfo.authors[c]);
                    this.authorsString += (advancedBookData.volumeInfo.authors[c] + "\n");
                }
            }

            if (advancedBookData.volumeInfo.categories) {
                this.categories = [];
                this.categoriesString = "";
                for (let c = 0; c < advancedBookData.volumeInfo.categories.length; c++) {
                    this.categories.push(advancedBookData.volumeInfo.categories[c]);
                    this.categoriesString += (advancedBookData.volumeInfo.categories[c] + "\n");
                }
            }
        }
    }
}