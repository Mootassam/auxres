import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export class Error500Page extends Component {
    render() {
        return (
            <div className="container">
                <div className="crypto-animation">
                    <div className="bitcoin">
                        <i className="fab fa-btc" />
                    </div>
                    <div className="eth">
                        <i className="fab fa-ethereum" />
                    </div>
                    <div className="bnb">
                        <i className="fas fa-coins" />
                    </div>
                </div>
                <div className="error-code">505</div>
                <div className="error-title">Internal Server Error</div>
                <div className="error-message">
                    Oops! Something went wrong on our end. Our team has been notified and is
                    working to fix the issue.
                </div>

                <Link to="/">
                    <button className="home-button" >
                        <i className="fas fa-home home-icon" />
                        Back to Home
                    </button>
                </Link>
                <style>{`       
     `}</style>
            </div>

        )
    }
}

export default Error500Page
