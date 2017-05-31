import React from 'react';

const Answer = (props) => (
  <div style={styles}>
    {`>>>>>${props.id}) ${props.author}: ${props.body}`}
  </div>
);

const styles = {
  'borderStyle': 'solid',
  'width': '1000px',
  'fontSize': '24px'
};

export default Answer;
