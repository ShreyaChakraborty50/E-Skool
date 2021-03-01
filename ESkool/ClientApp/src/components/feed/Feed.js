import {useContext, useEffect, useState} from 'react';
import TextArea from '../../components/feed/textarea/TextArea';
import Post from './post/Post';
import './feed.css';
import PostsStoreContext from "../../store/PostsStoreContext";
function Feed() {
  const {posts, setPosts} = useContext(PostsStoreContext);
  return (
    <div className='textarea-outer-container'>
      <TextArea />
      <hr style={{marginBottom: "30px"}}/>
      
       {posts.map((post, index) => {
            return <Post key={index} content={post} />
       })}
      
    </div>
  )
}

export default Feed;
