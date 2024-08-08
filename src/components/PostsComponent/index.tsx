import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getColumns } from './index-helper';
import { Posts } from 'interfaces/Posts';
import PostService from 'services/PostsService';

interface PostComponentProps {
    handleMenuClick: (key: string) => void;
    handleViewWithValues: (key: string, values: Object) => void;
}

const PostsComponent: React.FC<PostComponentProps> = ({handleMenuClick, handleViewWithValues}) => {
    const [selectedPost, setSelectedPost] = useState<Posts | null>(null);
    const [errorMsg, setErrorMsg] = useState(false);
    const [postsList, setPostsList] = useState<Posts[]>([]);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(
        null
    );

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await PostService.GetAll();
                setPostsList(response);
            } catch (error) {
                console.error('Failed to fetch modules:', error);
            }
        };

        getPosts();
    }, []);

    const handleEdit = (post: Posts) => {
        setSelectedPost(post);
        handleViewWithValues('PostCreate', {
            id: post.id,
            style: post.style,
            image: post.image,
            title: post.title,
            text: post.text,
            link: post.link
        })
    };

    const handleDelete = async (id: string) => {
        try {
            await PostService.deletePost(id);
            const updatedPosts = await PostService.GetAll();
            setPostsList(updatedPosts);
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                    marginTop: 8,
                    marginRight: 16
                }}
            >
                <h2>Posts Ativos</h2>
                <PlusOutlined
                    style={{
                        fontSize: '32px',
                        color: '#CC8D3E',
                    }}
                    onClick={() => handleMenuClick('PostCreate')}
                />
            </div>
            <Table
                style={{color: 'white'}}
                columns={getColumns(handleEdit, handleDelete)}
                dataSource={postsList}
                rowKey="id"
            />
        </>
    );
};

export default PostsComponent;
