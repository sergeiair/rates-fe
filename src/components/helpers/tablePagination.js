import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

function TablePagination(props) {
    const [value, setState] = useState({
       perPage: 10,
       skip: 0,
       limit: 10,
       currentPage: 1
    });


    useEffect(() => {
        if (props.tableNode.current && !!props.itemsNumber) {
            const rows = Array.from(props.tableNode.current.querySelectorAll('tbody tr'));

            rows.forEach((el, index) => {
                if (index >= value.skip && index <= value.limit) {
                    el.style.display = 'table-row';
                } else {
                    el.style.display = 'none';
                }
            });
        }

    }, [props.itemsNumber, props.tableNode.current, value.skip, value.limit]);


    return (
        <div className="d-flex align-items-center justify-content-center text-small">
            <div className="d-flex align-items-center justify-content-center">
                <select id="onPage"
                    className={`select-trans as-button`}
                    defaultValue={value.perPage}
                    onChange={(ev) => {
                        const perPage = parseInt(ev.target.value, 10);

                        setState({
                            ...value,
                            currentPage: 1,
                            skip: 0,
                            limit: perPage,
                            perPage,
                        })
                    }}>

                        <option value={10}>Per page 10</option>
                        <option value={25}>Per page 25</option>
                        <option value={50}>Per page 50</option>
                        <option value={100}>Per page 100</option>
                </select>
            </div>

            <div className="d-flex align-items-center justify-content-center ml-4">
                { [...Array(Math.ceil((props.itemsNumber || 1) / (value.perPage || 1)))]
                    .map((_,i) =>
                        <button key={i}
                            className={`btn-pagination ${value.currentPage === (i + 1) ? 'text-strong' : ''}`}
                            onClick={() => setState({
                                ...value,
                                skip: value.perPage * i,
                                limit: value.perPage * (i + 1),
                                currentPage: i + 1
                            })}>
                                {i + 1}
                        </button>
                    )
                }
            </div>
        </div>
    )
}

TablePagination.propTypes = {
    tableNode: PropTypes.object,
    itemsNumber: PropTypes.number
};

export default TablePagination;




