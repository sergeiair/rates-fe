import React, {createRef, useEffect} from 'react';
import Dygraph from 'dygraphs';
import PropTypes from "prop-types";
import {historyToGraphDataSet} from "../../utils";

function PairGraph(props) {
  const wrapRef = createRef();

  useEffect(() => {
      if (props.data.length && props.pairs.length) {
          const graph = new Dygraph(
              wrapRef.current,
              historyToGraphDataSet(props.data, props.pairs[1]),
              {

                  labels: ['Date', 'Currency'],
                  sigFigs: 4,
                  width: 1280,
                  title: `${props.pairs[0]}/${props.pairs[1]}`
              }

          );
      }
  }, [props.data, props.pairs]);

  return (
    <div className="py-5">
      <div ref={wrapRef} />
        <div className="p-3 text-secondary text-center">
            Select area to zoom or dbl click to reset
        </div>
    </div>
  );
}

PairGraph.propTypes = {
    data: PropTypes.array,
    pairs: PropTypes.array
};

export default PairGraph;
