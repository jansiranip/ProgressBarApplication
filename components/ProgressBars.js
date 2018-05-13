import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';

const ProgressBars = (props) => {
    const { barList, limit } = props;
    barList.sort((a, b) => a.id - b.id);
    return (barList.map((bar) => (<div key={bar.id}><ProgressBar completed={bar.completed} key={bar.id} limit={limit} /><br /> </div>)));
};

ProgressBars.propTypes = {
    barList: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            completed: PropTypes.number.isRequired,
            
        }).isRequired,
    ).isRequired,
};

export default ProgressBars;