import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const TooltipComponent = React.createClass({
    propTypes: {
        text: React.PropTypes.any.isRequired,
        orient: React.PropTypes.oneOf(['auto', 'left', 'right', 'top', 'bottom']),
        relativeWindow: React.PropTypes.string,
    },
    getDefaultProps() {
        return {
            orient: 'auto',
            relativeWindow: '#bilprospekt-ui-styling-holder', //Change to document
            //FIXME Remove
            style: {
                width: 50,
            },
        };
    },
    getInitialState() {
        return {
            hover: false,
            left: 0,
            top: 0,
        };
    },
    _onMouseEnter(e) {
        if (!this._tooltip || !this._holder) return;
        let {orient} = this.props;

        const tooltip = ReactDOM.findDOMNode(this._tooltip);
        const $tooltip = $(tooltip);

        const holder = ReactDOM.findDOMNode(this._holder);
        const $holder = $(holder);

        const holderHeight = $holder.innerHeight();
        const holderWidth = $holder.innerWidth();

        const $window = $(window);

        const windowWidth = $window.width();
        const windowHeight = $window.height();

        const tooltipWidth = $tooltip.innerWidth();
        const tooltipHeight = $tooltip.innerHeight();

        let scrollTop = 0;
        if (this.props.relativeWindow) {
            scrollTop = $(this.props.relativeWindow).scrollTop();
        }

        let left = $holder.position().left;
        let top = $holder.position().top + scrollTop;

        //All apply functions depending on orient
        var rightApply = (left) => left + holderWidth * 1.75;
        var leftApply = (left) => left - tooltipWidth + holderWidth / 2;
        var topApply = (top) => top - (holderHeight + tooltipHeight);
        var bottomApply = (top) => top + holderHeight * 1.75;

        //Check which orient we should use.
        //Order goes right -> left -> bottom -> top
        if (orient === 'auto') {
            //Each check looks so apply fits window
            if (rightApply(left) + tooltipWidth < windowWidth) {
                orient = 'right'
            } else if (leftApply(left) > 0)  {
                orient = 'left';
            } else if(bottomApply(top) > 0) {
                orient = 'bottom'
            } else {
                orient = 'top';
            }
        }

        if (orient === 'right') {
            left = rightApply(left);
        } else if(orient === 'left') {
            left = leftApply(left);
        } else {
            left += $holder.width() / 3;
        }

        if (orient === 'top') {
            top = topApply(top);
        } else if(orient === 'bottom') {
            top = bottomApply(top);
        } else {
            top -= tooltipHeight / 4;
        }

        this.setState({
            hover: true,
            left: left,
            top: top,
        });
    },
    _onMouseLeave() {
        this.setState({hover: false});
    },
    render() {
        var textStyle = {
            display : this.state.hover ? 'block' : 'none',
            left: this.state.left,
            top: this.state.top,
        };

        return (
                <div style={this.props.style || {}} ref={(ref) => this._holder = ref} onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave} className='bui-tooltip'>
                <div ref={(ref) => this._tooltip = ref} style={textStyle} className='bui-tooltip-text'>
                    {this.props.text}
                </div>
                {this.props.children}
            </div>
        );
    }
});

export default TooltipComponent;
