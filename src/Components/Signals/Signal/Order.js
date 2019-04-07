import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

const EDIT_SIGNAL = gql`
  mutation UpdateSignal($id: ID!, $state: cockpit_SignalStateEnum, $orderData: cockpit_JSON, $reason: cockpit_JSON ) {
    cockpit_UpdateSignal(id: $id, state: $state, orderData: $orderData, reason: $reason) {
      id
    }
  }
`;

const CREATE_SIGNAL = gql`
  mutation CreateSignal($cloneId: String!, $orderData: cockpit_JSON, $reason: cockpit_JSON ) {
    cockpit_CreateSignal(cloneId: $cloneId, state: "ACCEPTED", orderData: $orderData, reason: $reason) {
      id
    }
  }
`;


class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: this.props.signal ? this.props.signal.orderData : {
        creator: 'H',
        dateTime: 1551579300000,
        owner: 'U',
        exchange: 'Poloniex',
        market: 'BTC/USDST',
        marginEnabled: true,
        type: 'M',
        rate: 6368,
        stop: 6463,
        takeProfit: 6463,
        direction: 'S',
        size: null,
        status: 'MAU',
        sizeFilled: 0.00045,
        exitOutcome: 'SL',
      },
    };
  }

  render() {
    const { orderData } = this.state;
    const { signal, clone } = this.props;
    if (signal) {
      return (
        <Mutation mutation={EDIT_SIGNAL}
          update={() => (window.location.reload())}
        >
          {editSignal => (
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editSignal({
                    variables: {
                      id: signal.id,
                      orderData,
                    },
                  });
                }}
              >
                <Typography>
                  OrderData
                </Typography>
                <JSONInput
                  placeholder = { orderData }
                  locale = { locale }
                  height = '550px'
                  onChange = {({ jsObject }) => { this.setState({ orderData: jsObject, orderChanged: true }); }}
                />
                <button type="submit">PlaceOrder</button>
              </form>
            </div>
          )}
        </Mutation>
      );
    }
    return (
      <Mutation mutation={CREATE_SIGNAL}
        update={() => (window.location.reload())}
      >
        {createSignal => (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createSignal({
                  variables: {
                    cloneId: clone.id,
                    orderData,
                  },
                });
              }}
            >
              <Typography>
                OrderData
              </Typography>
              <JSONInput
                placeholder = { orderData }
                locale = { locale }
                height = '550px'
                onChange = {({ jsObject }) => { this.setState({ orderData: jsObject, orderChanged: true }); }}
              />
              <button type="submit">PlaceOrder</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(Order);
