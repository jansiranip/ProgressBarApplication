import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../redux/actions';

import ProgressBarList from './ProgressBarList';
import ProgressBars from './ProgressBars';


const serviceUrl = 'http://pb-api.herokuapp.com/bars';

class MainComponent extends Component {
    constructor(props) {
        super(props);
        console.log('MapContainer Constructor');
        this.state = {
            progressbarData: {},
            limit: 0,
            selectedProgressBar: 1,
        };
    }

    componentDidMount() {
        console.log('MapContainer did mount');
        this.requestApi();
    }


    requestApi() {
        axios.get(serviceUrl)
            .then((response) => {
                console.log(response.data);
                this.setState({ progressbarData: response.data }, this.renderControls(response.data));
            })
            .catch((e) => {
                console.log('Failed to Connecting to server and Fetch Data');
                console.log(e);
            });
        //const data = { buttons: [836, 133, -633, -233], bars: [15, 43, 72, 41], limit: 190 };
        //this.setState({ progressbarData: data }, this.renderControls(data));
    }


    makeProgress(evt) {
        console.log(evt.target.value);
        // let button=evt.target;
        const completed = evt.target.value;
        const id = this.state.selectedProgressBar;
        this.props.actions.changeProgressBar(completed, id);
    }


    handleChange(evt) {
        console.log(evt.target.value);
        this.setState({ selectedProgressBar: evt.target.value });
    }

    renderbuttons() {
        let buttonData = [];
        buttonData = this.state.progressbarData.buttons;
        console.log('render buttons');
        console.log(buttonData);
        if (buttonData !== undefined) {
            return (buttonData.map((buttons, index) => {
                let btnValue = buttons;
                if (parseInt(buttons, 10) > 0) { btnValue = `+${buttons}`; }
                return (<div className="col-sm-2" key={index}><button type="button" className="btn btn-primary" value={btnValue} onClick={this.makeProgress.bind(this)}>{btnValue}</button> </div>);
            }));
        }
    }

    renderControls(data) {
        console.log('render controls');
        console.log(data);
        let barData = [];
        const { bars, limit } = data;
        barData = bars;
        console.log(barData);
        if (barData !== undefined) {
            let id = 1;
            this.setState({ limit });
            barData.forEach((bar) => {
                this.props.actions.addProgressBar(bar, id);
                id += 1;
            });
        }
    }
    render() {
        return (
            this.props.barList.length > 0 ?
                (<div className="container">
                    <h1>Progress bar demo</h1><br />
                    <ProgressBars barList={this.props.barList} limit={this.state.limit} />
                    <div className="row">
                        <div className="col-sm-4">
                            <select className="form-control" value={this.state.selectedProgressBar} onChange={this.handleChange.bind(this)}>
                                <ProgressBarList barList={this.props.barList} />
                            </select>
                        </div>
                        {this.renderbuttons()}
                    </div>
                 </div>) : (<div className="container"><h1>Loading.....</h1></div>)
        );
    }
}

function mapStateToProps(state) {
    return {
        barList: state.barList,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

MainComponent.propTypes = {
    barList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.number.isRequired,
    }).isRequired),
    addProgressBar: PropTypes.func,
    changeProgressBar: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
