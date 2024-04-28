import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { Form, Card, Input, Typography, Button } from 'antd';
import customFetch from '../utils/customFetch';
import { useNavigate,  } from "react-router-dom";


const EditBlog = () => {
  const { id } = useParams();
//   const [blog, setBlog] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const editorRef = useRef(null);
  const [form] = Form.useForm();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await customFetch.get(`/blog/${id}`);
        // console.log(response.data.blog.title)
        setInitialValues({
          title: response.data.blog.title,
          image: response.data.blog.imageTitle,
          description: response.data.blog.description,
          content: response.data.blog.content,
        });
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
    if(id){
        fetchBlog();
        console.log(initialValues)
    }
  }, []);
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues); // Cập nhật giá trị của các trường nhập liệu khi initialValues được thiết lập
    }
  }, [form, initialValues]);

  const onFinish = async (values) => {
    const blogContent = String(editorRef.current.getContent());
    const data = {
      title: values.title,
      imageTitle: values.image,
      description: values.description,
      content: blogContent,
      comments: [],
    };

    try {
      const response = await customFetch.patch(`/blog/update/${id}`, data);
      // console.log(response);
      navigate("/all-blogs")
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <Form 
        form={form}
        name="basic"  
        onFinish={onFinish}
        initialValues={initialValues}
    >
      <Card className="col-1-item" size="small" title={`ADD BLOG`} style={{ maxWidth: '60vw' }}>
        <div>
          <Typography.Title className="input-title">Title</Typography.Title>
          <Form.Item name="title" >
            <Input required size="large" placeholder="Enter Blog title" name='title'  />
          </Form.Item>
          <Typography.Title className="input-title">Image</Typography.Title>
          <Form.Item name="image">
            <Input required size="large" placeholder="Enter Blog Image" />
          </Form.Item>
          <Typography.Title className="input-title">Description</Typography.Title>
          <Form.Item name="description">
            <Input required size="large" placeholder="Enter Blog Description" />
          </Form.Item>
          <Typography.Title className="input-title">Blog content</Typography.Title>
          <Form.Item name="content">
            <Editor
              apiKey="jbmjv3n0hzwml063re0ackyls29g62lc76t23ptagoco48ip"
              language="vi"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={initialValues.content}
              init={{
                height: 1000,
                menubar: 'file edit view insert format tools table tc help',
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                  'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
            />
          </Form.Item>
        </div>
      </Card>
      <Button size="large" type="primary" htmlType="submit" className="btn">
        Submit
      </Button>
    </Form>
  );
};

export default EditBlog;
