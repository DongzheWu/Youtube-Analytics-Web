import React from 'react';

const KeywordList = ({ keywords }) =>{
    if(!keywords) return<span></span>;
    const renderedList = keywords.map(keyword => {
        return keyword + "  ";
    });
    return <span>{renderedList}</span>;

}

export default KeywordList;