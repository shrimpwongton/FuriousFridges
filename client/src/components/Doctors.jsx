import React from 'react';
import axios from 'axios';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import DatePicker from 'material-ui/DatePicker';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Avatar from 'material-ui/Avatar';
import HealthIcon from 'material-ui/svg-icons/image/healing';
import Arrow from 'material-ui/svg-icons/navigation/arrow-forward';
import Divider from 'material-ui/Divider';
import {ListItem} from "material-ui/List";
import {
  blueGrey300, green500
} from 'material-ui/styles/colors';


class Doctors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doctors: []
    };
  }

  componentWillReceiveProps() {
    axios.get('/doctors')
      .then(res => {
        var sample = [];
        for (var key in res.data) {
          sample.push(res.data[key]);
        }
        this.setState({doctors: sample});
      });
  }

  render() {

    const styles = {
      card: {
        margin: 8,
        overflow: 'hidden',
        width: 300,
      },
    };

    return (
      <div
        style={{marginBottom: 24}}>
        <Card
          style={styles.card}>
          <ListItem
            primaryText='Doctors'
            secondaryText={'Nearby healthy professionals'}
            disabled={true}
            leftAvatar={
              <Avatar
                icon={<HealthIcon/>}
                backgroundColor={blueGrey300}
              />
            }
          />
          <Divider/>
          {this.state.doctors.length > 0 ? this.state.doctors.map((doctor) => (
            <ListItem
              key={doctor.name}
              primaryText={doctor.name}
              secondaryText={doctor.address}
              disabled={true}
              leftAvatar={
                <Avatar>
                  {doctor.name[0]}
                </Avatar>
              }
            >
            </ListItem>
          )) :
            <ListItem
              primaryText = 'No doctors in the area'
            />
          }
        </Card>
      </div>
    );
  }
}

export default Doctors;
