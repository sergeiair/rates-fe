import React, {createRef, useEffect} from 'react';
import Dygraph from 'dygraphs';
import PropTypes from "prop-types";
import {historyToGraphDataSet} from "../../utils";

function PairGraph(props) {
  const wrapRef = createRef();

  useEffect(() => {
      if (props.data.length && props.pairs.length) {
          new Dygraph(
              wrapRef.current,
              historyToGraphDataSet(props.data, props.pairs[1]),
              {

                  labels: ['Date', 'Rate'],
                  sigFigs: 4,
                  width: 1280
              }

          );
      }
  }, [props.data, props.pairs, wrapRef]);

  return (
      <div className="my-5">
         <div className="block p-3">
             <div ref={wrapRef} />
             <small className="d-block mt-2 text-gray text-center">
                 Select area to zoom or dbl click to reset
             </small>
         </div>
      </div>
  );
}

PairGraph.propTypes = {
    data: PropTypes.array,
    pairs: PropTypes.array
};

export default PairGraph;
