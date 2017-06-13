import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {
  grey500, green500, grey50, lightGreen500, amber500, orange500, red500,
} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import CityOptions from '../CityOptions.json';
import Avatar from 'material-ui/Avatar';
import EditorAttachMoney from 'material-ui/svg-icons/editor/attach-money';
import ActionHome from 'material-ui/svg-icons/action/home';

class HousingComparisonCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: 'N/A',
      destination: 'N/A',
      originArray: [],
      destinationArray: [],
    };
    this.objectKeyByValue = this.objectKeyByValue.bind(this);
    this.calculateChangeInHousing = this.calculateChangeInHousing.bind(this);
    this.calculateColor = this.calculateColor.bind(this);
  }

  calculateColor() {
    let originTotal = 0;
    let destinationTotal = 0;
    for ( let value of this.state.originArray ) {
      if ( typeof value.currency_dollar_value !== 'undefined' ) {
        originTotal += value.currency_dollar_value;
      }
    }
    for ( let value of this.state.destinationArray ) {
      if ( typeof value.currency_dollar_value !== 'undefined' ) {
        destinationTotal += value.currency_dollar_value;
      }
    }
    let ratio = originTotal/destinationTotal;
    if ( ratio > 1.3 ) {
      return green500;
    } else if ( ratio > 1.0 ) {
      return lightGreen500;
    } else if ( ratio > 0.7 ) {
      return amber500;
    } else if ( ratio > 0.4 ) {
      return orange500;
    } else {
      return red500;
    }
  }
  componentWillReceiveProps() {
    this.setState({
      origin: this.objectKeyByValue(CityOptions, this.props.origin)[0],
      destination: this.objectKeyByValue(CityOptions, this.props.destination)[0],
      originArray: this.props.originArray,
      destinationArray: this.props.destinationArray,
    });
  }

  objectKeyByValue (obj, val) {
    if ( typeof val === 'undefined' ) {
      return [''];
    }
    return Object.entries(obj).find(i => i[1] === val);
  }

  calculateChangeInHousing () {
    let originTotal = 0;
    let destinationTotal = 0;
    for ( let value of this.state.originArray ) {
      if ( typeof value.currency_dollar_value !== 'undefined' ) {
        originTotal += value.currency_dollar_value;
      }
    }
    for ( let value of this.state.destinationArray ) {
      if ( typeof value.currency_dollar_value !== 'undefined' ) {
        destinationTotal += value.currency_dollar_value;
      }
    }
    let ratio = originTotal/destinationTotal;
    if ( isNaN(ratio) ) {
      return 'N/A';
    }
    if (ratio > 1) {
      return '↓' + Math.floor((originTotal - destinationTotal)/originTotal*100) + '%';
    } else {
      return '↑' + Math.floor((destinationTotal - originTotal)/originTotal*100) + '%';
    }
  }

  render() {
    const color = this.calculateColor();
    const styles = {
      growStyle: {
        flexGrow: 1,
      },
      cardText: {
        height: 150,
        position: 'relative',
        backgroundColor: color,
      },
      cutOffText: {
        right: -12,
        bottom: -40,
        position: 'absolute',
        fontFamily: "'Roboto Light', sans-serif",
        color: grey50,
        fontSize: '5em'
      },
      card: {
        backgroundColor: color,
        margin: 8,
        overflow: 'hidden',
        width: 300,
      }
    };
    return (
      <div>
        <Card
          style={styles.card}>
          <ListItem
            primaryText='Housing Pricing Comparison'
            secondaryText={this.state.origin + ' → ' + this.state.destination}
            disabled={true}
            style={{backgroundColor: grey50}}
            leftAvatar={
              <Avatar
                icon={<ActionHome/>}
                backgroundColor={color}
              />
            }
          />
          <CardText
            style={styles.cardText}>
            <span
              style={styles.cutOffText}>
              {this.calculateChangeInHousing()}
            </span>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default HousingComparisonCard;
