import React from 'react';
import AnimatedNumber from 'react-animated-number';
import Numbers from '../../../../services/numbers';

const AnimationNumber = ({number, decimals=2}) => {
    return (
    <AnimatedNumber 
        style={{
            fontSize: `16pt`,
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
        formatValue={n => decimals ? String(parseFloat(n).toFixed(decimals)) : Numbers.formatNumber(n)}/>

)};



export default AnimationNumber;
