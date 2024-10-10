import React, { PureComponent } from "react";
import "./Card.css";
// import fg from './fg.jpg'; // Ensure this path is correct for your image
import Button from "./Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Card extends PureComponent {
  state = {
    clicked: false,
  };

  // Reset clicked state when reset prop changes
  componentDidUpdate(prevProps) {
    if (this.props.reset !== prevProps.reset && !this.props.reset) {
      this.setState({ clicked: false });
    }
  }

  notify = (name) => {
    toast.success(`You voted for ${name}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  // Handle button click events
  handleButtonClick = (category, candidate, name) => {
    this.setState({ clicked: true });
    this.props.onButtonClick(); // Notify the parent component
    this.props.onVote(category, candidate);
    this.notify(name); // Update the votes
  };

  render() {
    const { clicked } = this.state;
    const { category, name1, name2 } = this.props;

    return (
      <div
        className="card_first"
        style={{ background: `linear-gradient(50deg, #0c4321, #478d)` }}
      >
        <p className="sport" style={{ marginBottom: `2%` }}>
          {category}
        </p>
        <div className="card_second">
          {clicked ? (
            <div className="thank-you-animation">
              <div className="thank-you-text">Thank You!😃</div>
              <div className="thank-you-background"></div>
              {/* Sparkles for animation */}
              <div className="sparkle"></div>
              <div className="sparkle"></div>
              <div className="sparkle"></div>
              <div className="sparkle"></div>
              <div className="sparkle"></div>
            </div>
          ) : (
            <>
              <div className="left">
                <img src={this.props.image1} alt="Candidate" />
                <div className="candidate-name">{name1}</div>
                <Button
                  handleClick={() =>
                    this.handleButtonClick(category, "Candidate 1", name1)
                  }
                  label="Vote for Candidate 1"
                />
              </div>
              <div className="middle">
                <img src={this.props.image2} alt="Candidate" />
                <div className="candidate-name">{name2}</div>
                <Button
                  handleClick={() =>
                    this.handleButtonClick(category, "Candidate 2", name2)
                  }
                  label="Vote for Candidate 2"
                />
              </div>

              {/* <div className='right'>
                <img src={fg} alt="Candidate" />
                <div className='candidate-name'>NOTA</div>
                <Button handleClick={this.handleButtonClick} />
              </div> */}
            </>
          )}
        </div>
      </div>
    );
  }
}

///candidates/vote/Head-Boy/Candidate 1
