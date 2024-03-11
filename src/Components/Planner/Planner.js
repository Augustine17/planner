import React, { useState } from 'react'
import './Planner.css'

export const Planner = () => {
    const [data, setData] = useState(() => {
        const savedData = JSON.parse(localStorage.getItem('myData'));
        return savedData || [];
      });

    const [subject, setSubject] = useState('');
    const [hour, setHour] = useState('');

      const addData = () => {
        if (!subject || !hour){ 
            alert("Missing input");
            return;
        }

        const newCard = {
            subject: subject,
            hour: hour
          };

        setData(prevData => {
          const updatedData = [...prevData, newCard];
          saveDataToLocalStorage(updatedData);
          return updatedData;
        });

        setHour("")
        setSubject("")
      };

    const saveDataToLocalStorage = (data) => {
        localStorage.setItem('myData', JSON.stringify(data));
    };

    const minusHour = (index) => {
        const updatedPlan = [...data];
        let hour = parseInt(updatedPlan[index].hour);
        if (hour > 0) {
          updatedPlan[index].hour = (hour - 1).toString();
          setData(updatedPlan);
          saveDataToLocalStorage(updatedPlan);
        }
      };
    
      const plusHour = (index) => {
        const updatedPlan = [...data];
        updatedPlan[index].hour = (parseInt(updatedPlan[index].hour) + 1).toString();
        setData(updatedPlan);
        saveDataToLocalStorage(updatedPlan);
      };
      
  return (
    <>
    <div className="planner">
        <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.  value)}/>
        <input type="number" placeholder="Hours" className="second" value={hour} onChange={(e) => setHour(e.target.value)}/>
        <button onClick={addData}><span> Add
  </span></button>
    </div>
    <section className='cards'>
        <table>
          <tbody>
            {data.map((card, index) => (
              <tr key={index}>
                <td id='sub'>{card.subject}</td>
                <td id='time'>{card.hour} hours</td>
                <td><button className='minus' onClick={() => minusHour(index)}>-</button></td>
                <td><button className='plus' onClick={() => plusHour(index)}>+</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}
