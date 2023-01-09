// import dependencies and libraries
import React, { useEffect, useState } from 'react';
import {axios_services} from "../../services/axiosservices"


// import components and functions
// import ListParts from "./listparts";
import PartsPagination from './partspagination';

// build component
const ListAll = () => {
    const [parts, setParts] = useState([])
    let [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)
    const [loading, setLoading] = useState(false)
    const indexOfLastPart = currentPage * postsPerPage
    const indexOfFirstPart = indexOfLastPart - postsPerPage
    const currentParts = parts.slice(indexOfFirstPart, indexOfLastPart)

    // takes total pageNumbers as param to check if it should return if its the last page
    // brings in setActive function from partsPagination to set current  page as active
    // last if statement is to show next set of pages if the next page isn't displayed
    const nextPage = (pageNumbers, setActive, nextSet, setCurrentPages, indexOfFirstPage, indexOfLastPage) => {
        setCurrentPages(pageNumbers.slice(indexOfFirstPage, indexOfLastPage))
        if (pageNumbers.length - 1 < currentPage) {
            return
        }
        setCurrentPage(currentPage + 1)
        if (currentPage) {
            setActive(currentPage + 1)
        }
        if (currentPage % 10 === 0) {
            nextSet()
        }
    }

    // function to go back a page
    // checks if current page is the first one, if it is return
    const prevPage = (setActive, prevSet) => {
        if (currentPage === 1) {
            return
        }
        setCurrentPage(currentPage - 1)
        if (currentPage) {
            setActive(currentPage - 1)
        }
        if (((currentPage % 10) - 1) === 0) {
            prevSet()
        }
    }

    // brings in pageNumber from partsPagination component
    // sets the currentPage the page number you clicked on
    const Paginate = (pageNumber, setActive) => {
        setCurrentPage(currentPage = pageNumber)
        setActive((currentPage + 1) - 1)
        console.log('number: ', pageNumber)
        console.log("page: " + currentPage + " is active")

    }

    // fetch data from the server/database
    // loading is set to true before it fetches
    // then false once its done fetching
    useEffect(() => {
        const getParts = async () => {
            setLoading(true)
            const res = axios_services.get('api/getparts')
            const newData = await res
            setParts(newData.data)
            setLoading(false)
        }
        getParts()
    }, [])

    // return page
    return (
        // <ListParts />
        <PartsPagination parts={currentParts}
            loading={loading}
            partsPerPage={postsPerPage}
            totalParts={parts.length}
            paginate={Paginate}
            nextPage={nextPage}
            prevPage={prevPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage} />
    )
}

// export components
export default ListAll;