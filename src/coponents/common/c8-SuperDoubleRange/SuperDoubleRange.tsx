import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import s from '../c8-SuperDoubleRange/SuperDoubleRange.module.css'


type SuperDoubleRangePropsType = {
    onChangeRange?: (value: [number, number]) => void
    value?: [number, number]
    step?: number
    // min, max, step, disable, ...
}

const AirbnbSlider = withStyles({
    root: {
        color: '#52af77', //цвет слайдера
        height: 3,
        padding: '13px 0',
    },
    thumb: {
        height: 27,
        width: 27,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -10,
        marginLeft: -13,
        // boxShadow: '#ebebeb 0 2px 2px',
        // '&:focus, &:hover, &$active': {
        //     // boxShadow: '#ccc 0 2px 3px 1px',
        //     // boxShadow: 'inherit',
        // },
        '& .bar': {
            // display: inline-block !important;
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    active: {},
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        // color: '#d8d8d8',
        // opacity: 1,
        height: 8,
        borderRadius: 4,
    },
})(Slider);

function AirbnbThumbComponent(props: any) {
    return (
        <span {...props}>
      <span className="bar"/>
      <span className="bar"/>
      <span className="bar"/>
    </span>
    );
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange,
        value,
        step,
        // min, max, step, disable, ...
        ...restProps
    }
)  => {

    const handleChange = (event: React.SyntheticEvent<EventTarget>, newValue: any) => {
        console.log(event.currentTarget)
        onChangeRange && onChangeRange(newValue)

    };

    return (
        <div className={s.root}>
            <span className={s.text}>{value && value[0]}</span>
            <AirbnbSlider
                ThumbComponent={AirbnbThumbComponent}
                getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                // defaultValue={[20, 40]}
                value={value}
                onChange={handleChange}
            />
            <span className={s.text}>{value && value[1]}</span>
        </div>
    );
}

export default SuperDoubleRange;
