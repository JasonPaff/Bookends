import {useEffect, useState} from "react";
import BookInfoSlider from "../Display/BookInfoSlider";
import GoogleBookData from "../../models/GoogleBookData";

export default function BookSearchResultDisplay(props) {
    const [booksData] = useState(props.books);
    const [books, setBooks] = useState([]);
    const [sliderToggle, setSliderToggle] = useState(false);
    const [selectedBook, setSelectedBook] = useState(0);
    
    // Reload books when books changes (user selected next page or new search).
    useEffect(() => {
        setBooks(parseBookData(props.books));
    }, [props.books]);

    // Parse google books data into display data.
    function parseBookData(books) {
        let bookData = [];

        for (let c = 0; c < books.length; c++) {
            let book = new GoogleBookData(books[c]);
            bookData.push(book);
            console.log(book);
        }
        return bookData;
    }

    // Toggle book info slider.
    function toggle(index){
        setSliderToggle(true);
        setSelectedBook(index);
    }
    
    return (
        <>
            <ul className="grid grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-6 sm:gap-x-6 lg:grid-cols-8 
                            xl:grid-cols-9 xl:gap-x-8 2xl:grid-cols-12">
                {books.map((book, index) => (
                    <li key={book.etag}
                        className="relative">
                        <div className="group rounded-lg bg-gray-100 focus-within:ring-2 
                                    focus-within:ring-offset-2 focus-within:ring-offset-gray-100 
                                    focus-within:ring-indigo-500 overflow-hidden">
                            <img src={book.imageLink}
                                 alt={book.title}
                                 className="object-cover pointer-events-none group-hover:opacity-75"/>
                            <button type="button"
                                    className="absolute inset-0 focus:outline-none"
                                    onClick={() => toggle(index)}>
                                <span className="sr-only">View details for {book.title}</span>
                            </button>
                        </div>
                        <p className="mt-2 block text-sm font-medium text-gray-900 
                            truncate pointer-events-none">{book.title}</p>
                        <p className="block text-sm font-medium text-gray-500 truncate
                            pointer-events-none">{book.authorsString}</p>
                    </li>
                ))}
            </ul>
            <BookInfoSlider sliderToggle={sliderToggle} setSliderToggle={setSliderToggle}
                            index={selectedBook} book={booksData}/>
        </>
    )
}