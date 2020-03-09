import React from 'react';
import { defaultPatientProfile } from '../../../utils/defaultPatientProfile';
import "../../../scss/home/home";

interface NewPatientProps {
  history?: any
}

interface NewPatientState {

}

class NewPatient extends React.Component<NewPatientProps, NewPatientState> {
  newPatient = async () => {
    const { history } = this.props;
    const firstName = (document.getElementById('fname') as HTMLInputElement).value;
    const lastName = (document.getElementById('lname') as HTMLInputElement).value;
    // const age = (document.getElementById('age') as HTMLInputElement).valueAsNumber;

    let data = JSON.parse(JSON.stringify(defaultPatientProfile));
    data['first_name'] = firstName;
    data['family_name'] = lastName;
    // data['age'] = age;
    data['student_id'] = (await (await fetch(`/api/me`)).json()).id;
    delete data['patient_id'];
    // const data = { first_name: firstName, last_name: lastName };

    const res = await fetch(`/api/patientprofile/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    const id = await res.json();
    console.log(id);
    history.push(`/patient/${id['id']}/demographics`);
  }

  render() {
    return (
      <div className='home-page-create-new-patient-popup'>
        <div className='home-page-create-new-patient-popup-inner'>
          <h1>Create Patient Profile</h1><br/>

          <div>
            <p>First Name:</p>
            <input type='text' id='fname' name='fname'/><br/>
            <p>Last Name:</p>
            <input type='text' id='lname' name='lname'/><br/>
            {/* <p>Age:</p>
            <input type='number' id='age' name='age'/><br/>  */}
          </div>

          <div className='home-page-create-new-patient-popup-btn'>
            <p onClick={this.newPatient}>Create</p>
          </div>
        </div>
      </div>
    );
  }
}

export default NewPatient;