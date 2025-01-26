import React from 'react';
import './App.css';
import { ThemeExample } from '../themed/ThemeExample';
import WizardExample from '../basic/WizardExample';
import { AdvancedExample } from '../advanced/AdvancedExample';

function App() {
  return (
    <div className="App">
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h3>Normal Form</h3>
          <WizardExample />
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h3>Temalı Form</h3>
          <ThemeExample />
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h3>Validasyon ve Koşullu Adımlar</h3>
          <AdvancedExample />
        </div>
      </div>
    </div>
  );
}

export default App;