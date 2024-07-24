import React, { useEffect, useState } from 'react';
import DataTable from './components/DataTable';
import rawData from './data.json';

interface CropData {
  year: number;
  crop: string;
  production: number;
  yield: number;
  area: number;
}

const processData = (data: any[]): CropData[] => {
  return data.map(item => ({
    year: parseInt(item['Year'].match(/\d{4}/)[0], 10),
    crop: item['Crop Name'],
    production: item['Crop Production (UOM:t(Tonnes))'] ? parseFloat(item['Crop Production (UOM:t(Tonnes))']) : 0,
    yield: item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] ? parseFloat(item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))']) : 0,
    area: item['Area Under Cultivation (UOM:Ha(Hectares))'] ? parseFloat(item['Area Under Cultivation (UOM:Ha(Hectares))']) : 0
  }));
};

const getMaxMinProduction = (data: CropData[]) => {
  const years = [...new Set(data.map(item => item.year))];
  return years.map(year => {
    const yearData = data.filter(item => item.year === year);
    const maxCrop = yearData.reduce((max, item) => item.production > max.production ? item : max, yearData[0]);
    const minCrop = yearData.reduce((min, item) => item.production < min.production ? item : min, yearData[0]);
    return {
      year,
      cropMax: maxCrop.crop,
      cropMin: minCrop.crop,
    };
  });
};

const getAverageValues = (data: CropData[]) => {
  const crops = [...new Set(data.map(item => item.crop))];
  return crops.map(crop => {
    const cropData = data.filter(item => item.crop === crop);
    const averageYield = cropData.reduce((sum, item) => sum + item.yield, 0) / cropData.length;
    const averageArea = cropData.reduce((sum, item) => sum + item.area, 0) / cropData.length;
    return {
      crop,
      averageYield: Number(averageYield.toFixed(3)),
      averageArea: Number(averageArea.toFixed(3)),
    };
  });
};

const App: React.FC = () => {
  const [maxMinProduction, setMaxMinProduction] = useState<any[]>([]);
  const [cropAverages, setCropAverages] = useState<any[]>([]);

  useEffect(() => {
    const data = processData(rawData);
    console.log('Processed Data:', data);
    
    const processedMaxMin = getMaxMinProduction(data);
    console.log('Max/Min Production Data:', processedMaxMin);
    
    const processedAverages = getAverageValues(data);
    console.log('Average Values Data:', processedAverages);
    
    setMaxMinProduction(processedMaxMin);
    setCropAverages(processedAverages);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Crop Production Analysis</h1>
      <h2>Yearly Max and Min Production</h2>
      <DataTable data={maxMinProduction} headers={['year', 'cropMax', 'cropMin']}/>
      <h2>Crop Averages</h2>
      <DataTable data={cropAverages} headers={['crop', 'averageYield', 'averageArea']} />
    </div>
  );
};

export default App;
