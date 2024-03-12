import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ENDPOINT_CONFIGS, ListPostsRequest, ListPostsResponse } from '@proghub/shared';
import { Box } from '@chakra-ui/react';
import { callEndpoint } from '../fetch';
import { PostCard } from '../components/PostCard';

export const ListPosts = () => {
    const { data, error, isLoading, refetch } = useQuery<ListPostsResponse, Error>({
        queryKey: ['listposts'],
        queryFn: () => callEndpoint<ListPostsRequest, ListPostsResponse>(ENDPOINT_CONFIGS.listPosts),
    });

    console.log(ENDPOINT_CONFIGS.listPosts)

    if (isLoading) {
        return <div>Fetching posts...</div>;
    }

    if (error) {
        return <div>Error loading posts</div>;
    }

    console.log('data', data?.posts)

    return (
        <Box p={8} mx={4}>
            {!!data?.posts && data?.posts.map((post, i) => (
                <PostCard key={i} refetch={refetch} post={post} />
            ))}
        </Box>
    );
};
