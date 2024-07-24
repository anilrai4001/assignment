import React from 'react';
import { Table } from '@mantine/core';

interface DataTableProps {
  data: { [key: string]: any }[];
  headers: string[];
}

const DataTable: React.FC<DataTableProps> = ({ data, headers }) => {
  const rows = data.map((row, index) => (
    <tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
      {headers.map(header => (
        <td key={header} style={{ padding: '10px', borderRight: '1px solid #ccc' }}>{row[header]}</td>
      ))}
    </tr>
  ));

  return (
    <Table striped highlightOnHover style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #000' }}>
          {headers.map(header => (
            <th key={header} style={{ padding: '10px', borderRight: '1px solid #ccc', textAlign: 'left' }}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default DataTable;
