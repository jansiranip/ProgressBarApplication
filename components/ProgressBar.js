import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = (props) => {
    console.log('Progress bar');
    const { completed, limit } = props;
    const limit1 = limit.toString();
    let style;
    if (completed > limit) {
        style = {
            width: '100%', backgroundColor: '#ff1500', transition: '0.4s',
        };
    } else {
        style = {
            width: `${completed}%`, backgroundColor: '#007bff', transition: '0.4s',
        };
    }
    return (
        <div>
            <div className="progress" style={{ height: 40 }}>
                <div className="progressbar" role="progressbar" aria-valuenow={completed} aria-valuemin="0" aria-valuemax={limit1} style={style}>
                    <span>{completed}%</span>
                </div>
            </div>
            <br />
        </div>
    );
};

ProgressBar.propTypes = {
    completed: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
};

export default ProgressBar;
