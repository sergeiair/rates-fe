import React from 'react';

function logProps(WrappedComponent) {
    return class extends React.Component {
        componentDidMount() {
            console.log('Mounted ' + WrappedComponent.name);
        }

        componentDidUpdate(prevProps) {
            console.log('Current props: ', this.props);
            console.log('Previous props: ', prevProps);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
}

export default logProps;
