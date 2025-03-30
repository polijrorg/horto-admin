/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { Posts } from 'interfaces/Posts';
import PostService from 'services/PostsService';
import { getColumns } from './index-helper';

const PostsPage = () => {
    const [postsList, setPostsList] = useState<Posts[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const getPosts = async () => {
            try {
                setLoading(true);
                const response = await PostService.GetAll();
                setPostsList(response);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                setLoading(false);
            }
        };

        getPosts();
    }, []);

    const handleEdit = (post: Posts) => {
        router.push({
            pathname: 'CreatePost',
            query: {
                initialValues: JSON.stringify({
                    id: post.id,
                    style: post.style,
                    image: post.linkImage,
                    title: post.title,
                    text: post.text,
                    link: post.link
                })
            }
        });
    };

    const handleDelete = async (id: string) => {
        try {
            setLoading(true);
            await PostService.deletePost(id);
            const updatedPosts = await PostService.GetAll();
            setPostsList(updatedPosts);
        } catch (error) {
            console.error('Failed to delete post:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePost = () => {
        router.push('CreatePost');
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
                        color: '#CC8D3E'
                    }}
                    onClick={handleCreatePost}
                />
            </div>
            <Table
                style={{ color: 'white' }}
                columns={getColumns(handleEdit, handleDelete)}
                dataSource={postsList}
                rowKey="id"
                loading={loading}
            />
        </>
    );
};

export default PostsPage;
