import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';

function Bookingscreen() {
  const { roomid } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fromdateStr = queryParams.get('fromdate');
  const todateStr = queryParams.get('todate');

  const fromdate = moment(fromdateStr, 'DD-MM-YYYY');
  const todate = moment(todateStr, 'DD-MM-YYYY');

  const totaldays = todate.diff(fromdate, 'days')+1;
  const [totalamount , settotalamount] = useState()

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post('/api/rooms/getroombyid', { roomid });
        setRoom(response.data);
        setLoading(false);
        settotalamount(response.data.rentperday*totaldays);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [roomid]);

  async function bookRoom() {
    const bookingDetails = {
      room,
      userid:JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount,
      totaldays
    }
    try{
      const result = await axios.post('/api/bookings/bookroom',bookingDetails);
    }catch(error){
      console.log(error);
    }
  }




  return (
    <div className='m-5'>
      {loading ? (
        <h2><Loader/></h2>
      ) : error ? (
        <h2><Error/></h2>
      ) : (
        <div>
          {room && (
            <div className='row justify-content-center mt-5 bs'>
              <div className='col-md-6'>
                <h1>{room.name}</h1>
                <img src={room.imageurls[0]} className='bigimg' alt={room.name} />
              </div>
              <div className='col-md-6'>
                <div style={{ textAlign: 'right' }}>
                  <h1>Booking Details</h1>
                  <hr />
                  <b>
                    <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                    <p>From Date: {fromdate.format('DD-MM-YYYY')}</p>
                    <p>To Date: {todate.format('DD-MM-YYYY')}</p>
                    <p>Max Count: {room.maxCount}</p>
                  </b>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <b>
                    <h1>Amount</h1>
                    <hr />
                    <p>Total Days: {totaldays}</p>
                    <p>Per Day: {room.rentperday}</p>
                    <p>Total: {totalamount}</p>
                  </b>
                </div>

                <div style={{ float: 'right' }}>
                  <button className='btn btn-dark'onClick={bookRoom}>Book Now</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Bookingscreen;
