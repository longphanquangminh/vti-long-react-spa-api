import React from 'react';

export type OnDataCallback = (data: string) => void;

interface Props {
  onData: OnDataCallback;
}

function ChildComponent(props: Props) {
  const handleClick = () => {
    props.onData('Data from child');
  };

  return (
    <div>
      <h2>Child Component</h2>
      <button onClick={handleClick}>Send data to parent</button>
    </div>
  );
}

export default ChildComponent;
