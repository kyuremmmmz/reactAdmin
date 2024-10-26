import React from "react";
import Header from "../../panels/Header";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Alice Johnson",
      profilePic: "https://via.placeholder.com/50",
      rating: 5,
      review: "Great experience! Loved the service and support.",
    },
    {
      id: 2,
      name: "Bob Smith",
      profilePic: "https://via.placeholder.com/50",
      rating: 4,
      review: "Good overall, but some improvements could be made.",
    },
    {
      id: 3,
      name: "Charlie Brown",
      profilePic: "https://via.placeholder.com/50",
      rating: 5,
      review: "Exceptional! Highly recommend to others.",
    },
  ];

  return (
    <div>
      <Header />
      <main className="main">
        <h2>Users Reviews</h2>
        <div className="reviews-container">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <img src={review.profilePic} alt={`${review.name}'s profile`} className="profile-pic" />
              <div className="review-content">
                <h3 className="review-name">{review.name}</h3>
                <div className="review-rating">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
                <p className="review-text">{review.review}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Reviews;
