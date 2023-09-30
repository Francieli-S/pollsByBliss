import { useEffect, useState } from 'react';
import axios from 'axios';
import ListScreen from './ListScreen';
import DetailScreen from './DetailScreen';

export default function App() {
  const [healthStatus, setHealthStatus] = useState('');

  const axiosHealthStatus = async () => {
    try {
      const response = await axios.get(
        'https://private-anon-205e1ac56d-blissrecruitmentapi.apiary-mock.com/health'
      );
      if (response.status === 200) {
        setHealthStatus(response.data.status);
        console.log('HEALTHSTATUS', response.status, healthStatus);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axiosHealthStatus();
  });

  return <>
  {healthStatus === 'OK' ? <DetailScreen /> : <div>Loading Screen...</div>}
  {healthStatus !== 'OK' && <div>Retry Action widget</div>}
  </>;
}
