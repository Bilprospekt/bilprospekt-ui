import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import classNames from 'classnames';

const LoaderComponent = React.createClass({
    propTypes: {
        width: React.PropTypes.number,
    },
    getDefaultProps() {
        return {
            width: 50,
        };
    },
    getInitialState() {
        return {

        };
    },
    render() {
        const widthStyle = ({
            width: this.props.width + '%',
        });

        const parentClass = classNames('bui-loader-parent', {
            'bui-message-is-showing': this.props.message,
        });

        let loaderMessage = (this.props.message) ? <p className='bui-loader-message'>{this.props.message}</p> : null ;

        return (
            <div className={parentClass}>
                {loaderMessage}
                <div className='bui-loader-bar' style={widthStyle}>
                    <div className='bui-bar' />
                </div>
            </div>
        );
    }
});

export default LoaderComponent;
