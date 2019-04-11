import React from 'react';
import {
  Typography, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

class Archived extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
    };
  }


  handleExpand = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { data, classes } = this.props;
    const { expanded } = this.state;
    return (
      <div className='container'>
        <Typography
          className={classes.title}
          variant='h4'
          align='center'
          color='textPrimary'
          gutterBottom
        >
          Add a manual order
        </Typography>

        { data.map((clone, i) => (
          <ExpansionPanel key={`clone-${i}`} expanded={expanded === i} onChange={this.handleExpand(i)}>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <Typography className={classes.heading}>{ `${clone.teamName} - ${clone.botName}` }</Typography>
              <Typography className={classes.secondaryHeading}> { ` / ${clone.processName} - ${clone.id}` }
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container>
                Comming soon : you will be able to place a non suggested order from here directly.
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(Archived);
