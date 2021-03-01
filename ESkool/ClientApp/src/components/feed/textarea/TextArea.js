import './textarea.css';
import upload_file_icon from '../../../images/image_upload.png';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import {useContext, useState} from "react";
import PostsStoreContext from "../../../store/PostsStoreContext";
function TextArea() {
  const {posts, setPosts} = useContext(PostsStoreContext);
  const [post, setPost] = useState();
  return (
    <div className='textarea-container'>
      <div className='upload-section'></div>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '85ch' }}>
        <Container>
          <TextField
            id='outlined-multiline-static'
            label='Type your note here'
            multiline
            rows={6}
            variant='outlined'
            fullWidth
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
          <div className='post-btn-container'>
            <img src={upload_file_icon} className='upload-file-icon' />
            <img src={upload_file_icon} className='upload-file-icon' />
            <button className='post-button' onClick={() => {
                setPosts(prevState => [post, ...prevState])
                setPost('');
            }}>Post</button>
          </div>
        </Container>
      </div>
    </div>
  );
}
export default TextArea;
