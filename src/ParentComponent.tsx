import React, { useState } from 'react';
import ChildComponent, { OnDataCallback } from './ChildrenComponent';

function ParentComponent() {
  const [dataFromChild, setDataFromChild] = useState<string | null>(null);

  const handleDataFromChild: OnDataCallback = (data: string) => {
    setDataFromChild(data);
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <ChildComponent onData={handleDataFromChild} />
      <p>Data from child: {dataFromChild}</p>
    </div>
  );
}

export default ParentComponent;
