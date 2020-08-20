import React from 'react';
import './App.css';
import {BASE_URL} from './api/apiConfig'
import Input from "./components/Input";

class App extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        email: '',
        isCheckBoxActive: false,
        valid: false,
        errors: {
            firstName: 'Required',
            lastName: 'Required',
            address: 'Required',
            phone: 'Required',
            email: 'Required',
            checkbox: 'Required',
        }
    };

    isEmailValid = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    isPhoneValid = RegExp(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im);

    isFormValid = errors => {
        let valid = true;
        Object.values(errors).forEach(error => error.length > 0 && (valid = false));
        return valid;
    };

    handleChange = (event) => {
        const {name, value} = event.target;
        let {errors} = this.state;
        switch (name) {
            case 'firstName':
                errors.firstName =
                    value.length < 1
                        ? 'Required'
                        : '';
                break;
            case'lastName':
                errors.lastName =
                    value.length < 1
                        ? 'Required'
                        : '';
                break;
            case'address':
                errors.address =
                    value.length < 1
                        ? 'Required'
                        : '';
                break;
            case 'phone':
                if (value.length < 1) {
                    errors.phone = 'Required';
                } else if (!this.isPhoneValid.test(value)) {
                    errors.phone = 'Bad Format';
                } else {
                    errors.phone = '';
                }
                break;
            case 'email':
                if (value.length < 1) {
                    errors.email = 'Required';
                } else if (!this.isEmailValid.test(value)) {
                    errors.email = 'Bad Format';
                } else {
                    errors.email = '';
                }
                break;
            case 'checkbox':
                if (event.target.checked === false) {
                    errors.checkbox = 'Required';
                } else {
                    errors.checkbox = '';
                }
                break;
            default:
                break;
        }
        this.setState({errors, [name]: value});
        if (this.isFormValid(this.state.errors)) {
            this.setState({valid: true})
        } else {
            this.setState({valid: false})
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const header = new Headers();
        header.append("Content-Type", "application/x-www-form-urlencoded");

        const data = new URLSearchParams();
        data.append("firstName", this.state.firstName);
        data.append("lastName", this.state.lastName);
        data.append("address", this.state.address);
        data.append("phone", this.state.phone);
        data.append("email", this.state.email);
        data.append("checkbox", this.state.isCheckBoxActive);

        const requestDetails = {
            mode: 'no-cors',
            method: 'POST',
            headers: header,
            body: data,
        };

        fetch(`${BASE_URL}`, requestDetails)
            .then(() => console.log('Spremljeno'))
            .catch(error => console.log('error', error));

    }

    render() {
        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <Input
                            title="First Name"
                            type="text"
                            name="firstName"
                            onChange={this.handleChange}
                            error={this.state.errors.firstName.length}
                            errorMessage={this.state.errors.firstName}
                        />
                    </div>
                    <div>
                        <Input
                            title="Last Name"
                            type="text"
                            name="lastName"
                            onChange={this.handleChange}
                            error={this.state.errors.lastName.length}
                            errorMessage={this.state.errors.lastName}
                        />
                    </div>
                    <div>
                        <Input
                            title="Address"
                            type="text"
                            name="address"
                            onChange={this.handleChange}
                            error={this.state.errors.address.length}
                            errorMessage={this.state.errors.address}
                        />
                    </div>
                    <div>

                        <Input
                            title="Address"
                            type="number"
                            name="phone"
                            onChange={this.handleChange}
                            error={this.state.errors.phone.length}
                            errorMessage={this.state.errors.phone}
                        />
                    </div>
                    <div>
                        <Input
                            title="Email"
                            type="email"
                            name="email"
                            onChange={this.handleChange}
                            error={this.state.errors.email.length}
                            errorMessage={this.state.errors.email}
                        />
                    </div>
                    <div>
                        <Input
                            title="Checkbox"
                            type="checkbox"
                            name="checkbox"
                            onChange={this.handleChange}
                            error={this.state.errors.checkbox.length}
                            errorMessage={this.state.errors.checkbox}
                            onClick={() => this.setState({isCheckBoxActive: !this.state.isCheckBoxActive})}

                        />
                    </div>
                    <div >
                        <button disabled={!this.state.valid}>Create</button>
                    </div>
                </form>
            </div>
        )
    }


}

export default App;
