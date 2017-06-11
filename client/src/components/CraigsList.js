import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import Divider from 'material-ui/Divider';
import {
  grey500, white, green500,
} from 'material-ui/styles/colors';



class CraigsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: []
    };
  }

  componentWillReceiveProps() {
    axios.get('/craigslist')
      .then(res => {
        var sample = [];
        for (var key in res.data) {
          sample.push(res.data[key]);
        }
        this.setState({listings: sample.slice(0, 10)});
      });
  }


  render () {
    const styles = {
      card: {
        height: 400,
      },
      gridList: {
        width: '100%',
        height: '80%',
        overflowY: 'auto',
      },
    };

    return (
       <div>
        <Card
          style={styles.card}>
          <CardHeader
            title='Craiglist for your area'
            subtitle={'Find furniture for you new place!'}
          />
          <Divider/>
          <GridList
            cellHeight={100}
            style={styles.gridList}
          >
            {this.state.listings.map((listing) => (
              <GridTile
                key={listing.title}
                title={listing.title}
                subtitle={listing.price}
                cols = {2}
                rows = {2}
              >
                <a target="_blank" href={listing.url}>
                  
                </a>
              </GridTile>
            ))}
          </GridList>
        </Card>
      </div>
    );
  }
}

export default CraigsList;
