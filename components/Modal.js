import React, {Fragment} from 'react';
import {useRecoilState} from "recoil";
import {modalState} from "@/atoms/modalAtoms";
import { Dialog, Transition} from "@headlessui/react";
import {CameraIcon} from "@heroicons/react/20/solid";
import { db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useSession } from "next-auth/react";

function Modal() {
    const {data: session} = useSession();
    const [open, setOpen] = useRecoilState(modalState);
    const filePickedRef = React.useRef(null);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [caption, setCaption] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        }
    }

    const uploadPost = async () => {
        if(loading) return;
        setLoading(true);
        // 1) Create a post and add to firestore 'posts' collection
        // 2) get the post ID for the newly created post
        // 3) upload the image to firebase storage with the post ID
        // 4) get a download URL from fb storage and update the original post with image
        const docRef = await addDoc(collection(db, 'posts'), {
            username: session.user.username,
            caption: caption,
            profileImg: session.user.image,
            timestamp: serverTimestamp(),

        });
        console.log('New Post Added: ', docRef.id);

        const imageRef = ref(storage, `posts/${docRef.id}/image`);
        await uploadString(imageRef, selectedFile, 'data_url').then(async (snapshot) => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, 'posts', docRef.id), {
                image: downloadURL
            });
        });
        setOpen(false);
        setLoading(false);
        setSelectedFile(null);
    }



    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={setOpen}>
                <div className={'flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <span className={'hidden sm:inline-block sm:align-middle sm:h-screen'} aria-hidden="true">&#8203;</span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                        <div className={'inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'}>
                            <div>
                                {selectedFile ? (
                                    <img src={selectedFile} onClick={() => setSelectedFile(null)} className={'object-contain w-full  cursor-pointer h-52 rounded-2xl'}/>
                                ) : (
                                    <div onClick={() => filePickedRef.current.click()} className={'mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer'}>
                                        <CameraIcon className={'h-6 w-6 text-red-600'} aria-hidden={'true'}/>
                                    </div>
                                )}




                                <div className={'mt-3 text-center sm:mt-5'}>
                                    <Dialog.Title as="h3" className={'text-lg leading-6 font-medium text-gray-900'}>
                                        Upload a photo
                                    </Dialog.Title>
                                    <div className={'mt-2'}>
                                        <input type="file" ref={filePickedRef} hidden onChange={addImageToPost}/>

                                    </div>

                                    <div className={'mt-2'}>
                                        <input type="text" className={'border-none focus:ring-0 w-full text-center'} placeholder={'Enter a caption...'} onChange={(e) => setCaption(e.target.value)}/>
                                    </div>
                                </div>

                                <div className={'mt-5 sm:mt-6'}>
                                    <button
                                        type={'button'}
                                        className={'inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-300'}
                                        onClick={uploadPost}>
                                        {loading ? "Uploading..." : "Upload Post" }

                                    </button>
                                </div>

                            </div>
                        </div>
                    </Transition.Child>


                </div>
            </Dialog>

        </Transition.Root>
    );
}

export default Modal;