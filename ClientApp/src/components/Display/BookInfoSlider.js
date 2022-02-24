import {Fragment, useEffect, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XIcon} from '@heroicons/react/outline'
import RatingStars from "./RatingStars";
import AddToShelfDropdown from "../Bookshelf/AddToShelfDropdown";
import PurchaseBookDropdown from "../Shopping/PurchaseBookDropdown";

export default function BookInfoSlider(props) {
    const [open, setOpen] = useState(props.sliderToggle);
    const [book, setBook] = useState(props.book[props.book[props.index]]);

    // Open/close slider using slider toggle prop.
    useEffect(() => {
        setOpen(props.sliderToggle);
    }, [props.sliderToggle]);

    // Update book info using slider toggle prop
    useEffect(() => {
        setBook(props.book[props.index]);
        console.log(book);
    }, [props.sliderToggle]);

    if (book === undefined) {
        return (<></>);
    } else {
        return (
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
                    <div className="absolute inset-0 overflow-hidden">
                        <Dialog.Overlay className="absolute inset-0"/>

                        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <div className="w-screen max-w-lg">
                                    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                                        <div className="px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title
                                                    className="text-lg font-medium text-gray-900">
                                                    <div className="flex">
                                                        <img src={book.volumeInfo.imageLinks.thumbnail} alt=""/>
                                                        <div className="flex flex-col">
                                                            <p className="mt-2 ml-2 block text-sm font-medium text-gray-900 
                                                                truncate pointer-events-none">{book.volumeInfo.title}</p>
                                                            <p className="block ml-2 text-sm font-medium truncate text-gray-500 
                                                                pointer-events-none">{book.volumeInfo.authors}</p>
                                                            <RatingStars
                                                                starCount={parseInt(book.volumeInfo.averageRating)}
                                                                totalReviews={book.volumeInfo.ratingsCount}/>
                                                            <p className="mt-2 ml-2 block text-sm font-medium text-gray-900 
                                                                truncate pointer-events-none">{book.volumeInfo.categories}</p>
                                                            <div>
                                                                <AddToShelfDropdown/>
                                                                <PurchaseBookDropdown/>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </Dialog.Title>
                                                <div className="ml-3 h-7 flex items-center">
                                                    <button
                                                        type="button"
                                                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 
                                                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                        onClick={() => {
                                                            setOpen(false);
                                                            props.setSliderToggle(false);
                                                        }}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XIcon className="h-6 w-6" aria-hidden="true"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                            <div className="absolute inset-0 px-4 sm:px-6">
                                                <div className="h-full"
                                                     aria-hidden="true">
                                                    <p className="mt-2 ml-2 block text-md font-medium text-gray-900 
                                                                truncate pointer-events-none">Description</p>
                                                    <p className="block ml-2 text-md text-gray-400">
                                                        {book.volumeInfo.description}
                                                    </p>
                                                    <p className="mt-2 ml-2 block text-md font-medium text-gray-900 
                                                                truncate pointer-events-none">Publisher</p>
                                                    <p className="block ml-2 text-sm text-gray-400">
                                                        {book.volumeInfo.publisher}
                                                    </p>
                                                    <p className="mt-2 ml-2 block text-md font-medium text-gray-900 
                                                                truncate pointer-events-none">Published</p>
                                                    <p className="block ml-2 text-sm text-gray-400">
                                                        {book.volumeInfo.publishedDate}
                                                    </p>
                                                    <p className="mt-2 ml-2 block text-md font-medium text-gray-900 
                                                                truncate pointer-events-none">Page Count</p>
                                                    <p className="block ml-2 text-sm text-gray-400">
                                                        {book.volumeInfo.pageCount}
                                                    </p>
                                                    <p className="mt-2 ml-2 block text-md font-medium text-gray-900 
                                                                truncate pointer-events-none">Language</p>
                                                    <p className="block ml-2 text-sm text-gray-400">
                                                        {book.volumeInfo.language}
                                                    </p>
                                                    <p className="mt-2 ml-2 block text-md font-medium text-gray-900 
                                                                truncate pointer-events-none">ISBN-13</p>
      
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        );
    }
}
