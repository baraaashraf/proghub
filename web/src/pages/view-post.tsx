import { Box, Button, Flex, Text, Textarea } from '@chakra-ui/react';
import {
    CreateCommentRequest,
    CreateCommentResponse,
    ENDPOINT_CONFIGS,
    GetPostRequest,
    GetPostResponse,
    ListCommentsResponse,
    withParams,
} from '@proghub/shared';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CommentCard } from '../components/CommentCard';
import { PostCard } from '../components/PostCard';
import { useDocumentTitle } from '../docTitle';
import { callEndpoint } from '../fetch';
import { isLoggedIn } from '../fetch/auth';

export const ViewPost = () => {
    const { id: postId } = useParams();
    const {
        data,
        error,
        isLoading,
        refetch: refetchPost,
    } = useQuery({
        queryKey: ['viewpost'],
        queryFn: () =>
            callEndpoint<GetPostRequest, GetPostResponse>(withParams(ENDPOINT_CONFIGS.getPost, postId!))
    });
    const {
        data: commentsData,
        error: commentsError,
        isLoading: commentsLoading,
        refetch: refetchComments,
    } = useQuery({
        queryKey: ['listcomments'],
        queryFn: () =>
            callEndpoint<{}, ListCommentsResponse>(withParams(ENDPOINT_CONFIGS.listComments, postId!))
    });
    const [comment, setComment] = useState('');
    const submitComment = useCallback(async () => {
        await callEndpoint<CreateCommentRequest, CreateCommentResponse>(
            withParams(ENDPOINT_CONFIGS.createComment, postId!),
            { comment }
        );
        setComment('');
        refetchComments();
    }, [comment, postId, refetchComments]);

    const postname = isLoading ? 'Loading..' : error || !data ? 'Error' : data.post.title;
    useDocumentTitle(postname);

    if (isLoading) {
        return <div>loading...</div>;
    }

    if (error || !data?.post) {
        return <div>error loading post: {JSON.stringify(error)}</div>;
    }

    return (
        <Box>
            <PostCard post={data.post} refetch={refetchPost} hideDiscuss />

            <Box w="xl">
                <hr />
            </Box>

            <form onSubmit={submitComment}>
                <Flex direction="column" gap={4} mt={4} ml={4}>
                    {commentsError ? <Text color="red.700">Error loading comments.</Text> : null}

                    {commentsLoading ? <Text>Loading comments...</Text> : null}

                    {isLoggedIn() && (
                        <>
                            <Textarea
                                placeholder="Type to add your own comment.."
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                maxW="xl"
                                style={{ unicodeBidi: 'plaintext' }}
                            />
                            <Box>
                                <Button size="sm" onClick={submitComment} disabled={!comment.trim().length}>
                                    Add comment
                                </Button>
                            </Box>

                            <Box w="xl">
                                <hr />
                            </Box>
                        </>
                    )}

                    {commentsData?.comments?.map((comment, i) => (
                        <CommentCard key={i} comment={comment} />
                    ))}

                    {!commentsData?.comments.length && (
                        <Text color="GrayText" fontStyle="italic">
                            No comments yet. Add the first comment below.
                        </Text>
                    )}
                </Flex>
            </form>
        </Box>
    );
};