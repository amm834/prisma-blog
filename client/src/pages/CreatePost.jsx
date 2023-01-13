import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Button, Card, FileInput, Label, Radio, TextInput} from "flowbite-react";
import {useQuery} from "@tanstack/react-query";
import http from "../services/http.service";
import {useAtom} from "jotai";
import {userAtomWithPersistence} from "../store/userAtom.js";
import {useNavigate} from "react-router-dom";


const CreatePost = () => {
    const navigate = useNavigate();
    const [user, setUser] = useAtom(userAtomWithPersistence)
    const [value, setValue] = useState(''); // for quill
    const {data} = useQuery(
        ['getCategories'],
        async () => await http.get('/categories').then(res => res.data),
    )


    const [inputs, setInputs] = useState({
        title: '',
        content: '',
        category_id: '',
        user_id: '',
    })


    const handleInputChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const onSubmit = async (e) => {

        if (!inputs.category_id) {
            alert('Please select a category')
            return
        }
        try {
            e.preventDefault()
            inputs.content = value
            inputs.user_id = user?.id

            await http.post('/posts/create', inputs)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className="grid grid-cols-12 gap-x-12" onSubmit={onSubmit}>
            <div className="col-span-8">
                <div className="mb-3">
                    <TextInput
                        type="text"
                        required={true}
                        placeholder="Title"
                        name="title"
                        onChange={handleInputChange}
                    />
                </div>
                <div id="fileUpload" className="mb-3">
                    <FileInput
                        id="file"
                        helperText="Upload a featured image"
                    />
                </div>
                <ReactQuill theme="snow" value={value} onChange={setValue} className="h-48"/>
            </div>

            <div className="col-span-4 flex flex-col gap-y-4">
                {/* Status card*/}
                <div className="max-w-sm">
                    <Card>
                        <h5 className="mb-3 text-base font-semibold text-gray-900 dark:text-white lg:text-xl">
                            Publish Status
                        </h5>
                        <ul className="my-4 space-y-3">
                            <li>
                                <a
                                    href="#"
                                    className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                                    </svg>

                                    <span className="ml-3 flex-1 whitespace-nowrap">
            Status
          </span>
                                    <span
                                        className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
            Draft
          </span>

                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-gray-500">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>


                                    <span className="ml-3 flex-1 whitespace-nowrap">
            Visibility
          </span>
                                    <span
                                        className="ml-3 inline-flex items-center justify-center rounded bg-green-500 px-2 py-0.5 text-xs font-medium text-green-100 dark:bg-gray-700 dark:text-gray-400">
            Public
          </span>

                                </a>
                            </li>
                        </ul>
                        <div className="flex justify-between">
                            <Button
                                outline={true}
                                gradientDuoTone="greenToBlue"
                            >
                                Save as Draft
                            </Button>
                            <Button
                                outline={true}
                                gradientDuoTone="purpleToBlue"
                                type="submit"
                            >
                                Publish
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Categories card*/}
                <Card as="div">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Category
                    </h5>

                    <fieldset
                        className="flex flex-col gap-4"
                        id="radio"
                    >
                        {data?.categories && data?.categories?.map(category => <div
                            key={category.id}
                            className="mt-4 flex items-center gap-2"
                        >
                            <Radio
                                id="united-state"
                                value={category.id}
                                name="category_id"
                                onChange={handleInputChange}
                            />
                            <Label htmlFor="united-state">
                                {category?.name}
                            </Label>
                        </div>)}


                    </fieldset>
                </Card>
            </div>

        </form>
    );
};

export default CreatePost;