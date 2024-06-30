import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

function Homescreen({match}) {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [fromdate, setfromdate] = useState();
    const [todate, settodate] = useState();
    const [duplicateRooms, setDuplicateRooms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/rooms/getallrooms');
                setRooms(response.data);
                setDuplicateRooms(response.data);
                setLoading(false);
            } catch (error) {
                setError(true);
                console.log(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filterByDate = async (dates) => {
        if (dates && dates.length === 2) {
            const startDate = new Date(dates[0]);
            const endDate = new Date(dates[1]);
            setfromdate(startDate.toLocaleDateString('en-GB'));
            settodate(endDate.toLocaleDateString('en-GB'));
            
            if (!dates || dates.length !== 2) {
                console.log("Please select a valid date range.");
                return;
            }

            const startDateMoment = moment(startDate, 'DD-MM-YYYY');
            const endDateMoment = moment(endDate, 'DD-MM-YYYY');

            if (!startDateMoment.isValid() || !endDateMoment.isValid()) {
                console.log("Invalid date format.");
                return;
            }

            const tempRooms = duplicateRooms.filter(room => {
                for (const booking of room.currentbookings) {
                    const bookingStartDate = moment(booking.fromdate, 'DD-MM-YYYY');
                    const bookingEndDate = moment(booking.todate, 'DD-MM-YYYY');

                    if (
                        startDateMoment.isBetween(bookingStartDate, bookingEndDate, null, '[]') ||
                        endDateMoment.isBetween(bookingStartDate, bookingEndDate, null, '[]') ||
                        bookingStartDate.isBetween(startDateMoment, endDateMoment, null, '[]') ||
                        bookingEndDate.isBetween(startDateMoment, endDateMoment, null, '[]')
                    ) {
                        return false; // Room not available
                    }
                }
                return true; // Room available
            });

            setRooms(tempRooms);
        } else {
            console.log("Please select a valid date range.");
        }
    }

    return (
        <div className='container'>
            <div className='row mt-5'>
                <div className='col-md-3'>
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                {loading ? (
                    <h1><Loader/></h1>
                ) : rooms.length > 0 ? (
                    rooms.map(room => (
                        <div key={room._id} className="col-md-9">
                            <Room room={room} fromdate={fromdate} todate={todate}/>
                        </div>
                    ))
                ) : (
                    <Error/>
                )}
            </div>
        </div>
    );
}

export default Homescreen;