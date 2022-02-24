import React, {useState} from 'react';
import BookSearchResults from "./BookSearchResults";
import GoogleSearchOptions from "../../models/GoogleSearchOptions";

export default function GoogleKeywordSearch(props) {
    const [searchText, setSearchText] = useState("");
    const [previousSearchText, setPreviousSearchText] = useState("");
    const [triggerSearch, setTriggerSearch] = useState(false);
    const [options] = useState(new GoogleSearchOptions(0, 40));
    
    // Triggers a new google books search.
    async function triggerBookSearch() {
        // Only search when a new keyword is entered
        if (searchText.toUpperCase() !== previousSearchText.toUpperCase()) {
            setPreviousSearchText(searchText);
            setTriggerSearch(true);
        }
    }

    return (
        <div className="ml-5 mr-5">
            <label htmlFor="email" className="block text-sm font-medium ml-2">
                Search for Books by Keywords
            </label>
            <div className="mt-1 flex flex-wrap rounded-md shadow-sm">
                <div className="relative flex items-stretch flex-grow focus-within:z-10">
                    <input type="text" name="email" id="email" placeholder="Enter title to search"
                           className="focus:ring-indigo-500 focus:border-indigo-500 block w-full 
                                rounded-none rounded-l-md sm:text-sm border-gray-300"
                           onChange={handleChange}/>
                </div>
                <button type="button" onClick={triggerBookSearch} className="-ml-px relative inline-flex items-center 
                        space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md
                        text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 
                        focus:ring-indigo-500 focus:border-indigo-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 
                              5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 
                              4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                    <span>Search</span>
                </button>
            </div>
            <BookSearchResults options={options} text={searchText} triggerSearch={triggerSearch} setTriggerSearch={setTriggerSearch}/>
        </div>
    );

    // Update search keyword on textbox input.
    function handleChange(e) {
        setSearchText(e.target.value);
    }
}