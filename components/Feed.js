import React from 'react';
import Stories from "@/components/Stories";
import Posts from "@/components/Posts";
import MiniProfile from "@/components/MiniProfile";
import Suggestions from "@/components/Suggestions";
import {useSession, signIn, signOut } from "next-auth/react";

function Feed() {
    const {data: session} = useSession();

    return (
        <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}>
            {/*Section */}
            <section className={'col-span-2'}>
                {/*Stories */}
                <Stories />
                {/*Posts */}
                <Posts />
            </section>
            {session && (
                <>
                    <section className={'hidden xl:inline-grid md:col-span-1'}>
                        <div className={'fixed top-20'}>
                            {/*Mini Profile */}
                            <MiniProfile />
                            {/*Sugestions */}
                            <Suggestions />
                        </div>
                    </section>
                </>
            )}

            {/* /Section */}





        </main>
    );
}

export default Feed;