import React from 'react';
import PropTypes from "prop-types";
import moment from "moment";
import {predsToBubbleDataSet} from "../../utils";

const Chart = require('chart.js');

class PredictionsBubbleChart extends React.Component {

    color1 = '#273C2C';
    color2 = '#FED766';
    color3 = '#D7907B';

    barchart = null;

    constructor(props) {
        super(props);

        this.chartRef = React.createRef();
    }

    componentDidUpdate() {
        if (!this.barChart) {
            this.initBarChart();
        } else {
            this.cleanUpChart();
            this.updateBarChartData();
        }
    }

    render() {
        return <div className="py-5">
            <canvas ref={this.chartRef} width="1280" height="400"></canvas>
            <div className="p-3 text-secondary text-center"></div>
        </div>;
    }

    getLabels(props) {
        return props.data
            .map((_, i) => i);
    }

    getChartDataSet(props) {
        return [
            {
                label: 'Y is the initial and verification rates difference. Radius reflects the positivity of prediction',
                backgroundColor: this.color1,
                data: predsToBubbleDataSet(props.data)
            }
        ]
    }

    initBarChart() {
        this.barChart = new Chart(this.chartRef.current, {
            type: 'bubble',
            data: {
                labels: this.getLabels(this.props),
                datasets: this.getChartDataSet(this.props)
            }
        });
    }

    cleanUpChart() {
        if (!!this.barChart.datasets) {
            this.barChart.data.labels.pop();
            this.barChart.datasets.forEach((dataset) => dataset.data.pop());
            this.barChart.update();
        }
    }

    updateBarChartData() {
        this.barChart.data.labels = this.getLabels(this.props);
        this.barChart.data.datasets = this.getChartDataSet(this.props);
        this.barChart.update();
    }
}

PredictionsBubbleChart.propTypes = {
    data: PropTypes.array
};

export default PredictionsBubbleChart;
