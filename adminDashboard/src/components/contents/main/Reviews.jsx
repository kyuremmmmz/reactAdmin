import React, { useEffect, useState } from "react";
import Header from "../../panels/Header";
import { supabase } from "../../../supabaseClient";

const Reviews = () => {
  const [comments, setComments] = useState([]);
  const [imgUrl, setImage] = useState('');
  
  async function images() {
    const {data, error} = await supabase.from('')
  }

  const datas = async () => {
    try {
      const { data, error } = await supabase.from('ratings_and_comments').select('*');
      if (error) throw error;
      setComments(data);
    } catch (e) {
      console.error(e);
    } 
  }

  useEffect(() => {
    datas();
  }, [comments])
  return (
    <div>
      <Header />
      <main className="main">
        <h2>Users Reviews</h2>
        <div className="reviews-container">
          {comments.map((review) => (
            <div key={review.id} className="review-card">
              <img src={review.avatar_url === 'null' ? `https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-business-user-profile-vector-png-image_1541960.jpg` : `https://tglolshdsrixggmpvujc.supabase.co/storage/v1/object/public/avatars/${review.avatar_url}`} alt={`${review.full_name}'s profile`} className="profile-pic" />
              <div className="review-content">
                <h3 className="review-name">{review.full_name}</h3>
                <div className="review-rating">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
                <p className="review-text">{review.comment}</p>
                <p className="review-text">Commented in {review.placeComment}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Reviews;
