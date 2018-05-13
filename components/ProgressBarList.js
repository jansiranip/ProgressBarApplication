import React from 'react';
import PropTypes from 'prop-types';

const ProgressBarList = (props) => {
    const { barList } = props;
    barList.sort((a, b) => { return a.id - b.id; });
    return (barList.map((bar) => {
        return (<option value={bar.id} key={bar.id}>Progress{bar.id} </option>);
    }));
};

ProgressBarList.propTypes = {
    barList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.number.isRequired,
    }).isRequired,
).isRequired,
};

export default ProgressBarList;