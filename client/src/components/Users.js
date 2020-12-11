import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
const axios = require('axios');

 
class User extends React.Component {
 
    state = {
        name: '',
        dob: '',
        all:[]
    }
 
    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }
 
    handleSubmit = async () => {

        let self = this
        let {name,dob} = this.state
        let user = {name,dob}
        axios.post('http://localhost:5000/find', user).
        then(function (response) {
        self.setState({
            all : response.data
        })
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    componentDidMount(){
        let self = this
        axios.get('http://localhost:5000/all').
        then(function (response) {
        self.setState({
            all : response.data
        })
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    trim(data){
        return data.substring(0,10)
    }
 

    render() {
        const { name,dob } = this.state;
        return (
            <div>
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
                style={{display : 'flex',flexDirection: 'row', justifyContent : 'center'}}
            >
                <TextValidator
                    label="Name"
                    onChange={this.handleChange}
                    name="name"
                    value={name}
                    // validators={['required']}
                    // errorMessages={['Name is required', 'Name is not valid']}
                    
                
                />
                <TextValidator
                    onChange={this.handleChange}
                    name="dob"
                    value={dob}
                    type="date"
                    // validators={['required']}
                    // errorMessages={['Date of birth is required', 'Date is not valid']}
                    style={{ margin:'20px'}}
                />
                
                <Button type="submit">Filter</Button>
            </ValidatorForm>
            {this.state.all.length !== 0 ?
            <div style={{display : "flex"}}>
                {this.state.all.map((user,index)=> {
                    return(

                    <div className="card" style={{width: "18rem", margin:"20px"}} key={index}>
                    <div className="card-body">
                        <h5 className="card-title" >{(user.name)}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{this.trim(user.dob)}</h6>                    
                    </div>
                    </div>
                    )
                })}
            </div> : 
            <h1>No data found</h1>
            }
            </div>
        );
    }
}

export default User
