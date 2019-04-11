import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, Table, TableBody, TableCell, TableRow, Paper,
} from '@material-ui/core';
import { toLocalTime } from '../../../utils';
import { typeFullName, statusFullName } from './functions';
import styles from '../styles';

class AnswerToSignal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
    };
  }

  render() {
    const { signal } = this.props;
    return (
      <Paper style={{ marginBottom: 20 }}>
        <Grid container>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>{toLocalTime(signal.orderData.dateTime / 1000)}</TableCell>
                <TableCell>Rate: {signal.orderData.rate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{signal.orderData.exchange}</TableCell>
                <TableCell>Direction: {signal.orderData.direction}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{signal.orderData.market}</TableCell>
                <TableCell>Take profit: {signal.orderData.takeProfit}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type: {typeFullName(signal.orderData.type)}</TableCell>
                <TableCell>Stop: {signal.orderData.stop}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{signal.orderData.marginEnabled === 1 ? 'Margin trading' : '' }</TableCell>
                <TableCell>Size: {signal.orderData.size === -1 ? 'Full account' : signal.orderData.size }</TableCell>
              </TableRow>
              <TableRow>
                <TableCell />
                <TableCell>Status: {statusFullName(signal.orderData.status)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(AnswerToSignal);
