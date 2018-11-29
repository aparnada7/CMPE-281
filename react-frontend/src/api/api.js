const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json',

};

export const fetchSensorData = () =>
    fetch(`${api}/sensorsimulation`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }).then((res) => res.json())
        .then((data) => {
            console.log('API '+data);
            return data
                ;})
        .catch(error => {
            console.log("This is error in fetch sensors");
            return error;
        });

  export const addSensor = (sensorDetails) =>
    fetch(`${api}/addSensor`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(sensorDetails)
    }).then((res) => res.json())
        .then((data) => {return data;})
        .catch(error => {
            console.log("This is error");
            return error;
        });


  export const addNode = (nodeDetails) =>
          fetch(`${api}/addNode`, {
              method: 'POST',
              headers: {
                  ...headers,
                  'Content-Type': 'application/json'
              },
              credentials: 'include',
              body: JSON.stringify(nodeDetails)
          }).then((res) => res.json())
              .then((data) => {return data;})
              .catch(error => {
                  console.log("This is error");
                  return error;
              });

export const addCluster = (clusterDetails) =>
                fetch(`${api}/addCluster`, {
                    method: 'POST',
                    headers: {
                        ...headers,
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(clusterDetails)
                }).then((res) => res.json())
                    .then((data) => {return data;})
                    .catch(error => {
                        console.log("This is error");
                        return error;
                    });
