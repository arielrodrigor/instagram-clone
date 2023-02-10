import React from 'react';
import Post from "@/components/Post";
const DUMMY_DATA = [
    {
        id : 1,
        username : 'johndoe',
        userImg : 'https://links.papareact.com/3ke',
        img : 'https://links.papareact.com/3ke',
        caption : 'This is dope!',
    },
    {
        id : 2,
        username : 'johndoe',
        userImg : 'https://links.papareact.com/3ke',
        img : 'https://links.papareact.com/3ke',
        caption : 'This is dope!',
    }
];

function Posts( ) {
    return (
        <div>
            {
                DUMMY_DATA.map((post) => (
                    <Post key={post.id} id={post.id} username={post.username} userImg={post.userImg} img={post.img} caption={post.caption} />
                ))
            }



        </div>
    );
}

export default Posts;