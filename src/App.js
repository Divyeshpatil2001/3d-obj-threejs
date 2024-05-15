import Models_re from './Models_re';
import Test from './Test';
import { useState } from 'react';

function App() {
  const [showTest,SetShowTest] = useState(null)
  return (
    <>
      <>
        <button onClick={() => SetShowTest(true)}>showTest</button>
        <button onClick={() => SetShowTest(false)}>showModel</button>
      </>
      <>
        {showTest ? <Test /> : <Models_re />}
      </>
    </>
  );
}

export default App;
