import React, {useEffect, useState} from "react";
import BookSearchResultDisplay from "./BookSearchResultDisplay";
import {googleBooksSearch} from "../../utils/googleSearchUtils";

export default function BookSearchResults(props) {
    const [options] = useState(props.options);
    const [searchData, setSearchData] = useState([]);

    // Update search results when new search is triggered.
    useEffect(() => {
        if (props.triggerSearch) {
            search(props.text).catch(console.error);
            props.setTriggerSearch(false);
        }
    });

    // Search google books api.
    async function search(keyword, startIndex, maxResults) {
        if (startIndex) options.startIndex = startIndex;
        if (maxResults) options.maxResults = maxResults;

        const results = await googleBooksSearch(keyword, options).catch(console.error);
        setSearchData(results);
    }

    // Go to next page of google books results.
    function nextPage() {
        options.startIndex += options.maxResults;

        // Keep the results from going past the end of the results list.
        if (options.startIndex > searchData.totalItems - options.maxResults)
            options.startIndex = searchData.totalItems - options.maxResults;

        search(props.text, options.startIndex, options.maxResults).catch(console.error);
    }

    // Go to the previous page of google books results.
    function previousPage() {
        options.startIndex -= options.maxResults;

        // Keep the results from going past the beginning of the results list.
        if (options.startIndex < 0)
            options.startIndex = 0;

        search(props.text, options.startIndex, options.maxResults).catch(console.error);
    }

    if (searchData.items) {
        return (
            <div>
                <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                     aria-label="Pagination">
                    <div className="hidden sm:block">
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{options.startIndex + 1}</span> to <span
                            className="font-medium">{options.startIndex + options.maxResults}</span> of{' '}
                            <span className="font-medium">{searchData.totalItems}</span> results
                        </p>
                    </div>
                    <div className="flex-1 flex justify-between sm:justify-end">
                        <button className="relative inline-flex items-center px-4 py-2 
                    border border-gray-300 text-sm font-medium rounded-md text-gray-700 
                    bg-white hover:bg-gray-50"
                                onClick={previousPage}>
                            Previous
                        </button>
                        <button
                            className="ml-3 relative inline-flex items-center px-4 py-2 
                   border border-gray-300 text-sm font-medium rounded-md text-gray-700 
                   bg-white hover:bg-gray-50"
                            onClick={nextPage}>
                            Next
                        </button>
                    </div>
                </nav>
                <BookSearchResultDisplay books={searchData.items}/>
            </div>
        );
    } else {
        return (
            <>
            </>
        );
    }
}
