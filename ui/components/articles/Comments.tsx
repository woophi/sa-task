import { CommentModel } from '@core/models';
import { getArticleComments } from '@core/operations/articles';
import { Box } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { AddComment } from './AddComment';
import { Comment } from './Comment';

export const Comments = memo<{ uuid: string }>(({ uuid }) => {
  const [comments, setComments] = useState<CommentModel[]>([]);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = useCallback(() => {
    getArticleComments(uuid)
      .then(r => setComments(r.result))
      .catch(console.error);
  }, [uuid]);

  return (
    <Box marginTop="2rem">
      {comments.map(c => (
        <Comment key={c.id} {...c} />
      ))}
      <AddComment uuid={uuid} onCreated={loadComments} />
    </Box>
  );
});
