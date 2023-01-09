import React, { useState } from "react";
import { Spinner } from "react-bootstrap";


// import all props
const PartsPagination = ({ parts, loading, partsPerPage, totalParts, paginate, nextPage, prevPage, currentPage, setCurrentPage }) => {

    // gets total count of page numbers depending on totals parts per page 
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalParts / partsPerPage); i++) {
        pageNumbers.push(i)
    }

    // // state for active page, always starts at 1
    const [isActive, setActive] = useState(1)
    const [pagePerPagination] = useState(10)
    let [indexOfLastPage, setLastPage] = useState(currentPage * pagePerPagination)
    let [indexOfFirstPage, setFirstPage] = useState(indexOfLastPage - pagePerPagination)
    let [currentPages, setCurrentPages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    // can't put carrots in html, will cause an error
    const prevPages = "<<"
    const nextPages = ">>"

    // button to see next 10 pages //
    const nextSet = () => {
        // if the last page - 10 is equal to first page of page set return or if first page of set + 10 is greater than total pages
        if (pageNumbers.length - 10 === indexOfFirstPage || indexOfFirstPage + 10 > pageNumbers.length) {
            return
        }
        // sets first page of the set to the last page
        setFirstPage(indexOfFirstPage = indexOfLastPage)
        // add the total pages per set to the last page in the set
        setLastPage(indexOfLastPage += pagePerPagination)
        // function to set the array of pageNumbers to the set we want it to
        setCurrentPages(pageNumbers.slice(indexOfFirstPage, indexOfLastPage))
        setCurrentPage(currentPage = indexOfFirstPage += 1)
        setActive(currentPage)
    }

    // button to see previous 10 pages //
    const prevSet = () => {
        // if your're in the first set of pages, return
        if (indexOfFirstPage === 0) {
            return
        }
        // sets first page of the set to the current set minus the pagePerPagination
        setFirstPage(indexOfFirstPage -= pagePerPagination)
        // sets last page of the set to the current set minus the pagePerPagination
        setLastPage(indexOfLastPage -= pagePerPagination)
        // function to set the array of pageNumbers to the set we want it to
        setCurrentPages(pageNumbers.slice(indexOfFirstPage, indexOfLastPage))
        // set current page to the last page of the set
        setCurrentPage(currentPage = indexOfLastPage)
        // sets the current page as active
        setActive(currentPage)
    }

    // if its still fetching show this
    if (loading) {
        return <Spinner animation="border" variant="primary" />;
    }

    return <div>
        {<div className="text-center mb-4" >
            <button onClick={() => prevPage(setActive, prevSet, setCurrentPages, pageNumbers)} className={`btn prev-next-btn me-2  ${isActive === 1 && 'disable'}`}>prev</button>
            <button onClick={() => prevSet()} className="btn">{prevPages}</button>
            {currentPages.map((page) => (

                <button onClick={() => paginate(page, setActive)} key={page} className={`btn page-numbers mx-1 number-btn  ${isActive === page && 'isActive'}`}>
                    {page}
                </button>
            ))
            }
            <button onClick={() => nextSet()} className="btn">{nextPages}</button>
            <button onClick={() => nextPage(pageNumbers, setActive, nextSet, setCurrentPages, indexOfFirstPage, indexOfLastPage)}
                className={`btn prev-next-btn ms-2 ${isActive === pageNumbers.length && 'disable'}`}>next</button>
        </div>
        }
        {
            parts.map((item) => (
                <div key={item._id}>
                    <h5>{item.partNumber} - {item.description} - {item._id}</h5>
                    <ul className='list-unstyled'>
                        {item.processes ?
                            item.processes.map((process, index) => (
                                <li key={index} >
                                    <h5>{process.processID} - {process.process} - {process.setupTime} - {process.cycleTime} </h5>
                                </li>
                            ))
                            : null}
                    </ul>
                    <hr />
                </div>
            ))
        }




    </div>


}

export default PartsPagination;