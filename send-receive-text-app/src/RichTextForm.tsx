import React, { useState } from 'react';
import 'draft-js/dist/Draft.css';
import vars from './vars.json';

const RichTextForm: React.FC = () => {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const renderResponseList = () => {
    return (
      <ul>
        {Object.entries(response).map(([wordType, count]) => (
          <li key={wordType}>
            <strong>{wordType}:</strong> {count}
          </li>
        ))}
      </ul>
    );
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      };
      const apiResponse = await fetch(vars.ReactLambdaAppStack.LambdaServiceUrl, requestOptions);
      const data = await apiResponse.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
      setError('Error occurred. Please check the console.');
    }
  };


  return (
    <div>
      <textarea
        placeholder="Enter text here..."
        value={text}
        onChange={handleTextChange}
        rows={8}
        cols={50}
        maxLength={10000}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      {Object.keys(response).length ? renderResponseList() : <p></p>}
      {Object.keys(error).length ? error : <p></p>}
    </div>
  );
};

export default RichTextForm;
