import React from 'react';
import Post from "@/components/Post";
import { db, storage } from "../firebase";
import {collection, onSnapshot, query, orderBy} from "firebase/firestore";

function Posts( ) {
     const [posts, setPosts] = React.useState([]);
            React.useEffect(() => {
                return onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
                    setPosts(snapshot.docs);
                });
            }, [db]);

    return (
        <div>
            {
                posts.map((post) => (
                    <Post
                        key={post.id}
                        id={post.id}
                        username={post.data().username}
                        userImg={post.data().profileImg}
                        img={post.data().image}
                        caption={post.data().caption}
                    />))
            }



        </div>
    );
}

export default Posts;