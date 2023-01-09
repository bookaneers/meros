import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner, Button } from "react-bootstrap";

// import components and functions
import { fetchParts } from "../../store/utils/thunks";


const ListParts = () => {

    // give access to State and provide array with the parts that are showing up on the screen
    const listParts = useSelector((state) => state.parts);

    // define dispatch const
    const dispatch = useDispatch();


    useEffect(() => {
        // only shows the first 5 items when reload page
        if (listParts.fullPage.items.length <= 0) {
            dispatch(fetchParts({ page: 1, order: "asc", limit: "3" }))
        }
    }, [dispatch, listParts.fullPage.items.length]) // [] => only happens when page loads for the first time

    const loadMoreParts = (e) => {
        e.preventDefault(e);
        const numPage = listParts.fullPage.page + 1;
        dispatch(fetchParts({ page: numPage, order: "asc", limit: "3" }));
        console.log(numPage)
    }

    // listParts.fullPage.items.sort((a, b) => (a._partNumber) - (b._partNumber));
    return (
        <div>
            {listParts.fullPage ?
                listParts.fullPage.items.map((item) => (
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
                : null}

            {listParts.loading ?
                <div className="d-flex justify-content-center">
                    <Spinner animation='spinner-grow' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </Spinner>
                </div>
                : null}

            {!listParts.fullPage.end && !listParts.loading ?
                <Button onClick={(e) => loadMoreParts(e)}>
                    Load more parts
                </Button>
                : null}
        </div>
    )
}

export default ListParts;