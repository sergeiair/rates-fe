import React from 'react';

function logProps(WrappedComponent) {
    return class extends React.PureComponent {

        componentDidMount() {
            //console.log(this.props)
        }

        componentDidUpdate(prevProps) {
            //console.log(this.props)
        }

        render() {
            return <WrappedComponent
                {...this.props} />;
        }
    }
}

export default logProps;
