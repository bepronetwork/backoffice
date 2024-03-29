/* eslint-disable prefer-destructuring */
import 'rc-slider/assets/index.css';
import React, { PureComponent } from 'react';
import Slider from 'rc-slider';
import PropTypes from 'prop-types';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export default class RangeTheme extends PureComponent {
    static propTypes = {
        marks: PropTypes.shape(),
        value: PropTypes.arrayOf(PropTypes.number).isRequired,
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        tipFormatter: PropTypes.func,
    };

    static defaultProps = {
        marks: {},
        tipFormatter: value => value,
    };

    onChange = (e) => {
        this.props.onChange(e[0]);
    }

    render() {
        const {
        marks, value, min, max, tipFormatter
        } = this.props;

        return (
        <div className="slider">
            <div className="slider__min">
            <p>{tipFormatter ? tipFormatter(min) : min}</p>
            </div>
            <div className="slider__max">
            <p>{tipFormatter ? tipFormatter(max) : max}</p>
            </div>
            {value ?
                <Range
                    disabled={this.props.disabled}
                    min={min}
                    onChange={this.onChange}
                    max={max}
                    defaultValue={value}
                    tipFormatter={tipFormatter}
                    marks={marks}
                    tipProps={{ visible: true }}
                    step={0.1}
                /> : null
            }
        </div>
        );
    }
}
