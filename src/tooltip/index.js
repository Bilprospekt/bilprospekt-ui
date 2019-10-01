import React, { Component } from 'react';
import ReactDOM             from 'react-dom';
import $                    from 'jquery';
import _                    from 'underscore';
import classNames           from 'classnames';

// Components
import Portal from 'react-portal';

const Tooltip = React.createClass({
    propTypes: {
        string:   React.PropTypes.string,
        classNameChild:   React.PropTypes.string,
        rows:     React.PropTypes.array,
        header:   React.PropTypes.string,
        position: React.PropTypes.string, 
        space:    React.PropTypes.number,
        delay:    React.PropTypes.number,
        maxWidth: React.PropTypes.number,
        hide:     React.PropTypes.bool,
        element: React.PropTypes.element,
        style: React.PropTypes.object,
        offsetTop: React.PropTypes.number,
        offsetLeft: React.PropTypes.number,
    },

    getDefaultProps() {
        return {
            position: 'top',
            space: 0,
            delay: 0,
            hide: false,
        };
    },

    _showTooltip() {
        if (!this.props.hide) {
            this.refs.tooltipPortal.openPortal();
        }

        const $tParent = $(ReactDOM.findDOMNode(this.refs.cloneRef));
        const $tChild  = $(this.refs.childRef);
        const $tArrow  = $(this.refs.arrowRef);

        const pPos    = $tParent.offset();
        const pHeight = $tParent.outerHeight();
        const pWidth  = $tParent.outerWidth();
        
        const cHeight = $tChild.outerHeight();
        const cWidth  = $tChild.outerWidth();

        const arrowSize = 6; // This is taken from the sass document

        /*
         * Positioning Tooltip
         */

        let newTop;
        let newLeft;

        if (this.props.position === 'top' || this.props.position === 'bottom') {
            newLeft = ((pWidth - cWidth) / 2) + pPos.left;
        } else if (this.props.position === 'left' || this.props.position === 'right') {
            newTop = pPos.top + ((pHeight - cHeight) / 2);
        }

        if (this.props.position === 'top') {
            newTop = pPos.top - cHeight - arrowSize - this.props.space;  
        } else if (this.props.position === 'bottom') {
            newTop = pPos.top + pHeight + arrowSize + this.props.space;
        } else if (this.props.position === 'left') {
            newLeft = pPos.left - (cWidth + arrowSize + this.props.space);
        } else if (this.props.position ==='right') {
            newLeft = pPos.left + pWidth + arrowSize + this.props.space;
        }

        /*
         * Check if tooltip exceeds window borders
         */

        const wHeight = $(window).innerHeight();
        const wWidth  = $(window).innerWidth();

        const borderOffset = 10; // A tooltip can't get closer than 10px to an edge

        /* X-Axis */
        if (this.props.position === 'top' || this.props.position === 'bottom') {
            // Overflow on Left
            if (newLeft < borderOffset) {
                newLeft = borderOffset;
                $tArrow.css({left: (pPos.left + (pWidth / 2)) - (borderOffset + arrowSize)})
            // Overflow on Right
            } else if ((newLeft + cWidth) > ( wWidth- borderOffset)) {
                newLeft = wWidth - (cWidth + borderOffset);
                $tArrow.css({left: pPos.left - (wWidth - (cWidth + borderOffset + (pWidth / 2) - arrowSize))});
            }
        } else if (this.props.position === 'left' || this.props.position === 'right') {
            // Overflow on Right
            if ((newLeft + cWidth) > wWidth) {
                newLeft = pPos.left - cWidth - arrowSize - this.props.space;
                $tChild.toggleClass('tooltip-position-right tooltip-position-left');
            // Overflow on Left
            } else if (newLeft < 0) {
                newLeft = pPos.left + pWidth + arrowSize + this.props.space;
                $tChild.toggleClass('tooltip-position-left tooltip-position-right');
            }
        }

        /* Y-Axis */
        if (this.props.position === 'left' || this.props.position === 'right') {
            const scrollFromTop = $(window).scrollTop();
            if (newTop < (scrollFromTop - borderOffset)) {
                newTop = scrollFromTop + borderOffset;
                $tArrow.css({top: (pPos.top - scrollFromTop) + (arrowSize / 2)});
            } else if ((newTop + cHeight) > (scrollFromTop + wHeight - borderOffset)) {
                newTop = (scrollFromTop + wHeight) - (cHeight + borderOffset);
                $tArrow.css({top: pPos.top - (scrollFromTop + wHeight) + cHeight + (pHeight / 2) + (arrowSize / 2)});
            }
        }

        if (this.props.offsetTop) {
            newTop = newTop + this.props.offsetTop;
        }
        if (this.props.offsetLeft) {
            newLeft = newLeft + this.props.offsetLeft;
        }

        $tChild.css({
            top: newTop,
            left: newLeft,
        });

        $tChild.delay(this.props.delay).fadeIn(50);
    },

    _hideTooltip() {
        this.refs.tooltipPortal.closePortal();
    },

    render() {
        // this.props.children
        let tooltipChild;
        if (!this.props.children) {
            console.error('[BUI Tooltip] You have to add a child for this component to work correctly!');
            tooltipChild = <p>Tooltip Child</p>;
        } else if (this.props.children.length > 1) {
            console.error('[BUI Tooltip] You can only have one child for this component to work correctly!');
            tooltipChild = <p>Tooltip Child</p>;
        } else {
            tooltipChild = this.props.children;
        }

        // this.props.string & this.props.rows
        let tooltipContent;
        if (this.props.string) {
            tooltipContent = (
                <p className='tooltip-text'>{this.props.string}</p>
            );
        } else if (this.props.rows) {
            tooltipContent = _(this.props.rows).map((row, index) => {
                return (
                    <p key={index} className='tooltip-text'>{row}</p>
                );
            });
        } else if (this.props.element) {
            tooltipContent = this.props.element;
        } else {
            tooltipContent = null;
            console.error('[BUI Tooltip] You have to declare this.props.string[string] or this.props.rows[array]!');
        }

        // this.props.maxWidth
        const childStyle = (this.props.maxWidth) ? {maxWidth: this.props.maxWidth} : null ;
        const childClass = classNames(`bui-tooltip-child tooltip-position-${this.props.position}`, {
            'has-max-width-limit': this.props.maxWidth,
        });

        // this.props.header
        const tooltipHeader = (this.props.header)
            ? <p className='tooltip-header'>{this.props.header}</p>
            : null ;

        return (
            <div className='bui-tooltip-parent' style={this.props.style}>
                {React.cloneElement(tooltipChild, {
                    onMouseOver: this._showTooltip,
                    onMouseOut: this._hideTooltip,
                    ref: 'cloneRef'
                })}
                <Portal ref='tooltipPortal' closeOnEsc>
                    <div className={childClass + ' ' + this.props.classNameChild } style={childStyle} ref='childRef'>
                        <div className='tooltip-arrow' ref='arrowRef' />
                        {tooltipHeader}
                        {tooltipContent}
                    </div>
                </Portal>
            </div>
        );
    }
});

export default Tooltip;
