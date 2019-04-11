import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button,
} from '@material-ui/core';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { toLocalTime } from '../../../utils';
import { typeFullName } from './functions';
import styles from '../styles';

const EDIT_SIGNAL = gql`
  mutation UpdateSignal($id: ID!, $message: cockpit_JSON! ) {
    cockpit_UpdateSignal(id: $id, message: $message) {
      id
    }
  }
`;

class AnswerToSignal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
    };
  }

  updateOrderData = (editFunction, newStatus) => {
    const { signal } = this.props;
    signal.status = newStatus;
    editFunction({
      variables: {
        id: signal.id,
        message: {
          order: signal,
        },
      },
    });
  }

  render() {
    const { signal } = this.props;
    return (
      <Mutation mutation={EDIT_SIGNAL}
        update={() => (window.location.reload())}
      >
        { editSignal => (
          <Paper style={{ marginBottom: 20 }}>
            <Grid container>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Context</TableCell>
                    <TableCell />
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
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
                    <TableCell><Button variant='contained' color='secondary' onClick={() => { this.updateOrderData(editSignal, 'MNA'); }}>
                      Refuse
                    </Button></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{signal.orderData.marginEnabled === 1 ? 'Margin trading' : '' }</TableCell>
                    <TableCell>Size: {signal.orderData.size === -1 ? 'Full account' : signal.orderData.size }</TableCell>
                    <TableCell><Button variant='contained' color='primary' onClick={() => { this.updateOrderData(editSignal, 'MAU'); }}>
                      Accept
                    </Button></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Paper>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(AnswerToSignal);
