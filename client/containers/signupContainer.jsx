import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { makeUser } from '../slices/userSlice';
import Preferences from './components/Preferences.jsx';
import { useState, useEffect} from 'react';

const SignupContainer = (props) => {
  const dispatch = useDispatch();

    const handleClick = async () => {
      try {
        // Fetch the user's skin type, skin conditions, and allergies from Redux state
        const skinType = useSelector((state) => state.user.skinType);
        const skinConditions = useSelector((state) => state.user.skinConditions);
        const allergies = useSelector((state) => state.user.allergies);

        // Create an object with the user's preferences
        const userPreferences = {
          skinType,
          skinConditions,
          allergies,
        };
      }
      catch {
        (err) => {
          console.log(err)
        }
      }
    }
  

    async function askQuestion(e) {
          try{
            const response = await fetch('/api/gpt3-recommendations', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      message: document.getElementById('dataText').value
                    }),
                  });
          } catch (err) {
            console.log(err);
          }
    }

    const [beforePrompt, setBeforePrompt] = useState(<p>Data loads here!</p>);

    async function sendData (e) {
      e.preventDefault();
      await fetch('https://localhost:3000/chatapi', {
        method: 'POST',
        headers: { 'Content-type': 'application/json',
      },
        body: JSON.stringify({
            message: document.getElementById('dataText').value,
        })
      })
      .then(res => res.json())
      .then(data => setBeforePrompt(<p>{data.content}</p>))
      .catch(err => setBeforePrompt(<p>Error finding data</p>))
    };


  return (
    <div className={props.containerClass}>
      <Preferences />
      <button onClick={handleClick}>Submit Preferences</button>
      <form onSubmit={askQuestion}>
        <input type="text" id="dataText" placeholder='Add Data Here'/>
        <input type="submit" value="Submit" />
      </form>
      {beforePrompt}
    </div>
  );
};

export default SignupContainer;