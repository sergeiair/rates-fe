import React from 'react';
import PropTypes from "prop-types";
import moment from "moment";
import {predsToGraphDataSet} from "../../utils";

const Chart = require('chart.js');


class PredictionsGraph extends React.Component {

    color3 = '#D7907B';

    graph = null;

    constructor(props) {
        super(props);

        this.chartRef = React.createRef();
    }

    componentDidUpdate() {
        if (!this.graph) {
            this.initBarChart();
        } else {
            this.cleanUpChart();
            this.updateBarChartData();
        }
    }

    render() {
        return <div className="p-3 mb-3 block">
            <canvas ref={this.chartRef} width="1280" height="400"></canvas>
        </div>;
    }

    getLabels(props) {
        return props.data.map((item) =>
            moment(item.verifyTime).format('LL'));
    }

    getChartDataSet(props) {
        return [
            {
                label: `You'r doing good job if this graph does not fall below 0`,
                backgroundColor: this.color3,
                data: predsToGraphDataSet(props.data)
            },

        ]
    }

    initBarChart() {
        this.graph = new Chart(this.chartRef.current, {
            type: 'line',
            data: {
                labels: this.getLabels(this.props),
                datasets: this.getChartDataSet(this.props)
            }
        });
    }

    cleanUpChart() {
        if (!!this.graph.datasets) {
            this.graph.data.labels.pop();
            this.graph.datasets.forEach((dataset) => dataset.data.pop());
            this.graph.update();
        }
    }

    updateBarChartData() {
        this.graph.data.labels = this.getLabels(this.props);
        this.graph.data.datasets = this.getChartDataSet(this.props);
        this.graph.update();
    }
}

PredictionsGraph.propTypes = {
    data: PropTypes.array
};

export default PredictionsGraph;
