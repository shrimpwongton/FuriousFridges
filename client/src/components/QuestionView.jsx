import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class QuestionView extends React.Component {
  constructor(props) {
    super(props);

    this.backToQuestions = this.backToQuestions.bind(this);
  }

  backToQuestions() {
    this.props.backToQuestions(this.props.question.id);
  }

  render() {
    return (
      <div>
        <button onClick={this.backToQuestions}>Back to Questions</button>
      </div>
    );
  }
}

export default QuestionView;
