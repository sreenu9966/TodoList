import React, { useState } from 'react'

function IndexApi() {

  const [postId, SetPostId] = useState("");
  const [posts, SetPosts] = useState([]);

  const getDataApi = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(res => res.json())
      .then(data => {
        SetPosts(data);
        console.log("data:", data);
      })
      .catch(error => console.log(error));
  };

  return (
    <div>

      <input 
        type="text" 
        placeholder="Post ID"
        value={postId} 
        onChange={(e) => SetPostId(e.target.value)} 
      />

      <button onClick={getDataApi}>Fetch Data</button>

      <h1>Details</h1>

      {posts.map((item) => (
        <div key={item.id}>
          <p>User ID: {item.userId}</p>
          <h4>ID: {item.id}</h4>
          <h2>{item.title}</h2>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export default IndexApi;
