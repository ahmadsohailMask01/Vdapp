// App.js
import React, { Component } from "react";
import { getFirestore, updateDoc, doc, increment } from "firebase/firestore";
import { app } from "./Firebase";
import "./App.css";
// import fg from './fg.jpg';
import cal from "./Calvin.jfif";
import ani from "./Anishka.jfif";
import ary from "./Aryan.png";
import kri from "./Kritika.png";
import moh from "./Mohanty.jfif";
import pun from "./Punit.jfif";
import raj from "./Rajani.jfif";
import rish from "./Rishi.jfif";
import Card from "./Card";
import { ToastContainer } from "react-toastify";

// Initialize Firestore
const db = getFirestore(app);

export default class App extends Component {
  state = {
    count: 0,
    reset: true,
  };

  // Function to update candidate votes in Firestore
  updateCandidateVotes = async (category, candidate) => {
    try {
      // Construct the document path dynamically
      const docRef = doc(db, `candidates/vote/${category}/${candidate}`);
      // Increment the vote count by 1
      await updateDoc(docRef, {
        Votes: increment(1),
      });
      console.log(`Vote updated for ${candidate} in ${category}`);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  // Handle button clicks in the Card component
  handleCardButtonClick = () => {
    this.setState(
      (prevState) => ({
        count: prevState.count + 1,
        reset: true,
      }),
      this.checkCount
    );
  };

  // Check the count and reset after reaching a certain threshold
  checkCount = () => {
    if (this.state.count >= 4) {
      setTimeout(() => {
        this.setState({
          count: 0,
          reset: false,
        });
      }, 10000);
    }
  };

  render() {
    const { count, reset } = this.state;

    return (
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <p
          className="header"
          style={{
            background: `linear-gradient(to right, #0c1337, #0c1674, #0a85d9)`,
            cursor: `pointer`,
          }}
        >
          ✨E-entikhab VOTING SYSTEM✨
        </p>

        <div className="row" style={{ margin: `1%`, marginTop: `2%` }}>
          <Card
            count={count}
            reset={reset}
            onButtonClick={this.handleCardButtonClick}
            name1="A S Calvin"
            name2="Singh Rishiraj"
            category="Head-Boy(Assistant)"
            onVote={this.updateCandidateVotes}
            image1={cal}
            image2={rish}
            style={{ width: `50%` }}
          />
          <Card
            count={count}
            reset={reset}
            onButtonClick={this.handleCardButtonClick}
            name1="Sharma Rajani"
            name2="Mishra Anshika"
            category="Head-Girl(Assistant)"
            onVote={this.updateCandidateVotes} // Add this line
            image1={raj}
            image2={ani}
          />
          <Card
            count={count}
            reset={reset}
            onButtonClick={this.handleCardButtonClick}
            name1="Vaishnav Punit"
            name2="Patel Aryan"
            category="Sports-Captain(Boy)"
            onVote={this.updateCandidateVotes}
            image1={pun}
            image2={ary}
          />

          <Card
            count={count}
            reset={reset}
            onButtonClick={this.handleCardButtonClick}
            name1="Dubey Kritika"
            name2="Mohanty Jyoti"
            category="Sports-Captain(Girl)"
            onVote={this.updateCandidateVotes}
            image1={kri}
            image2={moh}
          />
        </div>
      </div>
    );
  }
}
