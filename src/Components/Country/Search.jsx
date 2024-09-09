import React, { useState } from 'react';

function Search({ renderComponent, setSearchName }) {
    const [name, setName] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault(); // Correctly prevent the default form submission
        setSearchName(name);
       
        
    };

    if (renderComponent) {
        return (
            <form onSubmit={handleSubmit} className="relative">
                <input 
                    type="search" 
                    name="search" 
                    placeholder="Search..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setName(e.target.value)} value={name}
                />
                <button 
                    type="submit" 
                    className="absolute inset-y-0 right-0 flex items-center px-4 border-l border-gray-300 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M15.65 12.65a6.5 6.5 0 1 0-9.2-9.2 6.5 6.5 0 0 0 9.2 9.2z"></path>
                    </svg>
                </button>
            </form>
        );
    }

    return null;
}

export default Search;
