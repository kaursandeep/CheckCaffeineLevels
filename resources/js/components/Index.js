import React, { Component } from "react";
import ReactDOM from "react-dom";
import Checkbox from "./Checkbox";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

var inputStyle = {
    display: "block",
    width: "84%",
    padding: "0.375rem 0.75rem",
    fontSize: "1rem",
    lineHeight: "1.5",
    marginLeft: "38px",
    width: "400px"
};

var buttonStyle = {
    padding: ".375rem .75rem",
    fontSize: "1rem",
    lineHeight: "1.5",
    borderRadius: ".25rem",
    display: "inline-block",
    fontWeight: "400",
    textAlign: "center",
    whiteSpace: "nowrap",
    marginTop: "15px",
    color: "#636b6f",
    marginLeft: "36px",
    display: "block"
};

var messageStyle = {
    display: "block",
    clear: "both",
    color: "green",
    fontSize: "22px"
};

var messageDiv = {
    clear: "both"
};
const OPTIONS = [
    {
        name: "Monster Ultra Sunrise"
    },
    {
        name: "Black Coffee"
    },
    {
        name: "Americano"
    },
    {
        name: "Sugar free NOS"
    },
    {
        name: "5 Hour Energy"
    }
];

class Drinks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfDrinksConsumed: "",
            message: "",
            drinks: [
                {
                    name: "Monster Ultra Sunrise"
                },
                {
                    name: "Black Coffee"
                },
                {
                    name: "Americano"
                },
                {
                    name: "Sugar free NOS"
                },
                {
                    name: "5 Hour Energy"
                }
            ]
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {
        this.setState({ numberOfDrinksConsumed: event.target.value });
    };

    handleRadioChange = changeEvent => {
        this.setState({
            drinks: changeEvent.target.value
        });
    };

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

        console.log("selected drink  " + this.state.drinks);
        console.log(
            "numberOfDrinksConsumed " + this.state.numberOfDrinksConsumed
        );

        axios
            .post("/api/index", {
                selectedDrink: this.state.drinks,
                numberOfDrinksConsumed: this.state.numberOfDrinksConsumed
            })
            .then(response => {
                console.log("respose is " + response);
                console.log("response is ", response.data.consumedCaffeine);

                this.setState({
                    message: response.data
                });

                this.setState.numberOfDrinksConsumed = 0;
                this.setState.selectedDrink = 0;
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            });
    };

    createRadio = option => (
        <Checkbox
            label={option.name}
            isSelected={this.state.drinks[option.value]}
            onRadioChange={this.handleRadioChange}
        />
    );

    createRadioButtons = () => OPTIONS.map(this.createRadio);

    render() {
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-sm-12">
                        <p>
                            You want to have your favourite drink, select your
                            drink and check the caffeine level you can take.
                        </p>
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="form-group mt-2">
                                <ul>{this.createRadioButtons()}</ul>
                            </div>

                            <div className="form-group mt-2">
                                <input
                                    type="number"
                                    name="numberOfDrinksConsumed"
                                    placeholder="Enter number of consumed drinks"
                                    value={this.state.numberOfDrinksConsumed}
                                    onChange={this.handleChange}
                                    required
                                    min="0"
                                    style={inputStyle}
                                />
                            </div>

                            <div className="form-group mt-2" style={messageDiv}>
                                {this.state.message ? (
                                    <div style={messageStyle}>
                                        {this.state.message}{" "}
                                    </div>
                                ) : null}
                            </div>

                            <div className="form-group mt-2">
                                <button type="submit" style={buttonStyle}>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Drinks;

if (document.getElementById("Drinks")) {
    ReactDOM.render(<Drinks />, document.getElementById("Drinks"));
}
