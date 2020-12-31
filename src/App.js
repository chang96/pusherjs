import {useState} from "react"
import States from "./userComponents/states/index"
import * as PusherPushNotifications from "@pusher/push-notifications-web"
import Pusher from 'pusher-js';
import Nav from "./userComponents/header/nav/nav";
import Footer from "./userComponents/footer/footer";

function App() {
  const sampleData = [
    [ 1, '1J5FVCE', 0, 0, 0, 0, 0, 0, 0, 0, 'inprogress' ],
    [ 1, '2J5FVCE', 0, 0, 0, 0, 0, 0, 0, 0, 'inprogress' ],
    [ 1, '3J5FVCE', 0, 0, 0, 0, 0, 0, 0, 0, 'inprogress' ],
    [ 1, '4J5FVCE', 0, 0, 0, 0, 0, 0, 0, 0, 'inprogress' ],
    [ 1, '5J5FVCE', 0, 0, 0, 0, 0, 0, 0, 0, 'inprogress' ],
    [ 1, '6J5FVCE', 0, 0, 0, 0, 0, 0, 0, 0, 'inprogress' ]
  ]
  const [data, updateData] = useState({message: sampleData})
  const [total, updateTotal] = useState({message: sampleData[0]})

  const pusher = new Pusher(process.env.REACT_APP_KEY, {
    cluster: process.env.REACT_APP_CLUSTER
  });
  const channel = pusher.subscribe('my-channel');
  channel.bind('my-event', function(dataFromServer) {
    updateData(data =>{
      return {message: data.message.splice(Number(dataFromServer.message[11]), 1, dataFromServer.message)}
    }
    )
    updateTotal(dataFromServer)
    console.log(dataFromServer)
    // alert(dataFromServer.message)
    
  });
  const beamsClient = new PusherPushNotifications.Client({
    instanceId: process.env.REACT_APP_INSTANCEID,
  })
  beamsClient.start()
  .then(() => beamsClient.getDeviceId())
  .then(deviceId => {
    console.log(deviceId) // Will log something like web-1234-1234-1234-1234
  }).catch(e => console.error('Could not get device id', e));
  
  beamsClient.start()
    .then(() => beamsClient.addDeviceInterest('hello'))
    .then(() => {
      // Build something beatiful 🌈
    });
  return (
    <div>
      <div><Nav /></div>
      <div style={{display:"flex", justifyContent:"space-around"}}><States total={total} data={data} /></div>
      <div><Footer/></div>
    </div>
  );
}

export default App;
