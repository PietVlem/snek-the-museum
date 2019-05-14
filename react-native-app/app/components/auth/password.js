import React, {Component} from 'react';

import {connect} from 'react-redux';
import {recover} from '../../actions/auth'; //Import your actions

import {Authentication} from './index';

class Login extends Component {
    render() {
        return (
            <Authentication recover onPress={this.recover.bind(this)}/>
        );
    }

    recover(data, errorCB) {
        this.props.recover(data, errorCB);
    }
};

export default connect(null, {recover})(Login);