import React, { useState, useEffect } from 'react';
import { getTableData } from './getTableData';
import { submit } from './submit';

function QueueObservability() {
  const [tableState, setTableState] = useState<
    { jobid: string; value: string; done: boolean }[]
  >([]);

  // Get the table data once
  useEffect(() => {
    getTableData().then(
      (data) => {
        setTableState(data);
      },
      (error) => {
        console.error(`Failed to get table data`, error);
      },
    );
  }, []);

  return (
    <>
      <h4>Observability</h4>
      <table>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Value</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {tableState.map((row) => (
            <tr key={row.jobid}>
              <td>{row.jobid}</td>
              <td>{JSON.stringify(row.value)}</td>
              <td>{JSON.stringify(row.done)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function DiffonacciRequest() {
  const [formState, setFormState] = useState({ a: 0, b: 0 });

  return (
    <>
      <p>Enter two numbers and hit submit to calculate diffonacci.</p>
      <div>
        <input
          type="text"
          defaultValue={formState.a}
          onChange={(e) => {
            e.preventDefault();
            setFormState((s) => ({
              ...s,
              a: (e && parseInt(e.target.value)) || 0,
            }));
          }}
        />
      </div>
      <div>
        <input
          type="text"
          defaultValue={formState.b}
          onChange={(e) => {
            e.preventDefault();
            setFormState((s) => ({
              ...s,
              b: (e && parseInt(e.target.value)) || 0,
            }));
          }}
        />
      </div>
      <input
        type="button"
        value="Calculate"
        onClick={(e) => {
          e.preventDefault();
          submit(formState.a, formState.b);
        }}
      />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <DiffonacciRequest />
      <QueueObservability />
    </div>
  );
}

export default App;
