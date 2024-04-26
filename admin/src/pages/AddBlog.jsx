import { Editor } from '@tinymce/tinymce-react'
import React from 'react'
import { useRef } from 'react';
import {Form, Card,Input,Typography, Button} from 'antd'
import customFetch from '../utils/customFetch';

const AddBlog = () => {
  const editorRef = useRef(null);
  const [form] = Form.useForm();

  const onFinish = async (values) =>{
    const blogContent = String(editorRef.current.getContent());
    const data = {
        title: values.title,
        imageTitle: values.image,
        description:  values.description,
        content: blogContent,
        comments:[]
    }
    // console.log(data)
    try {
        const response = await customFetch.post(`/blog/create`, data)
        // console.log(response)
        form.resetFields();
    } catch (error) {
        console.log(error)
    }
    // console.log(response)

  }

  return (
    <Form form={form} name="basic" onFinish={onFinish}>
        <Card
            className="col-1-item"
            size="small"
            title={`ADD BLOG`}
            style={{ maxWidth: '60vw' }}
        >   
            <div>
                <Typography.Title className="input-title">
                    Title
                </Typography.Title>
                <Form.Item name="title">
                    <Input
                        required
                        size="large"
                        placeholder="Enter Blog title"
                    />    
                </Form.Item>
                <Typography.Title className="input-title">
                    Image
                </Typography.Title>
                <Form.Item name="image">
                    <Input
                        required
                        size="large"
                        placeholder="Enter Blog Image"
                    />    
                </Form.Item>
                <Typography.Title className="input-title">
                    Description
                </Typography.Title>
                <Form.Item name="description">
                    <Input
                        required
                        size="large"
                        placeholder="Enter Blog Description"
                    />    
                </Form.Item>
                <Typography.Title className="input-title">
                    Blog content
                </Typography.Title>
                <Form.Item name="content">
                    <Editor
                    // apiKey="cmlltcvw2ydrtenwdgwdwqqrvsje6foe8t5xtyaq6lo2ufki"
                    apiKey="jbmjv3n0hzwml063re0ackyls29g62lc76t23ptagoco48ip"
                    language="vi"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue={""}
                    init={{
                        height: 1000,
                        menubar:
                        "file edit view insert format tools table tc help",
                        plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                        content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                    // onChange={blogChange}
                    />
                </Form.Item>
            </div>
            
        </Card>
        <Button size="large" type="primary" htmlType="submit" className='btn'>
            Submit
        </Button>
    </Form>
  )
}

export default AddBlog