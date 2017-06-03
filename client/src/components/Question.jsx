import React from 'react';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);
  }

  answerQuestion() {
    this.props.handleQuestionClick(this.props.question.id);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addQuestion(this._name.value, this._question.value);
  }

  render() {
    return (
      <div onClick={this.answerQuestion}>
        <MuiThemeProvider>
          <ListItem
            primaryText={this.props.question.body}
            secondaryText={this.props.question.author}
            leftAvatar={<Avatar src={this.props.photoUrl} />}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Question;
