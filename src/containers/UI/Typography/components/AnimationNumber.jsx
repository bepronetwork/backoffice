import React from 'react';
import AnimatedNumber from 'react-animated-number';
import Numbers from '../../../../services/numbers';

const AnimationNumber = ({number, decimals}) => {
    return (
    <AnimatedNumber 
        style={{
            transition: '0.4s ease-out',
            transitionProperty:
                'background-color, color, opacity'
        }}
        frameStyle={perc => (
            perc === 100 ? {} : {opacity: 1}
        )}
        duration={300}
        value={number}
        component="text"
        formatValue={n => decimals ? Numbers.toFloat(n) : Numbers.formatNumber(n)}/>

)};



export default AnimationNumber;
