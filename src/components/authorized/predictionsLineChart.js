import React from 'react';
import PropTypes from "prop-types";
import moment from "moment";

const Chart = require('chart.js');

class PredictionsLineChart extends React.Component {

    color1 = '#273C2C';
    color2 = '#FED766';
    color3 = '#D7907B';
    colorTrans = 'transparent';

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
        return props.data.map((item) => moment(item.verifyTime).format('LLL'));
    }

    getData(props) {
        const initialRates = props.data.map((item) => item.realRate);
        const predRates = props.data.map((item) => item.predRate);
        const finalRates = props.data.map((item) => item.finalRate);

        return {initialRates, predRates, finalRates}
    }

    getChartDataSet(props) {
        const {initialRates, predRates, finalRates} = this.getData(props);

        return [
            {
                label: 'Initial rate',
                backgroundColor: this.colorTrans,
                borderColor: this.color1,
                data: initialRates
            },
            {
                label: 'Prediction rate',
                backgroundColor: this.colorTrans,
                borderColor: this.color2,
                data: predRates
            },
            {
                label: 'Verification rate',
                backgroundColor: this.colorTrans,
                borderColor: this.color3,
                data: finalRates
            }
        ]
    }

    initBarChart() {
        this.barChart = new Chart(this.chartRef.current, {
            type: 'line',
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

PredictionsLineChart.propTypes = {
    data: PropTypes.array
};

export default PredictionsLineChart;
