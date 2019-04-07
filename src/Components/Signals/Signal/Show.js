import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ReactJson from 'react-json-view';
import styles from '../styles';

class ShowSignal extends React.Component {
  render() {
    const { signal } = this.props;
    const {
      orderStatus, orderData, changeLogs,
    } = signal;
    return (
      <React.Fragment>
        <Typography>
          State: {orderStatus}
        </Typography>
        <Typography>
          OrderData: <ReactJson src={orderData || {}} />
        </Typography>
        <Typography>
          ChangeLogs: <ReactJson src={changeLogs || {}} />
        </Typography>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ShowSignal);
