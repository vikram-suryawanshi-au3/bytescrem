import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
const axios = require('axios');

 
class MyForm extends React.Component {
 
    state = {
        name: '',
        dob: ''
    }
 
    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }
 
    handleSubmit = async () => {

        let {name,dob} = this.state
        let user = {name,dob}
        await axios.post('http://localhost:5000/add',user)
        window.location.reload(false)
    }
 
    render() {
        const { name,dob } = this.state;
        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
                
            >
                <TextValidator
                    label="Name"
                    onChange={this.handleChange}
                    name="name"
                    value={name}
                    validators={['required']}
                    errorMessages={['Name is required', 'Name is not valid']}
                    style={{margin: '20px'}}
                />
                <TextValidator
                    onChange={this.handleChange}
                    name="dob"
                    value={dob}
                    type="date"
                    validators={['required']}
                    errorMessages={['Date of birth is required', 'Date is not valid']}
                    style={{margin: '20px'}}
                />
                
                <Button type="submit" style={{margin: '20px'}}>Submit</Button>
            </ValidatorForm>
        );
    }
}

export default MyForm
