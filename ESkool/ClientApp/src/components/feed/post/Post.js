import React from 'react';
import user_nav_icon from '../../../images/user_nav.gif';
import likeicon from '../../../images/like.png';
import commenticon from '../../../images/speech-bubble.png';
import './post.css';
function Post(props) {
  return (
    <div className='container-card-post'>
      <div className='inner-container-card-post'>
        <div className='card-post-header'>
          <img src={user_nav_icon} className='user-image' />
          <div className='name-time'>
            <h4>{localStorage.getItem('userSession')}</h4>
            <span>September 12, 2020 at 20.20</span>
          </div>
        </div>
        <div className='post-content'>
          <p>{props.content}</p>
        </div>
        <div className="like-comment-section">
          <button className="like-section"><img className="like-img" src={likeicon} alt="like"/></button>
          <button className="comment-section"><img className="comment-img" src={commenticon} alt="comment"/></button>
        </div>
      </div>
    </div>
  );
}

export default Post;
