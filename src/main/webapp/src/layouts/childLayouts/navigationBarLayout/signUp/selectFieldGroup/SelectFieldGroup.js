import { connect } from 'react-redux';
import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import map from 'lodash/map';

import timezones from '../../../../../data/timezones';

class SelectFieldGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorName: "",
            errorDescription: "",
            fieldValue: ""
        }
    }

    componentWillReceiveProps (nextprops) {
    }

    render = () => {
        const { field, label, type, value, onChange, frontendError } = this.props;
        const options = map(timezones, (val, key) =>
            <option key={val} value={val}>{key}</option>
        );
        return (
            <div className={classnames("form-group", { 'has-error': (this.state.errorDescription || frontendError) })}>
                <label className="control-label">{label}</label>
                <select
                    value={this.state.timezone}
                    type={type}
                    className="form-control"
                    onChange={onChange}>
                    <option value="" >Chose your timezone</option>
                    {options}
                </select>
                {(this.state.errorDescription || frontendError) && <span className="help-block">{(this.state.errorDescription || frontendError)}</span>}
            </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectFieldGroup);
