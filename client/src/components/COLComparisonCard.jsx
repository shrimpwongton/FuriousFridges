import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import Divider from 'material-ui/Divider';
import {
  grey500, green500, grey50
} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import CityOptions from '../CityOptions.json';

class COLComparisonCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: 'N/A',
      destination: 'N/A',
    };
    this.objectKeyByValue = this.objectKeyByValue.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      origin: this.objectKeyByValue(CityOptions, this.props.origin)[0],
      destination: this.objectKeyByValue(CityOptions, this.props.destination)[0],
    });
  }

  objectKeyByValue (obj, val) {
    if ( typeof val === 'undefined' ) {
      return [''];
    }
    return Object.entries(obj).find(i => i[1] === val);
  }

  render() {
    const styles = {
      growStyle: {
        flexGrow: 1,
      },
      cardText: {
        minWidth: 200,
        height: 150,
        position: 'relative',
        backgroundColor: green500
      },
      cutOffText: {
        right: -12,
        bottom: -40,
        position: 'absolute',
        fontFamily: "'Roboto Light', sans-serif",
        color: grey50,
        fontSize: '5em'
      }
    };
    return (
      <div
        style={styles.growStyle}>
        <MuiThemeProvider>
          <Card
            style={{backgroundColor: green500, margin: 8, overflow: 'hidden'}}>
            <ListItem
              primaryText='Cost of Living Comparison'
              secondaryText={this.state.origin + ' → ' + this.state.destination}
              disabled={true}
              style={{backgroundColor: grey50}}
            />
            <CardText
              style={styles.cardText}>
                        <span
                          style={styles.cutOffText}>
                          ↑90%
                        </span>
            </CardText>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default COLComparisonCard;
