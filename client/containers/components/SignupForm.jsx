import React from 'react';
import { Link } from 'react-router-dom';
import Preferences from './Preferences.jsx';
import { useState } from 'react';

const SignupForm = (props) => {

  // const [skinTypes, setSkinTypes] = useState


  const makeUser = (e) => {
    e.preventDefault();
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: document.getElementById('username').value,
        password: document.getElementById('password').value,
        skinType: document.getElementById('skintype').value,
        issues: document.getElementById('issues').value,
        allergies: document.getElementById('allergies').value,

      }),
    })
      .then((res) => res.json())
      .then((data) => console.log('data', data))
      .catch((err) => console.log(err));
  }


  return (
    <div className={props.componentClass}>
      <form id='signupForm' onSubmit={makeUser}>
        <div id='signupHeaderBox'>
          <h2 id='signupHeader'>Peau Humaine</h2>
        </div>
        <div className='inputField'>
          <input
            type='text'
            name='username'
            placeholder='Choose Username'
            id='username'
          />
        </div>
        <div className='inputField'>
          <input
            type='text'
            name='password'
            placeholder='Choose Password'
            id='password'
          />
        </div>
        {/* <Preferences makeUser={makeUser}/> */}

        <div className='preferences'>
          {/* <SkinType typeClass="skinType" buttonClass="preferenceButton"  makeUser={props.makeUser} /> */}

          <h3>Skin Type:</h3>
          {/* <form className='props.typeClass'>
        <div>
          <input type='radio' id='Normal' name='skintype' value='Normal' />
          <label for='Normal'>Normal</label>
        </div>
        <div>
          <input type='radio' id='Normal' name='skintype' value='Dry' />
          <label for='Dry'>Dry</label>
        </div>

        <div>
          <input type='radio' id='Oily' name='skintype' value='Oily' />
          <label for='Oily'>Oily</label>
        </div>
        <div>
          <input type='radio' id='Combination' name='skintype' value='Combination' />
          <label for='Combination'>Combination</label>
        </div>

      </form> */}
          <form>
            <p>Type: Normal, Dry, Oily, or Combination</p>
            <input type='text' name='skintype' placeholder='Choose Skin Type' id="skintype" />
          </form>

           <form>
            <p>Any Skin Concerns? Oiliness, Dullness, Pore Appearance, or Dryness?</p>
            <input type='text' name='issues' placeholder='Any Skin Concerns?' id="issues" />
          </form>

          <h3>Allergies?</h3>
          <ul id='allergies'>
            <input type='text' />
            <input type='text' />
            <input type='text' />
          </ul>
          
          {/* 
          <h3>Skin Type</h3>
          <ul className='Skin Type'>
            <input type='text' />
            <input type='text' />
            <input type='text' />
          </ul> */}

          {/* <SkinConcern /> */}
          {/* <h3>Skin Concerns:</h3>
      <form className='skinConcern'>
        <input type='checkbox' className={props.buttonClass} />
        <label for='Oiliness'>Oiliness</label>
        <br></br>

        <input type='checkbox' className={props.buttonClass} />
        <label for='Dullness'>Dullness</label>
        <br></br>

        <input type='checkbox' className={props.buttonClass} />
        <label for='Pore Appearance'>Pore Appearance </label>
        <br></br>

        <input type='checkbox' className={props.buttonClass} />
        <label for='Dryness'>Dryness</label>
        <br></br>
      </form> */}

          {/* <Allergies /> */}
          {/* <h3>Allergies</h3>
          <ul className='Allergies'>
            <input type='text' />
            <input type='text' />
            <input type='text' />
          </ul> */}
          {/* 
      <button onClick={makeUser}>Create user</button> */}
        </div>

        <br />
        <input type='submit' value='Create User' />
        <Link to={'/home'} id='signupLink'>
          <button id='signupButton' type='button'>
           Home
          </button>
        </Link>

      </form>
    </div>
  );
};

export default SignupForm;
